import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Legal and affiliation disclaimer for the unofficial Dawnwalker Planner fan site.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 text-dusk-300">
      <h1 className="font-display text-3xl text-dusk-50 md:text-4xl">
        Disclaimer
      </h1>
      <section className="space-y-3 text-sm leading-relaxed">
        <p>
          Dawnwalker Planner (dawnwalkerplanner.org) is an unofficial,
          independent fan-made website created for educational and entertainment
          planning purposes related to the video game The Blood of Dawnwalker
          (TM).
        </p>
        <p>
          This site is <strong className="text-dusk-100">not affiliated with,
          endorsed by, sponsored by, or associated with</strong> Rebel Wolves,
          Bandai Namco, or any of their partners, subsidiaries, or licensors.
          All trademarks, registered trademarks, product names, and company
          names or logos mentioned belong to their respective owners and are
          used here only for identification.
        </p>
        <p>
          No official artwork, audio, video, trademarks as logos, or copyrighted
          game assets are hosted on this site. All written guidance is original
          fan commentary.
        </p>
        <p>
          The campaign total shown as 480 is an{" "}
          <strong className="text-dusk-100">
            estimated 30-day Time Budget fan model
          </strong>{" "}
          expressed in model units. It is{" "}
          <strong className="text-dusk-100">
            not a claim about official Action Points
          </strong>
          . Gameplay numbers, Time Budget totals, time costs, build advice, and
          quest pacing notes are labeled{" "}
          <strong className="text-dusk-100">
            Estimated, Reported, or Verified
          </strong>
          . We do not invent Verified retail numbers. Values may be incomplete
          or incorrect. Always trust your own play experience and official patch
          notes over this fan tool.
        </p>
        <p>
          This site does not provide cheats, hacks, piracy, or unauthorized
          access instructions. Spoilers are collapsed behind user-activated
          controls where practical.
        </p>
        <p>
          By using this website you acknowledge that planning decisions based on
          fan estimates are at your own risk. If you are a rights holder and
          believe something here requires adjustment, contact the repository
          maintainer via GitHub.
        </p>
      </section>
    </div>
  );
}
