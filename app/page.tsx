import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: "Court-ready QDROs for California retirement plans",
  description:
    "Generate a compliant domestic relations order in minutes—without paying $1,500+ in attorney fees. CalPERS, CalSTRS, LACERA, and more.",
};

export default function Home() {
  return <HomePageClient />;
}
