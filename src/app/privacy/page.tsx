import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { DataStatus } from "@/components/DataStatus";

export const metadata: Metadata = pageMetadata({
  path: "/privacy",
  title: "Privacy Policy",
  description:
    "Privacy policy for Dawnwalker Planner: localStorage plans, no required accounts, contact email, and how we handle future analytics or ads.",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 text-dusk-300">
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-dusk-500">
          Last updated: September 2, 2026 · Applies to dawnwalkerplanner.org
        </p>
      </div>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="font-display text-xl text-dusk-100">Summary</h2>
        <p>
          Dawnwalker Planner is an unofficial fan site. You do not need an
          account. Campaign plans are stored in your browser with{" "}
          <code className="text-dusk-200">localStorage</code> unless you choose
          to share a URL that encodes your plan in the query string.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="font-display text-xl text-dusk-100">
          What we collect today
        </h2>
        <h3 className="font-display text-lg text-dusk-200">
          Information stored on your device
        </h3>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Planner state (line items, presets you load, UI preferences needed
            for the tool) may be saved in browser localStorage.
          </li>
          <li>
            Optional share links put plan data in the page URL. Anyone with that
            link can see the encoded plan. Do not put secrets in plan labels.
          </li>
        </ul>
        <h3 className="font-display text-lg text-dusk-200">
          Information we do not require
        </h3>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>No login, no password, no payment form on this site today.</li>
          <li>
            We do not ask for your real name, address, or government ID to use
            the planner.
          </li>
        </ul>
        <h3 className="font-display text-lg text-dusk-200">
          Server logs and hosting
        </h3>
        <p>
          Like most websites, our host (Cloudflare) may process standard request
          metadata such as IP address, user agent, and approximate location for
          security, reliability, and CDN delivery. We do not use that to build a
          personal profile of your in-game plans.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="font-display text-xl text-dusk-100">
          Analytics, ads, and cookies
        </h2>
        <p>
          As of the last-updated date above, this site does not run third-party
          advertising networks or a separate cookie consent banner for marketing
          cookies. If we later add analytics (for example traffic stats) or ads
          (for example AdSense), we will update this policy and, where required,
          disclose those vendors and any non-essential cookies.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="font-display text-xl text-dusk-100">
          Children
        </h2>
        <p>
          The site is a general-audience fan planning tool about a mature-rated
          game. It is not directed at children under 13 (or the equivalent age
          in your region). Do not submit personal information about children to
          us.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="font-display text-xl text-dusk-100">Your choices</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Clear site data in your browser to remove localStorage plans.
          </li>
          <li>
            Avoid creating share URLs if you do not want plan contents in a
            link.
          </li>
          <li>
            Email us to ask privacy questions:{" "}
            <a
              className="text-ember-400 hover:underline"
              href="mailto:contact@dawnwalkerplanner.org"
            >
              contact@dawnwalkerplanner.org
            </a>
            .
          </li>
        </ul>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="font-display text-xl text-dusk-100">Contact</h2>
        <p>
          Operator contact for privacy requests:{" "}
          <a
            className="text-ember-400 hover:underline"
            href="mailto:contact@dawnwalkerplanner.org"
          >
            contact@dawnwalkerplanner.org
          </a>
          . Related pages:{" "}
          <Link href="/terms" className="text-ember-400 hover:underline">
            Terms of Use
          </Link>
          ,{" "}
          <Link href="/disclaimer" className="text-ember-400 hover:underline">
            Disclaimer
          </Link>
          .
        </p>
      </section>

      <p className="text-xs text-dusk-600">
        This page is informational for visitors and is not legal advice.
      </p>
      <DataStatus />
    </div>
  );
}
