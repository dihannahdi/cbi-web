import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = process.env.NEXT_PUBLIC_URL_API || "https://backend.centrabiotechindonesia.com";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const coverLetter = formData.get("coverLetter") as string;
    const portfolioUrl = formData.get("portfolioUrl") as string;
    const linkedinUrl = formData.get("linkedinUrl") as string;
    const currentPosition = formData.get("currentPosition") as string;
    const expectedSalary = formData.get("expectedSalary") as string;
    const availableStartDate = formData.get("availableStartDate") as string;
    const source = formData.get("source") as string;
    const jobVacancyId = formData.get("jobVacancyId") as string;
    const resume = formData.get("resume") as File;

    // Validate required fields
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields: fullName, email, phone" },
        { status: 400 }
      );
    }

    if (!resume || !(resume instanceof File)) {
      return NextResponse.json(
        { error: "Resume file is required" },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (resume.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Resume file size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(resume.type)) {
      return NextResponse.json(
        { error: "Resume must be a PDF or Word document" },
        { status: 400 }
      );
    }

    // Step 1: Upload resume to Strapi media
    const uploadFormData = new FormData();
    uploadFormData.append("files", resume);

    const uploadResponse = await fetch(`${STRAPI_URL}/api/upload`, {
      method: "POST",
      body: uploadFormData,
    });

    if (!uploadResponse.ok) {
      const uploadError = await uploadResponse.text();
      console.error("[Apply] Upload failed:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload resume" },
        { status: 500 }
      );
    }

    const uploadResult = await uploadResponse.json();
    const resumeId = uploadResult[0]?.id;

    if (!resumeId) {
      return NextResponse.json(
        { error: "Failed to process uploaded resume" },
        { status: 500 }
      );
    }

    // Step 2: Create job application entry
    const applicationData: Record<string, unknown> = {
      fullName,
      email,
      phone,
      coverLetter: coverLetter || null,
      portfolioUrl: portfolioUrl || null,
      linkedinUrl: linkedinUrl || null,
      currentPosition: currentPosition || null,
      expectedSalary: expectedSalary || null,
      availableStartDate: availableStartDate || null,
      source: source || "Website",
      status: "New",
      resume: resumeId,
    };

    // Link to job vacancy if provided
    if (jobVacancyId) {
      applicationData.jobVacancy = jobVacancyId;
    }

    const createResponse = await fetch(`${STRAPI_URL}/api/job-applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: applicationData }),
    });

    if (!createResponse.ok) {
      const createError = await createResponse.text();
      console.error("[Apply] Create application failed:", createError);
      return NextResponse.json(
        { error: "Failed to submit application" },
        { status: 500 }
      );
    }

    const result = await createResponse.json();

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        applicationId: result.data?.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Apply] Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
