import { AlertTriangle, Clock, DollarSign, Trash2, User } from "lucide-react";

import Modal from "@/components/common/Modal";

import type { Ticket } from "@/types/ticket/ticket";
import { formatDate } from "@/utils/formatDate";
import { TicketStatus } from "@/types/ticket/ticketStatus";
import { formatCurrency } from "@/utils/formatCurrency";

interface TicketDetailModalProps {
    open: boolean;
    onClose: () => void;

    ticketData: Ticket

    loading: boolean;
    onDelete: (id: number) => void;
}

const TicketDetailModal = ({ open, onClose, ticketData, loading, onDelete }: TicketDetailModalProps) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Issue Ticket"
            icon={<AlertTriangle className="w-5 h-5 text-pink-500" />}
            size="sm"
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
                                value={ticketData.characterName}
                                className="
                                    w-full pl-9 pr-3 py-2
                                    bg-black border border-white/10 rounded-lg
                                    text-xs font-mono text-zinc-200 placeholder:text-zinc-800
                                    focus:outline-none focus:border-pink-500/50 
                                "
                                disabled
                            />
                        </div>
                    </div>

                    {/* Reason */}
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            Reason
                        </label>

                        <textarea
                            required
                            value={ticketData.description}
                            className="
                                w-full h-40 bg-black border border-white/10 rounded-xl p-4
                                text-xs font-mono text-pink-100 placeholder:text-zinc-800
                                focus:outline-none focus:border-pink-500/50 uppercase
                            "
                            disabled
                        />
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
                                value={formatCurrency(ticketData.amount)}
                                className="
                                    w-full pl-9 pr-3 py-2
                                    bg-black border border-white/10 rounded-lg
                                    text-xs font-mono text-zinc-200
                                    focus:outline-none focus:border-pink-500/50 
                                "
                                disabled
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            Issuer
                        </label>

                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                            <input
                                type="text"
                                value={ticketData.issuerName}
                                className="
                                    w-full pl-9 pr-3 py-2
                                    bg-black border border-white/10 rounded-lg
                                    text-xs font-mono text-zinc-200 placeholder:text-zinc-800
                                    focus:outline-none focus:border-pink-500/50 
                                "
                                disabled
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            Issued At
                        </label>

                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                            <input
                                type="text"
                                value={formatDate(ticketData.createdAt)}
                                className="
                                    w-full pl-9 pr-3 py-2
                                    bg-black border border-white/10 rounded-lg
                                    text-xs font-mono text-zinc-200 placeholder:text-zinc-800
                                    focus:outline-none focus:border-pink-500/50 
                                "
                                disabled
                            />
                        </div>
                    </div>

                    {ticketData.status !== TicketStatus.CANCELLED && (
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                Expired At
                            </label>

                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                                <input
                                    type="text"
                                    value={formatDate(ticketData.dueAt)}
                                    className="
                                        w-full pl-9 pr-3 py-2
                                        bg-black border border-white/10 rounded-lg
                                        text-xs font-mono text-zinc-200 placeholder:text-zinc-800
                                        focus:outline-none focus:border-pink-500/50 
                                    "
                                    disabled
                                />
                            </div>
                        </div>
                    )}

                    {ticketData.cancelledAt && (
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                Cancelled At
                            </label>

                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                                <input
                                    type="text"
                                    value={formatDate(ticketData.cancelledAt)}
                                    className="
                                        w-full pl-9 pr-3 py-2
                                        bg-black border border-white/10 rounded-lg
                                        text-xs font-mono text-zinc-200 placeholder:text-zinc-800
                                        focus:outline-none focus:border-pink-500/50 
                                    "
                                    disabled
                                />
                            </div>
                        </div>
                    )}
                </div>

                {ticketData.status == TicketStatus.PENDING && (
                    <button
                        onClick={() => onDelete(ticketData.id)}
                        disabled={loading}
                        type="button"
                        className="
                            w-full py-2.5
                            bg-red-600
                            text-white text-xs font-black uppercase tracking-widest
                            rounded-lg
                            shadow shadow-red-600/20
                            flex items-center justify-center gap-2
                            transition-all

                            hover:bg-red-500

                            disabled:bg-red-600/40
                            disabled:text-white/40
                            disabled:shadow-none
                            disabled:cursor-not-allowed
                            disabled:hover:bg-red-600/40
                        "
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete Ticket
                    </button>
                )}
            </form>
        </Modal>
    );
};

export default TicketDetailModal;
