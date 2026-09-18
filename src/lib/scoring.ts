import type { Difficulty, GameMode } from "@/data/types";

export function basePoints(mode: GameMode, difficulty: Difficulty): number {
  const d = difficulty === 1 ? 100 : difficulty === 2 ? 140 : 180;
  if (mode === "detective") return d + 60;
  if (mode === "battle") return d + 20;
  if (mode === "daily") return d + 40;
  return d;
}

export function streakBonus(streak: number): number {
  if (streak < 3) return 0;
  return Math.min(streak * 15, 200);
}

export function xpForResult(correct: boolean, mode: GameMode, difficulty: Difficulty): number {
  if (!correct) return 2;
  const base = difficulty * 8 + (mode === "detective" ? 12 : mode === "daily" ? 10 : 6);
  return base;
}
