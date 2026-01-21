export const handleFileDownload = async (
  fileUrl: string,
  fileName?: string,
) => {
  try {
    // Fetch file
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error("Download failed");

    const blob = await response.blob();

    // Buat URL objek untuk blob
    const downloadUrl = window.URL.createObjectURL(blob);

    // Buat element anchor temporary
    const link = document.createElement("a");
    link.href = downloadUrl;

    // Gunakan fileName yang diberikan atau ambil dari URL
    link.download = fileName || fileUrl.split("/").pop() || "downloaded-file";

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Cleanup
    window.URL.revokeObjectURL(downloadUrl);

    return true;
  } catch (error) {
    console.error("Error downloading file:", error);
    throw error;
  }
};
