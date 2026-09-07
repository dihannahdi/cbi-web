"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  Loader2,
  LogOut,
  Users,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Briefcase,
  Brain,
  X,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Save,
  AlertCircle,
  TrendingUp,
  UserCheck,
  UserX,
  Eye,
} from "lucide-react";
import {
  calculateRelevanceScore,
  getScoreColor,
  getScoreLabel,
  type RelevanceResult,
} from "@/utils/relevanceScoring";

// ========================
// Types
// ========================
interface StrapiMedia {
  id: number;
  url: string;
  name: string;
  mime: string;
  size: number;
}

interface JobVacancy {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  contractType: string;
  qualifications: string;
  requirements: string;
  jobDescription: string;
}

interface Application {
  id: number;
  documentId: string;
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  resume: StrapiMedia | null;
  portfolioUrl: string;
  linkedinUrl: string;
  currentPosition: string;
  expectedSalary: string;
  availableStartDate: string;
  source: string;
  status: string;
  hrNotes: string;
  createdAt: string;
  updatedAt: string;
  jobVacancy: JobVacancy | null;
}

interface AIAnalysis {
  overallAssessment: string;
  strengths: string[];
  concerns: string[];
  interviewQuestions: string[];
  recommendation: string;
  fitScore: number;
}

type StatusType =
  | "New"
  | "Reviewed"
  | "Shortlisted"
  | "Interview"
  | "Offered"
  | "Hired"
  | "Rejected";

const STATUS_OPTIONS: StatusType[] = [
  "New",
  "Reviewed",
  "Shortlisted",
  "Interview",
  "Offered",
  "Hired",
  "Rejected",
];

const STATUS_CONFIG: Record<
  StatusType,
  { color: string; bg: string; icon: React.ReactNode }
> = {
  New: {
    color: "text-blue-700",
    bg: "bg-blue-50",
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  Reviewed: {
    color: "text-purple-700",
    bg: "bg-purple-50",
    icon: <Eye className="h-3.5 w-3.5" />,
  },
  Shortlisted: {
    color: "text-amber-700",
    bg: "bg-amber-50",
    icon: <Star className="h-3.5 w-3.5" />,
  },
  Interview: {
    color: "text-cyan-700",
    bg: "bg-cyan-50",
    icon: <Users className="h-3.5 w-3.5" />,
  },
  Offered: {
    color: "text-emerald-700",
    bg: "bg-emerald-50",
    icon: <Briefcase className="h-3.5 w-3.5" />,
  },
  Hired: {
    color: "text-green-700",
    bg: "bg-green-50",
    icon: <UserCheck className="h-3.5 w-3.5" />,
  },
  Rejected: {
    color: "text-red-700",
    bg: "bg-red-50",
    icon: <UserX className="h-3.5 w-3.5" />,
  },
};

const STRAPI_URL =
  (process.env.NEXT_PUBLIC_URL_API || "https://backend.centrabiotechindonesia.com").trim();

const ITEMS_PER_PAGE = 15;

// ========================
// Sub-components
// ========================

const StatusBadge = ({ status }: { status: string }) => {
  const config = STATUS_CONFIG[status as StatusType] || STATUS_CONFIG["New"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.bg} ${config.color}`}
    >
      {config.icon}
      {status}
    </span>
  );
};

const ScoreBadge = ({ score: scoreValue }: { score: number }) => {
  const color = getScoreColor(scoreValue);
  const label = getScoreLabel(scoreValue);
  const colorMap: Record<string, string> = {
    green: "bg-green-50 text-green-700 border-green-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    red: "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <div className="flex items-center gap-2">
      <div
        className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-bold ${colorMap[color] || colorMap.red}`}
      >
        <TrendingUp className="h-3 w-3" />
        {scoreValue}%
      </div>
      <span className="text-xs text-[#666]">{label}</span>
    </div>
  );
};

