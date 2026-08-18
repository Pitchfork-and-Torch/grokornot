import type { ReactNode } from "react";
import { Bot, Crosshair, Flame, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";

type IntroScreenProps = {
  allTimeBest: number;
  gamesPlayed: number;
  accuracy: number | null;
  onStart: () => void;
};

export function IntroScreen({ allTimeBest, gamesPlayed, accuracy, onStart }: IntroScreenProps) {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col px-4 pb-10 pt-8 sm:pt-14">
      <div className="mb-8 text-center">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-fg-subtle">
          Hot or Not · for models
        </p>
        <h1 className="font-display text-[clamp(2.5rem,8vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-fg">
          Grok or Not
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-fg-muted">
          Read a human question and an anonymous AI answer. Guess if it came from{" "}
          <span className="text-fg">Grok</span>  -  or some other model.
        </p>
      </div>

      <div className="mb-8 grid gap-3 rounded-[var(--radius-2xl)] border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <Feature
          icon={<Crosshair className="size-4" />}
          title="12 rounds"
          body="Curated Q&As with distinctive model voices. No API required."
        />
        <Feature
          icon={<Bot className="size-4" />}
          title="Binary call"
          body="Grok or Not. Streaks boost your score. Tells reveal the voice."
        />
        <Feature
          icon={<Keyboard className="size-4" />}
          title="Keyboard ready"
          body="Press G for Grok, N for Not, Enter for next."
        />
      </div>

      {(gamesPlayed > 0 || allTimeBest > 0) && (
        <div className="mb-6 grid grid-cols-3 gap-2">
          <Stat label="Best" value={String(allTimeBest)} />
          <Stat label="Games" value={String(gamesPlayed)} />
          <Stat
            label="Accuracy"
            value={accuracy === null ? " - " : `${Math.round(accuracy * 100)}%`}
          />
        </div>
      )}

      <Button
        type="button"
        variant="grok"
        size="xl"
        className="h-14 w-full rounded-[var(--radius-xl)] text-base"
        onClick={onStart}
      >
        <Flame className="size-5" aria-hidden />
        Play
      </Button>
    </div>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-bg-subtle text-fg-muted">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-fg">{title}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-fg-muted">{body}</p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-bg-elevated px-3 py-2.5 text-center">
      <p className="text-[10px] font-medium uppercase tracking-wider text-fg-subtle">{label}</p>
      <p className="tabular mt-0.5 text-sm font-semibold text-fg">{value}</p>
    </div>
  );
}
