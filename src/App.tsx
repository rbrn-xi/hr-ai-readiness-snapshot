import { useState } from "react";
import { QUESTIONS } from "./content/questions";
import { DEMO_ANSWERS, DEMO_COMPANY_NAME } from "./content/results";
import { summarize } from "./lib/scoring";
import { Intro } from "./components/Intro";
import { QuestionStep } from "./components/QuestionStep";
import { ResultsScreen } from "./components/ResultsScreen";

type Screen = "intro" | "question" | "results";

export function App() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [index, setIndex] = useState(0);
  const [selections, setSelections] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null)
  );
  const [synthetic, setSynthetic] = useState(false);

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
    }
  }

  const answers = synthetic ? DEMO_ANSWERS : (selections as number[]);

  return (
    <div className="page">
      <main className="container">
        <div className="brand">
          fyhr<span className="dot">.</span>
        </div>
        {screen === "intro" && <Intro onStart={startQuiz} onDemo={startDemo} />}
        {screen === "question" && (
          <QuestionStep
            index={index}
            selected={selections[index]}
            onSelect={select}
            onSubmit={next}
            onBack={back}
            onRestart={restart}
          />
        )}
        {screen === "results" && (
          <ResultsScreen
            summary={summarize(answers)}
            synthetic={synthetic}
            companyName={DEMO_COMPANY_NAME}
            onRestart={restart}
          />
        )}
      </main>
      <footer className="footer">
        <div className="footer-inner">
          HR AI Readiness Snapshot, a free demo from FixYourHR, a FYS Labs
          company. Educational only. Not legal or HR advice.
        </div>
      </footer>
    </div>
  );
}
