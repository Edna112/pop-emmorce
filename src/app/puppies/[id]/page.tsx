import { puppies } from "@/data/puppies";
import PuppyDetailClient from "./PuppyDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return puppies.map((p) => ({ id: p.id }));
}

export default async function PuppyDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <PuppyDetailClient id={id} />;
}
