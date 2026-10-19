import { useEffect, useRef } from "react";
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
  const isLast = index === QUESTIONS.length - 1;

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, [index]);

  // Keyboard: 1-4 picks an answer, Enter moves on. Ignored while typing in a
  // field or with modifier keys held, so browser shortcuts keep working.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input[type=text], textarea, [contenteditable]")) return;
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= question.options.length) {
        e.preventDefault();
        onSelect(n - 1);
      } else if (e.key === "Enter" && selected !== null) {
        // Let buttons handle their own Enter; everywhere else, advance.
        if (target?.tagName === "BUTTON" || target?.tagName === "A") return;
        e.preventDefault();
        onSubmit();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [question, selected, onSelect, onSubmit]);

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
        className="step-anim"
        onSubmit={(e) => {
          e.preventDefault();
          if (selected !== null) {
            onSubmit();
          }
        }}
      >
        <fieldset>
          <legend className="question-legend" ref={headingRef} tabIndex={-1}>
            {question.text}
          </legend>
          <div className="option-list">
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
                  onChange={() => onSelect(optionIndex)}
                />
                <span className="option-num" aria-hidden="true">
                  {String(optionIndex + 1).padStart(2, "0")}
                </span>
                <span className="option-label">{option.text}</span>
                <svg
                  className="option-check"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d="M4 12.5 9.5 18 20 6.5" />
                </svg>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="question-nav">
          <button className="button-text" type="button" onClick={onBack}>
            <span aria-hidden="true">←</span>
            {index === 0 ? "Back to intro" : "Previous"}
          </button>
          <div className="nav-forward">
            <span className="key-hint" aria-hidden="true">
              <kbd>1</kbd>
              {"\u2009–\u2009"}
              <kbd>{question.options.length}</kbd> to choose,{" "}
              <kbd>Enter</kbd> to continue
            </span>
            <button
              className="button button-primary"
              type="submit"
              disabled={selected === null}
            >
              {isLast ? "See my report" : "Next question"}
              <span className="button-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
