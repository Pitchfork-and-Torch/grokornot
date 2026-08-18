import { MODEL_LABELS, type GameMode } from "@/data/types";
import type { HistoryEntry } from "@/store/game";
import { cn } from "@/lib/utils";

const MODE_LABEL: Record<GameMode, string> = {
  classic: "Classic",
  endless: "Endless",
  daily: "Daily Challenge",
  detective: "Model Detective",
  battle: "Battle",
};

export function ShareCard({
  mode,
  score,
  accuracy,
  bestStreak,
  history,
  className,
}: {
  mode: GameMode;
  score: number;
  accuracy: number;
  bestStreak: number;
  history: HistoryEntry[];
  className?: string;
}) {
  const quote =
    history.find((h) => h.correct)?.question ??
    history[0]?.question ??
    "Can you hear the difference?";
  const short = quote.length > 90 ? `${quote.slice(0, 87)}...` : quote;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-card p-5 shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 100% 0%, color-mix(in oklab, var(--color-accent) 25%, transparent), transparent 55%)",
        }}
      />
      <div className="relative">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-subtle">
          Grok or Not 2.0 · AI Voice Arena
        </p>
        <p className="mt-3 text-xs font-medium text-accent">{MODE_LABEL[mode]}</p>
        <p className="mt-1 font-display text-4xl font-semibold tracking-tight text-fg tabular">
          {score}
          <span className="ml-2 text-base font-medium text-fg-subtle">pts</span>
        </p>
        <p className="mt-2 text-sm text-fg-muted">
          {accuracy}% accuracy · streak {bestStreak}
        </p>
        <p className="mt-4 border-l-2 border-accent/50 pl-3 text-sm italic leading-relaxed text-fg-muted">
          "{short}"
        </p>
        <p className="mt-5 text-xs font-medium text-fg">
          Can you beat my Grok detection score?
        </p>
        <p className="mt-1 text-[11px] text-fg-subtle">
          Hot or Not · for models ·{" "}
          {history.filter((h) => h.model === "grok").length > 0
            ? `heard ${MODEL_LABELS.grok}`
            : "train your ear"}
        </p>
      </div>
    </div>
  );
}

export function buildShareText(opts: {
  mode: GameMode;
  score: number;
  accuracy: number;
  bestStreak: number;
  challengeUrl?: string;
}) {
  const line = `I scored ${opts.score} on Grok or Not 2.0 (${MODE_LABEL[opts.mode]})  -  ${opts.accuracy}% accuracy, streak ${opts.bestStreak}. Can you beat my Grok detection score?`;
  return opts.challengeUrl ? `${line}\n${opts.challengeUrl}` : line;
}
