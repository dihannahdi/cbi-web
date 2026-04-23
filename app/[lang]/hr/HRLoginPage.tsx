"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HRLoginForm from "@/components/hr/HRLoginForm";
import HRDashboard from "@/components/hr/HRDashboard";

const HRLoginPage = () => {
  const [jwt, setJwt] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if already logged in
    const storedJwt = sessionStorage.getItem("hr_jwt");
    if (storedJwt) {
      setJwt(storedJwt);
    }
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EEE] pt-32">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#00802B]" />
      </div>
    );
  }

  if (jwt) {
    return (
      <div className="min-h-screen bg-[#EEE] pt-24">
        <HRDashboard jwt={jwt} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EEE] px-4 pt-32">
      <HRLoginForm onSuccess={(token) => setJwt(token)} />
    </div>
  );
};

export default HRLoginPage;
