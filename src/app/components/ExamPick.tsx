"use client";

import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const INK = "#1a1a2e";
const PURPLE = "#3d348b";
const MUTED = "#6b6b80";

const STYLES = `
.pz-examcard{transition:transform .22s cubic-bezier(.16,1,.3,1),box-shadow .22s ease}
.pz-examcard:hover{transform:translateY(-6px);box-shadow:0 20px 44px -18px rgba(26,26,46,.3)}
.pz-examcard:active{transform:translateY(-2px) scale(.99)}
`;

interface ExamCard {
  title: string;
  sub: string;
  href: string;
  img: string;
  alt: string;
}

/* Illustrations: MIT-licensed unDraw people illustrations, recolored to brand. */
const EXAMS: ExamCard[] = [
  {
    title: "CBSE · Classes 6-12",
    sub: "All subjects, chapter by chapter",
    href: "/courses/cbse",
    img: "/illustrations/cbse-student.svg",
    alt: "Student studying at a desk, representing CBSE Classes 6 to 12 courses",
  },
  {
    title: "NEET-UG",
    sub: "Physics, Chemistry, Biology",
    href: "/courses/neet-ug",
    img: "/illustrations/neet-doctors.svg",
    alt: "Two doctors standing together, representing NEET-UG preparation",
  },
];

export function ExamPick() {
  return (
    <section
      id="courses"
      className="relative w-full"
      style={{
        background: "#ece9fb",
        borderTopLeftRadius: "clamp(28px, 5vw, 52px)",
        borderTopRightRadius: "clamp(28px, 5vw, 52px)",
        borderBottomLeftRadius: "clamp(28px, 5vw, 52px)",
        borderBottomRightRadius: "clamp(28px, 5vw, 52px)",
        boxShadow:
          "0 -30px 60px -24px rgba(26,26,46,0.3), 0 36px 60px -28px rgba(26,26,46,0.22)",
        zIndex: 2,
      }}
    >
      <style>{STYLES}</style>
      <div
        className="mx-auto w-full max-w-[1160px] px-5 sm:px-6"
        style={{
          paddingTop: "clamp(52px, 9vw, 80px)",
          paddingBottom: "clamp(56px, 9vw, 84px)",
        }}
      >
        <Reveal>
          <h2
            className="text-center sm:text-left"
            style={{
              fontFamily: "var(--pz-font)",
              fontWeight: 700,
              fontSize: "clamp(24px, 5.4vw, 32px)",
              letterSpacing: "-0.015em",
              color: INK,
              margin: 0,
            }}
          >
            Pick your exam, start today.
          </h2>
        </Reveal>

        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
          style={{ marginTop: "clamp(22px, 4vw, 32px)" }}
        >
          {EXAMS.map((exam, i) => (
            <Reveal key={exam.title} delay={0.08 + i * 0.1}>
              <a
                href={exam.href}
                className="pz-examcard group flex items-center justify-between"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(61,52,139,0.12)",
                  borderRadius: 20,
                  padding: "clamp(18px, 2.6vw, 26px) clamp(18px, 2.8vw, 28px)",
                  gap: "clamp(12px, 2vw, 20px)",
                  textDecoration: "none",
                }}
              >
                <span className="min-w-0">
                  <span
                    className="flex items-center"
                    style={{
                      gap: 8,
                      fontFamily: "var(--pz-font)",
                      fontWeight: 700,
                      fontSize: "clamp(18px, 4.2vw, 22px)",
                      letterSpacing: "-0.01em",
                      color: PURPLE,
                    }}
                  >
                    {exam.title}
                    <ArrowRight
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      size={19}
                      color={PURPLE}
                      strokeWidth={2.5}
                      aria-hidden
                    />
                  </span>
                  <span
                    className="block"
                    style={{
                      marginTop: 6,
                      fontSize: "clamp(13px, 3.2vw, 14.5px)",
                      fontWeight: 500,
                      color: MUTED,
                    }}
                  >
                    {exam.sub}
                  </span>
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={exam.img}
                  alt={exam.alt}
                  width={160}
                  height={110}
                  loading="lazy"
                  className="transition-transform duration-200 group-hover:scale-105"
                  style={{
                    flex: "none",
                    width: "clamp(112px, 13vw, 160px)",
                    height: "auto",
                  }}
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
