import { NextRequest, NextResponse } from "next/server";

// Support multiple AI providers via env vars
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface AnalyzeRequest {
  applicant: {
    fullName: string;
    email: string;
    phone: string;
    coverLetter?: string | null;
    currentPosition?: string | null;
    expectedSalary?: string | null;
    linkedinUrl?: string | null;
    portfolioUrl?: string | null;
  };
  job: {
    title: string;
    department?: string | null;
    requirements?: string | null;
    qualifications?: string | null;
    jobDescription?: string | null;
    contractType?: string;
    location?: string;
  };
}

function getAuthToken(request: NextRequest): string | null {
  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return null;
}

async function callAI(prompt: string): Promise<string> {
  // Try Groq first (free, ultra-fast), then OpenAI
  if (GROQ_API_KEY) {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are an expert HR recruiter and talent acquisition specialist at a biotechnology company (Centra Biotech Indonesia). Analyze candidates thoroughly and provide structured, actionable insights. Respond in Bahasa Indonesia mixed with English technical terms where appropriate.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.choices?.[0]?.message?.content || "Analysis unavailable.";
    }
    console.error("[AI] Groq error:", await res.text());
  }

  if (OPENAI_API_KEY) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert HR recruiter and talent acquisition specialist at a biotechnology company (Centra Biotech Indonesia). Analyze candidates thoroughly and provide structured, actionable insights. Respond in Bahasa Indonesia mixed with English technical terms where appropriate.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.choices?.[0]?.message?.content || "Analysis unavailable.";
    }
    console.error("[AI] OpenAI error:", await res.text());
  }

  // Fallback: structured rule-based analysis if no API key
  return generateFallbackAnalysis(prompt);
}

function generateFallbackAnalysis(prompt: string): string {
  return `## Analisis Kandidat (Mode Offline)

> ⚠️ AI analysis memerlukan API key (GROQ_API_KEY atau OPENAI_API_KEY). Saat ini menggunakan analisis dasar.

### Rekomendasi
- Tinjau CV/resume kandidat secara manual
- Periksa kesesuaian kualifikasi dengan persyaratan posisi
- Jadwalkan wawancara jika profil awal sesuai
- Verifikasi referensi dan pengalaman kerja

### Langkah Selanjutnya
1. Hubungkan API key AI untuk mendapatkan analisis mendalam otomatis
2. Tambahkan GROQ_API_KEY (gratis) atau OPENAI_API_KEY ke environment variables Vercel
3. Redeploy aplikasi untuk mengaktifkan fitur AI`;
}

export async function POST(request: NextRequest) {
  const token = getAuthToken(request);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { applicant, job }: AnalyzeRequest = await request.json();

    if (!applicant || !job) {
      return NextResponse.json(
        { error: "Applicant and job data required" },
        { status: 400 }
      );
    }

    const prompt = `Analisis kandidat berikut untuk posisi di Centra Biotech Indonesia:

## POSISI YANG DILAMAR
- Judul: ${job.title}
- Departemen: ${job.department || "N/A"}
- Tipe Kontrak: ${job.contractType || "N/A"}
- Lokasi: ${job.location || "N/A"}

### Deskripsi Pekerjaan:
${job.jobDescription || "Tidak tersedia"}

### Persyaratan:
${job.requirements || "Tidak tersedia"}

### Kualifikasi:
${job.qualifications || "Tidak tersedia"}

---

## DATA KANDIDAT
- Nama: ${applicant.fullName}
- Email: ${applicant.email}
- Telepon: ${applicant.phone}
- Posisi Saat Ini: ${applicant.currentPosition || "Tidak disebutkan"}
- Gaji Ekspektasi: ${applicant.expectedSalary || "Tidak disebutkan"}
- LinkedIn: ${applicant.linkedinUrl || "Tidak ada"}
- Portfolio: ${applicant.portfolioUrl || "Tidak ada"}

### Cover Letter:
${applicant.coverLetter || "Tidak ada cover letter"}

---

Berikan analisis mendalam dengan format berikut:

## 📊 Skor Kesesuaian: [X/10]

## ✅ Kelebihan Kandidat
(list 3-5 poin kuat)

## ⚠️ Kekurangan / Area yang Perlu Diverifikasi
(list 2-4 poin yang perlu diperhatikan)

## 🎯 Rekomendasi
(Apakah sebaiknya LANJUT, PERTIMBANGKAN, atau SKIP, dan alasannya)

## 📝 Saran Pertanyaan Wawancara
(3-4 pertanyaan spesifik yang perlu ditanyakan jika kandidat lolos ke wawancara)

## 💡 Catatan Tambahan
(insight lainnya yang relevan untuk keputusan HR)`;

    const analysis = await callAI(prompt);

    return NextResponse.json({
      analysis,
      provider: GROQ_API_KEY ? "groq" : OPENAI_API_KEY ? "openai" : "fallback",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[HR Analyze] Error:", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
