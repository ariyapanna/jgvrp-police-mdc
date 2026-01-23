import React from "react";
import { AlertTriangle, Clock, Plus } from "lucide-react";
import Modal from "@/components/common/Modal";

interface CreateBoloModalProps {
  open: boolean;
  onClose: () => void;

  description: string;
  setDescription: (v: string) => void;

  expire: number;
  setExpire: (e: number) => void;

  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const CreateBOLOModal = ({ open, onClose, description, setDescription, expire, setExpire, loading, onSubmit }: CreateBoloModalProps) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Create BOLO"
            icon={<AlertTriangle className="w-5 h-5 text-orange-500" />}
            size="sm"
        >
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="flex flex-col gap-3">
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            Subject Description
                        </label>

                        <textarea
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="PROVIDE DETAILED DESCRIPTION, VEHICLE PLATES, OR LAST KNOWN LOCATION..."
                            className="
                                w-full h-40 bg-black border border-white/10 rounded-xl p-4
                                text-xs font-mono text-orange-100 placeholder:text-zinc-800
                                focus:outline-none focus:border-orange-500/50 uppercase
                            "
                        />
                    </div>

                    {/* Expire */}
                    <div>
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            Expiry (Days)
                        </label>

                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                            <input
                                type="number"
                                min={3}
                                max={365}
                                value={expire}
                                onChange={(e) => setExpire(Number(e.target.value))}
                                className="
                                    w-full pl-9 pr-3 py-2
                                    bg-black border border-white/10 rounded-lg
                                    text-xs font-mono text-zinc-200
                                    focus:outline-none focus:border-orange-500/50 
                                "
                            />
                        </div>

                        <span className="text-xs font-mono text-zinc-600">
                            Range: 1–365 days
                        </span>
                    </div>
                </div>


                <button
                    disabled={loading}
                    type="submit"
                    className="
                        w-full py-2.5
                        bg-orange-600
                        text-white text-xs font-black uppercase tracking-widest
                        rounded-lg
                        shadow shadow-orange-600/20
                        flex items-center justify-center gap-2
                        transition-all

                        hover:bg-orange-500

                        disabled:bg-orange-600/40
                        disabled:text-white/40
                        disabled:shadow-none
                        disabled:cursor-not-allowed
                        disabled:hover:bg-orange-600/40
                    "
                >
                    <Plus className="w-3.5 h-3.5" />
                    Broadcast BOLO
                </button>
            </form>
        </Modal>
    );
};

export default CreateBOLOModal;
