"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Play, Brain, Clock } from "lucide-react";

const BRAND = "#3d348b";

const STATS = [
  { icon: BookOpen, target: 90, suffix: "+", label: "Textbooks", display: null },
  { icon: Play, target: 300, suffix: "+", label: "Videos", display: null },
  { icon: Brain, target: 0, suffix: "", label: "Questions", display: "2L+" },
  { icon: Clock, target: 1000, suffix: "+", label: "Hours Content", display: null },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setStarted(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1400;
    const start = performance.now();
    const targets = STATS.map((s) => s.target);
    let raf = 0;
    const frame = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setCounts(targets.map((v) => Math.round(v * ease)));
      if (t < 1) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [started]);

  return (
    <section className="mx-auto w-full max-w-[1392px] px-5 sm:px-6">
      <div
        ref={ref}
        className="grid grid-cols-2 overflow-hidden lg:grid-cols-4"
        style={{
          background: "rgba(61,52,139,0.12)",
          borderRadius: "var(--pz-radius-lg)",
          gap: 1,
          boxShadow: "var(--pz-shadow-sm)",
        }}
      >
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          const value =
            stat.display !== null ? stat.display : `${counts[i]}${stat.suffix}`;
          return (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center text-center"
              style={{
                background: "var(--pz-cream-soft)",
                padding: "clamp(30px, 4vw, 36px) 16px",
                gap: 10,
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "rgba(61,52,139,0.1)",
                }}
              >
                <Icon size={20} color={BRAND} strokeWidth={2} />
              </div>
              <span
                style={{
                  fontFamily: "var(--pz-font)",
                  fontWeight: 800,
                  fontSize: "clamp(24px, 2.4vw, 32px)",
                  color: "var(--pz-purple)",
                  lineHeight: 1,
                  letterSpacing: "-0.5px",
                  animation: started
                    ? `pzCountUp 0.5s ease ${i * 0.1}s both`
                    : "none",
                }}
              >
                {value}
              </span>
              <span
                style={{
                  fontFamily: "var(--pz-font)",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "var(--pz-purple)",
                  opacity: 0.7,
                  whiteSpace: "nowrap",
                }}
              >
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
