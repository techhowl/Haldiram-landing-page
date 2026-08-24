export interface LeadFormData {
  fullName: string;
  contactNumber: string;
  email: string;
  designation: string;
  company: string;
  numberOfHampers: string;
  /** Honeypot field — must stay empty. Real users never see or fill it. */
  companyWebsite: string;
}

export type LeadFormErrors = Partial<Record<keyof Omit<LeadFormData, "companyWebsite">, string>>;

export interface LeadSubmissionPayload {
  fullName: string;
  contactNumber: string;
  email: string;
  designation: string;
  company: string;
  numberOfHampers: string;
  companyWebsite?: string;
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
