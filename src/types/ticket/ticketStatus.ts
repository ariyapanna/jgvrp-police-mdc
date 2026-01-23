export const TicketStatus = {
    PENDING: 'Pending',
    PAID: 'Paid',
    CANCELLED: 'Cancelled'
}
export type TicketStatus = keyof typeof TicketStatus