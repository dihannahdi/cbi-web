/**
 * WhatsApp Contact Utility
 * 
 * Creates pre-filled WhatsApp message URLs following WhatsApp best practices
 * Based on WhatsApp Click to Chat feature
 * @see https://developers.facebook.com/docs/whatsapp
 */

interface ContactFormData {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

/**
 * Formats a WhatsApp pre-filled message from contact form data
 * 
 * @param formData - The contact form data
 * @param lang - The language code ('id' or 'en')
 * @returns Formatted message string
 */
export function formatWhatsAppMessage(formData: ContactFormData, lang: 'id' | 'en' = 'id'): string {
  const translations = {
    id: {
      greeting: '*Halo, saya ingin bertanya!*',
      name: 'Nama',
      company: 'Perusahaan/Instansi',
      email: 'Email',
      phone: 'Nomor Telepon',
      message: 'Pesan',
      footer: 'Mohon dapat dihubungi kembali. Terima kasih! 🙏'
    },
    en: {
      greeting: '*Hello, I would like to inquire!*',
      name: 'Name',
      company: 'Company/Institution',
      email: 'Email',
      phone: 'Phone Number',
      message: 'Message',
      footer: 'Please get back to me. Thank you! 🙏'
    }
  };

  const t = translations[lang];
  const fullName = `${formData.firstName} ${formData.lastName}`;

  // Format message following WhatsApp best practices:
  // - Use line breaks for readability
  // - Use bold for headers (*text*)
  // - Keep it professional and structured
  const messageText = `${t.greeting}

📋 *Informasi Kontak:*
👤 ${t.name}: ${fullName}
🏢 ${t.company}: ${formData.company}
✉️ ${t.email}: ${formData.email}
📞 ${t.phone}: ${formData.phone}

💬 *${t.message}:*
${formData.message}

---
${t.footer}`;

  return messageText;
}

/**
 * Creates a WhatsApp Click to Chat URL with pre-filled message
 * 
 * @param phoneNumber - The WhatsApp business phone number (with country code, no + or spaces)
 * @param message - The pre-filled message text
 * @returns Complete WhatsApp URL
 */
export function createWhatsAppURL(phoneNumber: string, message: string): string {
  // Remove all non-numeric characters from phone number
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  // URL encode the message following WhatsApp URL scheme
  // WhatsApp uses standard URL encoding
  const encodedMessage = encodeURIComponent(message);
  
  // Use wa.me link format (works on both mobile and desktop)
  // This is the official WhatsApp Click to Chat format
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Opens WhatsApp with pre-filled message from contact form
 * 
 * @param formData - The contact form data
 * @param businessPhone - The business WhatsApp number (default from config)
 * @param lang - The language code ('id' or 'en')
 */
export function sendWhatsAppContactMessage(
  formData: ContactFormData,
  businessPhone: string = '6281235003655', // Default CBI WhatsApp (0812-3500-3655)
  lang: 'id' | 'en' = 'id'
): void {
  const message = formatWhatsAppMessage(formData, lang);
  const whatsappURL = createWhatsAppURL(businessPhone, message);
  
  // Open in new window/tab
  // This follows WhatsApp best practice for web implementation
  window.open(whatsappURL, '_blank', 'noopener,noreferrer');
}

/**
 * Gets the business WhatsApp number from site config
 * @returns The formatted business phone number
 */
export function getBusinessWhatsAppNumber(): string {
  // This matches the number in utils/seo.ts SITE_CONFIG
  return '6281235003655'; // +62-812-3500-3655
}
