import { useEffect, useRef, useState } from "react";
import { QUESTIONS } from "../content/questions";
import { lensTitle } from "../lib/scoring";

interface QuestionStepProps {
  index: number;
  selected: number | null;
  answered: (number | null)[];
  onSelect: (optionIndex: number) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function QuestionStep({
  index,
  selected,
  answered,
  onSelect,
  onSubmit,
  onBack,
}: QuestionStepProps) {
  const question = QUESTIONS[index];
  const headingRef = useRef<HTMLLegendElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [nudge, setNudge] = useState(false);
  const isLast = index === QUESTIONS.length - 1;

  useEffect(() => {
    setNudge(false);
    headingRef.current?.focus({ preventScroll: true });
  }, [index]);

  function choose(optionIndex: number) {
    setNudge(false);
    onSelect(optionIndex);
  }

  // Next stays enabled. Pressing it with no answer explains what is missing
  // instead of silently doing nothing.
  function advance() {
    if (selected === null) {
      setNudge(true);
      listRef.current?.querySelector("input")?.focus();
      return;
    }
    onSubmit();
  }

  // Keyboard: 1-4 picks an answer, Enter moves on. Ignored with modifier keys
  // held so browser shortcuts keep working.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("textarea, [contenteditable], input[type=text]")) return;
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= question.options.length) {
        e.preventDefault();
        choose(n - 1);
        // Keep focus on the chosen answer so the focus ring and the
        // selection never point at different rows.
        listRef.current
          ?.querySelectorAll("input")
          [n - 1]?.focus({ preventScroll: true });
      } else if (e.key === "Enter") {
        if (target?.tagName === "BUTTON" || target?.tagName === "A") return;
        e.preventDefault();
        advance();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="question-screen">
      <div className="q-head">
        <div className="progress-row">
          <span className="step-count">
            Question {index + 1}
            <span className="step-total"> of {QUESTIONS.length}</span>
          </span>
          <span className="lens-tag">{lensTitle(question.lens)}</span>
        </div>
        <ol className="progress-segments" aria-hidden="true">
          {QUESTIONS.map((q, i) => (
            <li
              key={q.id}
              className={
                "segment" +
                (i === index
                  ? " is-current"
                  : answered[i] !== null && answered[i] !== undefined
                    ? " is-done"
                    : "")
              }
            />
          ))}
        </ol>
      </div>
      <p className="sr-only" role="status">
        Question {index + 1} of {QUESTIONS.length}, {lensTitle(question.lens)}
      </p>

      <form
        key={index}
        className="question-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          advance();
        }}
      >
        <fieldset aria-describedby={nudge ? "answer-nudge" : undefined}>
          <legend className="question-legend" ref={headingRef} tabIndex={-1}>
            {question.text}
          </legend>
          <div
            ref={listRef}
            className={"option-list" + (nudge ? " needs-answer" : "")}
          >
            {question.options.map((option, optionIndex) => (
              <label
                key={optionIndex}
                className={
                  "option" + (selected === optionIndex ? " selected" : "")
                }
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={optionIndex}
                  checked={selected === optionIndex}
                  onChange={() => choose(optionIndex)}
                />
                <span className="option-key" aria-hidden="true">
                  {optionIndex + 1}
                </span>
                <span className="option-label">{option.text}</span>
                <svg
                  className="option-check"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
                </svg>
              </label>
            ))}
          </div>
        </fieldset>

        <p id="answer-nudge" className="answer-nudge" aria-live="polite">
          {nudge ? "Pick the answer closest to how things are today." : ""}
        </p>

        <div className="question-nav">
          <button className="button-text" type="button" onClick={onBack}>
            {index === 0 ? "Back to intro" : "Previous question"}
          </button>
          <div className="nav-forward">
            <span className="key-hint" aria-hidden="true">
              <kbd>1</kbd>–<kbd>{question.options.length}</kbd> to choose,{" "}
              <kbd>Enter</kbd> to continue
            </span>
            <button className="button button-primary" type="submit">
              {isLast ? "See my report" : "Next question"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
