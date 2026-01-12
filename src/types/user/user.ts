import type { FactionType } from "../faction/factionType";

export interface User
{
    id: number;
    name: string;
    badgeNumber: string;
    mugshot: string;

    factionId: number;
    factionName: FactionType;

    rank: number;
    rankName: string;
    rankNameShort: string;

    unit: {
        name: string,
        status: string
    }
}