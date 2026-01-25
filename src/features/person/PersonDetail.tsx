import { useUser } from "@/context/user.context";
import { usePersonDetail } from "@/context/person-detail.context";

import { BookUser, Calendar, Car, Files, FileText, Fingerprint, IdCard, Info, Phone, Receipt, ShieldAlert, Trash2, User } from "lucide-react";
import { toast } from "react-toastify";

import Dossier from "@/components/dossier/Dossier";

import VehicleItemCard from "../vehicle/VehicleItemCard";

import LicenseItemCard from "../licenses/LicenseItemCard";

import { LicenseType } from "@/types/license/licenseType";
import { FACTION_COLOR } from "@/types/faction/factionColor";
import type { Ticket } from "@/types/ticket/ticket";

import { copyToClipboard } from "@/utils/clipboard";
import { getFactionKey } from "@/lib/faction/mapping";

import { formatCurrency } from "@/utils/formatCurrency";
import { getInitials } from "@/utils/getInitials";
import DataTable from "@/components/data-table/DataTable";
import type { Column } from "@/components/data-table/types";
import { TicketStatus } from "@/types/ticket/ticketStatus";
import { formatDate } from "@/utils/formatDate";
import { useEffect, useState } from "react";
import TicketDetailModal from "../tickets/TicketDetailModal";
import { getPersonDetail } from "./api";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { deleteTicket } from "../tickets/api";
import type { ArrestWarrant } from "@/types/arrest-warrant/arrestWarrant";
import ArrestWarrantDetailModal from "../arrest-warrant/ArrestWarrantDetailModal";
import { deleteWarrant, updateWarrant } from "../arrest-warrant/api";
import type { CrimeRecord } from "@/types/crime-record/crimeRecord";
import type { ArrestRecord } from "@/types/arrest-record/arrestRecord";

const arrestWarrantColumns: Column<ArrestWarrant>[] = [
    {
        key: 'id',
        header: 'REF',
        render: (row) => <span className="font-mono text-emerald-500/80 tracking-tighter">[{row.id}]</span>
    },
    {
        key: 'name',
        header: 'subject',
        render: (row) => (
            <span className="text-[11px] font-black text-zinc-200 uppercase tracking-wide group-hover:text-white transition-colors">
                {row.name}
            </span>
        )
    },
    {
        key: 'duration',
        header: 'DURATION',
        render: (row) => (
            <span className="text-[11px] font-black text-yellow-500/80 uppercase tracking-wide group-hover:text-white transition-colors">
                {row.duration} months
            </span>
        )
    },
    {
        key: 'fine',
        header: 'FINE',
        render: (row) => <span className="text-[11px] font-black text-red-500/80 uppercase tracking-wide group-hover:text-white transition-colors">{formatCurrency(row.fine)}</span>
    },
    {
        key: 'issuer',
        header: 'PERSON IN CHARGE',
        render: (row) => <span className="text-[11px] font-black text-zinc-200 uppercase tracking-wide group-hover:text-white transition-colors">{row.issuer}</span>
    },
    {
        key: 'createdAt',
        header: 'ISSUED ON',
        render: (row) => <span className="text-[11px] font-black text-zinc-200 uppercase tracking-wide group-hover:text-white transition-colors">{formatDate(row.createdAt)}</span>
    }
]

