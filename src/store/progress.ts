import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BADGES, type BadgeId } from "@/data/badges";
import type { GameMode, ModelId, PackId } from "@/data/types";
import { utcDayKey } from "@/data/library";

export type DailyEntry = {
  day: string;
  name: string;
  score: number;
  accuracy: number;
  streak: number;
  at: number;
};

export type Confusion = Partial<Record<ModelId, Partial<Record<ModelId | "grok_bin" | "not_bin", number>>>>;

type ProgressState = {
  displayName: string;
  xp: number;
  badges: BadgeId[];
  totalRounds: number;
  totalCorrect: number;
  bestStreak: number;
  allTimeBest: number;
  gamesPlayed: number;
  dailyPlays: number;
  lastDailyDay: string | null;
  lastDailyScore: number;
  dailyStreak: number;
  modelHits: Partial<Record<ModelId, { correct: number; total: number }>>;
  packHits: Partial<Record<PackId, { correct: number; total: number }>>;
  confusion: Confusion;
  detectiveCorrect: number;
  battleWins: number;
  endlessBest: number;
  perfectClassics: number;
  dailyBoard: DailyEntry[];
  soundOn: boolean;
  lightMode: boolean;
  onboarded: boolean;
  setName: (name: string) => void;
  setSound: (on: boolean) => void;
  setLightMode: (on: boolean) => void;
  setOnboarded: (v: boolean) => void;
  recordSession: (p: {
    mode: GameMode;
    score: number;
    correct: number;
    total: number;
    bestStreak: number;
    modelResults?: { model: ModelId; correct: boolean; guessLabel: string; pack?: PackId }[];
    perfect?: boolean;
    endlessLength?: number;
    battleWins?: number;
    detectiveCorrect?: number;
    xpGained: number;
  }) => BadgeId[];
  submitDaily: (score: number, accuracy: number, streak: number) => void;
};

function unlockCheck(s: ProgressState): BadgeId[] {
  const owned = new Set(s.badges);
  const next: BadgeId[] = [];
  const tryAdd = (id: BadgeId, cond: boolean) => {
    if (cond && !owned.has(id)) next.push(id);
  };

  tryAdd("first_blood", s.gamesPlayed >= 1);
  tryAdd("streak_5", s.bestStreak >= 5);
  tryAdd("streak_10", s.bestStreak >= 10);
  tryAdd("daily_grinder", s.dailyPlays >= 5);
  tryAdd("perfect_classic", s.perfectClassics >= 1);
  tryAdd("detective_ace", s.detectiveCorrect >= 5);
  tryAdd("model_master", s.detectiveCorrect >= 15);
  tryAdd("battle_tested", s.battleWins >= 10);
  tryAdd("centurion", s.totalRounds >= 100);
  tryAdd("endless_runner", s.endlessBest >= 20);
  tryAdd("accuracy_80", s.totalRounds >= 40 && s.totalCorrect / s.totalRounds >= 0.8);

  const grok = s.modelHits.grok;
  tryAdd(
    "grok_whisperer",
    !!grok && grok.total >= 20 && grok.correct / grok.total >= 0.8,
  );

  return next;
}

