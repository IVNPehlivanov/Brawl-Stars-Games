import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Terms of Service | Brawledly",
  description: "Brawledly terms of service — fan-made Brawl Stars puzzle site, not affiliated with Supercell.",
  alternates: { canonical: `${SITE.url}/terms-of-service` },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen w-full min-w-0 max-w-full bg-gray-950">
      <main className="max-w-2xl mx-auto px-4 py-12 text-white">
        <Header />
      <h1 className="text-3xl font-bold mb-2 text-yellow-400 font-title">Terms of Service</h1>
      <p className="text-white/40 text-sm mb-8">Last updated: March 2026</p>

      <div className="space-y-6 text-white/70 leading-relaxed text-sm">
        <section>
          <h2 className="text-white/90 font-semibold text-base mb-2">Acceptance</h2>
          <p>By using Brawledly, you agree to these terms. If you do not agree, please stop using the site.</p>
        </section>

        <section>
          <h2 className="text-white/90 font-semibold text-base mb-2">Fan Content Disclaimer</h2>
          <p>
            Brawledly is unofficial fan content. It is not affiliated with, endorsed, sponsored, or specifically approved by Supercell. Brawl Stars content and materials are trademarks and copyrights of Supercell.
          </p>
          <p className="mt-2">
            This site operates under the{" "}
            <a href="https://supercell.com/en/fan-content-policy/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Supercell Fan Content Policy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-white/90 font-semibold text-base mb-2">Use of Service</h2>
          <p>Brawledly is provided free of charge for personal, non-commercial use. You may not:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Scrape or automate access to the site</li>
            <li>Use the site for any commercial purpose</li>
            <li>Attempt to reverse-engineer or exploit the game logic</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white/90 font-semibold text-base mb-2">No Warranties</h2>
          <p>
            Brawledly is provided &quot;as is&quot; without any warranty. We make no guarantees about uptime, accuracy of game data, or continuity of service. Puzzle content may change or be updated at any time.
          </p>
        </section>

        <section>
          <h2 className="text-white/90 font-semibold text-base mb-2">Changes to Terms</h2>
          <p>We may update these terms at any time. Continued use of the site constitutes acceptance of the updated terms.</p>
        </section>

        <section>
          <h2 className="text-white/90 font-semibold text-base mb-2">Contact</h2>
          <p>
            Questions? Email{" "}
            <a href={`mailto:${SITE.contactEmail}`} className="text-yellow-400 hover:text-yellow-300 underline">{SITE.contactEmail}</a>.
          </p>
        </section>
      </div>
      </main>
    </div>
  );
}
