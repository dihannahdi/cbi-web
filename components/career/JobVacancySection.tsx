import JobEmptyState from "@/components/career/JobEmptyState";
import JobListing from "@/components/career/JobListing";
import type { JobVacancy } from "@/utils/strapiCareerData";

interface JobVacancySectionProps {
  jobs: JobVacancy[];
  locale: string;
}

/**
 * Job Vacancy Section - Server Component wrapper
 * Renders either the job listing or empty state based on CMS data
 */
const JobVacancySection = ({ jobs, locale }: JobVacancySectionProps) => {
  if (!jobs || jobs.length === 0) {
    return <JobEmptyState locale={locale} />;
  }

  return <JobListing jobs={jobs} locale={locale} />;
};

export default JobVacancySection;
