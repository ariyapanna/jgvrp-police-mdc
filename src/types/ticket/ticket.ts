import type { TicketStatus } from "./ticketStatus";

export interface Ticket
{
    id: number;
    
    characterName: string;
    issuerName: string;
    amount: number;
    description: string;
    status: TicketStatus;

    dueAt: string;
    createdAt: string;
    updatedAt: string;
    cancelledAt: string;
}