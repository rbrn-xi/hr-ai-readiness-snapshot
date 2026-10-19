import { DEMO_ANSWERS, DEMO_COMPANY_NAME } from "../content/results";
import { summarize } from "../lib/scoring";

interface IntroProps {
  onStart: () => void;
  onDemo: () => void;
}

const CONTENTS = [
  { title: "Readiness band", sub: "where your team stands, in plain words" },
  { title: "Top 3 risks", sub: "the weak spots that matter most" },
  { title: "Next 3 moves", sub: "what to do first, in order" },
  { title: "Do not automate yet", sub: "what to keep human for now" },
];

export function Intro({ onStart, onDemo }: IntroProps) {
  const demo = summarize(DEMO_ANSWERS);

  return (
    <div className="cover">
      <p className="intro-kicker">FixYourHR</p>
      <h1 className="intro-title">
        Is your HR team <span className="gradient-word">ready</span> for AI
        <span className="dot" aria-hidden="true">.</span>
      </h1>
      <div className="cover-grid">
        <div>
          <p className="lede">
            12 questions. About 3 minutes. One clear picture of where your HR
            team stands with AI, and what to fix first.
          </p>
          <p>
            Answer for your team as things are today. Nothing is stored and
            nothing leaves your browser.
          </p>
          <h2 className="contents-title">What is inside</h2>
          <ul className="toc">
            {CONTENTS.map((item, i) => (
              <li className="toc-row" key={item.title}>
                <span className="toc-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="toc-text">
                  {item.title}
                  <span className="toc-sub">, {item.sub}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="button-row">
            <button
              className="button button-primary"
              type="button"
              onClick={onStart}
            >
              Start the snapshot
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={onDemo}
            >
              See a sample result
            </button>
          </div>
          <p className="disclaimer">
            Educational only. Not legal or HR advice. No accounts, no personal
            data collected.
          </p>
        </div>
        <aside
          className="preview-card"
          aria-label={`Sample result for ${DEMO_COMPANY_NAME}, a fictional company`}
        >
          <div className="preview-top">
            <span className="preview-kicker">Sample snapshot · fictional</span>
          </div>
          <p className="preview-band">
            {demo.band.name}
            <span className="dot" aria-hidden="true">.</span>
          </p>
          <p className="preview-pct">
            {demo.pct} percent readiness · {DEMO_COMPANY_NAME}
          </p>
          <ul className="preview-list">
            {demo.topRisks.slice(0, 2).map((risk, i) => (
              <li key={i}>
                <svg
                  className="bolt"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M13 2 4.5 13.5h5L8.5 22 19 10h-5.5L13 2z" />
                </svg>
                <span>{risk.text}</span>
              </li>
            ))}
          </ul>
          <button className="preview-cta" type="button" onClick={onDemo}>
            See the full sample
          </button>
        </aside>
      </div>
    </div>
  );
}
