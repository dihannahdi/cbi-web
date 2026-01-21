"use client";

import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { useState, ChangeEvent, FormEvent } from "react";

import { FormField } from "./FormField";
import { SubmitButton } from "./SubmitButton";

// Types
interface FormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  agreement: boolean;
}

interface ContactDict {
  firstName: string;
  lastName: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  company: string;
  companyPlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  message: string;
  messagePlaceholder: string;
  send: string;
  sending: string;
  success: string;
  error: string;
  agreement: string;
}

interface FormSectionProps {
  dict: ContactDict;
}

// Constants
const INITIAL_FORM_STATE: FormData = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  message: "",
  agreement: false,
};

const EMAIL_CONFIG = {
  TO_EMAIL: "mushoddaqt@gmail.com",
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
};

const FormSection = ({ dict }: FormSectionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
  };

  const createEmailTemplateParams = (
    formData: FormData,
  ): Record<string, unknown> => ({
    to_email: EMAIL_CONFIG.TO_EMAIL,
    from_name: `${formData.firstName} ${formData.lastName}`,
    from_email: formData.email,
    company: formData.company,
    phone: formData.phone,
    message: formData.message,
  });

  const validateEmailConfig = () => {
    if (
      !EMAIL_CONFIG.SERVICE_ID ||
      !EMAIL_CONFIG.TEMPLATE_ID ||
      !EMAIL_CONFIG.PUBLIC_KEY
    ) {
      throw new Error("EmailJS credentials are not properly configured");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailPromise = new Promise(async (resolve, reject) => {
      try {
        validateEmailConfig();

        const templateParams = createEmailTemplateParams(formData);

        await emailjs.send(
          EMAIL_CONFIG.SERVICE_ID!,
          EMAIL_CONFIG.TEMPLATE_ID!,
          templateParams,
          EMAIL_CONFIG.PUBLIC_KEY,
        );

        resetForm();
        resolve("Pesan berhasil dikirim! Kami akan menghubungi Anda segera.");
      } catch (error) {
        reject(error);
      } finally {
        setIsSubmitting(false);
      }
    });

    toast.promise(emailPromise, {
      loading: dict.sending,
      success: (data) => data as string,
      error: dict.error,
    });
  };

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            label={dict.firstName}
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder={dict.firstNamePlaceholder}
            required
          />
          <FormField
            label={dict.lastName}
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder={dict.lastNamePlaceholder}
            required
          />
        </div>

        <FormField
          label={dict.company}
          name="company"
          type="text"
          value={formData.company}
          onChange={handleInputChange}
          placeholder={dict.companyPlaceholder}
          required
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            label={dict.email}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={dict.emailPlaceholder}
            required
          />
          <FormField
            label={dict.phone}
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder={dict.phonePlaceholder}
            required
          />
        </div>

        <FormField
          label={dict.message}
          name="message"
          type="textarea"
          value={formData.message}
          onChange={handleInputChange}
          placeholder={dict.messagePlaceholder}
          required
          rows={4}
        />

        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            name="agreement"
            checked={formData.agreement}
            onChange={handleInputChange}
            className="mt-1"
            required
          />
          <label className="text-sm text-gray-600">
            {dict.agreement}
          </label>
        </div>

        <SubmitButton isSubmitting={isSubmitting} label={dict.send} />
      </form>
    </div>
  );
};

// Components

export default FormSection;
