import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Privacy Policy | Brawldly",
  description: "Brawldly privacy policy.",
  alternates: { canonical: `${SITE.url}/privacy-policy` },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen w-full min-w-0 max-w-full bg-gray-950">
      <main className="max-w-2xl mx-auto px-4 py-12 text-white">
        <Header />
        <h1 className="text-3xl font-bold mb-2 text-yellow-400 font-title">
          Privacy Policy
        </h1>
        <p className="text-white/40 text-sm mb-8">Last Updated: 22.03.2026</p>

        <div className="space-y-6 text-white/70 leading-relaxed text-sm">
          <section>
            <p>
              This Privacy Policy explains how {SITE.name} (&quot;Website,&quot;
              &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) handles
              information in connection with your use of the Website.
            </p>
          </section>

          <section>
            <h2 className="text-white/90 font-semibold text-base mb-2">
              1. Data Collection and Analytics
            </h2>
            <p>
              The Website does not require account registration and does not
              intentionally collect personal information such as names, email
              addresses, or user profiles.
            </p>
            <p className="mt-2">
              When you access the Website, certain technical information may be
              automatically processed by our servers or by third-party analytics
              services. This may include:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device type</li>
              <li>Operating system</li>
              <li>Date and time of access</li>
              <li>Basic request and error logs</li>
            </ul>
            <p className="mt-2">
              This information is processed for security, maintenance, operational
              purposes, and to analyze anonymized site usage and performance
              metrics. It is used solely to maintain website functionality, monitor
              security, and diagnose technical issues. No personally identifiable
              information is collected. The Website does not sell, rent, or trade
              user information.
            </p>
            <p className="mt-2">
              Some information may be processed by third-party services that
              assist with site analytics or performance monitoring. These services
              operate under their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-white/90 font-semibold text-base mb-2">
              2. Local Storage
            </h2>
            <p>
              Game progress, statistics, and preferences (such as sound settings)
              may be stored locally in your browser via local storage or similar
              mechanisms. This data never leaves your device and is not sent to
              our servers. Clearing your browser data may delete game progress,
              statistics, and preferences. You can clear it at any time through
              your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-white/90 font-semibold text-base mb-2">
              3. Data Retention
            </h2>
            <p>
              We do not maintain user accounts and therefore do not store personal
              user profiles.
            </p>
            <p className="mt-2">
              Server logs and technical records may be retained for up to 30 days,
              or as required, for security and operational purposes.
            </p>
          </section>

          <section>
            <h2 className="text-white/90 font-semibold text-base mb-2">
              4. Children&apos;s Privacy
            </h2>
            <p>
              We do not knowingly collect personal information from children under
              the age of 13 (or the minimum age required by applicable law). If
              you believe a child has provided personal information, please
              contact us so appropriate steps can be taken.
            </p>
          </section>

          <section>
            <h2 className="text-white/90 font-semibold text-base mb-2">
              5. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will be
              posted on this page with a revised &quot;Last Updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-white/90 font-semibold text-base mb-2">
              6. Contact
            </h2>
            <p>
              If you have questions about this Privacy Policy, you may contact us
              at:
            </p>
            <p className="mt-2">
              Email:{" "}
              <a
                href={`mailto:${SITE.contactEmail}`}
                className="text-yellow-400 hover:text-yellow-300 underline"
              >
                {SITE.contactEmail}
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
