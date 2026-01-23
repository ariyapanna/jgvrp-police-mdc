export type AccentColor =
  | "orange"
  | "red"
  | "blue"
  | "emerald"
  | "zinc"
  | "cyan"
  | "pink";

export const ACCENT_STYLES: Record<AccentColor, {
    icon: string;
    bg: string;
    border: string;
    text: string;
    buttonBg: string;
    buttonHover: string;
    buttonShadow: string;
}> = {
    orange: {
        icon: "text-orange-500",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        text: "text-orange-500",
        buttonBg: "bg-orange-600",
        buttonHover: "hover:bg-orange-500",
        buttonShadow: "shadow-orange-600/10",
    },
    red: {
        icon: "text-red-500",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        text: "text-red-500",
        buttonBg: "bg-red-600",
        buttonHover: "hover:bg-red-500",
        buttonShadow: "shadow-red-600/10",
    },
    blue: {
        icon: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        text: "text-blue-500",
        buttonBg: "bg-blue-600",
        buttonHover: "hover:bg-blue-500",
        buttonShadow: "shadow-blue-600/10",
    },
    emerald: {
        icon: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        text: "text-emerald-500",
        buttonBg: "bg-emerald-600",
        buttonHover: "hover:bg-emerald-500",
        buttonShadow: "shadow-emerald-600/10",
    },
    zinc: {
        icon: "text-zinc-400",
        bg: "bg-zinc-500/10",
        border: "border-zinc-500/20",
        text: "text-zinc-400",
        buttonBg: "bg-zinc-700",
        buttonHover: "hover:bg-zinc-600",
        buttonShadow: "shadow-zinc-700/10",
    },
    cyan: {
        icon: "text-cyan-500",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
        text: "text-cyan-500",
        buttonBg: "bg-cyan-600",
        buttonHover: "hover:bg-cyan-500",
        buttonShadow: "shadow-cyan-600/10",
    },
    pink: {
        icon: "text-pink-500",
        bg: "bg-pink-500/10",
        border: "border-pink-500/20",
        text: "text-pink-500",
        buttonBg: "bg-pink-600",
        buttonHover: "hover:bg-pink-500",
        buttonShadow: "shadow-pink-600/10",
    }
};