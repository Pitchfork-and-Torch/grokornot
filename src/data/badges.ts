export type BadgeId =
  | "first_blood"
  | "streak_5"
  | "streak_10"
  | "grok_whisperer"
  | "model_master"
  | "daily_grinder"
  | "perfect_classic"
  | "detective_ace"
  | "battle_tested"
  | "centurion"
  | "accuracy_80"
  | "endless_runner";

export type Badge = {
  id: BadgeId;
  title: string;
  blurb: string;
};

export const BADGES: Badge[] = [
  { id: "first_blood", title: "First Blood", blurb: "Complete your first session." },
  { id: "streak_5", title: "On Fire", blurb: "Hit a 5-round streak." },
  { id: "streak_10", title: "10-Streak Legend", blurb: "Hit a 10-round streak." },
  { id: "grok_whisperer", title: "Grok Whisperer", blurb: "80%+ accuracy on Grok rounds (min 20)." },
  { id: "model_master", title: "Model Master", blurb: "Identify 15 models correctly in Detective." },
  { id: "daily_grinder", title: "Daily Grinder", blurb: "Play 5 Daily Challenges." },
  { id: "perfect_classic", title: "Perfect Classic", blurb: "100% a Classic pack." },
  { id: "detective_ace", title: "Detective Ace", blurb: "Get 5 Detective IDs correct." },
  { id: "battle_tested", title: "Battle Tested", blurb: "Win 10 Battle rounds." },
  { id: "centurion", title: "Centurion", blurb: "Play 100 total rounds." },
  { id: "accuracy_80", title: "Sharp Eye", blurb: "Overall 80%+ accuracy (min 40 guesses)." },
  { id: "endless_runner", title: "Endless Runner", blurb: "Survive 20 rounds in Endless." },
];

export type Rank = { minXp: number; title: string };

export const RANKS: Rank[] = [
  { minXp: 0, title: "New Ear" },
  { minXp: 200, title: "Curious" },
  { minXp: 600, title: "Pattern Spotter" },
  { minXp: 1500, title: "Voice Hunter" },
  { minXp: 3000, title: "Model Whisperer" },
  { minXp: 6000, title: "Oracle" },
  { minXp: 10000, title: "Frontier Ear" },
];

export function rankForXp(xp: number): Rank {
  let current = RANKS[0]!;
  for (const r of RANKS) {
    if (xp >= r.minXp) current = r;
  }
  return current;
}
