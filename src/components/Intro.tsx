import { DEMO_ANSWERS, DEMO_COMPANY_NAME } from "../content/results";
import { summarize } from "../lib/scoring";

interface IntroProps {
  onStart: () => void;
  onDemo: () => void;
}

export function Intro({ onStart, onDemo }: IntroProps) {
  const demo = summarize(DEMO_ANSWERS);

  return (
    <div className="hero">
      <div>
        <p className="intro-kicker">FixYourHR · Free self-check</p>
        <h1 className="intro-title">
          Is your HR team <span className="gradient-word">ready</span> for AI
          <span className="dot">.</span>
        </h1>
        <p className="lede">
          12 questions. About 3 minutes. One clear picture of where your HR team
          stands with AI, and what to fix first.
        </p>
        <p>
          Answer for your team as things are today. Nothing is stored and
          nothing leaves your browser.
        </p>
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
        <ul className="stats" aria-label="Snapshot details">
          <li className="stat">
            <span className="stat-number">12</span>
            <span className="stat-label">Questions</span>
          </li>
          <li className="stat">
            <span className="stat-number">5</span>
            <span className="stat-label">Lenses</span>
          </li>
          <li className="stat">
            <span className="stat-number">3</span>
            <span className="stat-label">Minutes</span>
          </li>
        </ul>
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
          <span className="dot">.</span>
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
  );
}
