import type { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your QDROdl login to start intake.",
};

type Props = {
  searchParams?: { next?: string };
};

export default function RegisterPage({ searchParams }: Props) {
  const next = searchParams?.next || "/dash";

  return <RegisterClient next={next} />;
}
