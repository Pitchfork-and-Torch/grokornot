import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MODEL_ACCENT, MODEL_LABELS, type ModelId } from "@/data/types";
import { cn } from "@/lib/utils";

type RevealPanelProps = {
  correct: boolean;
  model: ModelId;
  tells: string[];
  points: number;
  isLast: boolean;
  battleNote?: string | null;
  onNext: () => void;
  className?: string;
};

export function RevealPanel({
  correct,
  model,
  tells,
  points,
  isLast,
  battleNote,
  onNext,
  className,
}: RevealPanelProps) {
  return (
    <div
      className={cn(
        "animate-reveal rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-4 sm:p-5",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full",
            correct ? "bg-success/15 text-success" : "bg-danger/15 text-danger",
          )}
        >
          {correct ? <Check className="size-5" aria-hidden /> : <X className="size-5" aria-hidden />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <p className={cn("text-base font-semibold", correct ? "text-success" : "text-danger")}>
              {correct ? "Correct" : "Wrong"}
            </p>
            {correct && points > 0 && (
              <span className="tabular text-sm font-medium text-accent">+{points}</span>
            )}
          </div>
          <p className="mt-2 flex flex-wrap items-center gap-2 text-sm leading-snug text-fg-muted">
            That was{" "}
            <span
              className="inline-flex items-center rounded-full border border-border bg-bg-subtle px-2.5 py-0.5 text-xs font-semibold text-fg"
              style={{ boxShadow: `inset 0 0 0 1px ${MODEL_ACCENT[model]}33` }}
            >
              <span
                className="mr-1.5 size-1.5 rounded-full"
                style={{ background: MODEL_ACCENT[model] }}
                aria-hidden
              />
              {MODEL_LABELS[model]}
            </span>
            {model === "grok" ? " -  pure Grok." : " -  not Grok."}
          </p>
          {battleNote && <p className="mt-1 text-xs text-fg-subtle">{battleNote}</p>}
          <div className="mt-3 rounded-[var(--radius-md)] border border-border bg-bg-subtle px-3 py-2.5">
            <p className="text-[11px] font-medium uppercase tracking-wider text-fg-subtle">
              Style tells
            </p>
            <ul className="mt-2 space-y-1.5">
              {tells.map((t) => (
                <li key={t} className="flex gap-2 text-sm leading-snug text-fg-muted">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-fg-subtle" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            {model === "grok" ? (
              <p className="mt-3 border-t border-border pt-2 text-xs leading-relaxed text-fg-subtle">
                Grok signatures often include direct claims, humor density, low sycophancy, and
                closers that refuse corporate mush.
              </p>
            ) : (
              <p className="mt-3 border-t border-border pt-2 text-xs leading-relaxed text-fg-subtle">
                Other models often hedge more, structure with lists, or soften takes for safety and
                helpfulness.
              </p>
            )}
          </div>
        </div>
      </div>

      <Button
        type="button"
        variant="default"
        size="lg"
        className="mt-4 w-full rounded-[var(--radius-lg)]"
        onClick={onNext}
      >
        {isLast ? "See results" : "Next round"}
      </Button>
    </div>
  );
}
