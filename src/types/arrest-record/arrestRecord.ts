export interface ArrestRecord 
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
}