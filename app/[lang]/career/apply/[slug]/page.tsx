import { Metadata } from "next";
import { notFound } from "next/navigation";
import ApplicationForm from "@/components/career/ApplicationForm";
import Breadcrumb from "@/components/common/BreadScrumb";
import ContainerSection from "@/components/layout/container";
import { getJobVacancyBySlug } from "@/utils/strapiCareerData";
import { SITE_CONFIG } from "@/utils/seo";
import { Locale, i18n } from "@/i18n-config";
import { getDictionary } from "@/dictionaries";

// SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;

  const job = await getJobVacancyBySlug(slug, lang);

  if (!job) {
    return {
      title: lang === "en" ? "Job Not Found" : "Lowongan Tidak Ditemukan",
    };
  }

  const title =
    lang === "en"
      ? `Apply - ${job.title}`
      : `Lamar - ${job.title}`;

  const description =
    lang === "en"
      ? `Apply for the ${job.title} position at Centra Biotech Indonesia. ${job.location} - ${job.contractType}.`
      : `Lamar posisi ${job.title} di Centra Biotech Indonesia. ${job.location} - ${job.contractType}.`;

  return {
    title,
    description,
    robots: { index: false, follow: true }, // Don't index apply pages
    alternates: {
      canonical: `${SITE_CONFIG.url}/${lang}/career/apply/${slug}`,
    },
  };
}

const ApplyPage = async ({
  params,
}: {
  params: Promise<{ lang: Locale; slug: string }>;
}) => {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  // Fetch the specific job vacancy
  const job = await getJobVacancyBySlug(slug, lang);

  if (!job) {
    notFound();
  }

  // Check if job is still active
  if (!job.isActive) {
    notFound();
  }

  // Check if application deadline has passed
  if (job.applicationDeadline) {
    const deadline = new Date(job.applicationDeadline);
    if (deadline < new Date()) {
      notFound();
    }
  }

  return (
    <section>
      <div className="bg-[#EEE] pt-6">
        <ContainerSection className="pb-0">
          <Breadcrumb className="bg-[#EEE]" lang={lang} dict={dict} />
        </ContainerSection>
      </div>

      <section className="bg-[#EEE]">
        <ContainerSection>
          <ApplicationForm job={job} locale={lang} />
        </ContainerSection>
      </section>
    </section>
  );
};

export default ApplyPage;
