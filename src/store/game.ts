import { create } from "zustand";
import {
  BATTLES,
  LIBRARY,
  daySeed,
  hashSeed,
  roundsForPack,
  shuffleWithSeed,
  utcDayKey,
} from "@/data/library";
import type { BattlePair, GameMode, ModelId, PackId, Round } from "@/data/types";
import { DETECTIVE_MODELS } from "@/data/types";
import { basePoints, streakBonus, xpForResult } from "@/lib/scoring";
import { useProgress } from "@/store/progress";

export type Phase =
  | "home"
  | "pack-select"
  | "onboarding"
  | "playing"
  | "reveal"
  | "results"
  | "stats"
  | "leaderboard";

export type BinaryGuess = "grok" | "not";
export type BattleGuess = "left" | "right";

export type HistoryEntry = {
  id: string;
  question: string;
  correct: boolean;
  model: ModelId;
  guessLabel: string;
  points: number;
  pack?: PackId;
};

type GameState = {
  phase: Phase;
  mode: GameMode;
  pack: PackId;
  deck: Round[];
  battles: BattlePair[];
  index: number;
  score: number;
  streak: number;
  bestStreak: number;
  misses: number;
  maxMisses: number;
  history: HistoryEntry[];
  lastCorrect: boolean | null;
  lastPoints: number;
  lastModel: ModelId | null;
  lastTells: string[];
  lastGuessLabel: string;
  detectiveOptions: ModelId[];
  battleSide: "left" | "right" | null;
  xpGained: number;
  newBadges: string[];
  lastBattle: BattlePair | null;
  challengeSeed: string | null;
  challengeTarget: number | null;
  /** Deck seed string embedded in share links so friends play the same deal. */
  runSeed: string | null;

  goHome: () => void;
  openStats: () => void;
  openLeaderboard: () => void;
  openPackSelect: () => void;
  openOnboarding: () => void;
  startClassic: (pack: PackId, seed?: number) => void;
  startEndless: () => void;
  startDaily: () => void;
  startDetective: () => void;
  startBattle: () => void;
  startChallenge: (code: string) => void;
  guessBinary: (g: BinaryGuess) => void;
  guessDetective: (m: ModelId) => void;
  guessBattle: (side: BattleGuess) => void;
  next: () => void;
  finishToResults: () => void;
};

const CLASSIC_SIZE = 12;
const DAILY_SIZE = 12;
const DETECTIVE_SIZE = 10;
const BATTLE_SIZE = 8;
const ENDLESS_SIZE = 60;
const ENDLESS_MISSES = 3;

function dealClassic(pack: PackId, seed?: number): Round[] {
  const s = seed ?? Date.now() % 1_000_000_000;
  return shuffleWithSeed(roundsForPack(pack), s).slice(0, CLASSIC_SIZE);
}

function dealEndless(seed = Date.now() % 1_000_000_000): Round[] {
  // ramp: easy first, then mix
  const easy = LIBRARY.filter((r) => r.difficulty === 1);
  const mid = LIBRARY.filter((r) => r.difficulty === 2);
  const hard = LIBRARY.filter((r) => r.difficulty === 3);
  const a = shuffleWithSeed(easy, seed).slice(0, 12);
  const b = shuffleWithSeed(mid, seed + 1).slice(0, 20);
  const c = shuffleWithSeed(hard, seed + 2).slice(0, 16);
  const rest = shuffleWithSeed(LIBRARY, seed + 3).slice(0, ENDLESS_SIZE);
  const merged = [...a, ...b, ...c, ...rest];
  // dedupe by id
  const seen = new Set<string>();
  const out: Round[] = [];
  for (const r of merged) {
    if (seen.has(r.id)) continue;
    seen.add(r.id);
    out.push(r);
    if (out.length >= ENDLESS_SIZE) break;
  }
  return out;
}

