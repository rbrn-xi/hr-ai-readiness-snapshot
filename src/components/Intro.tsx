interface IntroProps {
  onStart: () => void;
  onDemo: () => void;
}

export function Intro({ onStart, onDemo }: IntroProps) {
  return (
    <div className="card">
      <p className="intro-kicker">FixYourHR · Free self-check</p>
      <h1 className="intro-title">
        HR AI Readiness Snapshot<span className="dot">.</span>
      </h1>
      <p className="lede">
        12 questions. About 3 minutes. One clear picture of where your HR team
        stands with AI, and what to fix first.
      </p>
      <p>
        Answer for your team as things are today. Nothing is stored and nothing
        leaves your browser.
      </p>
      <div className="button-row">
        <button className="button button-primary" type="button" onClick={onStart}>
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
        Educational only. Not legal or HR advice. No accounts, no personal data
        collected.
      </p>
    </div>
  );
}
