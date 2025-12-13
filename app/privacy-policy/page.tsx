import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/footer"

export const dynamic = "force-dynamic"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="pt-8 pb-12">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
          <p className="mt-3 text-sm text-gray-600">
            This Privacy Policy explains how The Pioneer collects, uses, and protects your information when you use our
            website and services.
          </p>

          <div className="mt-8 space-y-8 text-gray-800">
            <section className="space-y-2">
              <h2 className="text-xl font-bold">Information we collect</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Information you provide (e.g., name, email, phone, address) when registering or subscribing.</li>
                <li>Usage data (pages viewed, device/browser info, approximate location) for analytics and security.</li>
                <li>Cookies and similar technologies to improve site performance and user experience.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-bold">How we use information</h2>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>To provide and improve our content, products, and subscription services.</li>
                <li>To process payments and manage subscriptions (where applicable).</li>
                <li>To communicate updates, service messages, and support responses.</li>
                <li>To prevent fraud, abuse, and ensure platform security.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-bold">Cookies</h2>
              <p className="text-sm text-gray-700">
                We may use cookies for login sessions, preferences, and analytics. You can control cookies through your
                browser settings; disabling cookies may impact some features.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-bold">Sharing of information</h2>
              <p className="text-sm text-gray-700">
                We do not sell your personal information. We may share information with trusted service providers (for
                example, payment processing and analytics) only as needed to operate our services, and as required by law.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-bold">Data security</h2>
              <p className="text-sm text-gray-700">
                We apply reasonable administrative, technical, and physical safeguards designed to protect your
                information. No method of transmission or storage is 100% secure.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-bold">Changes to this policy</h2>
              <p className="text-sm text-gray-700">
                We may update this Privacy Policy from time to time. Updates will be posted on this page.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-xl font-bold">Contact</h2>
              <p className="text-sm text-gray-700">
                For privacy questions, please contact us via the <span className="font-semibold">Contact</span> page.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}


