import { useEffect, useState } from "react";

import { Ticket as TicketIcon, Trash2 } from "lucide-react";

import type { Column } from "@/components/data-table/types";
import SectionPanel from "@/components/section-panel/SectionPanel";
import DataTable from "@/components/data-table/DataTable";
import CreateButton from "@/components/section-panel/actions/CreateButton";
import IssueTicketModal from "./IssueTicketModal";
import TicketDetailModal from "./TicketDetailModal";

import type { Ticket } from "@/types/ticket/ticket";
import { TicketStatus } from "@/types/ticket/ticketStatus";
import { createTicket, deleteTicket, getTicket, getTickets } from "./api";
import FilterSelect from "@/components/section-panel/actions/FilterSelect";
import { toast } from "react-toastify";
import SearchAction from "@/components/section-panel/actions/SearchAction";
import ConfirmDialog from "@/components/common/ConfirmDialog";

import { formatDate } from "@/utils/formatDate";


const columns: Column<Ticket>[] = [
    {
        key: 'id',
        header: 'REF',
        render: (row) => <span className="font-mono text-emerald-500/80 tracking-tighter">[{row.id}]</span>
    },
    {
        key: 'characterName',
        header: 'subject',
        render: (row) => (
            <span className="text-[11px] font-black text-zinc-200 uppercase tracking-wide group-hover:text-white transition-colors">
                {row.characterName}
            </span>
        )
    },
    {
        key: 'status',
        header: 'STATUS',
        align: 'center',
        render: (row) => (
            <span className={`px-2.5 py-1 text-[8px] font-black tracking-widest border inline-block ${
                row.status === TicketStatus.PAID ? 'bg-emerald-600/10 text-emerald-500 border-emerald-500/20' : 
                row.status === TicketStatus.PENDING ? 'bg-amber-600/10 text-amber-500 border-amber-500/20' : 
                'bg-red-600/10 text-red-500 border-red-500/20'
                }`}
            >
            {row.status.toUpperCase()}
            </span>
        )
    },
    {
        key: 'issuerName',
        header: 'ISSUER',
        render: (row) => <span className="text-[11px] font-black text-zinc-200 uppercase tracking-wide group-hover:text-white transition-colors">{row.issuerName}</span>
    },
    {
        key: 'createdAt',
        header: 'ISSUED AT',
        render: (row) => <span className="text-[11px] font-black text-zinc-200 uppercase tracking-wide group-hover:text-white transition-colors">{formatDate(row.createdAt)}</span>
    }
]

