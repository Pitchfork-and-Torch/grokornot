import { MessageSquare, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type RoundCardProps = {
  question: string;
  answer: string;
  category?: string;
  cardKey: string;
  className?: string;
};

export function RoundCard({ question, answer, category, cardKey, className }: RoundCardProps) {
  return (
    <article
      key={cardKey}
      className={cn(
        "animate-card-in flex min-h-0 flex-1 flex-col overflow-hidden rounded-[var(--radius-2xl)] border border-border bg-card shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <header className="border-b border-border px-4 py-3 sm:px-5 sm:py-4">
        <div className="mb-2 flex items-center gap-2 text-fg-subtle">
          <MessageSquare className="size-3.5 shrink-0" aria-hidden />
          <span className="text-[11px] font-medium uppercase tracking-[0.14em]">Human asked</span>
          {category && (
            <span className="ml-auto rounded-full border border-border bg-bg-subtle px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-fg-muted">
              {category}
            </span>
          )}
        </div>
        <p className="text-base font-medium leading-snug tracking-tight text-fg sm:text-lg">
          {question}
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
        <div className="mb-3 flex items-center gap-2 text-fg-subtle">
          <Sparkles className="size-3.5 shrink-0" aria-hidden />
          <span className="text-[11px] font-medium uppercase tracking-[0.14em]">
            Anonymous model replied
          </span>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
          <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-fg-muted sm:text-base">
            {answer}
          </p>
        </div>
      </div>
    </article>
  );
}
