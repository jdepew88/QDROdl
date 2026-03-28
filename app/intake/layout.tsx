import DevIntakeFillBar from "@/components/intake/DevIntakeFillBar";
import type { ReactNode } from "react";

export default function IntakeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <DevIntakeFillBar />
      {children}
    </>
  );
}
