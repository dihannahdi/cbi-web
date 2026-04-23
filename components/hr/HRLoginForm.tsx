"use client";

import { useState } from "react";
import { Mail, Lock, Loader2, AlertCircle, LogIn } from "lucide-react";

interface HRLoginFormProps {
  onSuccess: (jwt: string) => void;
}

const HRLoginForm = ({ onSuccess }: HRLoginFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const identifier = form.get("email") as string;
    const password = form.get("password") as string;

    try {
      const res = await fetch("/api/hr/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store JWT
      sessionStorage.setItem("hr_jwt", data.jwt);
      sessionStorage.setItem("hr_user", JSON.stringify(data.user));
      onSuccess(data.jwt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl bg-white p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#00802B]/10">
            <LogIn className="h-8 w-8 text-[#00802B]" />
          </div>
          <h1 className="text-2xl font-bold text-[#222]">HR Dashboard</h1>
          <p className="mt-2 text-sm text-[#666]">
            Login untuk mengelola lamaran kerja
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#222]">
              <Mail className="h-4 w-4 text-[#00802B]" />
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="hr@centrabiotechindonesia.com"
              className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#00802B] focus:outline-none focus:ring-1 focus:ring-[#00802B] transition-colors"
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#222]">
              <Lock className="h-4 w-4 text-[#00802B]" />
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-200 bg-[#FAFAFA] px-4 py-3 text-sm text-[#222] placeholder:text-gray-400 focus:border-[#00802B] focus:outline-none focus:ring-1 focus:ring-[#00802B] transition-colors"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3">
              <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-500" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#00802B] py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#006B24] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HRLoginForm;
