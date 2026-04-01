import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import {
  PLAN_ROUTE_ENTRIES,
  type PlanSlug,
  planEntryForSlug,
} from "@/data/planRoutes";
import CalPERSGuide from "@/components/calpers/CalPERSGuide";
import CalSTRSGuide from "@/components/calstrs/CalSTRSGuide";
import LaceraGuide from "@/components/lacera/LaceraGuide";
import La457Guide from "@/components/la457/QDROGuide";
import MpGuide from "@/components/mp/QDROGuide";
import JoindersContent from "@/components/joinders/JoindersContent";
import GenericDcPlanPage from "@/components/plan/GenericDcPlanPage";
import GenericDbPlanPage from "@/components/plan/GenericDbPlanPage";
import FederalPlanPage from "@/components/plan/FederalPlanPage";
import LacersGuide from "@/components/lacers/LacersGuide";
import CityLa457PlanPage from "@/components/plan/CityLa457PlanPage";
import FirePolicePensionPlanPage from "@/components/plan/FirePolicePensionPlanPage";

const PLAN_COMPONENTS: Record<PlanSlug, ComponentType> = {
  calpers: CalPERSGuide,
  calstrs: CalSTRSGuide,
  lacera: LaceraGuide,
  la457: La457Guide,
  lacers: LacersGuide,
  city_la_457: CityLa457PlanPage,
  fire_police_pension: FirePolicePensionPlanPage,
  mp: MpGuide,
  generic_dc: GenericDcPlanPage,
  generic_db: GenericDbPlanPage,
  federal: FederalPlanPage,
  joinders: JoindersContent,
};

export function generateStaticParams() {
  return PLAN_ROUTE_ENTRIES.map(({ slug }) => ({ slug }));
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const entry = planEntryForSlug(params.slug);
  if (!entry) return { title: "Plan" };
  return { title: entry.documentTitle };
}

export default function PlanPage({ params }: Props) {
  const entry = planEntryForSlug(params.slug);
  if (!entry) notFound();
  const Comp = PLAN_COMPONENTS[entry.slug];
  if (!Comp) notFound();
  return <Comp />;
}
