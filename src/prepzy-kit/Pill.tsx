import { HTMLAttributes, ReactNode } from "react";

interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "amber" | "purple" | "neutral";
  active?: boolean;
  children: ReactNode;
}

const tones = {
  amber: { background: "var(--pz-amber)", color: "var(--pz-ink)" },
  purple: { background: "var(--pz-purple)", color: "var(--pz-white)" },
  neutral: { background: "var(--pz-white)", color: "var(--pz-ink)" },
};

export function Pill({
  tone = "neutral",
  active = false,
  style,
  children,
  ...rest
}: PillProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "8px 18px",
        fontFamily: "var(--pz-font)",
        fontWeight: 600,
        fontSize: "var(--pz-text-sm)",
        borderRadius: "var(--pz-radius-pill)",
        boxShadow: active ? "var(--pz-shadow-md)" : "var(--pz-shadow-sm)",
        ...tones[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
