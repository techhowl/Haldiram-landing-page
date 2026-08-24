import { NextRequest, NextResponse } from "next/server";
import { appendLeadToSheet } from "@/lib/googleSheets";
import type { LeadApiResponse, LeadFormErrors } from "@/types/lead";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/;
const HAMPERS_REGEX = /^[0-9]{1,5}$/;
const MAX_LENGTH = 1000;

function sanitize(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, MAX_LENGTH);
}

interface ValidatedLead {
  fullName: string;
  contactNumber: string;
  email: string;
  designation: string;
  company: string;
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
  if (!numberOfHampers) {
    errors.numberOfHampers = "Number of hampers is required.";
  } else if (!HAMPERS_REGEX.test(numberOfHampers)) {
    errors.numberOfHampers = "Enter a valid number of hampers.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return {
    data: { fullName, contactNumber, email, designation, company, numberOfHampers },
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
    await appendLeadToSheet(data);
  } catch {
    const response: LeadApiResponse = {
      success: false,
      message: "We couldn't submit your request right now. Please try again in a moment.",
    };
    return NextResponse.json(response, { status: 502 });
  }

  const response: LeadApiResponse = { success: true };
  return NextResponse.json(response, { status: 200 });
}
