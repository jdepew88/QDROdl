import type { Metadata } from "next";
import AllPlansClient from "./AllPlansClient";

export const metadata: Metadata = {
  title: "All plans",
  description:
    "Retirement systems and plan types QDROdl supports, with guides and intake.",
};

export default function AllPlansPage() {
  return <AllPlansClient />;
}
