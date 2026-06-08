import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "cream" | "white" | "purple" | "soft";
  children: ReactNode;
}

const tones = {
  cream: { background: "var(--pz-cream)", color: "var(--pz-ink)" },
  white: { background: "var(--pz-white)", color: "var(--pz-ink)" },
  purple: { background: "var(--pz-purple)", color: "var(--pz-white)" },
  soft: { background: "var(--pz-cream-soft)", color: "var(--pz-ink)" },
};

export function Card({ tone = "white", style, children, ...rest }: CardProps) {
  return (
    <div
      style={{
        borderRadius: "var(--pz-radius-lg)",
        padding: "var(--pz-space-6)",
        boxShadow: "var(--pz-shadow-md)",
        fontFamily: "var(--pz-font)",
        ...tones[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
