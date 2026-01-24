import { FileText } from "lucide-react";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import SearchAction from "@/components/section-panel/actions/SearchAction";
import SectionPanel from "@/components/section-panel/SectionPanel";
import DataTable from "@/components/data-table/DataTable";

import type { Column } from "@/components/data-table/types";
import type { ArrestRecord } from "@/types/arrest-record/arrestRecord";
import type { ArrestRecordDetail } from "@/types/arrest-record/arrestRecordDetail";

import { getArrestRecords, getArrestRecord } from "./api";
import { formatDate } from "@/utils/formatDate";
import { formatCurrency } from "@/utils/formatCurrency";
import ArrestRecordDetailModal from "./ArrestRecordDetailModal";

const columns: Column<ArrestRecord>[] = [
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
        header: 'ARRESTED ON',
        render: (row) => <span className="text-[11px] font-black text-zinc-200 uppercase tracking-wide group-hover:text-white transition-colors">{formatDate(row.createdAt)}</span>
    }
]

const ArrestRecords = () => {
    const [warrants, setWarrants] = useState<ArrestRecord[]>([]);
    const [warrantDetail, setWarrantDetail] = useState<ArrestRecordDetail | null>(null)

    const [searchQuery, setSearchQuery] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [warrantDetailDialogState, setWarrantDetailDialogState] = useState<boolean>(false);

    async function loadWarrants()
    {
        setLoading(true);
        try 
        {
            const response = await getArrestRecords(searchQuery);
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
            const response = await getArrestRecord(id);
            if(!response.success)
                throw new Error(response.message);

            setWarrantDetail(response.data);
            setWarrantDetailDialogState(true);
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
    }, [])

    useEffect(() => {
        if(error)
            toast.error(error);
    }, [error])

    return (
        <>
            {warrantDetail && (
                <ArrestRecordDetailModal
                    open={warrantDetailDialogState}
                    onClose={() => setWarrantDetailDialogState(false)}

                    arrestRecordData={warrantDetail}

                    loading={loading}
                />
            )}

            <SectionPanel
                title="ARREST RECORDS"
                icon={FileText}

                accent="indigo"

                actions={
                    <SearchAction 
                        value={searchQuery} 
                        onChange={setSearchQuery} 
                        onSubmit={() => loadWarrants()} 
                        placeholder="Search target or issuer..."
                        loading={loading} 
                    />
                }
            >
                <DataTable 
                    columns={columns}
                    data={warrants}
                    rowKey={(row) => row.id}
                    loading={loading}
                    emptyMessage="No arrest record found"
                    onRowClick={(row) => loadWarrantDetail(row.id)}
                />
            </SectionPanel>
        </>
    );
}

export default ArrestRecords;