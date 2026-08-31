import type { AttributionData } from "@/lib/attribution";

export interface LeadFormData {
  fullName: string;
  contactNumber: string;
  email: string;
  designation: string;
  company: string;
  city: string;
  numberOfHampers: string;
  /** Honeypot field — must stay empty. Real users never see or fill it. */
  companyWebsite: string;
}

export type LeadFormErrors = Partial<Record<keyof Omit<LeadFormData, "companyWebsite">, string>>;

/** What the browser POSTs to /api/leads: the visible fields plus attribution. */
export interface LeadRequestBody extends LeadFormData {
  attribution: AttributionData;
}

/** Facts only the server can see — derived from request headers, not trusted input. */
export interface ServerMeta {
  userAgent: string;
  ipCountry: string;
  ipRegion: string;
  ipCity: string;
  requestReferer: string;
}

/** The full record handed to the sheet writer. */
export interface LeadSubmissionPayload {
  fullName: string;
  contactNumber: string;
  email: string;
  designation: string;
  company: string;
  city: string;
  numberOfHampers: string;
  attribution: AttributionData;
  serverMeta: ServerMeta;
}

export interface LeadApiSuccessResponse {
  success: true;
}

export interface LeadApiErrorResponse {
  success: false;
  message: string;
  fieldErrors?: LeadFormErrors;
}

export type LeadApiResponse = LeadApiSuccessResponse | LeadApiErrorResponse;
