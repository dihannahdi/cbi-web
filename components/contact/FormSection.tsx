"use client";

import { toast } from "sonner";
import { useState, ChangeEvent, FormEvent } from "react";

import { FormField } from "./FormField";
import { SubmitButton } from "./SubmitButton";
import { sendWhatsAppContactMessage, getBusinessWhatsAppNumber } from "@/utils/whatsappContact";
import { Locale } from "@/i18n-config";

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
  lang?: Locale;
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

const FormSection = ({ dict, lang = 'id' }: FormSectionProps) => {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.agreement) {
      toast.error(lang === 'id' ? 'Harap setujui kebijakan privasi' : 'Please agree to the privacy policy');
      return;
    }

    setIsSubmitting(true);

    try {
      // Show loading toast
      toast.loading(dict.sending);
      
      // Send via WhatsApp with pre-filled message
      const businessPhone = getBusinessWhatsAppNumber();
      sendWhatsAppContactMessage(formData, businessPhone, lang);
      
      // Show success message
      toast.dismiss();
      toast.success(dict.success);
      
      // Reset form after successful submission
      resetForm();
    } catch (error) {
      console.error('WhatsApp contact error:', error);
      toast.dismiss();
      toast.error(dict.error);
    } finally {
      setIsSubmitting(false);
    }
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
