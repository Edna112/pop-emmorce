import { puppies } from "@/data/puppies";
import ContactBreederClient from "./ContactBreederClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return puppies.map((p) => ({ id: p.id }));
}

export default async function ContactBreederPage({ params }: PageProps) {
  const { id } = await params;
  return <ContactBreederClient id={id} />;
}
