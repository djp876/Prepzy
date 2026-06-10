"use client";

import { useState } from "react";
import { GraduationCap, Stethoscope, ArrowUpRight } from "lucide-react";

const PURPLE = "#3d348b";
const AMBER = "#ffb84d";
const INK = "#1a1a2e";
const CREAM = "#fff8ed";
const LAV = "#ece9fb";

const CLASSES = [6, 7, 8, 9, 10, 11, 12] as const;
const CBSE_SUBJECTS = ["Maths", "Science", "Social Science", "English", "Hindi"];
const NEET_SUBJECTS = ["Physics", "Chemistry", "Biology"];

type Exam = "cbse" | "neet";

function Tag({ label }: { label: string }) {
  return (
    <span style={{ background: LAV, color: PURPLE, borderRadius: "var(--pz-radius-pill)", padding: "6px 13px", fontSize: 13, fontWeight: 600 }}>{label}</span>
  );
}

function Cta({ label }: { label: string }) {
  return (
    <a href="#" className="pz-cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: PURPLE, color: "#fff", borderRadius: "var(--pz-radius-pill)", padding: "12px 12px 12px 22px", fontWeight: 600, fontSize: 15, textDecoration: "none", boxShadow: "0 16px 30px -16px rgba(61,52,139,0.7)" }}>
      {label}
      <span className="pz-cta-ico" style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.16)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        <ArrowUpRight size={16} color="#fff" />
      </span>
    </a>
  );
}

export function CourseSelector() {
  const [exam, setExam] = useState<Exam>("cbse");
  const [cls, setCls] = useState(10);

  return (
    <section style={{ background: CREAM, padding: "clamp(60px, 9vw, 120px) 16px" }}>
      <div style={{ maxWidth: 940, margin: "0 auto", textAlign: "center" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid var(--pz-line)", borderRadius: "var(--pz-radius-pill)", padding: "6px 14px", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: PURPLE }}>
          Courses
        </span>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: INK, margin: "16px 0 0" }}>
          Pick your course, start today.
        </h2>
        <p style={{ fontSize: "clamp(15px, 1.5vw, 16.5px)", color: "var(--pz-muted)", margin: "12px auto 0", maxWidth: 480, lineHeight: 1.55 }}>
          Choose your board and class. Every subject is mapped chapter by chapter.
        </p>

        {/* segmented toggle */}
        <div style={{ display: "inline-flex", gap: 4, background: "#f1e9d8", borderRadius: "var(--pz-radius-pill)", padding: 5, marginTop: 28 }}>
          {([["cbse", "CBSE Classes 6-12", GraduationCap], ["neet", "NEET-UG", Stethoscope]] as const).map(([key, label, Icon]) => {
            const on = exam === key;
            return (
              <button
                key={key}
                onClick={() => setExam(key)}
                className="pz-seg"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "none", cursor: "pointer", background: on ? "#fff" : "transparent", color: on ? PURPLE : "#7a7388", borderRadius: "var(--pz-radius-pill)", padding: "10px 18px", fontSize: 14, fontWeight: 600, boxShadow: on ? "0 6px 16px -8px rgba(61,52,139,0.4)" : "none" }}
              >
                <Icon size={16} color={on ? AMBER : "#9a93a8"} strokeWidth={2} /> {label}
              </button>
            );
          })}
        </div>

        {/* double-bezel card */}
        <div style={{ marginTop: 22, background: "#faf4e6", border: "1px solid var(--pz-line)", borderRadius: "1.9rem", padding: 8, boxShadow: "0 40px 80px -44px rgba(61,52,139,0.4)" }}>
          <div style={{ background: "#fff", borderRadius: "1.5rem", padding: "clamp(20px, 3vw, 32px)", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.9)" }}>
            {exam === "cbse" ? (
              <>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
                  {CLASSES.map((c) => {
                    const on = c === cls;
                    return (
                      <button
                        key={c}
                        onClick={() => setCls(c)}
                        className="pz-chip"
                        style={{ border: on ? `1px solid ${PURPLE}` : "1px solid #eadfca", background: on ? PURPLE : "#fff", color: on ? "#fff" : INK, borderRadius: "var(--pz-radius-pill)", padding: "9px 16px", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}
                      >
                        Class {c}
                      </button>
                    );
                  })}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20, marginTop: 26, textAlign: "left" }}>
                  <div style={{ flex: "1 1 280px" }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: PURPLE }}>Class {cls}</div>
                    <div style={{ fontSize: 13.5, color: "var(--pz-muted)", margin: "4px 0 12px" }}>All subjects, chapter by chapter.</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {CBSE_SUBJECTS.map((s) => <Tag key={s} label={s} />)}
                    </div>
                  </div>
                  <Cta label={`Start Class ${cls} free`} />
                </div>
              </>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20, textAlign: "left" }}>
                <div style={{ flex: "1 1 280px" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: PURPLE }}>NEET-UG</div>
                  <div style={{ fontSize: 13.5, color: "var(--pz-muted)", margin: "4px 0 12px" }}>Full syllabus, previous-year papers and mock tests.</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {NEET_SUBJECTS.map((s) => <Tag key={s} label={s} />)}
                  </div>
                </div>
                <Cta label="Start NEET prep free" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
