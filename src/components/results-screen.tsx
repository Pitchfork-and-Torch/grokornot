import { Copy, Home, Link2, RotateCcw, Share2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShareCard, buildShareText } from "@/components/share-card";
import { MODEL_LABELS, type GameMode, type ModelId } from "@/data/types";
import type { HistoryEntry } from "@/store/game";
import { makeChallengeCode, useGame } from "@/store/game";
import { badgeMeta } from "@/store/progress";
import type { BadgeId } from "@/data/badges";
import { cn } from "@/lib/utils";

const MODE_LABEL: Record<GameMode, string> = {
  classic: "Classic",
  endless: "Endless",
  daily: "Daily Challenge",
  detective: "Model Detective",
  battle: "Battle",
};

export function ResultsScreen() {
  const mode = useGame((s) => s.mode);
  const score = useGame((s) => s.score);
  const bestStreak = useGame((s) => s.bestStreak);
  const history = useGame((s) => s.history);
  const newBadges = useGame((s) => s.newBadges);
  const xpGained = useGame((s) => s.xpGained);
  const pack = useGame((s) => s.pack);
  const challengeTarget = useGame((s) => s.challengeTarget);
  const misses = useGame((s) => s.misses);
  const goHome = useGame((s) => s.goHome);
  const startClassic = useGame((s) => s.startClassic);
  const startEndless = useGame((s) => s.startEndless);
  const startDaily = useGame((s) => s.startDaily);
  const startDetective = useGame((s) => s.startDetective);
  const startBattle = useGame((s) => s.startBattle);

  const [copied, setCopied] = useState<"share" | "link" | null>(null);

  const correct = history.filter((h) => h.correct).length;
  const total = history.length;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;

  const challengeCode = useMemo(() => makeChallengeCode(pack, score), [pack, score]);
  const challengeUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}?c=${challengeCode}`
      : `?c=${challengeCode}`;

  const shareText = buildShareText({
    mode,
    score,
    accuracy,
    bestStreak,
    challengeUrl,
  });

  const beatChallenge =
    challengeTarget != null ? score > challengeTarget : null;

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Grok or Not 2.0", text: shareText });
        return;
      }
      await navigator.clipboard.writeText(shareText);
      setCopied("share");
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // cancelled
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(challengeUrl);
      setCopied("link");
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // ignore
    }
  }

  function playAgain() {
    if (mode === "classic") startClassic(pack);
    else if (mode === "endless") startEndless();
    else if (mode === "daily") startDaily();
    else if (mode === "detective") startDetective();
    else startBattle();
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col px-4 pb-10 pt-8 sm:pt-12">
      <div className="mb-5 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-fg-subtle">
          {MODE_LABEL[mode]} complete
          {mode === "endless" && misses > 0 ? ` · ${misses} miss${misses === 1 ? "" : "es"}` : ""}
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.03em] text-fg sm:text-5xl">
          {score}
          <span className="ml-2 text-lg font-medium text-fg-subtle">pts</span>
        </h1>
        {beatChallenge === true && (
          <p className="mt-2 text-sm font-medium text-accent">You beat the challenge score</p>
        )}
        {beatChallenge === false && (
          <p className="mt-2 text-sm text-fg-muted">
            Challenge target was {challengeTarget}  -  so close (or not)
          </p>
        )}
        <p className="mt-3 text-sm text-fg-muted">
          {correct}/{total} correct · {accuracy}% · streak {bestStreak} · +{xpGained} XP
        </p>
      </div>

      <ShareCard
        mode={mode}
        score={score}
        accuracy={accuracy}
        bestStreak={bestStreak}
        history={history}
        className="mb-4"
      />

      {newBadges.length > 0 && (
        <div className="mb-4 rounded-[var(--radius-xl)] border border-accent/30 bg-bg-elevated p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-accent">New badges</p>
          <ul className="mt-2 space-y-1">
            {newBadges.map((id) => {
              const b = badgeMeta(id as BadgeId);
              return (
                <li key={id} className="text-sm text-fg">
                  {b?.title ?? id}
                  {b && <span className="text-fg-muted">  -  {b.blurb}</span>}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="mb-6 overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="border-b border-border px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wider text-fg-subtle">Round log</p>
        </div>
        <ul className="max-h-[28vh] divide-y divide-border overflow-y-auto">
          {history.map((h, i) => (
            <LogRow key={`${h.id}-${i}`} entry={h} index={i} />
          ))}
        </ul>
      </div>

      <div className="grid gap-3">
        <Button
          type="button"
          variant="grok"
          size="lg"
          className="h-12 w-full rounded-[var(--radius-lg)]"
          onClick={playAgain}
        >
          <RotateCcw className="size-4" aria-hidden />
          Play again
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="h-12 rounded-[var(--radius-lg)]"
            onClick={share}
          >
            {copied === "share" ? <Copy className="size-4" /> : <Share2 className="size-4" />}
            {copied === "share" ? "Copied" : "Share"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="h-12 rounded-[var(--radius-lg)]"
            onClick={copyLink}
          >
            <Link2 className="size-4" />
            {copied === "link" ? "Link copied" : "Challenge"}
          </Button>
        </div>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-12 rounded-[var(--radius-lg)]"
          onClick={goHome}
        >
          <Home className="size-4" aria-hidden />
          Home
        </Button>
      </div>
    </div>
  );
}

function LogRow({ entry, index }: { entry: HistoryEntry; index: number }) {
  return (
    <li className="flex items-center gap-3 px-4 py-3">
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
          entry.correct ? "bg-success/15 text-success" : "bg-danger/15 text-danger",
        )}
      >
        {index + 1}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">
          {MODEL_LABELS[entry.model as ModelId] ?? entry.model}
        </p>
        <p className="truncate text-xs text-fg-subtle">
          You: {entry.guessLabel} · {entry.correct ? `+${entry.points}` : "miss"}
        </p>
      </div>
    </li>
  );
}
