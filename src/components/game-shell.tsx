import { useEffect } from "react";
import { BattleCard } from "@/components/battle-card";
import {
  BattleGuessButtons,
  BinaryGuessButtons,
  DetectiveGuessButtons,
} from "@/components/guess-buttons";
import { HomeScreen } from "@/components/home-screen";
import { LeaderboardScreen } from "@/components/leaderboard-screen";
import { Onboarding } from "@/components/onboarding";
import { PackSelect } from "@/components/pack-select";
import { ResultsScreen } from "@/components/results-screen";
import { RevealPanel } from "@/components/reveal-panel";
import { RoundCard } from "@/components/round-card";
import { StatsBar } from "@/components/stats-bar";
import { StatsScreen } from "@/components/stats-screen";
import { MODEL_LABELS } from "@/data/types";
import { playTone } from "@/lib/sound";
import { useGame } from "@/store/game";
import { useProgress } from "@/store/progress";

const MODE_HUD: Record<string, string> = {
  classic: "Classic",
  endless: "Endless",
  daily: "Daily",
  detective: "Detective",
  battle: "Battle",
};

export function GameShell() {
  const phase = useGame((s) => s.phase);
  const mode = useGame((s) => s.mode);
  const deck = useGame((s) => s.deck);
  const battles = useGame((s) => s.battles);
  const index = useGame((s) => s.index);
  const score = useGame((s) => s.score);
  const streak = useGame((s) => s.streak);
  const misses = useGame((s) => s.misses);
  const maxMisses = useGame((s) => s.maxMisses);
  const lastCorrect = useGame((s) => s.lastCorrect);
  const lastPoints = useGame((s) => s.lastPoints);
  const lastModel = useGame((s) => s.lastModel);
  const lastTells = useGame((s) => s.lastTells);
  const lastBattle = useGame((s) => s.lastBattle);
  const detectiveOptions = useGame((s) => s.detectiveOptions);
  const goHome = useGame((s) => s.goHome);
  const guessBinary = useGame((s) => s.guessBinary);
  const guessDetective = useGame((s) => s.guessDetective);
  const guessBattle = useGame((s) => s.guessBattle);
  const next = useGame((s) => s.next);
  const soundOn = useProgress((s) => s.soundOn);

  const round = mode === "battle" ? null : deck[index];
  const battle = mode === "battle" ? battles[index] : null;
  const total =
    mode === "endless" ? null : mode === "battle" ? battles.length : deck.length;

  const showLast =
    mode === "endless"
      ? (maxMisses > 0 && misses >= maxMisses) || index >= deck.length - 1
      : mode === "battle"
        ? index >= battles.length - 1
        : index >= deck.length - 1;

  useEffect(() => {
    if (phase !== "reveal" || lastCorrect === null || !soundOn) return;
    if (lastCorrect) {
      playTone(streak >= 3 ? "streak" : "correct");
    } else {
      playTone("wrong");
    }
  }, [phase, lastCorrect, streak, soundOn, index]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (phase === "playing") {
        if (mode === "battle") {
          if (e.key === "a" || e.key === "A" || e.key === "1") {
            e.preventDefault();
            guessBattle("left");
          } else if (e.key === "b" || e.key === "B" || e.key === "2") {
            e.preventDefault();
            guessBattle("right");
          }
          return;
        }
        if (mode === "detective") {
          const n = Number(e.key);
          if (n >= 1 && n <= detectiveOptions.length) {
            e.preventDefault();
            const m = detectiveOptions[n - 1];
            if (m) guessDetective(m);
          }
          return;
        }
        if (e.key === "g" || e.key === "G" || e.key === "1") {
          e.preventDefault();
          guessBinary("grok");
        } else if (e.key === "n" || e.key === "N" || e.key === "2") {
          e.preventDefault();
          guessBinary("not");
        }
        return;
      }
      if (phase === "reveal" && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        next();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [
    phase,
    mode,
    detectiveOptions,
    guessBinary,
    guessDetective,
    guessBattle,
    next,
  ]);

  if (phase === "home") return <HomeScreen />;
  if (phase === "pack-select") return <PackSelect />;
  if (phase === "onboarding") return <Onboarding />;
  if (phase === "stats") return <StatsScreen />;
  if (phase === "leaderboard") return <LeaderboardScreen />;
  if (phase === "results") return <ResultsScreen />;

  if (mode === "battle" && !battle) return null;
  if (mode !== "battle" && !round) return null;

  const battleNote =
    mode === "battle" && lastBattle
      ? `A was ${MODEL_LABELS[lastBattle.left.model]} · B was ${MODEL_LABELS[lastBattle.right.model]}`
      : null;

  const modeLabel =
    mode === "endless" && maxMisses > 0
      ? `Lives ${Math.max(0, maxMisses - misses)}`
      : MODE_HUD[mode] ?? "Round";

  return (
    <div className="mx-auto flex h-[100dvh] w-full max-w-lg flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] sm:max-w-2xl">
      <header className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fg-subtle">
          AI Voice Arena
        </p>
        <button
          type="button"
          onClick={goHome}
          className="rounded-[var(--radius-sm)] px-2 py-1 text-xs text-fg-subtle transition-colors hover:bg-bg-subtle hover:text-fg"
        >
          Exit
        </button>
      </header>

      <StatsBar
        score={score}
        streak={streak}
        round={index + 1}
        total={total}
        modeLabel={modeLabel}
        className="mb-3 shrink-0"
      />

      {mode === "battle" && battle ? (
        <BattleCard pair={battle} cardKey={`${battle.id}-${index}`} className="mb-3 min-h-0" />
      ) : round ? (
        <RoundCard
          question={round.question}
          answer={round.answer}
          category={round.pack}
          cardKey={`${round.id}-${index}`}
          className="mb-3 min-h-0"
        />
      ) : null}

      <div className="mt-auto shrink-0 pt-1">
        {phase === "playing" && mode === "battle" && (
          <>
            <BattleGuessButtons onGuess={guessBattle} />
            <p className="mt-3 text-center text-[11px] text-fg-subtle">
              Keyboard: <kbd className="text-fg-muted">A</kbd> /{" "}
              <kbd className="text-fg-muted">B</kbd>
            </p>
          </>
        )}
        {phase === "playing" && mode === "detective" && (
          <>
            <DetectiveGuessButtons options={detectiveOptions} onGuess={guessDetective} />
            <p className="mt-3 text-center text-[11px] text-fg-subtle">
              Keyboard: <kbd className="text-fg-muted">1 - 4</kbd>
            </p>
          </>
        )}
        {phase === "playing" && mode !== "battle" && mode !== "detective" && (
          <>
            <BinaryGuessButtons onGuess={guessBinary} />
            <p className="mt-3 text-center text-[11px] text-fg-subtle">
              Keyboard: <kbd className="text-fg-muted">G</kbd> Grok ·{" "}
              <kbd className="text-fg-muted">N</kbd> Not
            </p>
          </>
        )}
        {phase === "reveal" && lastModel && lastCorrect !== null && (
          <RevealPanel
            correct={lastCorrect}
            model={lastModel}
            tells={lastTells}
            points={lastPoints}
            isLast={showLast}
            battleNote={battleNote}
            onNext={next}
          />
        )}
      </div>
    </div>
  );
}
