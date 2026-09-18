/** Tiny WebAudio blips  -  no asset files */
export function playTone(kind: "correct" | "wrong" | "streak" | "tap") {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    const now = ctx.currentTime;
    if (kind === "correct") {
      o.frequency.setValueAtTime(520, now);
      o.frequency.exponentialRampToValueAtTime(780, now + 0.08);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.08, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      o.start(now);
      o.stop(now + 0.2);
    } else if (kind === "wrong") {
      o.type = "triangle";
      o.frequency.setValueAtTime(220, now);
      o.frequency.exponentialRampToValueAtTime(120, now + 0.15);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.06, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      o.start(now);
      o.stop(now + 0.22);
    } else if (kind === "streak") {
      o.frequency.setValueAtTime(440, now);
      o.frequency.setValueAtTime(660, now + 0.07);
      o.frequency.setValueAtTime(880, now + 0.14);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.07, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
      o.start(now);
      o.stop(now + 0.3);
    } else {
      o.frequency.setValueAtTime(340, now);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.03, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
      o.start(now);
      o.stop(now + 0.08);
    }
    o.onended = () => void ctx.close();
  } catch {
    // ignore autoplay / unsupported
  }
}