const Tickets = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]); 
    const [ticketDetail, setTicketDetail] = useState<Ticket | null>(null);
    const [ticketToDelete, setTicketToDelete] = useState<number | null>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>('');

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filterTicketStatus, setFilterTicketStatus] = useState<string>('PENDING');

    const [targetName, setTargetName] = useState<string>('');
    const [reason, setReason] = useState<string>('');
    const [fine, setFine] = useState<string>('');

    const [dialogState, setDialogState] = useState<boolean>(false);
    const [ticketDetailDialogState, setTicketDetailDialogState] = useState<boolean>(false);
    const [confirmDialogState, setConfirmDialogState] = useState<boolean>(false);

    useEffect(() => {
        loadTickets(searchQuery);
    }, []);

    useEffect(() => {
        if(error)
            toast.error(error);
    }, [error]);

    async function loadTickets(keyword?: string) 
    {
        setLoading(true);
        try 
        {
            const response = await getTickets(keyword);
            if(!response.success)
                throw new Error(response.message);
            
            setTickets(response.data);
        }
        catch(error: any)
        {
            setError(error.message);
        }
        finally
        {
            setLoading(false);
        }
    }

    async function handleTicketIssue(e: React.FormEvent)
    {
        e.preventDefault();
        setLoading(true);
        try 
        {
            if(targetName.length < 3)
                throw new Error('Target name must be at least 3 characters long.');

            if(reason.length < 10)
                throw new Error('Description must be at least 10 characters long.');

            const parsedFine = +fine;
            if(parsedFine < 50)
                throw new Error('A minimum fine of $50 is required.');

            const response = await createTicket(targetName, reason, parsedFine);
            if(!response.success)
                throw new Error(response.message);

            setDialogState(false);

            setTargetName('');
            setReason('');
            setFine('');

            toast.success('Ticket successfully issued.');
            await loadTickets(searchQuery);
        }
        catch(error: any)
        {
            setError(error.message);
        }
        finally
        {
            setLoading(false);
        }
    }

    async function loadTicketDetail(id: number) 
    {
        setLoading(true);
        try 
        {
            const response = await getTicket(id);
            if(!response.success)
                throw new Error(response.message);

            setTicketDetail(response.data);
            setTicketDetailDialogState(true);
        }
        catch(error: any)
        {
            setError(error.message);
        }
        finally
        {
            setLoading(false);
        }
    }

    async function handleTicketDelete(id: number)
    {
        setLoading(true);
        try 
        {
            const response = await deleteTicket(id);
            if(!response.success)
                throw new Error(response.message);

            await loadTickets(searchQuery);
            toast.success('Ticket successfully deleted.');
        }
        catch(error: any)
        {
            setError(error.message);
        }
        finally
        {
            setLoading(false);
        }
    }

    return (
        <>
            <IssueTicketModal
                open={dialogState}
                onClose={() => setDialogState(false)}

                targetName={targetName}
                setTargetName={setTargetName}

                reason={reason}
                setReason={setReason}

                fine={fine}
                setFine={setFine}

                loading={loading}
                onSubmit={(e) => handleTicketIssue(e)}
            />

            {ticketDetail && (
                <TicketDetailModal
                    open={ticketDetailDialogState}
                    onClose={() => setTicketDetailDialogState(false)}

                    ticketData={ticketDetail}

                    loading={loading}
                    onDelete={(id) => {
                        setTicketToDelete(id);
                        setConfirmDialogState(true);
                    }}
                />
            )}

            <ConfirmDialog
                open={confirmDialogState}

                onClose={() => setConfirmDialogState(false)}
                onConfirm={async () => {
                    if(ticketToDelete === null) 
                        return;
                        
                    await handleTicketDelete(ticketToDelete);
                    setConfirmDialogState(false);
                    setTicketToDelete(null);
                }}

                icon={<Trash2 size={24} />}
                title="Cancel Ticket"
                description="Confirming this action will cancel the ticket."

                loading={loading}
                danger={true}
            />

            <SectionPanel
                title="TICKETS"
                icon={TicketIcon}

                accent="pink"

                actions={(
                    <>
                        <FilterSelect
                            value={filterTicketStatus}
                            onChange={(v) => setFilterTicketStatus(v)}
                            options={[
                                { label: 'Pending', value: TicketStatus.PENDING },
                                { label: 'Paid', value: TicketStatus.PAID },
                                { label: 'Cancelled', value: TicketStatus.CANCELLED },
                            ]}
                        />
                        <SearchAction 
                            value={searchQuery} 
                            onChange={setSearchQuery} 
                            onSubmit={() => loadTickets(searchQuery)} 
                            placeholder="Search target or issuer..."
                            loading={loading} 
                        />
                        <CreateButton
                            onClick={() => setDialogState(true)}
                            label="Issue Ticket"
                            
                            backgroundColor="bg-pink-600"
                            hoverColor="hover:bg-pink-500"
                            shadow="shadow-pink-600/10"
                        />
                    </>
                )}
            >
                <DataTable 
                    columns={columns}
                    data={tickets}
                    rowKey={(row) => row.id}
                    loading={loading}
                    emptyMessage="No tickets found"
                    onRowClick={(row) => loadTicketDetail(row.id)}
                />
            </SectionPanel>
        </>
    )
}

export default Tickets;