const ticketColumns: Column<Ticket>[] = [
    {
        key: 'id',
        header: 'REF',
        render: (row) => <span className="font-mono text-emerald-500/80 tracking-tighter">[{row.id}]</span>
    },
    {
        key: 'amount',
        header: 'FINE',
        render: (row) => (
            <span className="text-[11px] font-black text-red-500/80 uppercase tracking-wide group-hover:text-white transition-colors">
                {formatCurrency(row.amount)}
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
        header: 'ISSUED ON',
        render: (row) => <span className="text-[11px] font-black text-zinc-200 uppercase tracking-wide group-hover:text-white transition-colors">{formatDate(row.createdAt)}</span>
    }
]

const crimeRecordColumns: Column<CrimeRecord>[] = [
    {
        key: 'id',
        header: 'REF',
        render: (row) => <span className="font-mono text-emerald-500/80 tracking-tighter">[{row.id}]</span>
    },
    {
        key: 'reason',
        header: 'REASON',
        render: (row) => (
            <span className="text-[11px] font-black text-zinc-200 uppercase tracking-wide group-hover:text-white transition-colors">
                {row.reason}
            </span>
        )
    },
    {
        key: 'issuer',
        header: 'ISSUER',
        render: (row) => {
            return (
                <span className="text-[11px] font-black text-zinc-200 uppercase tracking-wide group-hover:text-white transition-colors">
                    {row.issuer}
                </span>
            )
        }
    },
    {
        key: 'createdAt',
        header: 'ISSUED ON',
        render: (row) => <span className="text-[11px] font-black text-zinc-200 uppercase tracking-wide group-hover:text-white transition-colors">{formatDate(row.createdAt)}</span>
    }
]

const arrestRecordColumns: Column<ArrestRecord>[] = [
    {
        key: 'id',
        header: 'REF',
        render: (row) => <span className="font-mono text-emerald-500/80 tracking-tighter">[{row.id}]</span>
    },
    {
        key: 'duration',
        header: 'DURATION',
        render: (row) => (
            <span className="text-[11px] font-black text-yellow-500/80 uppercase tracking-wide group-hover:text-white transition-colors">
                {row.duration} month(s)
            </span>
        )
    },
    {
        key: 'fine',
        header: 'FINE',
        render: (row) => (
            <span className="text-[11px] font-black text-red-500/80 uppercase tracking-wide group-hover:text-white transition-colors">
                {formatCurrency(row.fine)}
            </span>
        )
    },
    {
        key: 'issuer',
        header: 'PERSON IN CHARGE',
        render: (row) => (
            <span className="text-[11px] font-black text-zinc-200 uppercase tracking-wide group-hover:text-white transition-colors">
                {row.issuer}
            </span>
        )
    },
    {
        key: 'createdAt',
        header: 'ARRESTED ON',
        render: (row) => <span className="text-[11px] font-black text-zinc-200 uppercase tracking-wide group-hover:text-white transition-colors">{formatDate(row.createdAt)}</span>
    }
]

const PersonDetail = () => {
    const { user } = useUser();
    const { person, setPerson } = usePersonDetail();

    const [ticketDetail, setTicketDetail] = useState<Ticket | null>(null);
    const [warrantDetail, setWarrantDetail] = useState<ArrestWarrant | null>(null);

    const [updateTargetName, setUpdateTargetName] = useState<string>('');
    const [updateReason, setUpdateReason] = useState<string>('');
    const [updateDuration, setUpdateDuration] = useState<string>('');
    const [updateFine, setUpdateFine] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [ticketToDelete, setTicketToDelete] = useState<number | null>(null);
    const [warrantToManipulate, setWarrantToManipulate] = useState<number | null>(null);

    const [ticketDetailModalState, setTicketDetailModalState] = useState<boolean>(false);
    const [warrantDetailModalState, setWarrantDetailModalState] = useState<boolean>(false);

    const [updateWarrantConfirmDialogState, setUpdateWarrantConfirmDialogState] = useState<boolean>(false);

    const [deleteTicketConfirmDialogState, setDeleteTicketConfirmDialogState] = useState<boolean>(false);
    const [deleteWarrantConfirmDialogState, setDeleteWarrantConfirmDialogState] = useState<boolean>(false);

    if(!person)
    {
        return (
            <div>
                gaada datranya
            </div>
        )
    }

    const userFaction = getFactionKey(user?.factionId);
    const factionColor = userFaction ? FACTION_COLOR[userFaction] : "text-zinc-400";

    const { id, name, mugshot, gender, dateofbirth, phoneNumber } = person.character;

    const visibleLicenses = person.licenses.filter(
        license => license.type !== LicenseType.ID_CARD
    );

    async function reloadPersonDetail() 
    {
        setLoading(true);
        try 
        {
            const response = await getPersonDetail(id);
            if(!response.success)
                throw new Error(response.message);
            
            setPerson(response.data);
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

    function showTicketDetail(ticketData: Ticket)
    {
        setTicketDetail(ticketData);
        setTicketDetailModalState(true);
    }

    function showWarrantDetail(warrantData: ArrestWarrant)
    {
        setWarrantDetail(warrantData);

        const { name, reason, duration, fine } = warrantData;

        setUpdateTargetName(name)
        setUpdateReason(reason)
        setUpdateDuration(duration.toString())
        setUpdateFine(fine.toString())

        setWarrantDetailModalState(true);
    }

    async function handleTicketDelete(id: number)
    {
        setLoading(true);
        try 
        {
            const response = await deleteTicket(id);
            if(!response.success)
                throw new Error(response.message);

            setTicketDetail(null);

            toast.success('Ticket successfully deleted.');
            await reloadPersonDetail();
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

    async function handleWarrantUpdate(id: number)
    {
        setLoading(true);
        try 
        {
            if(updateReason.length < 10)
                throw new Error('Description must be at least 10 characters long.');

            const parsedDuration = +updateDuration;
            if(parsedDuration < 1)
                throw new Error('Duration must be at least 1 month.');

            const parsedFine = +updateFine;
            if(parsedFine < 50)
                throw new Error('A minimum fine of $50 is required.');

            const response = await updateWarrant(id, updateReason, +updateDuration, +updateFine);
            if(!response.success)
                throw new Error(response.message);

            setWarrantDetailModalState(false);

            toast.success('Warrant successfully updated.');
            await reloadPersonDetail();
        }
        catch(error: any)
        {

        }
        finally
        {
            setLoading(false);
        }
    }

    async function handleWarrantDelete(id: number)
    {
        setLoading(true);
        try 
        {
            const response = await deleteWarrant(id);
            if(!response.success)
                throw new Error(response.message);

            setWarrantDetail(null);

            await reloadPersonDetail();
            toast.success('Warrant successfully deleted.');
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

    useEffect(() => {
        if(error)
            toast.error(error);
    }, [error])

    return (
        <div className="flex flex-col h-full animate-in fade-in duration-500">
            {ticketDetail && (
                <TicketDetailModal 
                    open={ticketDetailModalState}
                    onClose={() => setTicketDetailModalState(false)}

                    ticketData={ticketDetail}
                    loading={loading}
                    onDelete={(id) => {
                        setTicketToDelete(id);
                        setDeleteTicketConfirmDialogState(true);
                    }}
                />
            )}

            {warrantDetail && (
                <ArrestWarrantDetailModal
                    open={warrantDetailModalState}
                    onClose={() => setWarrantDetailModalState(false)}

                    targetName={updateTargetName}
                    setTargetName={setUpdateTargetName}

                    reason={updateReason}
                    setReason={setUpdateReason}

                    duration={updateDuration}
                    setDuration={setUpdateDuration}

                    fine={updateFine}
                    setFine={setUpdateFine}

                    arrestWarrantData={warrantDetail}
                    loading={loading}

                    onUpdate={(id) => {
                        setWarrantToManipulate(id);
                        setUpdateWarrantConfirmDialogState(true);
                    }}
                    onDelete={(id) => {
                        setWarrantToManipulate(id);
                        setDeleteWarrantConfirmDialogState(true);
                    }}
                />
            )}

            <ConfirmDialog
                open={deleteTicketConfirmDialogState}
                onClose={() => setDeleteTicketConfirmDialogState(false)}
                
                onConfirm={async () => {
                    if(ticketToDelete === null) 
                        return;
                        
                    await handleTicketDelete(ticketToDelete);
                    setDeleteTicketConfirmDialogState(false);
                    setTicketToDelete(null);
                }}

                icon={<Trash2 size={24} />}
                title="Cancel Ticket"
                description="Confirming this action will cancel the ticket."

                loading={loading}
                danger={true}
            />

            <ConfirmDialog
                open={updateWarrantConfirmDialogState}

                onClose={() => setUpdateWarrantConfirmDialogState(false)}
                onConfirm={async () => {
                    if(warrantToManipulate == null)
                        return;

                    await handleWarrantUpdate(warrantToManipulate);
                    setUpdateWarrantConfirmDialogState(false);
                    setWarrantToManipulate(null);
                }}

                icon={<Info className="w-4 h-4 text-yellow-500" />}
                title="Update Warrant"
                description="Are you sure you want to update this warrant?"

                loading={loading}
                danger={true}
            />

            <ConfirmDialog
                open={deleteWarrantConfirmDialogState}

                onClose={() => setDeleteWarrantConfirmDialogState(false)}
                onConfirm={async () => {
                    if(warrantToManipulate == null)
                        return;

                    await handleWarrantDelete(warrantToManipulate);
                    setDeleteWarrantConfirmDialogState(false);
                    setWarrantToManipulate(null);
                }}

                icon={<Trash2 className="w-4 h-4 text-red-500" />}
                title="Delete Warrant"
                description="Are you sure you want to delete this warrant?"

                loading={loading}
                danger={true}
            />

            {/* Main Dossier Grid */}
            <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
                <div className="grid grid-cols-12 gap-4 auto-rows-min">
                    {/* 1. Primary Profile Card (Left Column) */}
                    <div className="col-span-12 lg:col-span-4 row-span-2 flex flex-col gap-4">
                        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center">
                            <div className="relative mb-6">
                                <div className="w-40 h-40 rounded-2xl overflow-hidden border-2 border-zinc-800 shadow-2xl">
                                    {mugshot ? (
                                        <img src={mugshot} className="w-full h-full object-cover" alt={name} />

                                    ) : (
                                        <span className="h-full flex justify-center items-center text-lg font-black tracking-widest text-gray-400 select-none">
                                            {getInitials(name)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        
                            <h3 className="text-xl font-black text-zinc-100 uppercase tracking-tight text-center">{name}</h3>
                            <div className="flex items-center gap-2 mt-1 mb-6">
                                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">REF: {id}</span>
                            </div>
                        
                            <div className="w-full space-y-2.5">
                                <div className="flex justify-between items-center py-2 border-b border-zinc-800/30">
                                    <div className="flex items-center gap-2">
                                    <User className="w-3 h-3 text-zinc-600" />
                                    <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Gender</span>
                                    </div>
                                    <span className="text-xs font-mono text-zinc-300 uppercase">{gender}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-zinc-800/30">
                                    <div className="flex items-center gap-2">
                                    <Calendar className="w-3 h-3 text-zinc-600" />
                                    <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Birth Date</span>
                                    </div>
                                    <span className="text-xs font-mono text-zinc-300">{dateofbirth}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-3 h-3 text-zinc-600" />
                                        <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">
                                            Phone
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        className={`
                                            flex items-center gap-2
                                            text-xs font-mono font-bold
                                            ${factionColor}
                                            transition
                                            hover:text-blue-300
                                            active:text-blue-500
                                            cursor-pointer
                                        `}
                                        title="Click to copy"
                                        onClick={() => {
                                            copyToClipboard(phoneNumber);
                                            toast.info("Phone number copied");
                                        }}
                                    >
                                        {phoneNumber}
                                        <Files className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>

                    {/* Fingerprint / Secondary Info */}
                    <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4">
                        <div className="p-3 rounded-xl border border-zinc-800">
                            <Fingerprint className="w-6 h-6 text-zinc-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">Biometric Data</span>
                            <span className="text-[10px] text-zinc-400 font-mono">ENCRYPTED-NODE-73A</span>
                        </div>
                    </div>
            </div>

            {/* 2. Right Column Top - Vehicles (Col 5-12) */}
            <Dossier
                title='Registered Vehicles'
                icon={Car}
                iconColor={factionColor}
                className="col-span-12 lg:col-span-8"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {person.vehicles.length > 0 ? person.vehicles.map(vehicle => (
                        <VehicleItemCard
                            key={vehicle.id}
                            vehicle={vehicle}
                        />
                    )) : (
                        <div className="col-span-2 p-8 border border-dashed border-zinc-800 rounded-xl text-center">
                            <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest italic">No asset registry records found</p>
                        </div>
                    )}
                </div>
            </Dossier>

            {/* 3. Right Column Bottom - Licenses (Col 5-12) */}
            <Dossier
                title='License Verification'
                icon={IdCard}
                iconColor='text-emerald-500'
                className="col-span-12 lg:col-span-8"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {visibleLicenses.length > 0 ? (
                        visibleLicenses.map(license => (
                            <LicenseItemCard
                                key={license.id}
                                license={license}
                            />
                        ))
                    ) : (
                        <div className="col-span-2 p-8 border border-dashed border-zinc-800 rounded-xl text-center">
                            <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest italic">
                                No license records found
                            </p>
                        </div>
                    )}
                </div>
            </Dossier>

            {/* 4. Warrants */}
            <div className="col-span-12 bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 p-5 border-b border-zinc-800 bg-zinc-900/20">
                    <ShieldAlert className="w-4 h-4 text-zinc-500" />
                    <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Active Charges</h4>
                </div>
                <DataTable
                    columns={arrestWarrantColumns}
                    data={person.warrants}
                    rowKey={row => row.id}
                    emptyMessage="No active charges"
                    onRowClick={(row) => showWarrantDetail(row)}
                />
            </div>

            {/* 5. Infraction Table */}
            <div className="col-span-12 bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 p-5 border-b border-zinc-800 bg-zinc-900/20">
                    <Receipt className="w-4 h-4 text-zinc-500" />
                    <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Infraction Records</h4>
                </div>
                <DataTable
                    columns={ticketColumns}
                    data={person.tickets}
                    rowKey={row => row.id}
                    emptyMessage="No citations on file"
                    onRowClick={(row) => showTicketDetail(row)}
                />
            </div>

            {/* 5. Crime Records Table */}
            <div className="col-span-12 bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 p-5 border-b border-zinc-800 bg-zinc-900/20">
                    <FileText className="w-4 h-4 text-zinc-500" />
                    <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Crime Records</h4>
                </div>
                <DataTable
                    columns={crimeRecordColumns}
                    data={person.crimeRecords}
                    rowKey={row => row.id}
                    emptyMessage="No crime records found"
                />
            </div>

            {/* 5. Arrest Records Table */}
            <div className="col-span-12 bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 p-5 border-b border-zinc-800 bg-zinc-900/20">
                    <BookUser className="w-4 h-4 text-zinc-500" />
                    <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Arrest Records</h4>
                </div>
                <DataTable
                    columns={arrestRecordColumns}
                    data={person.arrests}
                    rowKey={row => row.id}
                    emptyMessage="No arrest records found"
                />
            </div>

            </div>
        </div>
        </div>
    )
}

export default PersonDetail;