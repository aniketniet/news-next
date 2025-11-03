import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/footer";
import { redirect } from 'next/navigation'

export const dynamic = "force-dynamic";

export default function AdvertiseRedirect() {
  redirect('/page/advertise-with-us')
}
