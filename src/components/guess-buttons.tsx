import { Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BinaryGuess } from "@/store/game";
import { MODEL_LABELS, type ModelId } from "@/data/types";
import { cn } from "@/lib/utils";

export function BinaryGuessButtons({
  disabled,
  onGuess,
  className,
}: {
  disabled?: boolean;
  onGuess: (g: BinaryGuess) => void;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-2 gap-3", className)}>
      <Button
        type="button"
        variant="grok"
        size="xl"
        disabled={disabled}
        onClick={() => onGuess("grok")}
        className="h-16 rounded-[var(--radius-xl)] sm:h-[4.5rem]"
        aria-label="Guess Grok"
      >
        <Bot className="size-5 shrink-0 sm:size-6" aria-hidden />
        <span className="flex flex-col items-start leading-none">
          <span className="text-lg font-semibold tracking-wide sm:text-xl">Grok</span>
          <span className="mt-1 text-[11px] font-normal opacity-60">It's Grok</span>
        </span>
      </Button>
      <Button
        type="button"
        variant="not"
        size="xl"
        disabled={disabled}
        onClick={() => onGuess("not")}
        className="h-16 rounded-[var(--radius-xl)] sm:h-[4.5rem]"
        aria-label="Guess Not Grok"
      >
        <X className="size-5 shrink-0 sm:size-6" aria-hidden />
        <span className="flex flex-col items-start leading-none">
          <span className="text-lg font-semibold tracking-wide sm:text-xl">Not</span>
          <span className="mt-1 text-[11px] font-normal text-fg-muted">Some other AI</span>
        </span>
      </Button>
    </div>
  );
}

export function DetectiveGuessButtons({
  options,
  disabled,
  onGuess,
}: {
  options: ModelId[];
  disabled?: boolean;
  onGuess: (m: ModelId) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((m, i) => (
        <Button
          key={m}
          type="button"
          variant="secondary"
          size="lg"
          disabled={disabled}
          onClick={() => onGuess(m)}
          className="h-14 justify-start rounded-[var(--radius-lg)] px-4"
          aria-label={`Guess ${MODEL_LABELS[m]}`}
        >
          <span className="mr-2 flex size-6 items-center justify-center rounded-full border border-border text-xs text-fg-subtle">
            {i + 1}
          </span>
          {MODEL_LABELS[m]}
        </Button>
      ))}
    </div>
  );
}

export function BattleGuessButtons({
  disabled,
  onGuess,
}: {
  disabled?: boolean;
  onGuess: (side: "left" | "right") => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        type="button"
        variant="grok"
        size="xl"
        disabled={disabled}
        onClick={() => onGuess("left")}
        className="h-14 rounded-[var(--radius-xl)]"
        aria-label="Answer A is Grok"
      >
        A is Grok
      </Button>
      <Button
        type="button"
        variant="not"
        size="xl"
        disabled={disabled}
        onClick={() => onGuess("right")}
        className="h-14 rounded-[var(--radius-xl)]"
        aria-label="Answer B is Grok"
      >
        B is Grok
      </Button>
    </div>
  );
}
