import { ArrowLeft } from "lucide-react";
import { BADGES, rankForXp } from "@/data/badges";
import { MODEL_LABELS, PACKS, type ModelId, type PackId } from "@/data/types";
import { useGame } from "@/store/game";
import { topConfusions, useProgress } from "@/store/progress";
import { cn } from "@/lib/utils";

export function StatsScreen() {
  const goHome = useGame((s) => s.goHome);
  const xp = useProgress((s) => s.xp);
  const badges = useProgress((s) => s.badges);
  const gamesPlayed = useProgress((s) => s.gamesPlayed);
  const totalRounds = useProgress((s) => s.totalRounds);
  const totalCorrect = useProgress((s) => s.totalCorrect);
  const bestStreak = useProgress((s) => s.bestStreak);
  const allTimeBest = useProgress((s) => s.allTimeBest);
  const dailyPlays = useProgress((s) => s.dailyPlays);
  const dailyStreak = useProgress((s) => s.dailyStreak);
  const modelHits = useProgress((s) => s.modelHits);
  const packHits = useProgress((s) => s.packHits);
  const confusion = useProgress((s) => s.confusion);

  const acc = totalRounds > 0 ? Math.round((totalCorrect / totalRounds) * 100) : null;
  const rankTitle = rankForXp(xp).title;
  const confusions = topConfusions(confusion, 4);

  const nextBadge = BADGES.find((b) => !badges.includes(b.id));

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

      <h1 className="font-display text-2xl font-semibold tracking-tight">Arena stats</h1>
      <p className="mt-1 text-sm text-fg-muted">
        Rank: <span className="text-fg">{rankTitle}</span> · {xp} XP
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Stat label="Games" value={String(gamesPlayed)} />
        <Stat label="Rounds" value={String(totalRounds)} />
        <Stat label="Accuracy" value={acc === null ? " - " : `${acc}%`} />
        <Stat label="Best streak" value={String(bestStreak)} />
        <Stat label="Best score" value={String(allTimeBest)} />
        <Stat label="Daily streak" value={String(dailyStreak)} />
      </div>

      {nextBadge && (
        <div className="mt-6 rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-4">
          <p className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle">
            Next achievement
          </p>
          <p className="mt-1 text-sm font-semibold text-fg">{nextBadge.title}</p>
          <p className="mt-0.5 text-xs text-fg-muted">{nextBadge.blurb}</p>
          <p className="mt-2 text-xs text-fg-subtle">
            {badges.length}/{BADGES.length} unlocked · {dailyPlays} dailies played
          </p>
        </div>
      )}

      <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
        Per-model accuracy
      </h2>
      <ul className="mt-3 space-y-2">
        {(Object.keys(MODEL_LABELS) as ModelId[]).map((m) => {
          const hit = modelHits[m];
          const pct =
            hit && hit.total > 0 ? Math.round((hit.correct / hit.total) * 100) : null;
          return (
            <li
              key={m}
              className="flex items-center justify-between rounded-[var(--radius-md)] border border-border bg-bg-elevated px-3 py-2.5 text-sm"
            >
              <span className="text-fg">{MODEL_LABELS[m]}</span>
              <span className="tabular text-fg-muted">
                {pct === null ? " - " : `${pct}%`}
                {hit ? ` · ${hit.total}` : ""}
              </span>
            </li>
          );
        })}
      </ul>

      <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
        By pack
      </h2>
      <ul className="mt-3 space-y-2">
        {PACKS.filter((p) => p.id !== "mixed").map((p) => {
          const hit = packHits[p.id as PackId];
          const pct =
            hit && hit.total > 0 ? Math.round((hit.correct / hit.total) * 100) : null;
          if (!hit) return null;
          return (
            <li
              key={p.id}
              className="flex items-center justify-between rounded-[var(--radius-md)] border border-border bg-bg-elevated px-3 py-2.5 text-sm"
            >
              <span className="text-fg">{p.title}</span>
              <span className="tabular text-fg-muted">
                {pct === null ? " - " : `${pct}%`} · {hit.total}
              </span>
            </li>
          );
        })}
      </ul>

      {confusions.length > 0 && (
        <>
          <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
            Models you confuse
          </h2>
          <ul className="mt-3 space-y-2">
            {confusions.map((c) => (
              <li
                key={`${c.trueModel}-${c.guess}`}
                className="rounded-[var(--radius-md)] border border-border bg-bg-elevated px-3 py-2.5 text-sm text-fg-muted"
              >
                True <span className="font-medium text-fg">{MODEL_LABELS[c.trueModel]}</span>
                {" → "}
                guessed{" "}
                <span className="font-medium text-fg">
                  {c.guess === "grok_bin"
                    ? "Grok"
                    : c.guess === "not_bin"
                      ? "Not"
                      : MODEL_LABELS[c.guess as ModelId] ?? c.guess}
                </span>
                <span className="tabular text-fg-subtle"> · {c.n}×</span>
              </li>
            ))}
          </ul>
        </>
      )}

      <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-fg-subtle">
        Badges
      </h2>
      <ul className="mt-3 grid gap-2">
        {BADGES.map((b) => {
          const owned = badges.includes(b.id);
          return (
            <li
              key={b.id}
              className={cn(
                "rounded-[var(--radius-md)] border px-3 py-3",
                owned
                  ? "border-border bg-card text-fg"
                  : "border-border/60 bg-bg-elevated/50 text-fg-subtle",
              )}
            >
              <p className="text-sm font-medium">{b.title}</p>
              <p className="mt-0.5 text-xs opacity-80">{b.blurb}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-bg-elevated px-3 py-3 text-center">
      <p className="text-[10px] font-medium uppercase tracking-wider text-fg-subtle">{label}</p>
      <p className="tabular mt-1 text-lg font-semibold text-fg">{value}</p>
    </div>
  );
}
