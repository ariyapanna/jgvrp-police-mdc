import type { FactionType } from "./factionType";

export const FACTION_COLOR: Record<FactionType, string> = {
    LSPD: "text-blue-400",
    LSSD: "text-amber-400",
    LSFD: "text-red-400",
};

export const FACTION_COLOR_MUTED: Record<FactionType, string> = {
    LSPD: "text-blue-400/40 hover:text-blue-300/40",
    LSSD: "text-amber-400/40 hover:text-amber-400/40",
    LSFD: "text-red-400/40 hover-text-red-300/40",
};