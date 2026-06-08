import { HTMLAttributes, ReactNode } from "react";

type HeadingLevel = "display" | "h1" | "h2" | "h3";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  tone?: "ink" | "purple" | "amber" | "white";
  children: ReactNode;
}

const headingStyles: Record<HeadingLevel, React.CSSProperties> = {
  display: { fontSize: "var(--pz-text-3xl)", fontWeight: 800, lineHeight: 1.1 },
  h1: { fontSize: "var(--pz-text-2xl)", fontWeight: 700, lineHeight: 1.2 },
  h2: { fontSize: "var(--pz-text-xl)", fontWeight: 700, lineHeight: 1.25 },
  h3: { fontSize: "var(--pz-text-lg)", fontWeight: 600, lineHeight: 1.3 },
};

const tones = {
  ink: "var(--pz-ink)",
  purple: "var(--pz-purple)",
  amber: "var(--pz-amber)",
  white: "var(--pz-white)",
};

export function Heading({
  level = "h1",
  tone = "ink",
  style,
  children,
  ...rest
}: HeadingProps) {
  const Tag = level === "display" ? "h1" : level;
  return (
    <Tag
      style={{
        fontFamily: "var(--pz-font)",
        color: tones[tone],
        margin: 0,
        ...headingStyles[level],
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "base" | "lg";
  tone?: "ink" | "muted" | "purple" | "white";
  weight?: 400 | 500 | 600 | 700;
  children: ReactNode;
}

const sizeMap = {
  sm: "var(--pz-text-sm)",
  base: "var(--pz-text-base)",
  lg: "var(--pz-text-lg)",
};

const textTones = {
  ink: "var(--pz-ink)",
  muted: "var(--pz-muted)",
  purple: "var(--pz-purple)",
  white: "var(--pz-white)",
};

export function Text({
  size = "base",
  tone = "ink",
  weight = 400,
  style,
  children,
  ...rest
}: TextProps) {
  return (
    <p
      style={{
        fontFamily: "var(--pz-font)",
        fontSize: sizeMap[size],
        color: textTones[tone],
        fontWeight: weight,
        margin: 0,
        lineHeight: 1.5,
        ...style,
      }}
      {...rest}
    >
      {children}
    </p>
  );
}
