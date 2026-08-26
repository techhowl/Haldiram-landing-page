"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { LeadFormData, LeadFormErrors, LeadApiResponse } from "@/types/lead";
import { captureAttribution, getAttribution } from "@/lib/attribution";
import CTAButton from "./CTAButton";

const INITIAL_STATE: LeadFormData = {
  fullName: "",
  contactNumber: "",
  email: "",
  designation: "",
  company: "",
  numberOfHampers: "",
  companyWebsite: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,20}$/;
const HAMPERS_REGEX = /^[0-9]{1,5}$/;

function validate(data: LeadFormData): LeadFormErrors {
  const errors: LeadFormErrors = {};

  if (!data.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!data.contactNumber.trim()) {
    errors.contactNumber = "Please enter a contact number.";
  } else if (!PHONE_REGEX.test(data.contactNumber.trim())) {
    errors.contactNumber = "Enter a valid contact number.";
  }
  if (!data.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!data.designation.trim()) errors.designation = "Please enter your designation.";
  if (!data.company.trim()) errors.company = "Please enter your company name.";
  if (!data.numberOfHampers.trim()) {
    errors.numberOfHampers = "Please enter the number of hampers.";
  } else if (!HAMPERS_REGEX.test(data.numberOfHampers.trim())) {
    errors.numberOfHampers = "Enter a valid number.";
  }

  return errors;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const BROCHURE_PATH = "/images/hampers/Haldirams 2026 - Hamper Catalogue.pdf";

function downloadBrochure() {
  const link = document.createElement("a");
  link.href = encodeURI(BROCHURE_PATH);
  link.download = "Haldirams 2026 - Hamper Catalogue.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>(INITIAL_STATE);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const formId = useId();
  const isSubmittingRef = useRef(false);

  // Stamp the visit's campaign/referrer data as soon as the page is
  // interactive, before any internal navigation can strip the query string.
  useEffect(() => {
    captureAttribution();
  }, []);

  function handleChange(field: keyof LeadFormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof LeadFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmittingRef.current) return;

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("error");
      setStatusMessage("Please correct the highlighted fields below.");
      return;
    }

    isSubmittingRef.current = true;
    setStatus("submitting");
    setStatusMessage("");
    setErrors({});

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, attribution: getAttribution() }),
      });

      const result: LeadApiResponse = await res.json();

      if (!res.ok || !result.success) {
        setStatus("error");
        setErrors(!result.success ? result.fieldErrors ?? {} : {});
        setStatusMessage(
          !result.success ? result.message : "Something went wrong. Please try again."
        );
        return;
      }

      setStatus("success");
      setStatusMessage(
        "Thank you! Your enquiry has been received — your brochure download will begin shortly."
      );
      setFormData(INITIAL_STATE);
      downloadBrochure();
    } catch {
      setStatus("error");
      setStatusMessage(
        "We couldn't submit your enquiry right now. Please check your connection and try again."
      );
    } finally {
      isSubmittingRef.current = false;
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <div className="relative isolate w-[300px] sm:w-[380px] min-[1360px]:w-[500px]">
      {/*
        Desktop/tablet: the scalloped seal + gold trim + hanging pin ornament
        is the supplied frame artwork, not CSS. object-fill stretches it a
        hair rather than locking the container to the image's exact ratio
        (which would starve the 6-field form of vertical room).
      */}
      <Image
        src="/images/hero/form-frame.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="(max-width: 1024px) 90vw, 420px"
        className="hidden sm:block object-fill -z-10 pointer-events-none select-none"
      />
      {/* Mobile: a simpler scalloped card, purpose-built for the compact form. */}
      <Image
        src="/images/hero/mobile-vec.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="300px"
        className="sm:hidden object-fill -z-10 pointer-events-none select-none"
      />
      {/*
        Note: CSS resolves top/bottom padding percentages against the
        container's *width*, not height (a long-standing CSS quirk) — so
        these aren't the raw "% down the image" measurements, they're scaled
        by 1/aspect-ratio to land in the same visual spot despite that.
      */}
      <div className="relative px-[9%] pt-[9%] pb-[10%] sm:px-[9%] sm:pt-[43%] sm:pb-[43%]">
        <p className="font-display font-semibold text-sm sm:text-[20px] leading-snug text-center text-gold mb-1.5 sm:mb-3 px-1 whitespace-nowrap">
          Questions, Feedback, Or Inquiries?
          <br />
          We&rsquo;re Just A Message Away.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-1.5 sm:space-y-2.5">
          {/* Honeypot field — hidden from sighted users and screen readers, must stay empty */}
          <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
            <label htmlFor={`${formId}-company-hp`}>Do not fill this in</label>
            <input
              id={`${formId}-company-hp`}
              name="companyWebsite"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.companyWebsite}
              onChange={(e) => handleChange("companyWebsite", e.target.value)}
            />
          </div>

          <FormField id={`${formId}-fullName`} label="Full Name" error={errors.fullName}>
            <input
              id={`${formId}-fullName`}
              name="fullName"
              type="text"
              autoComplete="name"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              className={inputClasses(Boolean(errors.fullName))}
              placeholder="Full Name"
            />
          </FormField>

          <FormField id={`${formId}-contactNumber`} label="Contact Number" error={errors.contactNumber}>
            <input
              id={`${formId}-contactNumber`}
              name="contactNumber"
              type="tel"
              autoComplete="tel"
              value={formData.contactNumber}
              onChange={(e) => handleChange("contactNumber", e.target.value)}
              aria-invalid={Boolean(errors.contactNumber)}
              className={inputClasses(Boolean(errors.contactNumber))}
              placeholder="Contact No."
            />
          </FormField>

          <FormField id={`${formId}-email`} label="Email Address" error={errors.email}>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              aria-invalid={Boolean(errors.email)}
              className={inputClasses(Boolean(errors.email))}
              placeholder="E-mail Address"
            />
          </FormField>

          <FormField id={`${formId}-designation`} label="Designation" error={errors.designation}>
            <input
              id={`${formId}-designation`}
              name="designation"
              type="text"
              autoComplete="organization-title"
              value={formData.designation}
              onChange={(e) => handleChange("designation", e.target.value)}
              aria-invalid={Boolean(errors.designation)}
              className={inputClasses(Boolean(errors.designation))}
              placeholder="Designation"
            />
          </FormField>

          <FormField id={`${formId}-company`} label="Company" error={errors.company}>
            <input
              id={`${formId}-company`}
              name="company"
              type="text"
              autoComplete="organization"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              aria-invalid={Boolean(errors.company)}
              className={inputClasses(Boolean(errors.company))}
              placeholder="Company"
            />
          </FormField>

          <FormField id={`${formId}-numberOfHampers`} label="No. of Hampers" error={errors.numberOfHampers}>
            <input
              id={`${formId}-numberOfHampers`}
              name="numberOfHampers"
              type="text"
              inputMode="numeric"
              value={formData.numberOfHampers}
              onChange={(e) => handleChange("numberOfHampers", e.target.value)}
              aria-invalid={Boolean(errors.numberOfHampers)}
              className={inputClasses(Boolean(errors.numberOfHampers))}
              placeholder="No. of Hampers"
            />
          </FormField>

          <div aria-live="polite" className="min-h-[1rem] sm:min-h-[1.25rem] text-xs sm:text-sm">
            {status === "success" && <p className="text-gold font-medium">{statusMessage}</p>}
            {status === "error" && statusMessage && (
              <p className="text-red-200 font-medium">{statusMessage}</p>
            )}
          </div>

          <CTAButton
            type="submit"
            variant="gold"
            disabled={isSubmitting}
            className="w-full mt-0.5 sm:mt-1 rounded-full !py-1.5 !text-xs sm:!py-3 sm:!text-sm"
          >
            {isSubmitting ? "Submitting..." : "Download BROCHURE"}
          </CTAButton>
        </form>
      </div>
    </div>
  );
}

function inputClasses(hasError: boolean) {
  return `w-full bg-burgundy-pale/90 text-burgundy-dark text-xs sm:text-sm px-3.5 py-1.5 sm:px-4 sm:py-2.5 rounded-full border ${
    hasError ? "border-red-400" : "border-transparent"
  } focus:border-gold outline-none placeholder:text-burgundy-dark/70`;
}

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}

function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-200 px-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
