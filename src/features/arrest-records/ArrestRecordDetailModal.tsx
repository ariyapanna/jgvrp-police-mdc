import Modal from "@/components/common/Modal";
import { Clock, DollarSign, FileText, User } from "lucide-react";

import type { ArrestRecordDetail } from "@/types/arrest-record/arrestRecordDetail";
import type { CrimeRecord } from "@/types/crime-record/crimeRecord";
import type { Column } from "@/components/data-table/types";

import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

import DataTable from "@/components/data-table/DataTable";

interface ArrestRecordDetailProps {
    open: boolean;
    onClose: () => void;

    arrestRecordData: ArrestRecordDetail

    loading: boolean;
}

const columns: Column<CrimeRecord>[] = [
    {
        key: 'id',
        header: 'REF',
        render: (row) => <span className="font-mono text-emerald-500/80 tracking-tighter">[{row.id}]</span>
    },
    {
        key: 'duration',
        header: 'DURATION',
        align: 'center',
        render: (row) => (
            <span className="text-[11px] font-black text-yellow-500/80 uppercase tracking-wide group-hover:text-white transition-colors">
                {row.duration} month(s)
            </span>
        )
    },
    {
        key: 'fine',
        header: 'FINE',
        render: (row) => <span className="text-[11px] font-black text-red-500/80 uppercase tracking-wide group-hover:text-white transition-colors">{formatCurrency(row.fine)}</span>
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
        render: (row) => <span className="text-[11px] font-black text-zinc-200 uppercase tracking-wide group-hover:text-white transition-colors">{row.issuer}</span>
    },
]

const ArrestRecordDetailModal = ({ open, onClose, arrestRecordData, loading }: ArrestRecordDetailProps) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Arrest Record Detail"
            icon={<FileText className="w-5 h-5 text-indigo-500" />}
            size="xl"
        >
            <form className="space-y-6">
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            Subject Name
                        </label>

                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                            <input
                                type="text"
                                value={arrestRecordData.name}
                                className="
                                    w-full pl-9 pr-3 py-2
                                    bg-black border border-white/10 rounded-lg
                                    text-xs font-mono text-zinc-200 placeholder:text-zinc-800
                                    focus:outline-none focus:border-indigo-500/50 
                                "
                                disabled
                            />
                        </div>
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            Duration
                        </label>

                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                            <input
                                type="text"
                                value={`${arrestRecordData.duration} months`}
                                className="
                                    w-full pl-9 pr-3 py-2
                                    bg-black border border-white/10 rounded-lg
                                    text-xs font-mono text-zinc-200
                                    focus:outline-none focus:border-indigo-500/50 
                                "
                                disabled
                            />
                        </div>
                    </div>

                    {/* Fine */}
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            Fine
                        </label>

                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                            <input
                                type="text"
                                value={formatCurrency(arrestRecordData.fine)}
                                className="
                                    w-full pl-9 pr-3 py-2
                                    bg-black border border-white/10 rounded-lg
                                    text-xs font-mono text-zinc-200
                                    focus:outline-none focus:border-indigo-500/50 
                                "
                                disabled
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            Person In Charge
                        </label>

                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                            <input
                                type="text"
                                value={arrestRecordData.issuer}
                                className="
                                    w-full pl-9 pr-3 py-2
                                    bg-black border border-white/10 rounded-lg
                                    text-xs font-mono text-zinc-200 placeholder:text-zinc-800
                                    focus:outline-none focus:border-indigo-500/50 
                                "
                                disabled
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            Arrested On
                        </label>

                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                            <input
                                type="text"
                                value={formatDate(arrestRecordData.createdAt)}
                                className="
                                    w-full pl-9 pr-3 py-2
                                    bg-black border border-white/10 rounded-lg
                                    text-xs font-mono text-zinc-200 placeholder:text-zinc-800
                                    focus:outline-none focus:border-indigo-500/50 
                                "
                                disabled
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            Crime Records
                        </label>

                        <DataTable
                            columns={columns}
                            data={arrestRecordData.crimes}

                            rowKey={(row) => row.id}
                            loading={loading}

                            emptyMessage="No crime records found"
                        />
                    </div>
                </div>
            </form>
        </Modal>
    );
};

export default ArrestRecordDetailModal;