// ========================
// Stats Cards
// ========================
const StatsCards = ({ applications }: { applications: Application[] }) => {
  const stats = useMemo(() => {
    const total = applications.length;
    const byStatus = STATUS_OPTIONS.reduce(
      (acc, status) => {
        acc[status] = applications.filter((a) => a.status === status).length;
        return acc;
      },
      {} as Record<StatusType, number>
    );
    return { total, byStatus };
  }, [applications]);

  const cards = [
    {
      label: "Total Lamaran",
      value: stats.total,
      icon: <FileText className="h-5 w-5 text-[#083F19]" />,
      accent: "border-l-[#083F19]",
    },
    {
      label: "Baru",
      value: stats.byStatus.New,
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      accent: "border-l-blue-500",
    },
    {
      label: "Shortlisted",
      value: stats.byStatus.Shortlisted,
      icon: <Star className="h-5 w-5 text-amber-600" />,
      accent: "border-l-amber-500",
    },
    {
      label: "Interview",
      value: stats.byStatus.Interview,
      icon: <Users className="h-5 w-5 text-cyan-600" />,
      accent: "border-l-cyan-500",
    },
    {
      label: "Hired",
      value: stats.byStatus.Hired,
      icon: <UserCheck className="h-5 w-5 text-green-600" />,
      accent: "border-l-green-500",
    },
    {
      label: "Rejected",
      value: stats.byStatus.Rejected,
      icon: <UserX className="h-5 w-5 text-red-600" />,
      accent: "border-l-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-xl border border-gray-200 border-l-4 bg-white p-4 ${card.accent}`}
        >
          <div className="flex items-center gap-2">
            {card.icon}
            <span className="text-2xl font-bold text-[#222]">
              {card.value}
            </span>
          </div>
          <p className="mt-1 text-xs text-[#666]">{card.label}</p>
        </div>
      ))}
    </div>
  );
};

