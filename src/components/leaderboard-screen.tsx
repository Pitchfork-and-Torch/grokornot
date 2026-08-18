import { ArrowLeft } from "lucide-react";
import { utcDayKey } from "@/data/library";
import { useGame } from "@/store/game";
import { useProgress } from "@/store/progress";

export function LeaderboardScreen() {
  const goHome = useGame((s) => s.goHome);
  const board = useProgress((s) => s.dailyBoard);
  const day = utcDayKey();
  const today = board.filter((e) => e.day === day).sort((a, b) => b.score - a.score);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col px-4 pb-12 pt-6">
      <button
        type="button"
        onClick={goHome}
        className="mb-6 flex items-center gap-2 text-sm text-fg-muted hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        Home
      </button>

      <h1 className="font-display text-2xl font-semibold tracking-tight">Daily leaderboard</h1>
      <p className="mt-1 text-sm text-fg-muted">
        {day} UTC · scores saved on this device (set a display name on Home)
      </p>

      {today.length === 0 ? (
        <div className="mt-8 rounded-[var(--radius-xl)] border border-border bg-card p-6 text-center">
          <p className="text-sm text-fg-muted">No scores yet today. Play the Daily Challenge.</p>
        </div>
      ) : (
        <ol className="mt-6 divide-y divide-border overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card">
          {today.map((e, i) => (
            <li key={`${e.name}-${e.at}`} className="flex items-center gap-3 px-4 py-3">
              <span className="tabular w-6 text-sm font-semibold text-fg-subtle">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-fg">{e.name}</p>
                <p className="text-xs text-fg-subtle">
                  streak {e.streak} · {Math.round(e.accuracy * 100)}%
                </p>
              </div>
              <span className="tabular text-sm font-semibold text-fg">{e.score}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
