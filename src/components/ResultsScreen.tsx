import { useEffect, useRef } from "react";
import type { ResultSummary } from "../lib/scoring";

const DISCOVERY_URL =
  "https://fixinghr.com/?utm_source=github&utm_medium=demo&utm_campaign=readiness-snapshot";
const FYHR_URL =
  "https://fyhr.fixinghr.com/?utm_source=github&utm_medium=demo&utm_campaign=readiness-snapshot";

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

  return (
    <div>
      {synthetic && (
        <div aria-live="polite">
          <span className="fictional-badge">Fictional example</span>
          <p className="small-print">
            Sample result for {companyName}, a made-up company. Your own answers
            will produce a different snapshot.
          </p>
        </div>
      )}

      <div className="band-banner" aria-live="polite">
        <p className="band-kicker">
          {synthetic ? "Sample readiness band" : "Your readiness band"}
        </p>
        <h2 ref={headingRef} tabIndex={-1}>
          {summary.band.name}
          <span className="dot">.</span>
        </h2>
        <p>{summary.band.description}</p>
      </div>

      <div className="card">
        <h2 className="list-title">Top 3 risks to address</h2>
        <ul className="plain risks">
          {summary.topRisks.map((risk, i) => (
            <li key={i}>{risk.text}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2 className="list-title">Next 3 moves</h2>
        <ul className="plain moves">
          {summary.nextMoves.map((move, i) => (
            <li key={i}>{move.text}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2 className="list-title">Do not automate yet</h2>
        <ul className="plain risks">
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

      <div className="button-row">
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
