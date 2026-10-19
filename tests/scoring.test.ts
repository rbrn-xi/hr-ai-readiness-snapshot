import { test, describe } from "node:test";
import assert from "node:assert/strict";

import { QUESTIONS, LENSES } from "../src/content/questions";
import { RISKS, MOVES, BANDS, DEMO_ANSWERS } from "../src/content/results";
import {
  bandFor,
  lensScores,
  summarize,
  totalMaxPoints,
} from "../src/lib/scoring";

// Answer index that earns `points` on question q (first match).
const pick = (points: number) =>
  QUESTIONS.map((q) => q.options.findIndex((o) => o.points === points));

const best = pick(2);
const worst = QUESTIONS.map((q) => {
  const min = Math.min(...q.options.map((o) => o.points));
  return q.options.findIndex((o) => o.points === min);
});

describe("question bank", () => {
  test("has 12 questions with unique ids", () => {
    assert.equal(QUESTIONS.length, 12);
    assert.equal(new Set(QUESTIONS.map((q) => q.id)).size, QUESTIONS.length);
  });

  test("every question has 3-4 options worth 0-2 points, topping out at 2", () => {
    for (const q of QUESTIONS) {
      assert.ok(q.options.length >= 3 && q.options.length <= 4, q.id);
      for (const o of q.options) assert.ok([0, 1, 2].includes(o.points), q.id);
      // totalMaxPoints() assumes every question can earn 2.
      assert.equal(Math.max(...q.options.map((o) => o.points)), 2, q.id);
    }
  });

  test("every lens has questions, a risk, and a move", () => {
    for (const { key } of LENSES) {
      assert.ok(QUESTIONS.some((q) => q.lens === key), `questions: ${key}`);
      assert.ok(RISKS.some((r) => r.lens === key), `risk: ${key}`);
      assert.ok(MOVES.some((m) => m.lens === key), `move: ${key}`);
    }
  });

  test("demo answers are valid choices for every question", () => {
    assert.equal(DEMO_ANSWERS.length, QUESTIONS.length);
    DEMO_ANSWERS.forEach((a, i) =>
      assert.ok(a >= 0 && a < QUESTIONS[i].options.length, QUESTIONS[i].id),
    );
  });
});

describe("bandFor", () => {
  const cases: [number, string][] = [
    [0, "Exploring"],
    [34, "Exploring"],
    [35, "Piloting"],
    [59, "Piloting"],
    [60, "Scaling"],
    [79, "Scaling"],
    [80, "Leading"],
    [100, "Leading"],
  ];
  for (const [pct, name] of cases) {
    test(`${pct}% -> ${name}`, () => assert.equal(bandFor(pct).name, name));
  }

  test("thresholds match the README (35 / 60 / 80)", () => {
    assert.deepEqual(
      BANDS.map((b) => b.min).sort((a, b) => a - b),
      [0, 35, 60, 80],
    );
  });
});

describe("lensScores", () => {
  test("lens maxima add up to the quiz maximum", () => {
    const total = lensScores(best).reduce((s, l) => s + l.max, 0);
    assert.equal(total, totalMaxPoints());
    assert.equal(totalMaxPoints(), 24);
  });

  test("all-best answers give 100% in every lens", () => {
    for (const l of lensScores(best)) assert.equal(l.pct, 100, l.lens);
  });

  test("unanswered questions count as zero instead of throwing", () => {
    const scores = lensScores([]);
    assert.equal(scores.length, LENSES.length);
    for (const l of scores) assert.equal(l.score, 0);
  });

  test("lenses come back in quiz order", () => {
    assert.deepEqual(
      lensScores(best).map((l) => l.lens),
      LENSES.map((l) => l.key),
    );
  });
});

describe("summarize", () => {
  test("all-best answers -> 100% Leading", () => {
    const s = summarize(best);
    assert.equal(s.pct, 100);
    assert.equal(s.band.name, "Leading");
  });

  test("all-worst answers -> lowest band", () => {
    const s = summarize(worst);
    assert.ok(s.pct < 35);
    assert.equal(s.band.name, "Exploring");
  });

  test("returns three risks and three moves from three distinct weakest lenses", () => {
    const s = summarize(DEMO_ANSWERS);
    assert.equal(s.topRisks.length, 3);
    assert.equal(s.nextMoves.length, 3);
    assert.equal(new Set(s.topRisks.map((r) => r.lens)).size, 3);
    for (const r of [...s.topRisks, ...s.nextMoves]) assert.ok(r.text.length > 0);

    const scores = lensScores(DEMO_ANSWERS);
    const pickedMax = Math.max(
      ...scores
        .filter((l) => s.topRisks.some((r) => r.lens === LENSES.find((x) => x.key === l.lens)!.title))
        .map((l) => l.pct),
    );
    const unpicked = scores.filter(
      (l) => !s.topRisks.some((r) => r.lens === LENSES.find((x) => x.key === l.lens)!.title),
    );
    for (const l of unpicked) assert.ok(l.pct >= pickedMax, `${l.lens} should not be weaker`);
  });

  test("ties between weakest lenses break by quiz order", () => {
    // Everything tied at 100% -> the first three lenses in quiz order.
    const s = summarize(best);
    assert.deepEqual(
      s.topRisks.map((r) => r.lens),
      LENSES.slice(0, 3).map((l) => l.title),
    );
  });

  test("percentage matches total points over 24", () => {
    const s = summarize(DEMO_ANSWERS);
    const points = DEMO_ANSWERS.reduce(
      (sum, a, i) => sum + QUESTIONS[i].options[a].points,
      0,
    );
    assert.equal(s.pct, Math.round((points / 24) * 100));
    assert.match(s.scoringNote, /24/);
  });
});