function dealDaily(): Round[] {
  const seed = daySeed(utcDayKey());
  return shuffleWithSeed(LIBRARY, seed).slice(0, DAILY_SIZE);
}

function dealDetective(seed?: number): Round[] {
  const s = seed ?? Date.now() % 1_000_000_000;
  return shuffleWithSeed(LIBRARY, s).slice(0, DETECTIVE_SIZE);
}

function dealBattles(seed = Date.now() % 1_000_000_000): BattlePair[] {
  return shuffleWithSeed(BATTLES, seed).slice(0, BATTLE_SIZE);
}

function detectiveChoices(correct: ModelId, salt = 0): ModelId[] {
  const others = DETECTIVE_MODELS.filter((m) => m !== correct);
  const seed = correct.charCodeAt(0) * 31 + salt;
  const shuffled = shuffleWithSeed(others, seed).slice(0, 3);
  return shuffleWithSeed([correct, ...shuffled], seed + 7);
}

function resetPlayFields() {
  return {
    index: 0,
    score: 0,
    streak: 0,
    bestStreak: 0,
    misses: 0,
    maxMisses: 0,
    history: [] as HistoryEntry[],
    lastCorrect: null as boolean | null,
    lastPoints: 0,
    lastModel: null as ModelId | null,
    lastTells: [] as string[],
    lastGuessLabel: "",
    detectiveOptions: [] as ModelId[],
    battleSide: null as "left" | "right" | null,
    xpGained: 0,
    newBadges: [] as string[],
    lastBattle: null as BattlePair | null,
    challengeSeed: null as string | null,
    challengeTarget: null as number | null,
    runSeed: null as string | null,
  };
}

