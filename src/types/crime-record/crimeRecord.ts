export interface CrimeRecord
{
    arrestRecordId: number;
    
    id: number;
    characterId: number;
    name: string;
    
    factionId: number;
    issuer: string;
    duration: number;
    fine: number;
    reason: string;

    createdAt: string;
    updatedAt: string;
}