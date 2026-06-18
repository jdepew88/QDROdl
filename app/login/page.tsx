import type { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your QDROdl account.",
};

type Props = {
  searchParams?: { next?: string; registered?: string };
};

export default function LoginPage({ searchParams }: Props) {
  const next = searchParams?.next || "/dash";
  const registered = searchParams?.registered === "1";

  return <LoginClient next={next} registered={registered} />;
}
