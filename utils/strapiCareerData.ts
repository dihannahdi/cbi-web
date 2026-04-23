/**
 * Strapi Career Data Fetcher
 * Fetches job vacancies from Strapi CMS for the career page
 * Supports i18n localization (id/en)
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_URL_API || "https://backend.centrabiotechindonesia.com";

export interface JobVacancy {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  location: string;
  contractType: "Full Time" | "Part Time" | "Contract" | "Internship" | "Freelance";
  department: string | null;
  shortDescription: string | null;
  qualifications: string | null;
  jobDescription: string | null;
  requirements: string | null;
  benefits: string | null;
  salaryRange: string | null;
  applicationDeadline: string | null;
  applicationUrl: string | null;
  applicationEmail: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Fetch all published and active job vacancies from Strapi CMS
 */
export async function getJobVacancies(locale: string = "id"): Promise<JobVacancy[]> {
  try {
    const url = `${STRAPI_URL}/api/job-vacancies?locale=${locale}&filters[isActive][$eq]=true&sort=sortOrder:asc,createdAt:desc&pagination[pageSize]=100`;
    
    const response = await fetch(url, {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.warn(`[Career] Failed to fetch job vacancies: ${response.status}`);
      return [];
    }

    const result: StrapiResponse<JobVacancy> = await response.json();
    return result.data || [];
  } catch (error) {
    console.warn("[Career] Error fetching job vacancies:", error);
    return [];
  }
}

/**
 * Fetch a single job vacancy by slug
 */
export async function getJobVacancyBySlug(
  slug: string,
  locale: string = "id"
): Promise<JobVacancy | null> {
  try {
    const url = `${STRAPI_URL}/api/job-vacancies?filters[slug][$eq]=${slug}&locale=${locale}`;
    
    const response = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) return null;

    const result: StrapiResponse<JobVacancy> = await response.json();
    return result.data?.[0] || null;
  } catch (error) {
    console.warn("[Career] Error fetching job vacancy by slug:", error);
    return null;
  }
}

/**
 * Map contract type to employment type for structured data
 */
export function mapContractTypeToEmploymentType(
  contractType: JobVacancy["contractType"]
): string {
  const mapping: Record<string, string> = {
    "Full Time": "FULL_TIME",
    "Part Time": "PART_TIME",
    "Contract": "CONTRACTOR",
    "Internship": "INTERN",
    "Freelance": "OTHER",
  };
  return mapping[contractType] || "FULL_TIME";
}

/**
 * Map contract type labels for localized display
 */
export function getContractTypeLabel(
  contractType: JobVacancy["contractType"],
  locale: string
): string {
  if (locale === "en") return contractType;

  const mapping: Record<string, string> = {
    "Full Time": "Penuh Waktu",
    "Part Time": "Paruh Waktu",
    "Contract": "Kontrak",
    "Internship": "Magang",
    "Freelance": "Freelance",
  };
  return mapping[contractType] || contractType;
}
