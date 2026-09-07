import { Metadata } from "next";
import HRLoginPage from "./HRLoginPage";

export const metadata: Metadata = {
  title: "HR Dashboard - Login",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <HRLoginPage />;
}
