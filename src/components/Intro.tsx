import { DEMO_ANSWERS, DEMO_COMPANY_NAME } from "../content/results";
import { QUESTIONS } from "../content/questions";
import { summarize } from "../lib/scoring";

interface IntroProps {
  onStart: () => void;
  onDemo: () => void;
}

const FACTS = [
  { value: String(QUESTIONS.length), label: "questions" },
  { value: "3 min", label: "to finish" },
  { value: "No", label: "sign-up" },
  { value: "Nothing", label: "leaves your browser" },
];

const CONTENTS = [
  { title: "Your readiness band", sub: "Where your team stands, in plain words." },
  { title: "A five-lens breakdown", sub: "Where you are strong and where you are thin." },
  { title: "Top risks and next moves", sub: "Three of each, in the order to tackle them." },
  { title: "What not to automate yet", sub: "The calls that stay with people." },
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
          <ul className="toc">
            {CONTENTS.map((item) => (
              <li className="toc-row" key={item.title}>
                <span className="toc-title">{item.title}</span>
                <span className="toc-sub">{item.sub}</span>
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
              See a sample report
            </button>
          </div>
          <p className="disclaimer">
            Educational only, not legal or HR advice.
          </p>
        </div>

        <aside
          className="preview-card"
          aria-label={`Sample report for ${DEMO_COMPANY_NAME}, a fictional company`}
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
                style={{ transform: `scaleX(${demo.pct / 100})` }}
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
          {/* The button's hit area stretches over the whole card. */}
          <button className="preview-cta" type="button" onClick={onDemo}>
            Read the full sample
          </button>
        </aside>
      </div>
    </div>
  );
}
