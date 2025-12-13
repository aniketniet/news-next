import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/footer"

export const dynamic = "force-dynamic"

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="pt-8 pb-12">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Terms &amp; Conditions</h1>
          <p className="mt-3 text-sm text-gray-600">
            These Terms &amp; Conditions govern your use of The Pioneer website and services. By accessing or using the
            site, you agree to these terms.
          </p>

          <div className="mt-8 space-y-8 text-gray-800">
            <section className="space-y-2">
              <h2 className="text-xl font-bold">Use of content</h2>
              <p className="text-sm text-gray-700">
                All content is provided for personal, non-commercial use unless otherwise stated. You may not copy,
                republish, redistribute, or exploit content without permission.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-bold">User accounts</h2>
              <p className="text-sm text-gray-700">
                You are responsible for maintaining the confidentiality of your account credentials and for all activity
                under your account.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-bold">Subscriptions &amp; payments</h2>
              <p className="text-sm text-gray-700">
                Subscription pricing, duration, and benefits may vary by plan. Payments are processed via our payment
                partners where applicable. Please review plan details before purchase.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-bold">Prohibited activities</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Attempting to disrupt or compromise site security.</li>
                <li>Scraping, automated extraction, or abusive usage.</li>
                <li>Posting unlawful, harmful, or misleading content (where user input is available).</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-bold">Disclaimer</h2>
              <p className="text-sm text-gray-700">
                The site is provided “as is” without warranties of any kind. We do not guarantee uninterrupted or error-free
                operation.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-bold">Changes to these terms</h2>
              <p className="text-sm text-gray-700">
                We may update these Terms &amp; Conditions from time to time. Updates will be posted on this page.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}


