// HR AI Readiness Snapshot - question bank.
// Educational only. Not legal or HR advice.

export type LensKey = "workflows" | "data" | "policy" | "people" | "governance";

export interface Lens {
  key: LensKey;
  title: string;
}

export interface QuestionOption {
  text: string;
  points: 0 | 1 | 2;
}

export interface Question {
  id: string;
  lens: LensKey;
  text: string;
  options: QuestionOption[];
}

export const LENSES: Lens[] = [
  { key: "workflows", title: "Workflows" },
  { key: "data", title: "Data & Documents" },
  { key: "policy", title: "Policy & Risk" },
  { key: "people", title: "People Capacity" },
  { key: "governance", title: "Tool Governance" },
];

export const QUESTIONS: Question[] = [
  // --- Workflows ---
  {
    id: "q1",
    lens: "workflows",
    text: "When someone new joins, how does onboarding actually happen at your company?",
    options: [
      { text: "Everyone follows the same written process. Someone new could run it without a handoff.", points: 2 },
      { text: "It depends on who is available. The steps live in people's heads.", points: 0 },
      { text: "We have a basic checklist for the big parts. The rest is improvised.", points: 1 },
      { text: "Some steps are written down, but we still chase loose ends by email or chat.", points: 1 },
    ],
  },
  {
    id: "q2",
    lens: "workflows",
    text: "How long does it take to get a correct answer to a routine HR question, like time-off rules or benefits?",
    options: [
      { text: "An hour or more. It means digging through files or asking around.", points: 0 },
      { text: "A few minutes. The answer is easy to find.", points: 2 },
      { text: "Minutes if you know who to ask. Much longer if you don't.", points: 1 },
    ],
  },
  {
    id: "q3",
    lens: "workflows",
    text: "If your HR lead left tomorrow, what happens to day-to-day HR work?",
    options: [
      { text: "We could cover the essentials, but a lot would slow down.", points: 1 },
      { text: "We would be scrambling. Most of the know-how sits with one person.", points: 0 },
      { text: "Someone else could keep things running. The basics are written down.", points: 2 },
    ],
  },

  // --- Data & Documents ---
  {
    id: "q4",
    lens: "data",
    text: "Where do your HR documents live?",
    options: [
      { text: "In one shared, organized place. Names and versions are clear.", points: 2 },
      { text: "Scattered across email, desktops, and old drives.", points: 0 },
      { text: "Mostly in one place, but naming and versions are inconsistent.", points: 1 },
    ],
  },
  {
    id: "q5",
    lens: "data",
    text: "How confident are you that employee files are complete and current?",
    options: [
      { text: "Not very. We find gaps when we need a file fast.", points: 0 },
      { text: "Mostly. There are a few known gaps we have not closed.", points: 1 },
      { text: "Very. We check on a regular schedule.", points: 2 },
    ],
  },

  // --- Policy & Risk ---
  {
    id: "q6",
    lens: "policy",
    text: "When were your handbook or core policies last reviewed and updated?",
    options: [
      { text: "About a year or two ago. Some parts are already stale.", points: 1 },
      { text: "Over two years ago, or we are not sure.", points: 0 },
      { text: "Within the last year.", points: 2 },
      { text: "We do not have a handbook or written policies.", points: 0 },
    ],
  },
  {
    id: "q7",
    lens: "policy",
    text: "How do you handle sensitive HR situations, like harassment complaints or accommodation requests?",
    options: [
      { text: "We deal with each case as it comes. There is no set process.", points: 0 },
      { text: "We have a rough process, but it is not written down or used consistently.", points: 1 },
      { text: "We have a written process and we follow it every time.", points: 2 },
    ],
  },
  {
    id: "q8",
    lens: "policy",
    text: "Who reviews HR decisions that carry real risk, like terminations or pay changes?",
    options: [
      { text: "A defined reviewer checks them before they go out.", points: 2 },
      { text: "Whoever is closest to the situation decides on their own.", points: 0 },
      { text: "Sometimes a second person looks. Sometimes not. There is no rule.", points: 1 },
    ],
  },

  // --- People Capacity ---
  {
    id: "q9",
    lens: "people",
    text: "Does anyone on your team have real time for HR work?",
    options: [
      { text: "No. HR tasks get squeezed in between everything else.", points: 0 },
      { text: "Sort of. One person owns HR on top of a full-time job.", points: 1 },
      { text: "Yes. HR is someone's real job, or a real part of it.", points: 2 },
    ],
  },
  {
    id: "q10",
    lens: "people",
    text: "How comfortable is your team with AI tools?",
    options: [
      { text: "Comfortable. We use them regularly and know what they are good and bad at.", points: 2 },
      { text: "Not at all. A few people have tried one once or twice.", points: 0 },
      { text: "Somewhat. A few of us use them for small tasks, but we are still figuring it out.", points: 1 },
    ],
  },

  // --- Tool Governance ---
  {
    id: "q11",
    lens: "governance",
    text: "How does your team decide which AI or software tools can touch HR work?",
    options: [
      { text: "We have talked about it, but there is no actual process.", points: 1 },
      { text: "People just sign up for whatever seems useful.", points: 0 },
      { text: "There is a clear approval step before any new tool touches HR data.", points: 2 },
    ],
  },
  {
    id: "q12",
    lens: "governance",
    text: "If an AI tool gave wrong advice about a policy or a law, how would you catch it?",
    options: [
      { text: "We probably would not catch it until something went wrong.", points: 0 },
      { text: "We would catch the obvious mistakes, but not the subtle ones.", points: 1 },
      { text: "A person checks every AI output before it reaches an employee.", points: 2 },
    ],
  },
];
