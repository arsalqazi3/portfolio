"use client";

import { useEffect, useRef, useState } from "react";

const COUNTER_MS = 850;
const COUNTER_STEP_MS = 9; // ~100 steps across COUNTER_MS
const COUNTER_FADE_MS = 350;
const NAME_DELAY_MS = 380;
const UNDERLINE_DELAY_MS = 280;
const CURTAIN_DELAY_MS = 1250;
const CURTAIN_MS = 850;

/** A full-viewport entrance: a percentage counter loads in, clears to the name
 * (with its underline drawing in), then the whole curtain lifts away to reveal
 * the real page underneath. Lives in the root layout, which the App Router
 * only remounts on an actual full page load — so this naturally replays on a
 * real reload but stays out of the way on ordinary in-app link navigation,
 * with no session/storage bookkeeping needed. Skips itself entirely under
 * prefers-reduced-motion.
 *
 * Deliberately avoids requestAnimationFrame for state changes — some
 * unfocused/backgrounded tab states throttle rAF to a near-stop, which would
 * strand this open forever. Plain setInterval/setTimeout and CSS transitions
 * keep firing regardless, so the intro always finishes and hands the page back. */
export default function IntroPreloader() {
  const [shouldPlay, setShouldPlay] = useState(false);
  const [phase, setPhase] = useState<"counting" | "name" | "lifting" | "done">("counting");
  const [counterValue, setCounterValue] = useState(0);
  const [barActive, setBarActive] = useState(false);

  const timers = useRef<number[]>([]);
  const interval = useRef<number>(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const timerIds = timers.current;

    // matchMedia only exists client-side, so this can't be read during a lazy
    // useState initializer without diverging from the server's render (a
    // hydration mismatch) — it has to happen post-mount, in an effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShouldPlay(true);
    document.body.style.overflow = "hidden";

    // Two-step so the browser paints width:0 before the transition to 100%
    // actually starts (setting it in the same tick would just snap, no animation).
    timerIds.push(window.setTimeout(() => setBarActive(true), 20));

    let step = 0;
    const totalSteps = Math.round(COUNTER_MS / COUNTER_STEP_MS);
    interval.current = window.setInterval(() => {
      step += 1;
      setCounterValue(Math.min(100, Math.round((step / totalSteps) * 100)));
      if (step >= totalSteps) {
        window.clearInterval(interval.current);
        timerIds.push(
          window.setTimeout(() => {
            setPhase("name");
            timerIds.push(window.setTimeout(() => setPhase("lifting"), CURTAIN_DELAY_MS));
          }, COUNTER_FADE_MS)
        );
      }
    }, COUNTER_STEP_MS);

    return () => {
      window.clearInterval(interval.current);
      timerIds.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    if (phase !== "lifting") return;
    const id = window.setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, CURTAIN_MS);
    return () => window.clearTimeout(id);
  }, [phase]);

  if (!shouldPlay || phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink transition-transform ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{
        transitionDuration: `${CURTAIN_MS}ms`,
        transform: phase === "lifting" ? "translateY(-100%)" : "translateY(0)",
      }}
      aria-hidden="true"
    >
      <div
        className="flex flex-col items-center transition-opacity duration-300"
        style={{ opacity: phase === "counting" ? 1 : 0, position: phase === "counting" ? "static" : "absolute" }}
      >
        <p className="mb-3.5 font-mono text-sm tracking-widest text-muted">
          {String(counterValue).padStart(2, "0")}
        </p>
        <div className="relative h-px w-40 bg-ink-soft">
          <div
            className="absolute left-0 top-0 h-px bg-copper transition-all ease-linear"
            style={{ width: barActive ? "100%" : "0%", transitionDuration: `${COUNTER_MS}ms` }}
          />
        </div>
      </div>

      <div
        className="absolute flex flex-col items-center transition-all ease-[cubic-bezier(0.16,0.84,0.24,1)]"
        style={{
          transitionDuration: "600ms",
          opacity: phase === "counting" ? 0 : 1,
          transform: phase === "counting" ? "translateY(14px) scale(0.98)" : "translateY(0) scale(1)",
          transitionDelay: phase === "counting" ? "0ms" : `${NAME_DELAY_MS}ms`,
        }}
      >
        <p className="font-heading text-3xl font-semibold tracking-wide text-offwhite sm:text-4xl">
          Arslan Asad Qazi
        </p>
        <div
          className="mt-3.5 h-0.5 bg-copper transition-all ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{
            width: phase === "name" || phase === "lifting" ? "56px" : "0px",
            transitionDuration: "550ms",
            transitionDelay: `${NAME_DELAY_MS + UNDERLINE_DELAY_MS}ms`,
          }}
        />
      </div>
    </div>
  );
}
