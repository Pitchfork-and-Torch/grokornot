import type { ReactNode } from "react";
import { Bot, Keyboard, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/store/game";
import { useProgress } from "@/store/progress";

export function Onboarding() {
  const goHome = useGame((s) => s.goHome);
  const startClassic = useGame((s) => s.startClassic);
  const setOnboarded = useProgress((s) => s.setOnboarded);

  function finish(play: boolean) {
    setOnboarded(true);
    if (play) startClassic("mixed");
    else goHome();
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col px-4 pb-12 pt-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-fg-subtle">
        30-second briefing
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-fg">
        How the Arena works
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">
        Same addictive loop as the original  -  now with modes, tells, and stats that train your ear.
      </p>

      <ul className="mt-8 space-y-4">
        <Step
          icon={<Target className="size-4" />}
          title="Read & call"
          body="Human question + anonymous answer. Tap Grok or Not (or name the model in Detective)."
        />
        <Step
          icon={<Sparkles className="size-4" />}
          title="Learn the tells"
          body="Every reveal breaks down stylistic markers  -  wit, hedges, structure, spice."
        />
        <Step
          icon={<Keyboard className="size-4" />}
          title="Stay keyboard-fast"
          body="G / N for binary · 1 - 4 Detective · A / B Battle · Enter next."
        />
        <Step
          icon={<Bot className="size-4" />}
          title="Come back daily"
          body="Shared Daily deck, streaks, achievements, and challenge links for friends."
        />
      </ul>

      <div className="mt-10 grid gap-3">
        <Button
          type="button"
          variant="grok"
          size="lg"
          className="h-12 rounded-[var(--radius-lg)]"
          onClick={() => finish(true)}
        >
          Play Classic Mix
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="h-12 rounded-[var(--radius-lg)]"
          onClick={() => finish(false)}
        >
          Skip to home
        </Button>
      </div>
    </div>
  );
}

function Step({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-3">
      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-bg-subtle text-fg-muted">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-fg">{title}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-fg-muted">{body}</p>
      </div>
    </li>
  );
}
