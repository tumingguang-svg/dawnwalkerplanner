import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { DataStatus } from "@/components/DataStatus";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = pageMetadata({
  path: "/terms",
  title: "Terms of Use",
  description:
    "Terms of use for the unofficial Dawnwalker Planner fan site: as-is tool access, no warranty, acceptable use, and contact email.",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 text-dusk-300">
      <JsonLd
        data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Terms", path: "/terms" },
          ])}
      />
      <div>
        <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-2 text-sm text-dusk-500">
          Last updated: September 2, 2026 · Applies to dawnwalkerplanner.org
        </p>
      </div>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="font-display text-xl text-dusk-100">Agreement</h2>
        <p>
          By using Dawnwalker Planner, you agree to these Terms of Use and our{" "}
          <Link href="/privacy" className="text-ember-400 hover:underline">
            Privacy Policy
          </Link>
          . If you do not agree, do not use the site.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="font-display text-xl text-dusk-100">
          Unofficial fan tool
        </h2>
        <p>
          The site is an independent fan project. It is not affiliated with
          Rebel Wolves, Bandai Namco, or The Blood of Dawnwalker (TM). See the{" "}
          <Link href="/disclaimer" className="text-ember-400 hover:underline">
            full disclaimer
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="font-display text-xl text-dusk-100">
          As-is information and plans
        </h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Time Budget numbers, catalogs, guides, and presets are fan estimates
            or observations unless marked Verified. They may be wrong.
          </li>
          <li>
            The planner is a convenience tool, not professional advice and not
            an official game feature.
          </li>
          <li>
            Features may change, break, or be removed without notice.
          </li>
        </ul>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="font-display text-xl text-dusk-100">Acceptable use</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Do not attempt to attack, scrape abusively, or disrupt the site.</li>
          <li>
            Do not use the site to distribute malware, spam, or illegal content.
          </li>
          <li>
            Do not present this site as an official Rebel Wolves or Bandai Namco
            product.
          </li>
        </ul>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="font-display text-xl text-dusk-100">
          Intellectual property
        </h2>
        <p>
          Original text and layout on this site belong to the site operator
          unless otherwise noted. Game names and trademarks belong to their
          owners. You may link to public pages; wholesale copying of our
          original guides for competing commercial sites without permission is
          not allowed.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="font-display text-xl text-dusk-100">
          No warranty / limitation
        </h2>
        <p>
          The site is provided “as is” without warranties of any kind. To the
          fullest extent permitted by law, the operator is not liable for lost
          plans, inaccurate estimates, downtime, or decisions you make while
          playing based on this fan tool.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="font-display text-xl text-dusk-100">Changes</h2>
        <p>
          We may update these Terms by posting a new version on this page with a
          revised “Last updated” date.
        </p>
      </section>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="font-display text-xl text-dusk-100">Contact</h2>
        <p>
          Questions:{" "}
          <a
            className="text-ember-400 hover:underline"
            href="mailto:contact@dawnwalkerplanner.org"
          >
            contact@dawnwalkerplanner.org
          </a>
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
