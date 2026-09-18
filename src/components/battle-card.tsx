import { MessageSquare } from "lucide-react";
import type { BattlePair } from "@/data/types";
import { cn } from "@/lib/utils";

export function BattleCard({
  pair,
  cardKey,
  className,
}: {
  pair: BattlePair;
  cardKey: string;
  className?: string;
}) {
  return (
    <article
      key={cardKey}
      className={cn(
        "animate-card-in flex min-h-0 flex-1 flex-col overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-card shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <header className="border-b border-border px-4 py-3 sm:px-5">
        <div className="mb-2 flex items-center gap-2 text-fg-subtle">
          <MessageSquare className="size-3.5" aria-hidden />
          <span className="text-[11px] font-medium uppercase tracking-[0.14em]">Same question</span>
          <span className="ml-auto rounded-full border border-border bg-bg-subtle px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-fg-muted">
            {pair.pack}
          </span>
        </div>
        <p className="text-base font-medium leading-snug text-fg sm:text-lg">{pair.question}</p>
      </header>

      <div className="grid min-h-0 flex-1 gap-0 overflow-y-auto sm:grid-cols-2">
        <Side label="A" answer={pair.left.answer} />
        <Side label="B" answer={pair.right.answer} border />
      </div>
    </article>
  );
}

function Side({ label, answer, border }: { label: string; answer: string; border?: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-col px-4 py-4 sm:px-5",
        border && "border-t border-border sm:border-l sm:border-t-0",
      )}
    >
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">
        Answer {label}
      </p>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-fg-muted sm:text-[15px]">
        {answer}
      </p>
    </div>
  );
}
