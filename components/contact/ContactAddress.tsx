import { FC, JSX } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { formatWhatsAppNumber } from "@/utils/formatWhatsappNumber";
import { AddressAndContact } from "@/types/responseTypes/contactPageData";
import { Locale } from "@/i18n-config";
import TrackedWhatsAppButton from "@/components/common/TrackedWhatsAppButton";

interface ContactAddressProps {
  title: string;
  description: string;
  contactInfo: AddressAndContact;
  lang?: Locale;
}

interface ContactLink {
  href: string;
  label: string;
  icon: JSX.Element;
  /** Marks the WhatsApp link so it renders as a tracked CTA below. */
  isWhatsApp?: boolean;
}

const ContactAddress: FC<ContactAddressProps> = ({
  title,
  description,
  contactInfo,
  lang,
}) => {
  // Organize contact links data
  // Note: the WhatsApp number here comes from CMS-provided `contactInfo`,
  // not the hardcoded app-wide constant, so it keeps reflecting whatever
  // number the contact page is configured with.
  const contactLinks: ContactLink[] = [
    {
      href: `mailto:${contactInfo.email}`,
      label: contactInfo.email,
      icon: <Mail className="shrink-0" />,
    },
    {
      href: `https://wa.me/${formatWhatsAppNumber(contactInfo.phoneNumber)}`,
      label: contactInfo.phoneNumber,
      icon: <Phone className="shrink-0" />,
      isWhatsApp: true,
    },
    {
      href: contactInfo.urlAddress,
      label: contactInfo.address,
      icon: <MapPin className="shrink-0" />,
    },
  ];

  return (
    <section className="flex-1">
      <h2 className="text-3xl font-bold lg:text-4xl">{title}</h2>

      <p className="mt-8 max-w-[93%]">{description}</p>

      <div className="mt-8 flex max-w-md flex-col gap-2 text-xs text-gray-900 lg:text-sm xl:text-base">
        {/* Contact Links */}
        {contactLinks.map((link, index) => (
          <div key={index} className="flex items-center gap-4">
            {link.icon}
            {link.isWhatsApp ? (
              <TrackedWhatsAppButton
                href={link.href}
                source="contact_address"
                className="hover:underline"
              >
                {link.label}
              </TrackedWhatsAppButton>
            ) : (
              <a
                href={link.href}
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            )}
          </div>
        ))}

        {/* Google Maps Link */}
        <div className="mt-4">
          <a
            href={contactInfo.urlAddress}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-green-600 underline lg:text-base"
          >
            {lang === 'en' ? 'Open in Google Maps' : 'Buka di Google Maps'}
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactAddress;
