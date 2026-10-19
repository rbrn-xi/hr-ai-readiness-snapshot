import { useEffect, useRef } from "react";
import { QUESTIONS } from "../content/questions";
import { lensTitle } from "../lib/scoring";

interface QuestionStepProps {
  index: number;
  selected: number | null;
  onSelect: (optionIndex: number) => void;
  onSubmit: () => void;
  onBack: () => void;
  onRestart: () => void;
}

export function QuestionStep({
  index,
  selected,
  onSelect,
  onSubmit,
  onBack,
  onRestart,
}: QuestionStepProps) {
  const question = QUESTIONS[index];
  const headingRef = useRef<HTMLLegendElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [index]);

  const isLast = index === QUESTIONS.length - 1;

  return (
    <div className="card">
      <div className="progress" aria-hidden="true">
        <div className="progress-label">
          Question {index + 1} of {QUESTIONS.length}
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${((index + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>
      <p className="sr-only" role="status">
        Question {index + 1} of {QUESTIONS.length}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (selected !== null) {
            onSubmit();
          }
        }}
      >
        <fieldset>
          <span className="lens-tag">{lensTitle(question.lens)}</span>
          <legend
            className="question-legend"
            ref={headingRef}
            tabIndex={-1}
          >
            {question.text}
          </legend>
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
              <span className="option-label">{option.text}</span>
            </label>
          ))}
        </fieldset>
        <div className="question-nav">
          <button
            className="button-text"
            type="button"
            onClick={index === 0 ? onRestart : onBack}
          >
            {index === 0 ? "Start over" : "Back"}
          </button>
          <button
            className="button button-primary"
            type="submit"
            disabled={selected === null}
          >
            {isLast ? "See my snapshot" : "Next question"}
          </button>
        </div>
      </form>
    </div>
  );
}
