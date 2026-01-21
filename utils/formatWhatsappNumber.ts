export const formatWhatsAppNumber = (phoneNumber: string): string => {
  // Menghapus semua spasi dan karakter non-digit
  const cleanNumber = phoneNumber.replace(/\D/g, "");
  // Mengubah awalan 0 menjadi 62
  return cleanNumber.startsWith("0")
    ? `62${cleanNumber.slice(1)}`
    : cleanNumber;
};
