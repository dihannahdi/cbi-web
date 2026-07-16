"use client";

import { useState } from "react";
import { MapPin, Clock, ChevronDown, ChevronUp, ExternalLink, Mail } from "lucide-react";
import ContainerSection from "@/components/layout/container";
import type { JobVacancy } from "@/utils/strapiCareerData";
import { getContractTypeLabel } from "@/utils/strapiCareerData";

interface JobListingProps {
  jobs: JobVacancy[];
  locale: string;
}

const JobListing = ({ jobs, locale }: JobListingProps) => {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const sectionTitle = locale === "en" ? "Job Openings" : "Lowongan Kerja";
  const qualificationsLabel = locale === "en" ? "Qualifications" : "Kualifikasi";
  const jobDescLabel = locale === "en" ? "Job Description" : "Deskripsi Pekerjaan";
  const requirementsLabel = locale === "en" ? "Requirements" : "Persyaratan";
  const benefitsLabel = locale === "en" ? "Benefits" : "Benefit";
  const applyLabel = locale === "en" ? "Apply Now" : "Lamar Sekarang";
  const deadlineLabel = locale === "en" ? "Application Deadline" : "Batas Akhir Lamaran";
  const departmentLabel = locale === "en" ? "Department" : "Departemen";

  const toggleJob = (id: string) => {
    setExpandedJob((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-[#EEE]">
      <ContainerSection>
        <h2 className="mb-6 text-2xl font-bold text-[#222] lg:text-[40px] lg:leading-[1.2]">
          {sectionTitle}
        </h2>

        <div className="flex flex-col gap-4">
          {jobs.map((job) => {
            const isExpanded = expandedJob === job.documentId;

            return (
              <div
                key={job.documentId}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300"
              >
                {/* Job Header - Always visible */}
                <button
                  onClick={() => toggleJob(job.documentId)}
                  className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-gray-50 sm:p-6"
                >
                  <div className="flex flex-1 flex-col gap-2 lg:flex-row lg:items-center lg:gap-6">
                    <h3 className="text-lg font-bold text-[#222] lg:text-2xl">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                      <div className="flex items-center gap-1.5 text-sm text-[#666]">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-[#666]">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        <span>{getContractTypeLabel(job.contractType, locale)}</span>
                      </div>
                      {job.department && (
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                          {job.department}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-[#666]" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-[#666]" />
                    )}
                  </div>
                </button>

                {/* Job Details - Expandable */}
                {isExpanded && (
                  <div className="border-t border-gray-100 px-5 pb-6 pt-4 sm:px-6">
                    {/* Short Description */}
                    {job.shortDescription && (
                      <p className="mb-5 text-base leading-relaxed text-[#666]">
                        {job.shortDescription}
                      </p>
                    )}

                    {/* Meta Info */}
                    <div className="mb-5 flex flex-wrap gap-3">
                      {job.department && (
                        <div className="rounded-lg bg-gray-50 px-3 py-2 text-sm">
                          <span className="font-medium text-[#222]">{departmentLabel}:</span>{" "}
                          <span className="text-[#666]">{job.department}</span>
                        </div>
                      )}
                      {job.applicationDeadline && (
                        <div className="rounded-lg bg-gray-50 px-3 py-2 text-sm">
                          <span className="font-medium text-[#222]">{deadlineLabel}:</span>{" "}
                          <span className="text-[#666]">
                            {new Date(job.applicationDeadline).toLocaleDateString(
                              locale === "en" ? "en-US" : "id-ID",
                              { year: "numeric", month: "long", day: "numeric" }
                            )}
                          </span>
                        </div>
                      )}
                      {job.salaryRange && (
                        <div className="rounded-lg bg-green-50 px-3 py-2 text-sm">
                          <span className="font-medium text-green-800">{job.salaryRange}</span>
                        </div>
                      )}
                    </div>

                    {/* Qualifications */}
                    {job.qualifications && (
                      <div className="mb-5">
                        <h4 className="mb-2 text-base font-bold text-[#222]">
                          {qualificationsLabel}
                        </h4>
                        <div
                          className="prose prose-sm max-w-none text-[#666] prose-ul:list-disc prose-ul:pl-5 prose-li:marker:text-green-600"
                          dangerouslySetInnerHTML={{ __html: job.qualifications }}
                        />
                      </div>
                    )}

                    {/* Job Description */}
                    {job.jobDescription && (
                      <div className="mb-5">
                        <h4 className="mb-2 text-base font-bold text-[#222]">
                          {jobDescLabel}
                        </h4>
                        <div
                          className="prose prose-sm max-w-none text-[#666] prose-ul:list-disc prose-ul:pl-5 prose-li:marker:text-green-600"
                          dangerouslySetInnerHTML={{ __html: job.jobDescription }}
                        />
                      </div>
                    )}

                    {/* Requirements */}
                    {job.requirements && (
                      <div className="mb-5">
                        <h4 className="mb-2 text-base font-bold text-[#222]">
                          {requirementsLabel}
                        </h4>
                        <div
                          className="prose prose-sm max-w-none text-[#666] prose-ul:list-disc prose-ul:pl-5 prose-li:marker:text-green-600"
                          dangerouslySetInnerHTML={{ __html: job.requirements }}
                        />
                      </div>
                    )}

                    {/* Benefits */}
                    {job.benefits && (
                      <div className="mb-5">
                        <h4 className="mb-2 text-base font-bold text-[#222]">
                          {benefitsLabel}
                        </h4>
                        <div
                          className="prose prose-sm max-w-none text-[#666] prose-ul:list-disc prose-ul:pl-5 prose-li:marker:text-green-600"
                          dangerouslySetInnerHTML={{ __html: job.benefits }}
                        />
                      </div>
                    )}

                    {/* Apply Button */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      {/* Primary: Apply via our form */}
                      <a
                        href={`/${locale}/career/apply/${job.slug}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#083F19] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0E5424]"
                      >
                        {applyLabel}
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      {/* Secondary: Email option if available */}
                      {job.applicationEmail && (
                        <a
                          href={`mailto:${job.applicationEmail}?subject=Lamaran: ${job.title}`}
                          className="inline-flex items-center gap-2 rounded-xl border-2 border-[#083F19] px-6 py-3 text-sm font-semibold text-[#083F19] transition-colors hover:bg-[#083F19] hover:text-white"
                        >
                          <Mail className="h-4 w-4" />
                          {job.applicationEmail}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ContainerSection>
    </section>
  );
};

export default JobListing;