// ========================
// AI Analysis Modal
// ========================
const AIAnalysisModal = ({
  analysis,
  applicantName,
  loading,
  onClose,
}: {
  analysis: AIAnalysis | null;
  applicantName: string;
  loading: boolean;
  onClose: () => void;
}) => {
  if (!loading && !analysis) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#083F19]/10">
              <Brain className="h-5 w-5 text-[#083F19]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#222]">AI Analysis</h3>
              <p className="text-sm text-[#666]">{applicantName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-[#666] transition-colors hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-10 w-10 animate-spin text-[#083F19]" />
              <p className="mt-4 text-sm text-[#666]">
                Menganalisis profil kandidat...
              </p>
              <p className="mt-1 text-xs text-gray-400">
                AI sedang mengevaluasi kesesuaian kandidat
              </p>
            </div>
          ) : analysis ? (
            <div className="space-y-6">
              {/* Fit Score */}
              <div className="rounded-xl border border-gray-200 bg-[#F5F5F5] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#666]">
                    AI Fit Score
                  </span>
                  <ScoreBadge score={analysis.fitScore} />
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-[#083F19] transition-all"
                    style={{ width: `${analysis.fitScore}%` }}
                  />
                </div>
              </div>

              {/* Recommendation */}
              <div className="rounded-xl border border-gray-200 p-4">
                <h4 className="mb-2 text-sm font-semibold text-[#222]">
                  Rekomendasi
                </h4>
                <p
                  className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                    analysis.recommendation === "Strongly Recommend"
                      ? "bg-green-50 text-green-700"
                      : analysis.recommendation === "Recommend"
                        ? "bg-emerald-50 text-emerald-700"
                        : analysis.recommendation === "Consider"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-red-50 text-red-700"
                  }`}
                >
                  {analysis.recommendation}
                </p>
              </div>

              {/* Overall Assessment */}
              <div className="rounded-xl border border-gray-200 p-4">
                <h4 className="mb-2 text-sm font-semibold text-[#222]">
                  Penilaian Keseluruhan
                </h4>
                <p className="text-sm leading-relaxed text-[#666]">
                  {analysis.overallAssessment}
                </p>
              </div>

              {/* Strengths */}
              <div className="rounded-xl border border-gray-200 p-4">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#222]">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Kekuatan
                </h4>
                <ul className="space-y-2">
                  {analysis.strengths.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[#666]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Concerns */}
              <div className="rounded-xl border border-gray-200 p-4">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#222]">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  Perhatian
                </h4>
                <ul className="space-y-2">
                  {analysis.concerns.map((c, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[#666]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interview Questions */}
              <div className="rounded-xl border border-gray-200 p-4">
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#222]">
                  <FileText className="h-4 w-4 text-[#083F19]" />
                  Pertanyaan Interview yang Disarankan
                </h4>
                <ol className="list-decimal space-y-2 pl-5">
                  {analysis.interviewQuestions.map((q, i) => (
                    <li key={i} className="text-sm text-[#666]">
                      {q}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

// ========================
// Applicant Detail Row
// ========================
const ApplicantDetail = ({
  app,
  relevance,
  jwt,
  onStatusChange,
  onNotesChange,
  onAnalyze,
}: {
  app: Application;
  relevance: RelevanceResult;
  jwt: string;
  onStatusChange: (documentId: string, status: string) => Promise<void>;
  onNotesChange: (documentId: string, notes: string) => Promise<void>;
  onAnalyze: (app: Application) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState(app.hrNotes || "");
  const [savingNotes, setSavingNotes] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setUpdatingStatus(true);
    await onStatusChange(app.documentId, newStatus);
    setUpdatingStatus(false);
  };

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    await onNotesChange(app.documentId, notes);
    setSavingNotes(false);
  };

  const resumeUrl = app.resume
    ? app.resume.url.startsWith("http")
      ? app.resume.url
      : `${STRAPI_URL}${app.resume.url}`
    : null;

  return (
    <div className="border-b border-gray-100 last:border-0">
      {/* Main Row */}
      <div
        className="flex cursor-pointer items-center gap-4 px-5 py-4 transition-colors hover:bg-[#FAFAFA]"
        onClick={() => setExpanded(!expanded)}
      >
        {/* Expand icon */}
        <div className="flex-shrink-0 text-[#666]">
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>

        {/* Name + Position */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#222]">
            {app.fullName}
          </p>
          <p className="truncate text-xs text-[#666]">
            {app.currentPosition || "Tidak disebutkan"}
          </p>
        </div>

        {/* Job Position Applied */}
        <div className="hidden min-w-0 flex-1 md:block">
          <p className="truncate text-sm text-[#222]">
            {app.jobVacancy?.title || "-"}
          </p>
          <p className="truncate text-xs text-[#666]">
            {app.jobVacancy?.department || ""}
          </p>
        </div>

        {/* Relevance Score */}
        <div className="hidden w-36 flex-shrink-0 lg:block">
          <ScoreBadge score={relevance.overall} />
        </div>

        {/* Status */}
        <div className="w-28 flex-shrink-0">
          <StatusBadge status={app.status} />
        </div>

        {/* Date */}
        <div className="hidden w-24 flex-shrink-0 text-right xl:block">
          <p className="text-xs text-[#666]">
            {new Date(app.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Actions */}
        <div
          className="flex flex-shrink-0 items-center gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="rounded-lg p-2 text-[#666] transition-colors hover:bg-[#083F19]/10 hover:text-[#083F19]"
            title="AI Analysis"
            onClick={() => onAnalyze(app)}
          >
            <Brain className="h-4 w-4" />
          </button>
          {resumeUrl && (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-2 text-[#666] transition-colors hover:bg-[#083F19]/10 hover:text-[#083F19]"
              title="Download CV"
            >
              <Download className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {/* Expanded Detail */}
      {expanded && (
        <div className="border-t border-gray-100 bg-[#FAFAFA] px-5 py-5">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Column - Applicant Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-[#222]">
                Informasi Pelamar
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-[#666]">Email</p>
                  <a
                    href={`mailto:${app.email}`}
                    className="text-sm text-[#083F19] hover:underline"
                  >
                    {app.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-[#666]">Telepon</p>
                  <a
                    href={`tel:${app.phone}`}
                    className="text-sm text-[#083F19] hover:underline"
                  >
                    {app.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-[#666]">Posisi Saat Ini</p>
                  <p className="text-sm text-[#222]">
                    {app.currentPosition || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#666]">Gaji yang Diharapkan</p>
                  <p className="text-sm text-[#222]">
                    {app.expectedSalary || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#666]">Mulai Tersedia</p>
                  <p className="text-sm text-[#222]">
                    {app.availableStartDate
                      ? new Date(app.availableStartDate).toLocaleDateString(
                          "id-ID"
                        )
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#666]">Sumber</p>
                  <p className="text-sm text-[#222]">{app.source || "-"}</p>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-2">
                {resumeUrl && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-[#222] transition-colors hover:border-[#083F19] hover:text-[#083F19]"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download CV
                  </a>
                )}
                {app.portfolioUrl && (
                  <a
                    href={app.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-[#222] transition-colors hover:border-[#083F19] hover:text-[#083F19]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Portfolio
                  </a>
                )}
                {app.linkedinUrl && (
                  <a
                    href={app.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-[#222] transition-colors hover:border-[#083F19] hover:text-[#083F19]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    LinkedIn
                  </a>
                )}
              </div>

              {/* Cover Letter */}
              {app.coverLetter && (
                <div>
                  <p className="mb-1 text-xs font-medium text-[#666]">
                    Cover Letter
                  </p>
                  <div className="max-h-40 overflow-y-auto rounded-xl border border-gray-200 bg-white p-3">
                    <p className="whitespace-pre-wrap text-sm text-[#222]">
                      {app.coverLetter}
                    </p>
                  </div>
                </div>
              )}

              {/* Relevance Breakdown */}
              <div>
                <p className="mb-2 text-xs font-medium text-[#666]">
                  Relevance Breakdown
                </p>
                <div className="space-y-2">
                  {relevance.breakdown.map((item, idx) => (
                    <div key={idx}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#222]">{item.category}</span>
                        <span className="text-[#666]">
                          {item.score}%
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200">
                        <div
                          className="h-1.5 rounded-full bg-[#083F19] transition-all"
                          style={{
                            width: `${item.score}%`,
                          }}
                        />
                      </div>
                      {item.matches.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {item.matches.map((m, mi) => (
                            <span
                              key={mi}
                              className="rounded-full bg-[#083F19]/10 px-2 py-0.5 text-[10px] text-[#083F19]"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - HR Controls */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-[#222]">
                Keputusan HR
              </h4>

              {/* Status Dropdown */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#666]">
                  Update Status
                </label>
                <div className="relative">
                  <select
                    value={app.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={updatingStatus}
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-[#222] focus:border-[#083F19] focus:outline-none focus:ring-1 focus:ring-[#083F19] transition-colors disabled:opacity-60"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]" />
                  {updatingStatus && (
                    <Loader2 className="absolute right-10 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-[#083F19]" />
                  )}
                </div>
              </div>

              {/* HR Notes */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#666]">
                  Catatan HR
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Tambahkan catatan tentang kandidat ini..."
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#083F19] focus:outline-none focus:ring-1 focus:ring-[#083F19] transition-colors resize-none"
                />
                <button
                  onClick={handleSaveNotes}
                  disabled={savingNotes || notes === (app.hrNotes || "")}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-[#083F19] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#0E5424] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {savingNotes ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Save className="h-3.5 w-3.5" />
                  )}
                  Simpan Catatan
                </button>
              </div>

              {/* AI Analysis Button */}
              <div className="rounded-xl border border-dashed border-[#083F19]/30 bg-[#083F19]/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#083F19]/10">
                    <Brain className="h-5 w-5 text-[#083F19]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#222]">
                      Analisis AI
                    </p>
                    <p className="mt-0.5 text-xs text-[#666]">
                      Dapatkan analisis mendalam tentang kesesuaian kandidat
                      dengan posisi yang dilamar
                    </p>
                    <button
                      onClick={() => onAnalyze(app)}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#083F19] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#0E5424]"
                    >
                      <Brain className="h-3.5 w-3.5" />
                      Jalankan Analisis AI
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ========================
// Main Dashboard Component
// ========================
const HRDashboard = ({ jwt }: { jwt: string }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [jobFilter, setJobFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("createdAt:desc");
  const [currentPage, setCurrentPage] = useState(1);

  // AI Modal state
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiApplicantName, setAiApplicantName] = useState("");
  const [showAiModal, setShowAiModal] = useState(false);

  // ========================
  // Fetch Applications
  // ========================
  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/hr/applications", {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      if (!res.ok) throw new Error("Failed to fetch applications");
      const data = await res.json();
      setApplications(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [jwt]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // ========================
  // Status Change Handler
  // ========================
  const handleStatusChange = async (documentId: string, status: string) => {
    try {
      const res = await fetch("/api/hr/applications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ documentId, status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      setApplications((prev) =>
        prev.map((a) => (a.documentId === documentId ? { ...a, status } : a))
      );
    } catch (err) {
      alert("Gagal mengupdate status");
    }
  };

  // ========================
  // Notes Change Handler
  // ========================
  const handleNotesChange = async (documentId: string, hrNotes: string) => {
    try {
      const res = await fetch("/api/hr/applications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ documentId, hrNotes }),
      });
      if (!res.ok) throw new Error("Failed to save notes");
      setApplications((prev) =>
        prev.map((a) => (a.documentId === documentId ? { ...a, hrNotes } : a))
      );
    } catch (err) {
      alert("Gagal menyimpan catatan");
    }
  };

  // ========================
  // AI Analysis Handler
  // ========================
  const handleAnalyze = async (app: Application) => {
    setShowAiModal(true);
    setAiLoading(true);
    setAiAnalysis(null);
    setAiApplicantName(app.fullName);

    try {
      const res = await fetch("/api/hr/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          applicant: {
            fullName: app.fullName,
            email: app.email,
            currentPosition: app.currentPosition,
            expectedSalary: app.expectedSalary,
            coverLetter: app.coverLetter,
            portfolioUrl: app.portfolioUrl,
            linkedinUrl: app.linkedinUrl,
            source: app.source,
          },
          job: app.jobVacancy
            ? {
                title: app.jobVacancy.title,
                department: app.jobVacancy.department,
                qualifications: app.jobVacancy.qualifications,
                requirements: app.jobVacancy.requirements,
                jobDescription: app.jobVacancy.jobDescription,
              }
            : null,
        }),
      });
      if (!res.ok) throw new Error("Analysis failed");
      const data = await res.json();
      setAiAnalysis(data.analysis);
    } catch (err) {
      setAiAnalysis({
        overallAssessment: "Analisis gagal. Silakan coba lagi.",
        strengths: [],
        concerns: [],
        interviewQuestions: [],
        recommendation: "N/A",
        fitScore: 0,
      });
    } finally {
      setAiLoading(false);
    }
  };

  // ========================
  // Computed Data
  // ========================
  const relevanceMap = useMemo(() => {
    const map = new Map<string, RelevanceResult>();
    applications.forEach((app) => {
      if (app.jobVacancy) {
        const applicant = {
          fullName: app.fullName || "",
          coverLetter: app.coverLetter || "",
          currentPosition: app.currentPosition || "",
          portfolioUrl: app.portfolioUrl || "",
          linkedinUrl: app.linkedinUrl || "",
          expectedSalary: app.expectedSalary || "",
        };
        const job = {
          qualifications: app.jobVacancy.qualifications || "",
          requirements: app.jobVacancy.requirements || "",
          jobDescription: app.jobVacancy.jobDescription || "",
          title: app.jobVacancy.title || "",
          department: app.jobVacancy.department || "",
        };
        map.set(app.documentId, calculateRelevanceScore(applicant, job));
      } else {
        map.set(app.documentId, {
          overall: 0,
          breakdown: [],
          summary: "No job vacancy linked",
        });
      }
    });
    return map;
  }, [applications]);

  const jobOptions = useMemo(() => {
    const jobs = new Map<string, string>();
    applications.forEach((app) => {
      if (app.jobVacancy) {
        jobs.set(app.jobVacancy.documentId, app.jobVacancy.title);
      }
    });
    return Array.from(jobs.entries());
  }, [applications]);

  const filteredApplications = useMemo(() => {
    let filtered = [...applications];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.fullName.toLowerCase().includes(q) ||
          a.email.toLowerCase().includes(q) ||
          (a.currentPosition || "").toLowerCase().includes(q) ||
          (a.phone || "").includes(q)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((a) => a.status === statusFilter);
    }

    // Job filter
    if (jobFilter !== "all") {
      filtered = filtered.filter(
        (a) => a.jobVacancy?.documentId === jobFilter
      );
    }

    // Sort
    const [sortField, sortDir] = sortBy.split(":");
    filtered.sort((a, b) => {
      if (sortField === "relevance") {
        const scoreA = relevanceMap.get(a.documentId)?.overall || 0;
        const scoreB = relevanceMap.get(b.documentId)?.overall || 0;
        return sortDir === "desc" ? scoreB - scoreA : scoreA - scoreB;
      }
      if (sortField === "createdAt") {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortDir === "desc" ? dateB - dateA : dateA - dateB;
      }
      if (sortField === "fullName") {
        return sortDir === "desc"
          ? b.fullName.localeCompare(a.fullName)
          : a.fullName.localeCompare(b.fullName);
      }
      return 0;
    });

    return filtered;
  }, [
    applications,
    searchQuery,
    statusFilter,
    jobFilter,
    sortBy,
    relevanceMap,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, jobFilter, sortBy]);

  // ========================
  // Logout
  // ========================
  const handleLogout = () => {
    sessionStorage.removeItem("hr_jwt");
    sessionStorage.removeItem("hr_user");
    window.location.reload();
  };

  // ========================
  // Render
  // ========================
  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#083F19]" />
        <p className="mt-4 text-sm text-[#666]">Memuat data lamaran...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <XCircle className="h-10 w-10 text-red-500" />
        <p className="mt-4 text-sm text-red-600">{error}</p>
        <button
          onClick={fetchApplications}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#083F19] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0E5424]"
        >
          <RefreshCw className="h-4 w-4" />
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#222]">
            HR Recruitment Dashboard
          </h1>
          <p className="mt-1 text-sm text-[#666]">
            Kelola dan evaluasi lamaran kerja
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchApplications}
            className="rounded-xl border border-gray-200 p-2.5 text-[#666] transition-colors hover:border-[#083F19] hover:text-[#083F19]"
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-[#666] transition-colors hover:border-red-300 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <StatsCards applications={applications} />

      {/* Filters */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]" />
            <input
              type="text"
              placeholder="Cari nama, email, posisi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] py-2.5 pl-10 pr-4 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#083F19] focus:outline-none focus:ring-1 focus:ring-[#083F19] transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#666]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none rounded-xl border border-gray-200 bg-[#FAFAFA] py-2.5 pl-9 pr-10 text-sm text-[#222] focus:border-[#083F19] focus:outline-none focus:ring-1 focus:ring-[#083F19] transition-colors"
            >
              <option value="all">Semua Status</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#666]" />
          </div>

          {/* Job Filter */}
          {jobOptions.length > 0 && (
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#666]" />
              <select
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
                className="appearance-none rounded-xl border border-gray-200 bg-[#FAFAFA] py-2.5 pl-9 pr-10 text-sm text-[#222] focus:border-[#083F19] focus:outline-none focus:ring-1 focus:ring-[#083F19] transition-colors"
              >
                <option value="all">Semua Posisi</option>
                {jobOptions.map(([id, title]) => (
                  <option key={id} value={id}>
                    {title}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#666]" />
            </div>
          )}

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-xl border border-gray-200 bg-[#FAFAFA] py-2.5 pl-4 pr-10 text-sm text-[#222] focus:border-[#083F19] focus:outline-none focus:ring-1 focus:ring-[#083F19] transition-colors"
            >
              <option value="createdAt:desc">Terbaru</option>
              <option value="createdAt:asc">Terlama</option>
              <option value="relevance:desc">Skor Tertinggi</option>
              <option value="relevance:asc">Skor Terendah</option>
              <option value="fullName:asc">Nama A-Z</option>
              <option value="fullName:desc">Nama Z-A</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#666]" />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-[#666]">
          Menampilkan{" "}
          <span className="font-medium text-[#222]">
            {paginatedApplications.length}
          </span>{" "}
          dari{" "}
          <span className="font-medium text-[#222]">
            {filteredApplications.length}
          </span>{" "}
          lamaran
        </p>
      </div>

      {/* Applications List */}
      <div className="mt-3 overflow-hidden rounded-xl border border-gray-200 bg-white">
        {/* Table Header */}
        <div className="hidden items-center gap-4 border-b border-gray-200 bg-[#F5F5F5] px-5 py-3 md:flex">
          <div className="w-4 flex-shrink-0" />
          <div className="min-w-0 flex-1 text-xs font-semibold uppercase tracking-wider text-[#666]">
            Nama Pelamar
          </div>
          <div className="hidden min-w-0 flex-1 text-xs font-semibold uppercase tracking-wider text-[#666] md:block">
            Posisi Dilamar
          </div>
          <div className="hidden w-36 flex-shrink-0 text-xs font-semibold uppercase tracking-wider text-[#666] lg:block">
            Skor Relevansi
          </div>
          <div className="w-28 flex-shrink-0 text-xs font-semibold uppercase tracking-wider text-[#666]">
            Status
          </div>
          <div className="hidden w-24 flex-shrink-0 text-right text-xs font-semibold uppercase tracking-wider text-[#666] xl:block">
            Tanggal
          </div>
          <div className="w-20 flex-shrink-0 text-xs font-semibold uppercase tracking-wider text-[#666]">
            Aksi
          </div>
        </div>

        {/* Application Rows */}
        {paginatedApplications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Users className="h-12 w-12 text-gray-300" />
            <p className="mt-4 text-sm text-[#666]">
              Belum ada lamaran yang ditemukan
            </p>
            <p className="text-xs text-gray-400">
              {searchQuery || statusFilter !== "all" || jobFilter !== "all"
                ? "Coba ubah filter pencarian"
                : "Lamaran akan muncul setelah ada yang mendaftar"}
            </p>
          </div>
        ) : (
          paginatedApplications.map((app) => (
            <ApplicantDetail
              key={app.documentId}
              app={app}
              relevance={
                relevanceMap.get(app.documentId) || {
                  overall: 0,
                  breakdown: [],
                  summary: "",
                }
              }
              jwt={jwt}
              onStatusChange={handleStatusChange}
              onNotesChange={handleNotesChange}
              onAnalyze={handleAnalyze}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-lg border border-gray-200 p-2 text-[#666] transition-colors hover:border-[#083F19] hover:text-[#083F19] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`min-w-[36px] rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                currentPage === page
                  ? "border-[#083F19] bg-[#083F19] text-white"
                  : "border-gray-200 text-[#666] hover:border-[#083F19] hover:text-[#083F19]"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-gray-200 p-2 text-[#666] transition-colors hover:border-[#083F19] hover:text-[#083F19] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* AI Analysis Modal */}
      {showAiModal && (
        <AIAnalysisModal
          analysis={aiAnalysis}
          applicantName={aiApplicantName}
          loading={aiLoading}
          onClose={() => {
            setShowAiModal(false);
            setAiAnalysis(null);
          }}
        />
      )}
    </div>
  );
};

export default HRDashboard;
