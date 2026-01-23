import type { CrimeRecord } from "../crime-record/crimeRecord";

export interface ArrestRecordDetail 
{
    id: number;
    characterId: number;
    name: string;
    factionId: number;
    issuer: string;
    duration: number;
    fine: number;
    createdAt: string;
    updatedAt: string;
    crimes: CrimeRecord[]
}