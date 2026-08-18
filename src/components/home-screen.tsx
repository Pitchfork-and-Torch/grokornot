import type { ReactNode } from "react";
import {
  CircleHelp,
  Crosshair,
  Flame,
  Infinity as InfinityIcon,
  Layers,
  Moon,
  Search,
  Sun,
  Swords,
  Trophy,
  User,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/store/game";
import { useProgress } from "@/store/progress";
import { LIBRARY, utcDayKey } from "@/data/library";
import { rankForXp } from "@/data/badges";
import { cn } from "@/lib/utils";

export function HomeScreen() {
  const openPackSelect = useGame((s) => s.openPackSelect);
  const startEndless = useGame((s) => s.startEndless);
  const startDaily = useGame((s) => s.startDaily);
  const startDetective = useGame((s) => s.startDetective);
  const startBattle = useGame((s) => s.startBattle);
  const openStats = useGame((s) => s.openStats);
  const openLeaderboard = useGame((s) => s.openLeaderboard);
  const openOnboarding = useGame((s) => s.openOnboarding);

  const xp = useProgress((s) => s.xp);
  const allTimeBest = useProgress((s) => s.allTimeBest);
  const bestStreak = useProgress((s) => s.bestStreak);
  const gamesPlayed = useProgress((s) => s.gamesPlayed);
  const totalRounds = useProgress((s) => s.totalRounds);
  const totalCorrect = useProgress((s) => s.totalCorrect);
  const lastDailyDay = useProgress((s) => s.lastDailyDay);
  const lastDailyScore = useProgress((s) => s.lastDailyScore);
  const dailyStreak = useProgress((s) => s.dailyStreak);
  const soundOn = useProgress((s) => s.soundOn);
  const setSound = useProgress((s) => s.setSound);
  const lightMode = useProgress((s) => s.lightMode);
  const setLightMode = useProgress((s) => s.setLightMode);
  const displayName = useProgress((s) => s.displayName);
  const setName = useProgress((s) => s.setName);

  const rankTitle = rankForXp(xp).title;
  const acc = totalRounds > 0 ? Math.round((totalCorrect / totalRounds) * 100) : null;
  const dailyDone = lastDailyDay === utcDayKey();

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col px-4 pb-12 pt-8 sm:pt-12">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-fg-subtle">
            Hot or Not · for models · Arena
          </p>
          <h1 className="mt-2 font-display text-[clamp(2.1rem,7vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-fg">
            Grok or Not
            <span className="ml-2 text-lg font-medium text-accent sm:text-xl">2.0</span>
          </h1>
          <p className="mt-1 text-sm text-fg-muted">The AI Voice Arena</p>
        </div>
        <div className="flex shrink-0 gap-1.5">
          <IconBtn
            label={lightMode ? "Dark mode" : "Light mode"}
            onClick={() => setLightMode(!lightMode)}
          >
            {lightMode ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </IconBtn>
          <IconBtn
            label={soundOn ? "Mute" : "Sound on"}
            onClick={() => setSound(!soundOn)}
          >
            {soundOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
          </IconBtn>
          <IconBtn label="How to play" onClick={openOnboarding}>
            <CircleHelp className="size-4" />
          </IconBtn>
        </div>
      </div>

      <p className="mb-6 max-w-md text-[15px] leading-relaxed text-fg-muted">
        Guess Grok from the pack.{" "}
        <span className="text-fg">{LIBRARY.length}</span> curated voices, five modes, style tells
        that actually train your ear.
      </p>

      <button
        type="button"
        onClick={startDaily}
        className="mb-4 w-full rounded-[var(--radius-2xl)] border border-border bg-card p-5 text-left shadow-[var(--shadow-card)] transition-[border-color,transform] hover:border-border-strong active:scale-[0.99]"
      >
        <div className="flex items-center gap-2 text-accent">
          <Flame className="size-4" aria-hidden />
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
            Daily Challenge
          </span>
          {dailyStreak > 0 && (
            <span className="rounded-full border border-border bg-bg-subtle px-2 py-0.5 text-[10px] font-medium text-fg-muted">
              {dailyStreak}d streak
            </span>
          )}
          {dailyDone && (
            <span className="ml-auto rounded-full border border-border bg-bg-subtle px-2 py-0.5 text-[10px] font-medium text-fg-muted">
              Done · {lastDailyScore} pts
            </span>
          )}
        </div>
        <p className="mt-2 text-lg font-semibold tracking-tight text-fg">
          {dailyDone ? "Replay or climb the board" : "Today's fixed 12-round gauntlet"}
        </p>
        <p className="mt-1 text-sm text-fg-muted">
          Same deck for everyone (UTC) · local ranks · share to challenge friends
        </p>
      </button>

      <div className="mb-4 grid gap-2">
        <ModeRow
          icon={<Layers className="size-4" />}
          title="Classic packs"
          blurb="Humor, Tech, Philosophy, News, Creative, Edgy..."
          onClick={openPackSelect}
        />
        <ModeRow
          icon={<InfinityIcon className="size-4" />}
          title="Endless"
          blurb="3 misses and you're out. Difficulty ramps."
          onClick={startEndless}
        />
        <ModeRow
          icon={<Search className="size-4" />}
          title="Identify the Model"
          blurb="Name the exact voice. Higher points."
          onClick={startDetective}
        />
        <ModeRow
          icon={<Swords className="size-4" />}
          title="Battle"
          blurb="Two answers. Which one is Grok?"
          onClick={startBattle}
        />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2">
        <Button type="button" variant="secondary" className="h-11 rounded-[var(--radius-lg)]" onClick={openStats}>
          <Crosshair className="size-4" />
          Stats
        </Button>
        <Button type="button" variant="secondary" className="h-11 rounded-[var(--radius-lg)]" onClick={openLeaderboard}>
          <Trophy className="size-4" />
          Leaderboard
        </Button>
      </div>

      {(gamesPlayed > 0 || allTimeBest > 0) && (
        <div className="mb-4 grid grid-cols-4 gap-2">
          <MiniStat label="Rank" value={rankTitle} small />
          <MiniStat label="Best" value={String(allTimeBest)} />
          <MiniStat label="Streak" value={String(bestStreak)} />
          <MiniStat label="Acc" value={acc === null ? " - " : `${acc}%`} />
        </div>
      )}

      <div className="rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-4">
        <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-fg-subtle">
          <User className="size-3.5" />
          Display name
        </label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setName(e.target.value)}
          placeholder="For daily board"
          maxLength={24}
          className="mt-2 h-11 w-full rounded-[var(--radius-md)] border border-border bg-bg px-3 text-sm text-fg outline-none ring-ring placeholder:text-fg-subtle focus:ring-2"
        />
        <p className="mt-2 text-xs text-fg-subtle">
          XP {xp} · {totalRounds} rounds · optional name, never required to play
        </p>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="rounded-[var(--radius-md)] border border-border bg-bg-elevated p-2.5 text-fg-muted transition-colors hover:text-fg"
    >
      {children}
    </button>
  );
}

function ModeRow({
  icon,
  title,
  blurb,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  blurb: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-[var(--radius-xl)] border border-border bg-bg-elevated px-4 py-3.5 text-left transition-[border-color,background-color] hover:border-border-strong hover:bg-bg-subtle active:scale-[0.99]"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-border bg-bg-subtle text-fg-muted">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-fg">{title}</p>
        <p className="text-xs text-fg-muted sm:text-sm">{blurb}</p>
      </div>
    </button>
  );
}

function MiniStat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-bg-elevated px-2 py-2 text-center">
      <p className="text-[9px] font-medium uppercase tracking-wider text-fg-subtle">{label}</p>
      <p className={cn("mt-0.5 font-semibold text-fg", small ? "truncate text-[10px]" : "tabular text-sm")}>
        {value}
      </p>
    </div>
  );
}
