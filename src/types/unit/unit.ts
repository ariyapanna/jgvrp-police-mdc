import type { UnitMember } from "./unitMember";

export interface Unit 
{
    name: string;
    status: string;
    factionId: number;
    members: UnitMember[]
}