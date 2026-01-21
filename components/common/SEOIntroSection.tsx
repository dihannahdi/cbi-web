/**
 * SEO Intro Section Component
 * Adds descriptive text content to listing pages to improve word count and SEO
 * Improves text-to-HTML ratio for SEMrush optimization
 */

import Link from "next/link";

interface SEOIntroSectionProps {
  title: string;
  description: string;
  className?: string;
  additionalLinks?: Array<{
    href: string;
    text: string;
    label: string;
  }>;
}

const SEOIntroSection = ({ title, description, className = "", additionalLinks }: SEOIntroSectionProps) => {
  return (
    <div className={`container mx-auto px-4 py-8 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Main Title and Description */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Additional Links for SEO (if provided) */}
        {additionalLinks && additionalLinks.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {additionalLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.href}
                className="text-green-600 hover:text-green-800 hover:underline text-sm font-medium"
              >
                {link.text}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SEOIntroSection;
