export type ModelId =
  | "grok"
  | "claude"
  | "chatgpt"
  | "gemini"
  | "kimi"
  | "llama"
  | "deepseek";

export type PackId =
  | "mixed"
  | "humor"
  | "philosophy"
  | "tech"
  | "science"
  | "spicy"
  | "life"
  | "creative"
  | "news";

export type Difficulty = 1 | 2 | 3;

export type GameMode =
  | "classic"
  | "endless"
  | "daily"
  | "detective"
  | "battle";

export type Round = {
  id: string;
  question: string;
  answer: string;
  isGrok: boolean;
  model: ModelId;
  tells: string[];
  pack: PackId;
  difficulty: Difficulty;
};

export type BattlePair = {
  id: string;
  question: string;
  pack: PackId;
  difficulty: Difficulty;
  left: { answer: string; model: ModelId; isGrok: boolean; tells: string[] };
  right: { answer: string; model: ModelId; isGrok: boolean; tells: string[] };
};

export type PackMeta = {
  id: PackId;
  title: string;
  blurb: string;
  rounds: number;
};

export const MODEL_LABELS: Record<ModelId, string> = {
  grok: "Grok",
  claude: "Claude",
  chatgpt: "ChatGPT",
  gemini: "Gemini",
  kimi: "Kimi",
  llama: "Llama",
  deepseek: "DeepSeek",
};

/** Soft accent for reveal chips  -  tokens used as CSS color names where possible */
export const MODEL_ACCENT: Record<ModelId, string> = {
  grok: "var(--color-accent)",
  claude: "#d4a574",
  chatgpt: "#6eb5ff",
  gemini: "#8ab4f8",
  kimi: "#c4b5fd",
  llama: "#86efac",
  deepseek: "#94a3b8",
};

export const DETECTIVE_MODELS: ModelId[] = [
  "grok",
  "claude",
  "chatgpt",
  "gemini",
  "llama",
  "deepseek",
];

export const PACKS: PackMeta[] = [
  { id: "mixed", title: "Classic Mix", blurb: "A little of everything  -  the original vibe.", rounds: 12 },
  { id: "humor", title: "Humor & Wit", blurb: "Roasts, jokes, and cultural nonsense.", rounds: 10 },
  { id: "tech", title: "Tech & Coding", blurb: "Stack choices, AI, and engineering takes.", rounds: 12 },
  { id: "philosophy", title: "Philosophy & Life", blurb: "Meaning, morality, and big questions.", rounds: 10 },
  { id: "news", title: "News & Current", blurb: "Media, attention, and the present tense.", rounds: 8 },
  { id: "creative", title: "Creative Writing", blurb: "Stories, poems, and voice exercises.", rounds: 8 },
  { id: "spicy", title: "Edgy / Unfiltered", blurb: "Hot potatoes and culture-war adjacent takes.", rounds: 10 },
  { id: "science", title: "Science", blurb: "Space, biology, and popular myths.", rounds: 10 },
  { id: "life", title: "Everyday Life", blurb: "Work, money, friends, and adulting.", rounds: 10 },
];
