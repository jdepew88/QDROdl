import type { Metadata } from "next";
import VerifyEmailClient from "./VerifyEmailClient";

export const metadata: Metadata = {
  title: "Verify email",
  description: "Verify your QDROdl account email address.",
};

type Props = {
  searchParams?: { token?: string };
};

export default function VerifyEmailPage({ searchParams }: Props) {
  return <VerifyEmailClient token={searchParams?.token || ""} />;
}