export const useGame = create<GameState>((set, get) => ({
  phase: "home",
  mode: "classic",
  pack: "mixed",
  deck: [],
  battles: [],
  ...resetPlayFields(),

  goHome: () => set({ phase: "home", deck: [], battles: [], ...resetPlayFields() }),
  openStats: () => set({ phase: "stats" }),
  openLeaderboard: () => set({ phase: "leaderboard" }),
  openPackSelect: () => set({ phase: "pack-select", mode: "classic" }),
  openOnboarding: () => set({ phase: "onboarding" }),

  startClassic: (pack, seed) => {
    const s = seed ?? Date.now() % 1_000_000_000;
    const deck = dealClassic(pack, s);
    set({
      phase: "playing",
      mode: "classic",
      pack,
      deck,
      battles: [],
      ...resetPlayFields(),
      runSeed: String(s),
    });
  },

  startEndless: () => {
    const s = Date.now() % 1_000_000_000;
    set({
      phase: "playing",
      mode: "endless",
      pack: "mixed",
      deck: dealEndless(s),
      battles: [],
      ...resetPlayFields(),
      maxMisses: ENDLESS_MISSES,
      runSeed: String(s),
    });
  },

  startDaily: () => {
    const day = utcDayKey();
    set({
      phase: "playing",
      mode: "daily",
      pack: "mixed",
      deck: dealDaily(),
      battles: [],
      ...resetPlayFields(),
      runSeed: `daily-${day}`,
    });
  },

  startDetective: () => {
    const s = Date.now() % 1_000_000_000;
    const deck = dealDetective(s);
    const first = deck[0];
    set({
      phase: "playing",
      mode: "detective",
      pack: "mixed",
      deck,
      battles: [],
      ...resetPlayFields(),
      detectiveOptions: first ? detectiveChoices(first.model, 0) : [],
      runSeed: String(s),
    });
  },

  startBattle: () => {
    const s = Date.now() % 1_000_000_000;
    set({
      phase: "playing",
      mode: "battle",
      pack: "mixed",
      deck: [],
      battles: dealBattles(s),
      ...resetPlayFields(),
      runSeed: String(s),
    });
  },

  startChallenge: (code) => {
    // format: c-<pack>-<seedhex> or just seed for mixed classic
    const clean = code.replace(/^#?c=/, "").trim();
    const parts = clean.split("-");
    let pack: PackId = "mixed";
    let seedStr = clean;
    if (parts.length >= 2 && ["mixed", "humor", "tech", "philosophy", "science", "spicy", "life", "creative", "news"].includes(parts[0]!)) {
      pack = parts[0] as PackId;
      seedStr = parts.slice(1).join("-");
    }
    // Trailing -t<score> is the challenge target only  -  never part of the deck seed,
    // and must not match a random seed that happens to contain t+digits (e.g. t12ab).
    const targetMatch = seedStr.match(/-t(\d+)$/);
    const seedOnly = targetMatch ? seedStr.slice(0, targetMatch.index) : seedStr;
    // Round-trip runSeed: classic/endless embed a decimal Number; daily embeds
    // daily-YYYY-MM-DD (must use daySeed, not hashSeed of that string).
    const raw = seedOnly || "challenge";
    const dailyMatch = /^daily-(\d{4}-\d{2}-\d{2})$/.exec(raw);
    let seed: number;
    if (dailyMatch) {
      seed = daySeed(dailyMatch[1]!);
    } else if (/^\d+$/.test(raw)) {
      seed = Number(raw) >>> 0;
    } else {
      seed = hashSeed(raw);
    }
    const deck = dealClassic(pack, seed);
    set({
      phase: "playing",
      mode: "classic",
      pack,
      deck,
      battles: [],
      ...resetPlayFields(),
      challengeSeed: clean,
      challengeTarget: targetMatch ? Number(targetMatch[1]) : null,
      runSeed: seedOnly || "challenge",
    });
  },

  guessBinary: (g) => {
    const { phase, mode, deck, index, streak, bestStreak, score, history, xpGained, misses, maxMisses } =
      get();
    if (phase !== "playing" || mode === "battle" || mode === "detective") return;
    const round = deck[index];
    if (!round) return;

    const correct = (g === "grok" && round.isGrok) || (g === "not" && !round.isGrok);
    const nextStreak = correct ? streak + 1 : 0;
    const nextMisses = correct ? misses : misses + 1;
    const points = correct
      ? basePoints(mode, round.difficulty) + streakBonus(nextStreak)
      : 0;
    const xp = xpForResult(correct, mode, round.difficulty);

    set({
      phase: "reveal",
      lastCorrect: correct,
      lastPoints: points,
      lastModel: round.model,
      lastTells: round.tells,
      lastGuessLabel: g === "grok" ? "Grok" : "Not",
      score: score + points,
      streak: nextStreak,
      bestStreak: Math.max(bestStreak, nextStreak),
      misses: nextMisses,
      xpGained: xpGained + xp,
      history: [
        ...history,
        {
          id: round.id,
          question: round.question,
          correct,
          model: round.model,
          guessLabel: g === "grok" ? "Grok" : "Not",
          points,
          pack: round.pack,
        },
      ],
    });

    // endless: if max misses hit, mark for end on next
    if (mode === "endless" && maxMisses > 0 && nextMisses >= maxMisses) {
      // handled in next()
    }
  },

  guessDetective: (m) => {
    const { phase, mode, deck, index, streak, bestStreak, score, history, xpGained } = get();
    if (phase !== "playing" || mode !== "detective") return;
    const round = deck[index];
    if (!round) return;
    const correct = m === round.model;
    const nextStreak = correct ? streak + 1 : 0;
    const points = correct
      ? basePoints(mode, round.difficulty) + streakBonus(nextStreak)
      : 0;
    const xp = xpForResult(correct, mode, round.difficulty);

    set({
      phase: "reveal",
      lastCorrect: correct,
      lastPoints: points,
      lastModel: round.model,
      lastTells: round.tells,
      lastGuessLabel: m,
      score: score + points,
      streak: nextStreak,
      bestStreak: Math.max(bestStreak, nextStreak),
      xpGained: xpGained + xp,
      history: [
        ...history,
        {
          id: round.id,
          question: round.question,
          correct,
          model: round.model,
          guessLabel: m,
          points,
          pack: round.pack,
        },
      ],
    });
  },

  guessBattle: (side) => {
    const { phase, mode, battles, index, streak, bestStreak, score, history, xpGained } = get();
    if (phase !== "playing" || mode !== "battle") return;
    const pair = battles[index];
    if (!pair) return;
    const chosen = side === "left" ? pair.left : pair.right;
    const correct = chosen.isGrok;
    const nextStreak = correct ? streak + 1 : 0;
    const points = correct
      ? basePoints(mode, pair.difficulty) + streakBonus(nextStreak)
      : 0;
    const xp = xpForResult(correct, mode, pair.difficulty);
    const grokSide = pair.left.isGrok ? pair.left : pair.right;
    const trueModel = grokSide.model;

    set({
      phase: "reveal",
      lastCorrect: correct,
      lastPoints: points,
      lastModel: trueModel,
      // Always show the Grok answer's tells  -  chosen can be the decoy.
      lastTells: grokSide.tells,
      lastGuessLabel: side === "left" ? "A" : "B",
      lastBattle: pair,
      battleSide: side,
      score: score + points,
      streak: nextStreak,
      bestStreak: Math.max(bestStreak, nextStreak),
      xpGained: xpGained + xp,
      history: [
        ...history,
        {
          id: pair.id,
          question: pair.question,
          correct,
          model: trueModel,
          guessLabel: side === "left" ? "A" : "B",
          points,
          pack: pair.pack,
        },
      ],
    });
  },

  next: () => {
    const state = get();
    if (state.phase !== "reveal") return;

    if (state.mode === "endless" && state.maxMisses > 0 && state.misses >= state.maxMisses) {
      get().finishToResults();
      return;
    }

    if (state.mode === "battle") {
      const nextIndex = state.index + 1;
      if (nextIndex >= state.battles.length) {
        get().finishToResults();
        return;
      }
      set({
        phase: "playing",
        index: nextIndex,
        lastCorrect: null,
        lastBattle: null,
        battleSide: null,
      });
      return;
    }

    const nextIndex = state.index + 1;
    if (nextIndex >= state.deck.length) {
      get().finishToResults();
      return;
    }

    const nextRound = state.deck[nextIndex];
    set({
      phase: "playing",
      index: nextIndex,
      lastCorrect: null,
      detectiveOptions:
        state.mode === "detective" && nextRound
          ? detectiveChoices(nextRound.model, nextIndex)
          : [],
    });
  },

  finishToResults: () => {
    const s = get();
    const correct = s.history.filter((h) => h.correct).length;
    const total = s.history.length;

    const newBadges = useProgress.getState().recordSession({
      mode: s.mode,
      score: s.score,
      correct,
      total,
      bestStreak: s.bestStreak,
      modelResults: s.history.map((h) => ({
        model: h.model,
        correct: h.correct,
        guessLabel: h.guessLabel,
        pack: h.pack,
      })),
      perfect: total > 0 && correct === total,
      endlessLength: s.mode === "endless" ? total : 0,
      battleWins: s.mode === "battle" ? correct : 0,
      detectiveCorrect: s.mode === "detective" ? correct : 0,
      xpGained: s.xpGained,
    });

    if (s.mode === "daily") {
      useProgress.getState().submitDaily(
        s.score,
        total ? correct / total : 0,
        s.bestStreak,
      );
    }

    set({
      phase: "results",
      newBadges,
    });
  },
}));

export function makeChallengeCode(pack: PackId, score: number, runSeed?: string | null): string {
  // Must reuse the run's deck seed  -  a fresh Math.random() made friends play a different deal.
  const seed =
    (runSeed && String(runSeed).trim()) ||
    Math.random().toString(36).slice(2, 8);
  return `${pack}-${seed}-t${score}`;
}
