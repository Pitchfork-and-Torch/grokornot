import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { GameShell } from "@/components/game-shell";
import { useGame } from "@/store/game";
import { useProgress } from "@/store/progress";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const lightMode = useProgress((s) => s.lightMode);
  const onboarded = useProgress((s) => s.onboarded);
  const openOnboarding = useGame((s) => s.openOnboarding);
  const startChallenge = useGame((s) => s.startChallenge);
  const phase = useGame((s) => s.phase);

  useEffect(() => {
    document.documentElement.dataset.theme = lightMode ? "light" : "dark";
    document.documentElement.style.colorScheme = lightMode ? "light" : "dark";
  }, [lightMode]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const c = params.get("c");
    if (c) {
      startChallenge(c);
      // clean URL without reload
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }
    if (!onboarded && phase === "home") {
      openOnboarding();
    }
  }, [onboarded, openOnboarding, startChallenge, phase]);

  return (
    <main className="min-h-dvh bg-bg">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, color-mix(in oklab, var(--color-accent) 8%, transparent), transparent 70%)",
        }}
      />
      <GameShell />
    </main>
  );
}
