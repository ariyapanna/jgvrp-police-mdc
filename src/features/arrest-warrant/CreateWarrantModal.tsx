import Modal from "@/components/common/Modal";
import { Clock, DollarSign, Plus, ShieldAlert, User } from "lucide-react";

interface CreateWarrantModalProps
{
    open: boolean;
    onClose: () => void;

    targetName: string;
    setTargetName: (v: string) => void;

    reason: string;
    setReason: (v: string) => void;

    duration: string;
    setDuration: (v: string) => void;

    fine: string;
    setFine: (v: string) => void;

    loading: boolean;
    onSubmit: (e: React.FormEvent) => void;
}

const CreateWarrantModal = ({ open, onClose, targetName, setTargetName, reason, setReason, duration, setDuration, fine, setFine, loading, onSubmit }: CreateWarrantModalProps) => {
    return (
        <Modal
            open={open}
            onClose={onClose}

            title="Issue Arrest Warrant"
            icon={<ShieldAlert className="w-5 h-5 text-rose-500" />}
            size="sm"
        >
            <form onSubmit={onSubmit} className="space-y-6">
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
                                placeholder="Please enter subject fullname..."
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
                </div>


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
                    <Plus className="w-3.5 h-3.5" />
                    Create Warrant
                </button>
            </form>
        </Modal>
    )
}

export default CreateWarrantModal;