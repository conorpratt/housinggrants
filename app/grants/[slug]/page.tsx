import { notFound } from "next/navigation";
import GrantDetail from "@/components/GrantDetail";
import grantsData from "@/data/grants.json";
import type { Grant } from "@/lib/types";
import type { Metadata } from "next";

const grants = grantsData as Grant[];

interface GrantPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return grants.map((grant) => ({ slug: grant.id }));
}

export async function generateMetadata({ params }: GrantPageProps): Promise<Metadata> {
  const { slug } = await params;
  const grant = grants.find((g) => g.id === slug);
  if (!grant) return { title: "Grant not found" };
  return {
    title: `${grant.name} — housinggrants.ie`,
    description: grant.description,
  };
}

export default async function GrantPage({ params }: GrantPageProps) {
  const { slug } = await params;
  const grant = grants.find((g) => g.id === slug);
  if (!grant) notFound();
  return <GrantDetail grant={grant} />;
}
