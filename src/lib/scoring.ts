import {
  QUESTIONS,
  LENSES,
  type LensKey,
} from "../content/questions";
import {
  BANDS,
  RISKS,
  MOVES,
  DO_NOT_AUTOMATE_YET,
  scoringNote,
  type Band,
} from "../content/results";

export function lensTitle(key: LensKey): string {
  return LENSES.find((l) => l.key === key)?.title ?? key;
}

export function totalMaxPoints(): number {
  return QUESTIONS.length * 2;
}

export interface LensScore {
  lens: LensKey;
  score: number;
  max: number;
  pct: number;
}

export function lensScores(answers: number[]): LensScore[] {
  const order: LensKey[] = LENSES.map((l) => l.key);
  const map = new Map<LensKey, { score: number; max: number }>();
  QUESTIONS.forEach((q, i) => {
    const entry = map.get(q.lens) ?? { score: 0, max: 0 };
    entry.score += q.options[answers[i]]?.points ?? 0;
    entry.max += 2;
    map.set(q.lens, entry);
  });
  return order
    .filter((key) => map.has(key))
    .map((key) => {
      const v = map.get(key)!;
      return {
        lens: key,
        score: v.score,
        max: v.max,
        pct: v.max === 0 ? 0 : Math.round((v.score / v.max) * 100),
      };
    });
}

export function bandFor(pct: number): Band {
  const sorted = [...BANDS].sort((a, b) => b.min - a.min);
  return sorted.find((b) => pct >= b.min) ?? sorted[sorted.length - 1];
}

export interface ResultSummary {
  pct: number;
  band: Band;
  topRisks: { lens: string; text: string }[];
  nextMoves: { lens: string; text: string }[];
  doNotAutomate: { item: string; reason: string }[];
  scoringNote: string;
}

export function summarize(answers: number[]): ResultSummary {
  const lenses = lensScores(answers);
  const total = lenses.reduce((sum, l) => sum + l.score, 0);
  const pct = Math.round((total / totalMaxPoints()) * 100);
  const band = bandFor(pct);

  // Weakest lenses first: lowest pct, ties broken by lens order in the quiz.
  const order: LensKey[] = LENSES.map((l) => l.key);
  const weakest = [...lenses]
    .sort((a, b) => a.pct - b.pct || order.indexOf(a.lens) - order.indexOf(b.lens))
    .slice(0, 3);

  const topRisks = weakest.map((l) => {
    const risk = RISKS.find((r) => r.lens === l.lens);
    return { lens: lensTitle(l.lens), text: risk?.text ?? "" };
  });
  const nextMoves = weakest.map((l) => {
    const move = MOVES.find((m) => m.lens === l.lens);
    return { lens: lensTitle(l.lens), text: move?.text ?? "" };
  });

  return {
    pct,
    band,
    topRisks,
    nextMoves,
    doNotAutomate: DO_NOT_AUTOMATE_YET,
    scoringNote: scoringNote(totalMaxPoints()),
  };
}
