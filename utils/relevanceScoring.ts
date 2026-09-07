/**
 * Relevance Scoring Algorithm
 * Fast keyword-based matching between job requirements and applicant data.
 * Runs client-side for instant results - no API call needed.
 */

export interface RelevanceResult {
  overall: number; // 0-100
  breakdown: {
    category: string;
    score: number; // 0-100
    matches: string[];
    missing: string[];
  }[];
  summary: string;
}

/**
 * Extract meaningful keywords from richtext/markdown content
 */
function extractKeywords(text: string | null | undefined): string[] {
  if (!text) return [];
  
  // Strip markdown/HTML tags
  const cleaned = text
    .replace(/<[^>]*>/g, " ")
    .replace(/[#*_\-\[\]()]/g, " ")
    .replace(/\n/g, " ")
    .toLowerCase();

  // Split into words, remove short/common words
  const stopWords = new Set([
    "yang", "dan", "di", "ke", "dari", "untuk", "dengan", "pada", "atau",
    "ini", "itu", "akan", "telah", "sudah", "adalah", "sebagai", "dalam",
    "oleh", "serta", "bisa", "dapat", "harus", "juga", "lebih", "kami",
    "anda", "the", "and", "or", "of", "to", "in", "for", "with", "on",
    "at", "by", "is", "are", "was", "were", "be", "been", "being", "have",
    "has", "had", "do", "does", "did", "will", "would", "could", "should",
    "may", "might", "must", "shall", "can", "need", "dare", "ought", "used",
    "a", "an", "the", "this", "that", "these", "those", "my", "your", "his",
    "her", "its", "our", "their", "who", "whom", "which", "what", "where",
    "when", "how", "than", "but", "not", "no", "nor", "as", "if", "then",
    "else", "about", "out", "up", "down", "so", "just", "very", "also",
    "pengalaman", "tahun", "minimal", "minimum", "diutamakan", "memiliki",
    "mampu", "menguasai", "baik", "kemampuan", "keterampilan", "dll",
  ]);

  const words = cleaned.split(/\s+/).filter(
    (w) => w.length > 2 && !stopWords.has(w) && !/^\d+$/.test(w)
  );

  return [...new Set(words)];
}

/**
 * Extract technical skills and qualifications from text
 */
function extractSkillKeywords(text: string | null | undefined): string[] {
  if (!text) return [];
  const lower = text.toLowerCase();

  // Common tech skills patterns
  const skillPatterns = [
    /\b(python|javascript|typescript|java|c\+\+|c#|go|rust|ruby|php|swift|kotlin|dart|scala)\b/g,
    /\b(react|vue|angular|next\.?js|node\.?js|express|django|flask|spring|laravel)\b/g,
    /\b(sql|mysql|postgresql|mongodb|redis|elasticsearch|sqlite|firebase)\b/g,
    /\b(aws|azure|gcp|docker|kubernetes|ci\/cd|git|linux|devops)\b/g,
    /\b(machine learning|deep learning|ai|data science|nlp|computer vision)\b/g,
    /\b(html|css|tailwind|bootstrap|sass|less)\b/g,
    /\b(rest|graphql|api|microservice|agile|scrum)\b/g,
    /\b(excel|powerpoint|word|sap|erp|crm)\b/g,
    /\b(s1|s2|s3|sarjana|master|doktor|bachelor|master|phd|diploma)\b/g,
    /\b(bioteknologi|biologi|kimia|pertanian|peternakan|perikanan|farmasi|teknik)\b/g,
    /\b(biotechnology|biology|chemistry|agriculture|livestock|fishery|pharmacy|engineering)\b/g,
    /\b(gmp|haccp|iso|quality control|quality assurance|qc|qa)\b/g,
    /\b(komunikasi|leadership|teamwork|problem solving|analytical|communication)\b/g,
    /\b(microsoft office|ms office|photoshop|illustrator|figma|canva)\b/g,
    /\b(marketing|sales|accounting|finance|legal|hr|human resource)\b/g,
    /\b(riset|research|laboratory|laboratorium|analisis|analysis)\b/g,
  ];

  const skills: string[] = [];
  for (const pattern of skillPatterns) {
    const matches = lower.match(pattern);
    if (matches) {
      skills.push(...matches.map((m) => m.trim()));
    }
  }

  return [...new Set(skills)];
}

/**
 * Calculate relevance score between applicant and job vacancy
 */
export function calculateRelevanceScore(
  applicant: {
    fullName?: string | null;
    coverLetter?: string | null;
    currentPosition?: string | null;
    linkedinUrl?: string | null;
    portfolioUrl?: string | null;
    expectedSalary?: string | null;
  },
  job: {
    requirements?: string | null;
    qualifications?: string | null;
    jobDescription?: string | null;
    title?: string | null;
    department?: string | null;
  }
): RelevanceResult {
  const breakdown: RelevanceResult["breakdown"] = [];

  // 1. Requirements Match (40% weight)
  const reqKeywords = extractKeywords(job.requirements);
  const reqSkills = extractSkillKeywords(job.requirements);
  const allReqTerms = [...new Set([...reqKeywords.slice(0, 20), ...reqSkills])];

  const applicantText = [
    applicant.coverLetter,
    applicant.currentPosition,
    applicant.fullName,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const reqMatches = allReqTerms.filter((term) => applicantText.includes(term));
  const reqMissing = allReqTerms.filter((term) => !applicantText.includes(term));
  const reqScore = allReqTerms.length > 0
    ? Math.round((reqMatches.length / allReqTerms.length) * 100)
    : 50; // neutral if no requirements listed

  breakdown.push({
    category: "Requirements Match",
    score: reqScore,
    matches: reqMatches.slice(0, 10),
    missing: reqMissing.slice(0, 10),
  });

  // 2. Qualifications Match (30% weight)
  const qualKeywords = extractKeywords(job.qualifications);
  const qualSkills = extractSkillKeywords(job.qualifications);
  const allQualTerms = [...new Set([...qualKeywords.slice(0, 15), ...qualSkills])];

  const qualMatches = allQualTerms.filter((term) => applicantText.includes(term));
  const qualMissing = allQualTerms.filter((term) => !applicantText.includes(term));
  const qualScore = allQualTerms.length > 0
    ? Math.round((qualMatches.length / allQualTerms.length) * 100)
    : 50;

  breakdown.push({
    category: "Qualifications Match",
    score: qualScore,
    matches: qualMatches.slice(0, 10),
    missing: qualMissing.slice(0, 10),
  });

  // 3. Profile Completeness (20% weight)
  const profileFields = [
    { field: "coverLetter", filled: !!applicant.coverLetter },
    { field: "currentPosition", filled: !!applicant.currentPosition },
    { field: "linkedinUrl", filled: !!applicant.linkedinUrl },
    { field: "portfolioUrl", filled: !!applicant.portfolioUrl },
    { field: "expectedSalary", filled: !!applicant.expectedSalary },
  ];
  const filledCount = profileFields.filter((f) => f.filled).length;
  const profileScore = Math.round((filledCount / profileFields.length) * 100);

  breakdown.push({
    category: "Profile Completeness",
    score: profileScore,
    matches: profileFields.filter((f) => f.filled).map((f) => f.field),
    missing: profileFields.filter((f) => !f.filled).map((f) => f.field),
  });

  // 4. Job Title Relevance (10% weight)
  const titleKeywords = extractKeywords(
    [job.title, job.department].filter(Boolean).join(" ")
  );
  const titleSkills = extractSkillKeywords(job.title);
  const allTitleTerms = [...new Set([...titleKeywords, ...titleSkills])];
  
  const titleMatches = allTitleTerms.filter((term) => applicantText.includes(term));
  const titleScore = allTitleTerms.length > 0
    ? Math.round((titleMatches.length / allTitleTerms.length) * 100)
    : 50;

  breakdown.push({
    category: "Role Relevance",
    score: titleScore,
    matches: titleMatches,
    missing: allTitleTerms.filter((t) => !applicantText.includes(t)),
  });

  // Calculate weighted overall
  const overall = Math.round(
    reqScore * 0.4 + qualScore * 0.3 + profileScore * 0.2 + titleScore * 0.1
  );

  // Generate summary
  let summary: string;
  if (overall >= 80) summary = "Excellent match - highly recommended for interview";
  else if (overall >= 60) summary = "Good match - worth considering";
  else if (overall >= 40) summary = "Moderate match - review manually";
  else if (overall >= 20) summary = "Low match - missing key qualifications";
  else summary = "Minimal match - likely not suitable";

  return { overall, breakdown, summary };
}

/**
 * Get color class based on score
 */
export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600 bg-green-50";
  if (score >= 60) return "text-blue-600 bg-blue-50";
  if (score >= 40) return "text-yellow-600 bg-yellow-50";
  if (score >= 20) return "text-orange-600 bg-orange-50";
  return "text-red-600 bg-red-50";
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  if (score >= 20) return "Low";
  return "Minimal";
}
