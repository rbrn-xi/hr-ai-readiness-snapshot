// HR AI Readiness Snapshot - results content.
// Educational only. Not legal or HR advice.

import type { LensKey } from "./questions";

export type BandName = "Exploring" | "Piloting" | "Scaling" | "Leading";

export interface Band {
  name: BandName;
  min: number; // inclusive lower bound, as a percentage
  description: string;
}

export const BANDS: Band[] = [
  {
    name: "Exploring",
    min: 0,
    description:
      "AI is not the priority yet, and that is fine. The basics of your HR operation are still being built. The work now is simple: write your workflows down and get consistent before automating anything.",
  },
  {
    name: "Piloting",
    min: 35,
    description:
      "You have a foundation to work with. Parts of HR are solid enough to test AI carefully in one or two safe spots. The job now is to run small pilots, have a person check every output, and close the gaps before scaling anything.",
  },
  {
    name: "Scaling",
    min: 60,
    description:
      "The groundwork is in place across most of HR. Structured pilots can grow into real workflows with clear ownership and review steps. Keep the guardrails strong as you expand, because mistakes scale too.",
  },
  {
    name: "Leading",
    min: 80,
    description:
      "Your HR operation is organized, governed, and ready to use AI with discipline. At this level the risk shifts to keeping standards high and not automating judgment calls that belong to people.",
  },
];

export interface Risk {
  lens: LensKey;
  text: string;
}

export const RISKS: Risk[] = [
  { lens: "workflows", text: "Key HR work runs on memory and habits, so nothing is consistent enough to automate safely." },
  { lens: "workflows", text: "If one person left tomorrow, critical processes would stall or break." },
  { lens: "data", text: "Documents are scattered or out of date, so any AI tool would be working from bad information." },
  { lens: "data", text: "Missing or stale employee files turn into a real problem the first time someone audits them." },
  { lens: "policy", text: "Policies are stale or unwritten, so AI-assisted answers would rest on guesses." },
  { lens: "policy", text: "Sensitive situations have no set process, so outcomes depend on who handles them." },
  { lens: "people", text: "HR capacity is thin, so adding AI would create more workload instead of removing it." },
  { lens: "people", text: "The team is new to AI, which makes misuse and overtrust more likely." },
  { lens: "governance", text: "Anyone can bring in new tools, so HR data may already be flowing into places you do not control." },
  { lens: "governance", text: "There is no human review step, so wrong AI output could reach employees unchecked." },
];

export interface Move {
  lens: LensKey;
  text: string;
}

export const MOVES: Move[] = [
  { lens: "workflows", text: "Write down your five most repeated HR processes as plain checklists." },
  { lens: "workflows", text: "Name one owner for each recurring process so everyone knows who owns it." },
  { lens: "data", text: "Move core HR documents into one shared, organized folder with clear names." },
  { lens: "data", text: "Audit one set of files, like offer letters or I-9s, and close the gaps you find." },
  { lens: "policy", text: "Review and update your handbook and core policies within the next 90 days." },
  { lens: "policy", text: "Write a one-page process for handling complaints and accommodation requests, and follow it every time." },
  { lens: "people", text: "Block real weekly hours for HR work instead of squeezing it in." },
  { lens: "people", text: "Run one short team session on what AI is and is not good at for HR tasks." },
  { lens: "governance", text: "Add a simple approval step before any new tool touches HR data." },
  { lens: "governance", text: "Make human review a hard rule: no AI-written message or decision goes to an employee unchecked." },
];

export interface DoNotAutomateItem {
  item: string;
  reason: string;
}

export const DO_NOT_AUTOMATE_YET: DoNotAutomateItem[] = [
  { item: "Final hiring decisions.", reason: "Only a person can weigh judgment, context, and fit." },
  { item: "Terminations.", reason: "The legal and human stakes are too high for a tool to decide." },
  { item: "Harassment investigations.", reason: "These need human care and legal caution." },
  { item: "Compensation changes.", reason: "Pay affects lives and carries legal exposure, so a person must review every change." },
];

export const DISCLAIMER = "Educational only. Not legal or HR advice.";

export function scoringNote(maxPoints: number): string {
  return `Each answer is worth 0, 1, or 2 points. Your total out of ${maxPoints} is turned into a percentage, and that percentage decides your band.`;
}

// Synthetic demo data. Brightpath Dental Group is fictional and made up.
// It exists only to show the demo. It is not a real company.
// DEMO_ANSWERS are option indices into QUESTIONS, in order.
export const DEMO_COMPANY_NAME = "Brightpath Dental Group";
export const DEMO_ANSWERS: number[] = [0, 2, 1, 2, 1, 1, 0, 2, 1, 2, 1, 2];
