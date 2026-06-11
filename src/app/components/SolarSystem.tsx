"use client";

import { useEffect, useRef } from "react";
import styles from "./SolarSystem.module.css";

/**
 * Orbital exam emblem (Joel's design): the orange planet rides an SVG orbit via
 * <animateMotion>, and a rAF loop hit-tests its real rendered position against the
 * two pills — whichever pill it is touching fills, the other goes outline.
 */
export default function SolarSystem() {
  const svgRef = useRef<SVGSVGElement>(null);
  const planetRef = useRef<SVGCircleElement>(null);
  const cbseRef = useRef<HTMLSpanElement>(null);
  const neetRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      svgRef.current?.pauseAnimations?.();
      return;
    }

    let rafId = 0;
    let current: "cbse" | "neet" | null = null;
    const PAD = 16;

    const centerInside = (x: number, y: number, r: DOMRect): boolean =>
      x >= r.left - PAD && x <= r.right + PAD && y >= r.top - PAD && y <= r.bottom + PAD;

    const tick = () => {
      const planet = planetRef.current;
      const cbse = cbseRef.current;
      const neet = neetRef.current;
      if (planet && cbse && neet) {
        const p = planet.getBoundingClientRect();
        const px = p.left + p.width / 2;
        const py = p.top + p.height / 2;
        let next: "cbse" | "neet" | null = current;
        if (centerInside(px, py, neet.getBoundingClientRect())) next = "neet";
        else if (centerInside(px, py, cbse.getBoundingClientRect())) next = "cbse";

        if (next && next !== current) {
          current = next;
          cbse.className = `${styles.pill} ${current === "cbse" ? styles.filled : styles.outline}`;
          neet.className = `${styles.pill} ${current === "neet" ? styles.filled : styles.outline}`;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.layer}>
        <svg ref={svgRef} width="380" height="200" viewBox="0 0 380 200" style={{ display: "block", overflow: "visible" }}>
          <defs>
            <path id="pz-orbit-outer" d="M 25 100 A 165 54 0 1 0 355 100 A 165 54 0 1 0 25 100" />
            <path id="pz-orbit-main" d="M 62 100 A 128 40 0 1 0 318 100 A 128 40 0 1 0 62 100" />
            <path id="pz-orbit-inner" d="M 98 100 A 92 26 0 1 0 282 100 A 92 26 0 1 0 98 100" />
            <filter id="pz-glow-o" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="3.2" result="b" />
              <feComposite in="SourceGraphic" in2="b" operator="over" />
            </filter>
            <filter id="pz-glow-w" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.2" result="b" />
              <feComposite in="SourceGraphic" in2="b" operator="over" />
            </filter>
          </defs>

          <use href="#pz-orbit-outer" stroke="rgba(255,255,255,0.22)" strokeWidth="1.4" fill="none" />
          <use href="#pz-orbit-main" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
          <use href="#pz-orbit-inner" stroke="rgba(255,255,255,0.16)" strokeWidth="1.1" strokeDasharray="4 5" fill="none" />

          {/* outer white planet */}
          <circle r="5" fill="#F4F3FF" filter="url(#pz-glow-w)" opacity="0.9">
            <animateMotion dur="15s" repeatCount="indefinite" calcMode="linear">
              <mpath href="#pz-orbit-outer" />
            </animateMotion>
          </circle>

          {/* main orange planet — drives the pills */}
          <circle ref={planetRef} r="7.5" fill="#FFB84D" filter="url(#pz-glow-o)">
            <animateMotion dur="8s" repeatCount="indefinite" calcMode="linear">
              <mpath href="#pz-orbit-main" />
            </animateMotion>
          </circle>

          {/* inner white planet */}
          <circle r="3" fill="#F4F3FF" filter="url(#pz-glow-w)" opacity="0.55">
            <animateMotion dur="5.5s" repeatCount="indefinite" calcMode="linear">
              <mpath href="#pz-orbit-inner" />
            </animateMotion>
          </circle>
        </svg>
      </div>

      <div className={styles.pills}>
        <span ref={cbseRef} className={`${styles.pill} ${styles.outline}`}>6&ndash;12 CBSE</span>
        <span ref={neetRef} className={`${styles.pill} ${styles.filled}`}>NEET-UG</span>
      </div>
    </div>
  );
}
