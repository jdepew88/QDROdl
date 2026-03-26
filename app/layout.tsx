import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://qdrodl.app"
) as string;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "QDROdl — Automated QDRO preparation",
    template: "%s | QDROdl",
  },
  description:
    "Prepare California and specialty retirement plan QDROs with guided intake and draft documents.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "QDROdl",
    title: "QDROdl — Automated QDRO preparation",
    description:
      "Prepare California and specialty retirement plan QDROs with guided intake and draft documents.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full w-full bg-zinc-950 text-stone-50 antialiased">
        <Header />
        <div className="pt-28">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
