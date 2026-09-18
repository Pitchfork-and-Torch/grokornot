import { Flame, Target, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type StatsBarProps = {
  score: number;
  streak: number;
  round: number;
  total: number | null;
  modeLabel: string;
  className?: string;
};

export function StatsBar({ score, streak, round, total, modeLabel, className }: StatsBarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-[var(--radius-lg)] border border-border bg-bg-elevated/80 px-3 py-2.5 sm:px-4",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-2">
        <Trophy className="size-4 shrink-0 text-fg-subtle" aria-hidden />
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle">Score</p>
          <p className="tabular text-sm font-semibold text-fg sm:text-base">{score}</p>
        </div>
      </div>

      <div
        className={cn(
          "flex min-w-0 items-center gap-2 rounded-[var(--radius-sm)] px-2 py-1",
          streak >= 3 && "animate-streak bg-bg-subtle",
        )}
      >
        <Flame
          className={cn("size-4 shrink-0", streak > 0 ? "text-accent" : "text-fg-subtle")}
          aria-hidden
        />
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle">Streak</p>
          <p className="tabular text-sm font-semibold text-fg sm:text-base">{streak}</p>
        </div>
      </div>

      <div className="flex min-w-0 items-center gap-2">
        <Target className="size-4 shrink-0 text-fg-subtle" aria-hidden />
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle">
            {modeLabel}
          </p>
          <p className="tabular text-sm font-semibold text-fg sm:text-base">
            {round}
            {total != null && <span className="text-fg-subtle">/{total}</span>}
          </p>
        </div>
      </div>
    </div>
  );
}
