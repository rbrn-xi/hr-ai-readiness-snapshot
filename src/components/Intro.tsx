import { DEMO_ANSWERS, DEMO_COMPANY_NAME } from "../content/results";
import { QUESTIONS } from "../content/questions";
import { summarize } from "../lib/scoring";

interface IntroProps {
  onStart: () => void;
  onDemo: () => void;
}

const FACTS = [
  { value: String(QUESTIONS.length), label: "Questions" },
  { value: "3 min", label: "To finish" },
  { value: "None", label: "Sign-up needed" },
  { value: "None", label: "Data collected" },
];

const CONTENTS = [
  { title: "Readiness band", sub: "where your team stands, in plain words" },
  { title: "Five-lens breakdown", sub: "where you are strong and where you are thin" },
  { title: "Top 3 risks and next 3 moves", sub: "what to fix first, in order" },
  { title: "Do not automate yet", sub: "what to keep human for now" },
];

export function Intro({ onStart, onDemo }: IntroProps) {
  const demo = summarize(DEMO_ANSWERS);

  return (
    <div className="cover">
      <p className="intro-kicker">A self-check for HR teams</p>
      <h1 className="intro-title">
        Is your HR team <span className="gradient-word">ready</span> for AI
        <span className="dot" aria-hidden="true">
          .
        </span>
      </h1>

      <dl className="fact-strip">
        {FACTS.map((fact) => (
          <div className="fact" key={fact.label}>
            <dt className="fact-label">{fact.label}</dt>
            <dd className="fact-value">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="cover-grid">
        <div>
          <p className="lede">
            One clear picture of where your HR team stands with AI, and what
            to fix first. Answer for your team as things are today, not as you
            hope they will be.
          </p>

          <h2 className="contents-title">What you get</h2>
          <ol className="toc">
            {CONTENTS.map((item, i) => (
              <li className="toc-row" key={item.title}>
                <span className="toc-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="toc-text">
                  {item.title}
                  <span className="toc-sub">{item.sub}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="button-row">
            <button
              className="button button-primary"
              type="button"
              onClick={onStart}
            >
              Start the snapshot
              <span className="button-arrow" aria-hidden="true">
                →
              </span>
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={onDemo}
            >
              See a sample report
            </button>
          </div>
          <p className="disclaimer">
            Everything runs in your browser. Educational only, not legal or HR
            advice.
          </p>
        </div>

        <aside
          className="preview-card"
          aria-label={`Sample result for ${DEMO_COMPANY_NAME}, a fictional company`}
        >
          <div className="preview-top">
            <span className="preview-kicker">Sample report</span>
            <span className="preview-tag">Fictional</span>
          </div>
          <p className="preview-company">{DEMO_COMPANY_NAME}</p>
          <p className="preview-band">
            {demo.band.name}
            <span className="dot" aria-hidden="true">
              .
            </span>
          </p>
          <div
            className="preview-meter"
            role="img"
            aria-label={`${demo.pct} percent readiness`}
          >
            <div className="preview-meter-track">
              <div
                className="preview-meter-fill"
                style={{ width: `${demo.pct}%` }}
              />
            </div>
            <span className="preview-meter-value">{demo.pct}%</span>
          </div>
          <p className="preview-section">Top risks</p>
          <ul className="preview-list">
            {demo.topRisks.slice(0, 2).map((risk) => (
              <li key={risk.lens}>
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
            Read the full sample
            <span className="button-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </aside>
      </div>
    </div>
  );
}
