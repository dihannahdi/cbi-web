import { Clock, MapPin } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ContainerSection from "@/components/layout/container";

const jobListings = [
  {
    id: "rd-staff",
    title: "R&D Staff",
    location: "Klaten, Jawa Tengah",
    contractType: "Full Time",
    qualifications: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in eros elementum",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in eros elementum",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in eros elementum",
    ],
    jobDescription: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in eros elementum",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in eros elementum",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in eros elementum",
    ],
  },
  {
    id: "finance-staff",
    title: "Finance Staff",
    location: "Yogyakarta",
    contractType: "Part Time",
    qualifications: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in eros elementum",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in eros elementum",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in eros elementum",
    ],
    jobDescription: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in eros elementum",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in eros elementum",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in eros elementum",
    ],
  },
  {
    id: "marketing-staff",
    title: "Marketing Staff",
    location: "Klaten",
    contractType: "Magang",
    qualifications: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in eros elementum",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in eros elementum",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in eros elementum",
    ],
    jobDescription: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in eros elementum",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in eros elementum",
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Suspendisse varius enim in eros elementum",
    ],
  },
];

const JobVacany = () => {
  return (
    <section>
      <ContainerSection>
        <h2>Lowongan Kerja</h2>
        <div className="mt-8 lg:mt-16">
          <Accordion type="multiple" className="w-full">
            {jobListings.map((job) => (
              <AccordionItem value={job.id} key={job.id}>
                <AccordionTrigger>
                  <div className="flex flex-col lg:flex-row lg:gap-x-6">
                    <h4 className="text-nowrap text-xl font-bold lg:text-2xl xl:text-[32px]">
                      {job.title}
                    </h4>
                    <div className="mt-2 flex w-full gap-x-6">
                      <div className="flex items-center gap-x-2">
                        <MapPin className="h-4 w-4" />
                        <p>{job.location}</p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <Clock className="h-4 w-4" />
                        <p>{job.contractType}</p>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <button className="btn-primary mb-6">Kirim Lamaran</button>
                  <h4 className="lg:text-base">Kualifikasi</h4>
                  <ul className="list-disc space-y-2 pl-6">
                    {job.qualifications.map((qualification, index) => (
                      <li key={index} className="text-gray-600">
                        {qualification}
                      </li>
                    ))}
                  </ul>
                  <h4 className="mt-6 lg:text-base">Deskripsi Pekerjaan</h4>
                  <ul className="list-disc space-y-2 pl-6">
                    {job.qualifications.map((qualification, index) => (
                      <li key={index} className="text-gray-600">
                        {qualification}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ContainerSection>
    </section>
  );
};

export default JobVacany;
