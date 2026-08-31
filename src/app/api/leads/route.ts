import { NextRequest, NextResponse } from "next/server";
import { appendLeadToSheet } from "@/lib/leadsSheet";
import type { AttributionData } from "@/lib/attribution";
import type { LeadApiResponse, LeadFormErrors, ServerMeta } from "@/types/lead";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/;
const HAMPERS_REGEX = /^[0-9]{1,5}$/;
const MAX_LENGTH = 1000;
/** Attribution values are machine-generated; cap them tighter than free text. */
const MAX_ATTRIBUTION_LENGTH = 500;

function sanitize(value: unknown, maxLength = MAX_LENGTH): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, maxLength);
}

interface ValidatedLead {
  fullName: string;
  contactNumber: string;
  email: string;
  designation: string;
  company: string;
  city: string;
  numberOfHampers: string;
}

function validate(body: Record<string, unknown>): {
  data?: ValidatedLead;
  errors?: LeadFormErrors;
} {
  const fullName = sanitize(body.fullName);
  const contactNumber = sanitize(body.contactNumber);
  const email = sanitize(body.email);
  const designation = sanitize(body.designation);
  const company = sanitize(body.company);
  const city = sanitize(body.city);
  const numberOfHampers = sanitize(body.numberOfHampers);

  const errors: LeadFormErrors = {};

  if (!fullName) errors.fullName = "Full name is required.";
  if (!contactNumber) {
    errors.contactNumber = "Contact number is required.";
  } else if (!PHONE_REGEX.test(contactNumber)) {
    errors.contactNumber = "Enter a valid contact number.";
  }
  if (!email) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!designation) errors.designation = "Designation is required.";
  if (!company) errors.company = "Company is required.";
  if (!city) errors.city = "City is required.";
  if (!numberOfHampers) {
    errors.numberOfHampers = "Number of hampers is required.";
  } else if (!HAMPERS_REGEX.test(numberOfHampers)) {
    errors.numberOfHampers = "Enter a valid number of hampers.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    data: { fullName, contactNumber, email, designation, company, city, numberOfHampers },
  };
}

const ATTRIBUTION_KEYS: readonly (keyof AttributionData)[] = [
  "channel",
  "source",
  "medium",
  "campaign",
  "term",
  "content",
  "clickId",
  "clickIdType",
  "referrer",
  "landingPage",
  "firstTouchChannel",
  "firstTouchSource",
  "firstTouchCampaign",
  "firstTouchReferrer",
  "firstTouchLandingPage",
  "firstTouchAt",
  "visitCount",
  "submittedPage",
  "deviceType",
  "screenSize",
  "language",
  "timezone",
];

/**
 * Attribution comes from the browser, so it's untrusted like any other input —
 * every key is sanitized and anything unrecognised is dropped rather than
 * forwarded to the sheet.
 */
function sanitizeAttribution(value: unknown): AttributionData {
  const raw = (typeof value === "object" && value !== null ? value : {}) as Record<string, unknown>;
  const result = {} as AttributionData;

  for (const key of ATTRIBUTION_KEYS) {
    result[key] = sanitize(raw[key], MAX_ATTRIBUTION_LENGTH);
  }

  return result;
}

/**
 * Headers the visitor cannot forge from the page. Geo headers are populated by
 * Vercel/Cloudflare in production and are simply blank elsewhere.
 */
function readServerMeta(request: NextRequest): ServerMeta {
  const header = (name: string) => sanitize(request.headers.get(name), MAX_ATTRIBUTION_LENGTH);

  return {
    userAgent: header("user-agent"),
    ipCountry: header("x-vercel-ip-country") || header("cf-ipcountry"),
    ipRegion: header("x-vercel-ip-country-region"),
    ipCity: decodeURIComponent(header("x-vercel-ip-city") || ""),
    requestReferer: header("referer"),
  };
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    const response: LeadApiResponse = {
      success: false,
      message: "Invalid request. Please try again.",
    };
    return NextResponse.json(response, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    const response: LeadApiResponse = {
      success: false,
      message: "Invalid request. Please try again.",
    };
    return NextResponse.json(response, { status: 400 });
  }

  // Honeypot: a hidden field real visitors never fill in. Any value here
  // means the submission came from a bot — accept silently, discard quietly.
  if (typeof body.companyWebsite === "string" && body.companyWebsite.trim() !== "") {
    const response: LeadApiResponse = { success: true };
    return NextResponse.json(response, { status: 200 });
  }

  const { data, errors } = validate(body);

  if (!data) {
    const response: LeadApiResponse = {
      success: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: errors,
    };
    return NextResponse.json(response, { status: 422 });
  }

  try {
    await appendLeadToSheet({
      ...data,
      attribution: sanitizeAttribution(body.attribution),
      serverMeta: readServerMeta(request),
    });
  } catch (error) {
    // Surfaced in the server logs / Vercel function logs only — the visitor
    // gets the generic message below.
    console.error("[leads] Failed to append lead to sheet:", error);

    const response: LeadApiResponse = {
      success: false,
      message: "We couldn't submit your request right now. Please try again in a moment.",
    };
    return NextResponse.json(response, { status: 502 });
  }

  const response: LeadApiResponse = { success: true };
  return NextResponse.json(response, { status: 200 });
}