function bumpConfusion(
  conf: Confusion,
  trueModel: ModelId,
  guessKey: ModelId | "grok_bin" | "not_bin",
): Confusion {
  const row = { ...(conf[trueModel] ?? {}) };
  row[guessKey] = (row[guessKey] ?? 0) + 1;
  return { ...conf, [trueModel]: row };
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      displayName: "",
      xp: 0,
      badges: [],
      totalRounds: 0,
      totalCorrect: 0,
      bestStreak: 0,
      allTimeBest: 0,
      gamesPlayed: 0,
      dailyPlays: 0,
      lastDailyDay: null,
      lastDailyScore: 0,
      dailyStreak: 0,
      modelHits: {},
      packHits: {},
      confusion: {},
      detectiveCorrect: 0,
      battleWins: 0,
      endlessBest: 0,
      perfectClassics: 0,
      dailyBoard: [],
      soundOn: false,
      lightMode: false,
      onboarded: false,

      setName: (name) => set({ displayName: name.slice(0, 24) }),
      setSound: (on) => set({ soundOn: on }),
      setLightMode: (on) => set({ lightMode: on }),
      setOnboarded: (v) => set({ onboarded: v }),

      recordSession: (p) => {
        const s = get();
        const modelHits = { ...s.modelHits };
        const packHits = { ...s.packHits };
        let confusion = { ...s.confusion };

        for (const m of p.modelResults ?? []) {
          const cur = modelHits[m.model] ?? { correct: 0, total: 0 };
          modelHits[m.model] = {
            correct: cur.correct + (m.correct ? 1 : 0),
            total: cur.total + 1,
          };
          if (m.pack) {
            const pc = packHits[m.pack] ?? { correct: 0, total: 0 };
            packHits[m.pack] = {
              correct: pc.correct + (m.correct ? 1 : 0),
              total: pc.total + 1,
            };
          }
          const g = m.guessLabel.toLowerCase();
          let guessKey: ModelId | "grok_bin" | "not_bin" = "not_bin";
          if (g === "grok") guessKey = "grok_bin";
          else if (g === "not" || g === "a" || g === "b" || g === "left" || g === "right")
            guessKey = m.correct ? "grok_bin" : "not_bin";
          else if (
            ["claude", "chatgpt", "gemini", "kimi", "llama", "deepseek", "grok"].includes(g)
          ) {
            guessKey = g as ModelId;
          }
          confusion = bumpConfusion(confusion, m.model, guessKey);
        }

        let dailyStreak = s.dailyStreak;
        let dailyPlays = s.dailyPlays;
        let lastDailyDay = s.lastDailyDay;
        let lastDailyScore = s.lastDailyScore;

        if (p.mode === "daily") {
          const today = utcDayKey();
          if (lastDailyDay !== today) {
            const yesterday = utcDayKey(new Date(Date.now() - 86400000));
            dailyStreak = lastDailyDay === yesterday ? dailyStreak + 1 : 1;
            dailyPlays = dailyPlays + 1;
          }
          lastDailyDay = today;
          lastDailyScore = p.score;
        }

        const patch: Partial<ProgressState> = {
          xp: s.xp + p.xpGained,
          totalRounds: s.totalRounds + p.total,
          totalCorrect: s.totalCorrect + p.correct,
          bestStreak: Math.max(s.bestStreak, p.bestStreak),
          allTimeBest: Math.max(s.allTimeBest, p.score),
          gamesPlayed: s.gamesPlayed + 1,
          modelHits,
          packHits,
          confusion,
          detectiveCorrect: s.detectiveCorrect + (p.detectiveCorrect ?? 0),
          battleWins: s.battleWins + (p.battleWins ?? 0),
          endlessBest: Math.max(s.endlessBest, p.endlessLength ?? 0),
          perfectClassics: s.perfectClassics + (p.perfect && p.mode === "classic" ? 1 : 0),
          dailyPlays,
          dailyStreak,
          lastDailyDay,
          lastDailyScore,
        };

        const merged = { ...s, ...patch } as ProgressState;
        const newBadges = unlockCheck(merged);
        set({
          ...patch,
          badges: [...s.badges, ...newBadges],
        });
        return newBadges;
      },

      submitDaily: (score, accuracy, streak) => {
        const name = get().displayName.trim() || "Anonymous";
        const day = utcDayKey();
        const entry: DailyEntry = {
          day,
          name,
          score,
          accuracy,
          streak,
          at: Date.now(),
        };
        const board = [
          entry,
          ...get().dailyBoard.filter((e) => !(e.day === day && e.name === name)),
        ]
          .filter((e) => e.day === day)
          .sort((a, b) => b.score - a.score || b.streak - a.streak)
          .slice(0, 20);
        const others = get().dailyBoard.filter((e) => e.day !== day).slice(0, 40);
        set({
          dailyBoard: [...board, ...others],
          lastDailyDay: day,
          lastDailyScore: score,
        });
      },
    }),
    {
      name: "grok-or-not-2-progress",
      version: 2,
    },
  ),
);

export function badgeMeta(id: BadgeId) {
  return BADGES.find((b) => b.id === id);
}

/** Top confusions: true model most often misread */
export function topConfusions(conf: Confusion, limit = 3) {
  const rows: { trueModel: ModelId; guess: string; n: number }[] = [];
  for (const [tm, guesses] of Object.entries(conf)) {
    for (const [g, n] of Object.entries(guesses ?? {})) {
      if (!n) continue;
      // skip correct binary-ish
      if (tm === "grok" && g === "grok_bin") continue;
      if (tm !== "grok" && g === "not_bin") continue;
      if (tm === g) continue;
      rows.push({ trueModel: tm as ModelId, guess: g, n });
    }
  }
  return rows.sort((a, b) => b.n - a.n).slice(0, limit);
}
