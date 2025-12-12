import { redirect } from "next/navigation";

interface Props { params: Promise<{ slug: string }> }

export const dynamic = "force-dynamic";

export default async function NewAliasPage({ params }: Props) {
  // Alias route: /new/[slug] -> /news/[slug]
  const { slug } = await params;
  redirect(`/news/${slug}`);
}
