import { ArrowLeft } from "lucide-react";
import { PACKS } from "@/data/types";
import { Button } from "@/components/ui/button";
import { useGame } from "@/store/game";

export function PackSelect() {
  const goHome = useGame((s) => s.goHome);
  const startClassic = useGame((s) => s.startClassic);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col px-4 pb-12 pt-6">
      <button
        type="button"
        onClick={goHome}
        className="mb-6 flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="size-4" />
        Home
      </button>
      <h1 className="font-display text-2xl font-semibold tracking-tight text-fg">Classic packs</h1>
      <p className="mt-2 text-sm text-fg-muted">12 rounds each. Binary Grok / Not.</p>

      <div className="mt-6 grid gap-2">
        {PACKS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => startClassic(p.id)}
            className="rounded-[var(--radius-xl)] border border-border bg-card px-4 py-4 text-left transition-[border-color] hover:border-border-strong"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-fg">{p.title}</p>
              <span className="text-xs text-fg-subtle">{p.rounds} rds</span>
            </div>
            <p className="mt-1 text-sm text-fg-muted">{p.blurb}</p>
          </button>
        ))}
      </div>

      <Button type="button" variant="ghost" className="mt-6" onClick={goHome}>
        Cancel
      </Button>
    </div>
  );
}
