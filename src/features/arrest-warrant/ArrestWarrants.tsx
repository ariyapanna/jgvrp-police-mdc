import { useEffect, useState } from "react";

import { Info, ShieldAlert, Trash2 } from "lucide-react";

import SearchAction from "@/components/section-panel/actions/SearchAction";
import SectionPanel from "@/components/section-panel/SectionPanel";
import DataTable from "@/components/data-table/DataTable";

import type { Column } from "@/components/data-table/types";
import type { ArrestWarrant } from "@/types/arrest-warrant/arrestWarrant";
import { toast } from "react-toastify";
import { createWarrant, deleteWarrant, getWarrant, getWarrants, updateWarrant } from "./api";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import CreateButton from "@/components/section-panel/actions/CreateButton";
import CreateWarrantModal from "./CreateWarrantModal";
import ArrestWarrantDetailModal from "./ArrestWarrantDetailModal";
import ConfirmDialog from "@/components/common/ConfirmDialog";

const columns: Column<ArrestWarrant>[] = [
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

const ArrestWarrants = () => {
    const [warrants, setWarrants] = useState<ArrestWarrant[]>([]);
    const [warrantDetail, setWarrantDetail] = useState<ArrestWarrant | null>(null);

    const [warrantToDelete, setWarrantToDelete] = useState<number | null>(null);
    const [warrantToUpdate, setWarrantToUpdate] = useState<number | null>(null);
    
    const [searchQuery, setSearchQuery] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [targetName, setTargetName] = useState<string>('');
    const [reason, setReason] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [fine, setFine] = useState<string>('');

    const [updateTargetName, setUpdateTargetName] = useState<string>('');
    const [updateReason, setUpdateReason] = useState<string>('');
    const [updateDuration, setUpdateDuration] = useState<string>('');
    const [updateFine, setUpdateFine] = useState<string>('');

    const [createWarrantModalState, setCreateWarrantModalState] = useState<boolean>(false);
    const [warrantDetailModalState, setWarrantDetailModalState] = useState<boolean>(false);

    const [deleteConfirmDialogState, setDeleteConfirmDialogState] = useState<boolean>(false);
    const [updateConfirmDialogState, setUpdateConfirmDialogState] = useState<boolean>(false);

    async function loadWarrants()
    {
        setLoading(true);
        try 
        {
            const response = await getWarrants(searchQuery);
            if(!response.success)
                throw new Error(response.message);

            setWarrants(response.data);
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

    async function loadWarrantDetail(id: number)
    {
        setLoading(true);
        try 
        {
            const response = await getWarrant(id);
            if(!response.success)
                throw new Error(response.message);

            const { name, reason, duration, fine } = response.data;
            setWarrantDetail(response.data);

            setUpdateTargetName(name);
            setUpdateReason(reason);
            setUpdateDuration(duration.toString());
            setUpdateFine((fine / 100).toString());

            setWarrantDetailModalState(true);
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

    async function handleWarrantCreate(e: React.FormEvent)
    {
        e.preventDefault();
        setLoading(true);
        try 
        {
            if(targetName.length < 3)
                throw new Error('Target name must be at least 3 characters long.');

            if(reason.length < 10)
                throw new Error('Description must be at least 10 characters long.');

            const parsedDuration = +duration;
            if(parsedDuration < 1)
                throw new Error('Duration must be at least 1 month.');

            const parsedFine = +fine;
            if(parsedFine < 50)
                throw new Error('A minimum fine of $50 is required.')

            const response = await createWarrant(targetName, reason, parsedDuration, parsedFine)
            if(!response.success)
                throw new Error(response.message);

            setCreateWarrantModalState(false);

            setTargetName('');
            setReason('');
            setDuration('');
            setFine('');

            toast.success('Warrant successfully created.');
            await loadWarrants();
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
            await loadWarrants();
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

    async function handleWarrantDelete(id: number)
    {
        try 
        {
            const response = await deleteWarrant(id);
            if(!response.success)
                throw new Error(response.message);

            setWarrantDetailModalState(false);

            await loadWarrants();
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
        loadWarrants();
    }, []);

    useEffect(() => {
        if(error)
            toast.error(error);
    }, [error]);

    return (
        <>
            <CreateWarrantModal
                open={createWarrantModalState}
                onClose={() => setCreateWarrantModalState(false)}

                targetName={targetName}
                setTargetName={setTargetName}

                reason={reason}
                setReason={setReason}

                duration={duration}
                setDuration={setDuration}

                fine={fine}
                setFine={setFine}

                loading={loading}
                onSubmit={(e) => handleWarrantCreate(e)}
            />

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
                        setWarrantToUpdate(id);
                        setUpdateConfirmDialogState(true);
                    }}
                    onDelete={(id) => {
                        setWarrantToDelete(id);
                        setDeleteConfirmDialogState(true);
                    }}
                />
            )}

            <ConfirmDialog
                open={deleteConfirmDialogState}

                onClose={() => setDeleteConfirmDialogState(false)}
                onConfirm={async () => {
                    if(warrantToDelete == null)
                        return;

                    await handleWarrantDelete(warrantToDelete);
                    setDeleteConfirmDialogState(false);
                    setWarrantToDelete(null);
                }}

                icon={<Trash2 className="w-4 h-4 text-red-500" />}
                title="Delete Warrant"
                description="Are you sure you want to delete this warrant?"

                loading={loading}
                danger={true}
            />

            <ConfirmDialog 
                open={updateConfirmDialogState}

                onClose={() => setUpdateConfirmDialogState(false)}
                onConfirm={async() => {
                    if(warrantToUpdate == null)
                        return;

                    await handleWarrantUpdate(warrantToUpdate);
                    setUpdateConfirmDialogState(false);
                    setWarrantToUpdate(null);
                }}

                icon={<Info className="w-4 h-4 text-yellow-500" />}
                title="Update Warrant"
                description="Are you sure you want to update this warrant?"

                loading={loading}
                danger={true}
            />

            <SectionPanel
                title="Arrest Warrants"
                icon={ShieldAlert}

                accent="rose"

                actions={
                    <>
                        <SearchAction
                            value={searchQuery}
                            onChange={setSearchQuery}
                            onSubmit={() => loadWarrants()}

                            placeholder="Search target name or issuer..."
                            loading={loading}
                        />
                        <CreateButton
                            loading={loading}
                            onClick={() => setCreateWarrantModalState(true)}
                            label="Create Warrant"
                            backgroundColor="bg-rose-500"
                            hoverColor="hover:bg-rose-600"
                            shadow="shadow-rose-500/50"
                        />
                    </>
                }
            >
                <DataTable
                    data={warrants}
                    columns={columns}
                    rowKey={(row) => row.id}
                    loading={loading}
                    emptyMessage="No arrest warrants found"
                    onRowClick={(row) => loadWarrantDetail(row.id)}
                />
            </SectionPanel>
        </>
    )
}

export default ArrestWarrants;