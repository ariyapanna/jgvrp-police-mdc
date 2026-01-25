import Modal from "@/components/common/Modal"
import { useUser } from "@/context/user.context"
import type { ArrestWarrant } from "@/types/arrest-warrant/arrestWarrant"
import { formatDate } from "@/utils/formatDate"

import { Clock, DollarSign, Save, ShieldAlert, Trash2, User } from "lucide-react"

interface ArrestWarrantDetailModalProps 
{
    open: boolean
    onClose: () => void 

    targetName: string;
    setTargetName: (v: string) => void;

    reason: string;
    setReason: (v: string) => void;

    duration: string;
    setDuration: (v: string) => void;

    fine: string;
    setFine: (v: string) => void;

    arrestWarrantData: ArrestWarrant;

    loading: boolean;

    onUpdate: (id: number) => void;
    onDelete: (id: number) => void;
}

const ArrestWarrantDetailModal = ({ open, onClose, targetName, setTargetName, reason, setReason, duration, setDuration, fine, setFine, arrestWarrantData, loading, onUpdate, onDelete }: ArrestWarrantDetailModalProps) => {
    const { user } = useUser();

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Arrest Warrant Detail"
            icon={<ShieldAlert className="w-5 h-5 text-rose-500" />}
            size="md"
        >
            <form onSubmit={(e) => {
                e.preventDefault();
                onUpdate(arrestWarrantData.id)
            }} className="space-y-6">
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            Subject Name
                        </label>

                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                            <input
                                type="text"
                                value={targetName}
                                onChange={(e) => setTargetName(e.target.value)}
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
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Please describe the reason..."
                            className="
                                w-full h-40 bg-black border border-white/10 rounded-xl p-4
                                text-xs font-mono text-pink-100 placeholder:text-zinc-800
                                focus:outline-none focus:border-pink-500/50
                            "
                        />
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            Duration
                        </label>

                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                            <input
                                min={1}
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="
                                    w-full pl-9 pr-3 py-2
                                    bg-black border border-white/10 rounded-lg
                                    text-xs font-mono text-zinc-200 placeholder:text-zinc-800
                                    focus:outline-none focus:border-pink-500/50 
                                "
                                placeholder="Please enter jail duration..."
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
                                min={1}
                                type="number"
                                value={fine}
                                onChange={(e) => setFine(e.target.value)}
                                className="
                                    w-full pl-9 pr-3 py-2
                                    bg-black border border-white/10 rounded-lg
                                    text-xs font-mono text-zinc-200 placeholder:text-zinc-800
                                    focus:outline-none focus:border-pink-500/50 
                                "
                                placeholder="Please enter fine amount..."
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
                                value={arrestWarrantData.issuer}
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
                            Issued On
                        </label>

                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                            <input
                                type="text"
                                value={formatDate(arrestWarrantData.createdAt)}
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
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        disabled={loading}
                        type="submit"
                        className="
                            w-full py-2.5
                            bg-pink-600
                            text-white text-xs font-black uppercase tracking-widest
                            rounded-lg
                            shadow shadow-pink-600/20
                            flex items-center justify-center gap-2
                            transition-all

                            hover:bg-pink-500

                            disabled:bg-pink-600/40
                            disabled:text-white/40
                            disabled:shadow-none
                            disabled:cursor-not-allowed
                            disabled:hover:bg-pink-600/40
                        "
                    >
                        <Save className="w-3.5 h-3.5" />
                        Update Warrant
                    </button>

                    {user?.rank === 10 && (
                        <button
                            onClick={() => onDelete(arrestWarrantData.id)}
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
                            Delete Warrant
                        </button>
                    )}
                </div>
            </form>  
        </Modal>
    )
}

export default ArrestWarrantDetailModal;