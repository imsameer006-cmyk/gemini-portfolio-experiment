import type { Metadata } from "next";
import PasswordGate from "@/components/auth/PasswordGate";

type EnterPageProps = {
  searchParams: Promise<{
    error?: string;
    next?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Enter Password | Sameer Gautam",
  robots: { index: false, follow: false },
};

function getErrorMessage(error?: string) {
  if (error === "invalid") {
    return "That password did not match. Please try again.";
  }

  if (error === "config") {
    return "This site is temporarily unavailable. Please try again later.";
  }

  return null;
}

export default async function EnterPage({ searchParams }: EnterPageProps) {
  const params = await searchParams;
  const nextPath = params.next?.startsWith("/") ? params.next : "/";
  const errorMessage = getErrorMessage(params.error);

  return <PasswordGate nextPath={nextPath} errorMessage={errorMessage} />;
}
