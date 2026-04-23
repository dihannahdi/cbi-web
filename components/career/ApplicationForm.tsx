"use client";

import { useState, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  FileText,
  Briefcase,
  Calendar,
  Link2,
  Linkedin,
  Upload,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  DollarSign,
} from "lucide-react";
import type { JobVacancy } from "@/utils/strapiCareerData";

interface ApplicationFormProps {
  job: JobVacancy;
  locale: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const ApplicationForm = ({ job, locale }: ApplicationFormProps) => {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = {
    title: locale === "en" ? "Apply for Position" : "Lamar Posisi",
    subtitle:
      locale === "en"
        ? "Fill in the form below to submit your application"
        : "Isi formulir di bawah ini untuk mengirimkan lamaran Anda",
    fullName: locale === "en" ? "Full Name" : "Nama Lengkap",
    fullNamePlaceholder:
      locale === "en" ? "Enter your full name" : "Masukkan nama lengkap Anda",
    email: locale === "en" ? "Email Address" : "Alamat Email",
    emailPlaceholder:
      locale === "en" ? "Enter your email address" : "Masukkan alamat email",
    phone: locale === "en" ? "Phone Number" : "Nomor Telepon",
    phonePlaceholder:
      locale === "en" ? "Enter your phone number" : "Masukkan nomor telepon",
    resume: locale === "en" ? "Resume / CV" : "Resume / CV",
    resumeDesc:
      locale === "en"
        ? "PDF or Word document, max 5MB"
        : "Dokumen PDF atau Word, maks 5MB",
    coverLetter: locale === "en" ? "Cover Letter" : "Surat Lamaran",
    coverLetterPlaceholder:
      locale === "en"
        ? "Tell us why you're interested in this position..."
        : "Ceritakan mengapa Anda tertarik dengan posisi ini...",
    currentPosition: locale === "en" ? "Current Position" : "Posisi Saat Ini",
    currentPositionPlaceholder:
      locale === "en"
        ? "e.g. Software Engineer at PT ABC"
        : "mis. Software Engineer di PT ABC",
    expectedSalary:
      locale === "en" ? "Expected Salary" : "Gaji yang Diharapkan",
    expectedSalaryPlaceholder:
      locale === "en" ? "e.g. IDR 8,000,000 - 12,000,000" : "mis. Rp 8.000.000 - 12.000.000",
    availableDate:
      locale === "en" ? "Available Start Date" : "Tanggal Mulai Tersedia",
    linkedin: locale === "en" ? "LinkedIn Profile" : "Profil LinkedIn",
    linkedinPlaceholder: "https://linkedin.com/in/...",
    portfolio: locale === "en" ? "Portfolio URL" : "URL Portofolio",
    portfolioPlaceholder: "https://...",
    source:
      locale === "en"
        ? "How did you find this job?"
        : "Dari mana Anda mengetahui lowongan ini?",
    sourceOptions: {
      Website: locale === "en" ? "Company Website" : "Website Perusahaan",
      LinkedIn: "LinkedIn",
      JobPortal:
        locale === "en" ? "Job Portal" : "Portal Lowongan Kerja",
      Referral: locale === "en" ? "Referral" : "Referensi",
      Other: locale === "en" ? "Other" : "Lainnya",
    },
    submit: locale === "en" ? "Submit Application" : "Kirim Lamaran",
    submitting:
      locale === "en"
        ? "Submitting..."
        : "Mengirim...",
    required: locale === "en" ? "Required" : "Wajib",
    optional: locale === "en" ? "Optional" : "Opsional",
    successTitle:
      locale === "en"
        ? "Application Submitted!"
        : "Lamaran Terkirim!",
    successMessage:
      locale === "en"
        ? "Thank you for your application. Our HR team will review your application and contact you soon."
        : "Terima kasih atas lamaran Anda. Tim HR kami akan meninjau lamaran Anda dan segera menghubungi Anda.",
    errorTitle:
      locale === "en" ? "Submission Failed" : "Pengiriman Gagal",
    backToCareer:
      locale === "en" ? "Back to Career Page" : "Kembali ke Halaman Karir",
    tryAgain: locale === "en" ? "Try Again" : "Coba Lagi",
    uploadFile: locale === "en" ? "Upload File" : "Unggah File",
    dragDrop:
      locale === "en"
        ? "or drag and drop your file here"
        : "atau seret dan letakkan file Anda di sini",
    personalInfo: locale === "en" ? "Personal Information" : "Informasi Pribadi",
    additionalInfo: locale === "en" ? "Additional Information" : "Informasi Tambahan",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("jobVacancyId", job.documentId);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  // Success state
  if (status === "success") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-10 w-10 text-[#00802B]" />
        </div>
        <h2 className="mb-4 text-2xl font-bold text-[#222] lg:text-3xl">
          {t.successTitle}
        </h2>
        <p className="mb-8 text-base text-[#666] lg:text-lg">
          {t.successMessage}
        </p>
        <a
          href={`/${locale}/career`}
          className="inline-flex items-center gap-2 rounded-xl bg-[#00802B] px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-[#006B24]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.backToCareer}
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Job Info Header */}
      <div className="mb-8 rounded-2xl bg-white p-6 lg:p-8">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-xl font-bold text-[#222] lg:text-2xl">
              {t.title}
            </h1>
            <p className="text-sm text-[#666] lg:text-base">{t.subtitle}</p>
          </div>
          <a
            href={`/${locale}/career`}
            className="flex items-center gap-1.5 text-sm font-medium text-[#00802B] transition-colors hover:text-[#006B24]"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.backToCareer}
          </a>
        </div>
        <div className="rounded-xl bg-[#F5F5F5] p-4">
          <h3 className="mb-1 text-lg font-bold text-[#222]">{job.title}</h3>
          <div className="flex flex-wrap gap-3 text-sm text-[#666]">
            <span>{job.location}</span>
            <span>•</span>
            <span>{job.contractType}</span>
            {job.department && (
              <>
                <span>•</span>
                <span>{job.department}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="rounded-2xl bg-white p-6 lg:p-8">
          <h2 className="mb-6 text-lg font-bold text-[#222]">
            {t.personalInfo}
          </h2>

          <div className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#222]">
                <User className="h-4 w-4 text-[#00802B]" />
                {t.fullName}
                <span className="text-xs text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                required
                placeholder={t.fullNamePlaceholder}
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#00802B] focus:outline-none focus:ring-1 focus:ring-[#00802B] transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#222]">
                <Mail className="h-4 w-4 text-[#00802B]" />
                {t.email}
                <span className="text-xs text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder={t.emailPlaceholder}
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#00802B] focus:outline-none focus:ring-1 focus:ring-[#00802B] transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#222]">
                <Phone className="h-4 w-4 text-[#00802B]" />
                {t.phone}
                <span className="text-xs text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder={t.phonePlaceholder}
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#00802B] focus:outline-none focus:ring-1 focus:ring-[#00802B] transition-colors"
              />
            </div>

            {/* Resume Upload */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#222]">
                <FileText className="h-4 w-4 text-[#00802B]" />
                {t.resume}
                <span className="text-xs text-red-500">*</span>
              </label>
              <p className="mb-2 text-xs text-[#666]">{t.resumeDesc}</p>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer rounded-xl border-2 border-dashed border-gray-200 bg-[#FAFAFA] p-6 text-center transition-colors hover:border-[#00802B] hover:bg-green-50/30"
              >
                <Upload className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                {fileName ? (
                  <p className="text-sm font-medium text-[#00802B]">{fileName}</p>
                ) : (
                  <>
                    <p className="text-sm font-medium text-[#222]">
                      {t.uploadFile}
                    </p>
                    <p className="mt-1 text-xs text-[#666]">{t.dragDrop}</p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  name="resume"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#222]">
                <FileText className="h-4 w-4 text-[#00802B]" />
                {t.coverLetter}
                <span className="text-xs text-[#666]">({t.optional})</span>
              </label>
              <textarea
                name="coverLetter"
                rows={4}
                placeholder={t.coverLetterPlaceholder}
                className="w-full resize-none rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#00802B] focus:outline-none focus:ring-1 focus:ring-[#00802B] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="rounded-2xl bg-white p-6 lg:p-8">
          <h2 className="mb-6 text-lg font-bold text-[#222]">
            {t.additionalInfo}
          </h2>

          <div className="space-y-5">
            {/* Current Position */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#222]">
                <Briefcase className="h-4 w-4 text-[#00802B]" />
                {t.currentPosition}
                <span className="text-xs text-[#666]">({t.optional})</span>
              </label>
              <input
                type="text"
                name="currentPosition"
                placeholder={t.currentPositionPlaceholder}
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#00802B] focus:outline-none focus:ring-1 focus:ring-[#00802B] transition-colors"
              />
            </div>

            {/* Expected Salary */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#222]">
                <DollarSign className="h-4 w-4 text-[#00802B]" />
                {t.expectedSalary}
                <span className="text-xs text-[#666]">({t.optional})</span>
              </label>
              <input
                type="text"
                name="expectedSalary"
                placeholder={t.expectedSalaryPlaceholder}
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#00802B] focus:outline-none focus:ring-1 focus:ring-[#00802B] transition-colors"
              />
            </div>

            {/* Available Start Date */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#222]">
                <Calendar className="h-4 w-4 text-[#00802B]" />
                {t.availableDate}
                <span className="text-xs text-[#666]">({t.optional})</span>
              </label>
              <input
                type="date"
                name="availableStartDate"
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#222] focus:border-[#00802B] focus:outline-none focus:ring-1 focus:ring-[#00802B] transition-colors"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#222]">
                <Linkedin className="h-4 w-4 text-[#00802B]" />
                {t.linkedin}
                <span className="text-xs text-[#666]">({t.optional})</span>
              </label>
              <input
                type="url"
                name="linkedinUrl"
                placeholder={t.linkedinPlaceholder}
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#00802B] focus:outline-none focus:ring-1 focus:ring-[#00802B] transition-colors"
              />
            </div>

            {/* Portfolio */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#222]">
                <Link2 className="h-4 w-4 text-[#00802B]" />
                {t.portfolio}
                <span className="text-xs text-[#666]">({t.optional})</span>
              </label>
              <input
                type="url"
                name="portfolioUrl"
                placeholder={t.portfolioPlaceholder}
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#00802B] focus:outline-none focus:ring-1 focus:ring-[#00802B] transition-colors"
              />
            </div>

            {/* Source */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#222]">
                {t.source}
                <span className="text-xs text-[#666]">({t.optional})</span>
              </label>
              <select
                name="source"
                defaultValue="Website"
                className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#222] focus:border-[#00802B] focus:outline-none focus:ring-1 focus:ring-[#00802B] transition-colors"
              >
                {Object.entries(t.sourceOptions).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {status === "error" && (
          <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
            <div>
              <p className="text-sm font-medium text-red-800">{t.errorTitle}</p>
              <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-2 text-sm font-medium text-red-700 underline hover:text-red-800"
              >
                {t.tryAgain}
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-xl bg-[#00802B] py-4 text-base font-semibold text-white transition-colors hover:bg-[#006B24] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              {t.submitting}
            </span>
          ) : (
            t.submit
          )}
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
