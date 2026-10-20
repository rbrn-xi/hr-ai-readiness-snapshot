import { useEffect, useRef, useState } from "react";
import { BANDS } from "../content/results";
import { lensTitle, type LensScore, type ResultSummary } from "../lib/scoring";

const DISCOVERY_URL =
  "https://fixinghr.com/?utm_source=github&utm_medium=demo&utm_campaign=readiness-snapshot";
const FYHR_URL =
  "https://fyhr.fixinghr.com/?utm_source=github&utm_medium=demo&utm_campaign=readiness-snapshot";

const RING_R = 52;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_R;

interface ResultsScreenProps {
  summary: ResultSummary;
  lenses: LensScore[];
  synthetic: boolean;
  companyName?: string;
  onRestart: () => void;
}

export function ResultsScreen({
  summary,
  lenses,
  synthetic,
  companyName,
  onRestart,
}: ResultsScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  // Start the ring and bars empty, then fill them on the next frame so they
  // animate in (CSS skips the motion for people who prefer reduced motion).
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    const id = requestAnimationFrame(() => setFilled(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const ringFill = filled ? (summary.pct / 100) * RING_CIRCUMFERENCE : 0;
  const weakest = new Set(summary.topRisks.map((r) => r.lens));
  const bands = [...BANDS].sort((a, b) => a.min - b.min);
  const today = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="report">
      <header className="report-header">
        <span className="report-header-label">
          {synthetic ? "Sample readiness report" : "Readiness report"}
        </span>
        <span className="report-header-meta">
          {synthetic ? companyName : today}
        </span>
      </header>

      {synthetic && (
        <div className="fictional-row">
          <span className="fictional-badge">Fictional example</span>
          <p className="small-print">
            A made-up company. Your own answers will produce a different
            report.
          </p>
        </div>
      )}

      <section className="verdict" aria-live="polite">
        <div className="verdict-text">
          <p className="band-kicker">
            {synthetic ? "Readiness band" : "Your readiness band"}
          </p>
          <h1 className="band-word" ref={headingRef} tabIndex={-1}>
            {summary.band.name}
          </h1>
          <p className="band-desc">{summary.band.description}</p>
        </div>
        <div
          className="ring-wrap"
          role="img"
          aria-label={`${summary.pct} percent readiness`}
        >
          <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#2237d3" />
                <stop offset="1" stopColor="#3d2f9e" />
              </linearGradient>
            </defs>
            <circle className="ring-track" cx="60" cy="60" r={RING_R} />
            <circle
              className="ring-fill"
              cx="60"
              cy="60"
              r={RING_R}
              strokeDasharray={`${ringFill} ${RING_CIRCUMFERENCE}`}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="ring-center" aria-hidden="true">
            <span className="ring-pct">{summary.pct}%</span>
            <span className="ring-cap">Ready</span>
          </div>
        </div>
      </section>

      <div className="band-scale" aria-label="Readiness bands">
        {bands.map((band, i) => {
          const max = i + 1 < bands.length ? bands[i + 1].min - 1 : 100;
          const current = band.name === summary.band.name;
          return (
            <div
              key={band.name}
              className={"band-cell" + (current ? " is-current" : "")}
              aria-current={current ? "true" : undefined}
            >
              <span className="band-cell-name">{band.name}</span>
              <span className="band-cell-range">
                {band.min}–{max}%
              </span>
            </div>
          );
        })}
      </div>

      <section className="report-section">
        <h2 className="list-title">Your five lenses</h2>
        <p className="section-note">
          How each part of your HR operation scored. Your risks and moves below
          come from the three lowest; ties go to the lens asked first.
        </p>
        <ul className="lens-list">
          {lenses.map((lens, i) => {
            const title = lensTitle(lens.lens);
            const priority = weakest.has(title);
            return (
              <li key={lens.lens} className="lens-row">
                <span className="lens-name">
                  {title}
                  {priority && <span className="priority-tag">Focus</span>}
                </span>
                <span className="lens-bar" aria-hidden="true">
                  <span
                    className={
                      "lens-bar-fill" + (priority ? " is-priority" : "")
                    }
                    style={{
                      transform: `scaleX(${filled ? lens.pct / 100 : 0})`,
                      transitionDelay: `${150 + i * 50}ms`,
                    }}
                  />
                </span>
                <span className="lens-score">
                  {lens.pct}%
                  <span className="sr-only">
                    , {lens.score} of {lens.max} points
                    {priority ? ", a focus area" : ""}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="report-columns">
        <section className="report-section">
          <h2 className="list-title">Top 3 risks</h2>
          <ul className="plain">
            {summary.topRisks.map((risk) => (
              <li key={risk.lens}>
                <svg
                  className="risk-marker"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M13 2 4.5 13.5h5L8.5 22 19 10h-5.5L13 2z" />
                </svg>
                <span className="item-lens">{risk.lens}</span>
                {risk.text}
              </li>
            ))}
          </ul>
        </section>

        <section className="report-section">
          <h2 className="list-title">Next 3 moves</h2>
          <ol className="moves-list">
            {summary.nextMoves.map((move) => (
              <li key={move.lens}>
                <span className="item-lens">{move.lens}</span>
                {move.text}
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="quiet-panel">
        <h2 className="list-title">Do not automate yet</h2>
        <p className="section-note">
          Whatever your band, these stay with people.
        </p>
        <ul className="plain dna-list">
          {summary.doNotAutomate.map((item) => (
            <li key={item.item}>
              <strong>{item.item}</strong> {item.reason}
            </li>
          ))}
        </ul>
      </section>

      <p className="small-print scoring-note">
        <strong>How this was scored.</strong> {summary.scoringNote}
      </p>

      <div className="report-actions">
        <button
          className="button button-secondary"
          type="button"
          onClick={() => window.print()}
        >
          Print or save as PDF…
        </button>
        <button
          className={
            "button " + (synthetic ? "button-primary" : "button-secondary")
          }
          type="button"
          onClick={onRestart}
        >
          {synthetic ? "Take it for your team" : "Retake the snapshot"}
        </button>
      </div>

      <aside className="cta-card">
        <p className="cta-kicker">Next step</p>
        <h2>Want the full picture?</h2>
        <p>
          This snapshot is a starting point. A discovery call walks through what
          your answers mean for your team specifically.
        </p>
        <div className="button-row">
          <a className="button button-primary" href={DISCOVERY_URL}>
            Book a discovery call
          </a>
          <a className="button button-secondary" href={FYHR_URL}>
            Try FYHR Pro free
          </a>
        </div>
      </aside>

      <p className="disclaimer">
        Educational only. Not legal or HR advice. Your answers never left this
        page.
      </p>
    </article>
  );
}
