import { useEffect, useRef } from "react";
import type { ResultSummary } from "../lib/scoring";

const DISCOVERY_URL =
  "https://fixinghr.com/?utm_source=github&utm_medium=demo&utm_campaign=readiness-snapshot";
const FYHR_URL =
  "https://fyhr.fixinghr.com/?utm_source=github&utm_medium=demo&utm_campaign=readiness-snapshot";

const RING_CIRCUMFERENCE = 2 * Math.PI * 52;

interface ResultsScreenProps {
  summary: ResultSummary;
  synthetic: boolean;
  companyName?: string;
  onRestart: () => void;
}

export function ResultsScreen({
  summary,
  synthetic,
  companyName,
  onRestart,
}: ResultsScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const ringFill = (summary.pct / 100) * RING_CIRCUMFERENCE;

  return (
    <div>
      <div className="report-header">
        <span className="report-header-label">Readiness report</span>
      </div>

      {synthetic && (
        <div className="fictional-row">
          <span className="fictional-badge">Fictional example</span>
          <p className="small-print" style={{ marginBottom: 0 }}>
            Sample result for {companyName}, a made-up company. Your own answers
            will produce a different snapshot.
          </p>
        </div>
      )}

      <div className="band-card" aria-live="polite">
        <div>
          <p className="band-kicker">
            {synthetic ? "Sample readiness band" : "Your readiness band"}
          </p>
          <h2 className="band-word" ref={headingRef} tabIndex={-1}>
            {summary.band.name}
          </h2>
          <p className="band-desc">{summary.band.description}</p>
        </div>
        <div
          className="ring-wrap"
          role="img"
          aria-label={`${summary.pct} percent readiness`}
        >
          <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient
                id="ring-gradient"
                x1="0"
                y1="0"
                x2="1"
                y2="1"
              >
                <stop offset="0" stopColor="#2237d3" />
                <stop offset="1" stopColor="#3d2f9e" />
              </linearGradient>
            </defs>
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="#e9e6df"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="url(#ring-gradient)"
              strokeWidth="10"
              strokeLinecap={summary.pct === 0 ? "butt" : "round"}
              strokeDasharray={`${ringFill} ${RING_CIRCUMFERENCE}`}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="ring-center" aria-hidden="true">
            <span className="ring-pct">{summary.pct}%</span>
            <span className="ring-cap">Ready</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="list-title">Top 3 risks to address</h2>
        <ul className="plain">
          {summary.topRisks.map((risk, i) => (
            <li key={i}>
              <svg
                className="risk-marker"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fill="#e8893b"
                  d="M13 2 4.5 13.5h5L8.5 22 19 10h-5.5L13 2z"
                />
              </svg>
              {risk.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2 className="list-title">Next 3 moves</h2>
        <ol className="moves-list">
          {summary.nextMoves.map((move, i) => (
            <li key={i}>{move.text}</li>
          ))}
        </ol>
      </div>

      <div className="quiet-panel">
        <h2 className="list-title">Do not automate yet</h2>
        <ul className="plain">
          {summary.doNotAutomate.map((item, i) => (
            <li key={i}>
              <strong>{item.item}</strong> {item.reason}
            </li>
          ))}
        </ul>
      </div>

      <p className="small-print">
        How this was scored: {summary.scoringNote}
      </p>

      <div className="cta-card">
        <h2>Want the full picture?</h2>
        <p>
          This snapshot is the starting point. A discovery call walks through
          what your answers mean for your team specifically.
        </p>
        <div className="button-row">
          <a className="button button-primary" href={DISCOVERY_URL}>
            Book a discovery call
          </a>
          <a className="button button-secondary" href={FYHR_URL}>
            Try FYHR Pro free
          </a>
        </div>
      </div>

      <div className="button-row restart-row">
        <button
          className="button button-secondary"
          type="button"
          onClick={onRestart}
        >
          Retake the snapshot
        </button>
      </div>

      <p className="disclaimer">
        Educational only. Not legal or HR advice. Your answers never left this
        page.
      </p>
    </div>
  );
}
