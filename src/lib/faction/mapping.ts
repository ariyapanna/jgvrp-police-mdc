import type { FactionType } from "@/types/faction/factionType";

export const FACTION_ID_TO_KEY: Record<number, FactionType> = {
  1: "LSPD",
  2: "LSFD",
  3: "LSSD"
};

export const FACTION_NAME_TO_KEY: Record<string, FactionType> = {
  "Los Santos Police Department": "LSPD",
  "Los Santos Fire Department": "LSFD",
  "Los Santos Sheriffs Department": "LSSD"
};

export function getFactionKey(id?: number, name?: string): FactionType | undefined {
  if(id && FACTION_ID_TO_KEY[id]) return FACTION_ID_TO_KEY[id];
  if(name && FACTION_NAME_TO_KEY[name]) return FACTION_NAME_TO_KEY[name];
  return undefined; 
}
