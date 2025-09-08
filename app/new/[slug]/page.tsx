import { redirect } from "next/navigation";

interface Props { params: { slug: string } }

export const dynamic = "force-dynamic";

export default async function NewAliasPage({ params }: Props) {
  // Alias route: /new/[slug] -> /news/[slug]
  redirect(`/news/${params.slug}`);
}
