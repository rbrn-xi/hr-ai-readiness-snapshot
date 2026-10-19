import { useEffect, useState } from "react";
import { QUESTIONS } from "./content/questions";
import { DEMO_ANSWERS, DEMO_COMPANY_NAME } from "./content/results";
import { summarize, lensScores } from "./lib/scoring";
import { Intro } from "./components/Intro";
import { QuestionStep } from "./components/QuestionStep";
import { ResultsScreen } from "./components/ResultsScreen";

type Screen = "intro" | "question" | "results";

const BASE_TITLE = "HR AI Readiness Snapshot | FixYourHR";

export function App() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [index, setIndex] = useState(0);
  const [selections, setSelections] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [synthetic, setSynthetic] = useState(false);

  // Each screen starts at the top, and the tab title says where you are.
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title =
      screen === "question"
        ? `Question ${index + 1} of ${QUESTIONS.length} · ${BASE_TITLE}`
        : screen === "results"
          ? `${synthetic ? "Sample report" : "Your report"} · ${BASE_TITLE}`
          : BASE_TITLE;
  }, [screen, index, synthetic]);

  function restart() {
    setScreen("intro");
    setIndex(0);
    setSelections(Array(QUESTIONS.length).fill(null));
    setSynthetic(false);
  }

  function startQuiz() {
    setSynthetic(false);
    setSelections(Array(QUESTIONS.length).fill(null));
    setIndex(0);
    setScreen("question");
  }

  function startDemo() {
    setSynthetic(true);
    setScreen("results");
  }

  function select(optionIndex: number) {
    setSelections((prev) => {
      const next = [...prev];
      next[index] = optionIndex;
      return next;
    });
  }

  function next() {
    if (selections[index] === null) {
      return;
    }
    if (index + 1 < QUESTIONS.length) {
      setIndex(index + 1);
    } else {
      setSynthetic(false);
      setScreen("results");
    }
  }

  function back() {
    if (index > 0) {
      setIndex(index - 1);
    } else {
      setScreen("intro");
    }
  }

  const answers = synthetic ? DEMO_ANSWERS : (selections as number[]);
  const narrow = screen !== "intro";

  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <header className="masthead">
        <div className="masthead-inner">
          <img
            src="logo-mark.png"
            alt="FixYourHR"
            className="logo"
            width={232}
            height={136}
          />
          <span className="masthead-label">
            HR AI Readiness Snapshot
          </span>
        </div>
      </header>
      <main
        id="main"
        className={narrow ? "container container--narrow" : "container"}
      >
        {screen === "intro" && <Intro onStart={startQuiz} onDemo={startDemo} />}
        {screen === "question" && (
          <QuestionStep
            index={index}
            selected={selections[index]}
            answered={selections}
            onSelect={select}
            onSubmit={next}
            onBack={back}
          />
        )}
        {screen === "results" && (
          <ResultsScreen
            summary={summarize(answers)}
            lenses={lensScores(answers)}
            synthetic={synthetic}
            companyName={DEMO_COMPANY_NAME}
            onRestart={synthetic ? startQuiz : restart}
          />
        )}
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <p>
            A free demo from FixYourHR, a FYS Labs company. Educational only.
            Not legal or HR advice.
          </p>
          <a
            className="footer-link"
            href="https://github.com/rbrn-xi/hr-ai-readiness-snapshot"
          >
            View source on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
