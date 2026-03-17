import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Brawledly",
  description: "Brawledly privacy policy — no personal data collected, no accounts, localStorage only.",
  alternates: { canonical: `${SITE.url}/privacy-policy` },
};

export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 text-white">
      <div className="mb-6">
        <Link href="/" className="text-white/50 hover:text-white text-sm transition-colors">← All Games</Link>
      </div>
      <h1 className="text-3xl font-bold mb-2 text-yellow-400 font-brawl">Privacy Policy</h1>
      <p className="text-white/40 text-sm mb-8">Last updated: March 2026</p>

      <div className="space-y-6 text-white/70 leading-relaxed text-sm">
        <section>
          <h2 className="text-white/90 font-semibold text-base mb-2">No Personal Data Collected</h2>
          <p>
            Brawledly does not collect, store, or transmit any personal information. We do not require an account, email address, or any form of registration to play.
          </p>
        </section>

        <section>
          <h2 className="text-white/90 font-semibold text-base mb-2">Local Storage</h2>
          <p>
            All game state — including your daily progress, streaks, and guess history — is stored exclusively in your browser&apos;s <code className="bg-white/10 px-1 rounded">localStorage</code> and <code className="bg-white/10 px-1 rounded">IndexedDB</code>. This data never leaves your device.
          </p>
          <p className="mt-2">
            You can clear this data at any time via your browser&apos;s developer tools or by clearing site data.
          </p>
        </section>

        <section>
          <h2 className="text-white/90 font-semibold text-base mb-2">Analytics</h2>
          <p>
            We use <strong className="text-white/80">Vercel Analytics</strong> and <strong className="text-white/80">Vercel Speed Insights</strong> to measure page performance. These tools collect anonymized, aggregated data about page views and performance metrics. No individual users are tracked or identified.
          </p>
        </section>

        <section>
          <h2 className="text-white/90 font-semibold text-base mb-2">Cookies</h2>
          <p>
            We use a small cookie to help preserve your streak data across browser sessions. This cookie contains only your streak data and does not identify you personally.
          </p>
        </section>

        <section>
          <h2 className="text-white/90 font-semibold text-base mb-2">Third-Party Services</h2>
          <p>
            Brawledly is hosted on <strong className="text-white/80">Vercel</strong>. Vercel may log standard server access data (IP address, request timestamps) as part of infrastructure operation. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Vercel&apos;s Privacy Policy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-white/90 font-semibold text-base mb-2">Disclaimer</h2>
          <p>
            Brawledly is not affiliated with, endorsed, or approved by Supercell. Brawl Stars content and materials are trademarks and copyrights of Supercell. This is fan-made content under the{" "}
            <a href="https://supercell.com/en/fan-content-policy/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Supercell Fan Content Policy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-white/90 font-semibold text-base mb-2">Contact</h2>
          <p>
            Questions about this privacy policy? Email us at{" "}
            <a href={`mailto:${SITE.contactEmail}`} className="text-yellow-400 hover:text-yellow-300 underline">{SITE.contactEmail}</a>.
          </p>
        </section>
      </div>
    </main>
  );
}
