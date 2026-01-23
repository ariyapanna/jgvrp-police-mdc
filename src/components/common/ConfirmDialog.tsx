import React from "react";
import Spinner from "@/components/common/Spinner";

interface ConfirmDialogProps 
{
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;

    icon: React.ReactNode;
    title: string;
    description: string;

    confirmLabel?: string;
    cancelLabel?: string;

    loading?: boolean;
    danger?: boolean;
}

const ConfirmDialog = ({ open, onClose, onConfirm, icon, title, description, confirmLabel = "Confirm", cancelLabel = "Cancel", loading = false, danger = false }: ConfirmDialogProps) => {
    if(!open) 
        return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xs flex items-center justify-center p-6 font-mono">
            <div
                className={`
                    w-full max-w-sm
                    bg-[#0d0d0d]
                    border rounded-2xl overflow-hidden
                    shadow-2xl
                    animate-in zoom-in duration-200
                    ${danger ? "border-red-500/30" : "border-white/10"}
                `}
            >
                <div className="p-8 flex flex-col items-center text-center">
                    {/* Icon */}
                    <div
                        className={`
                            w-16 h-16 rounded-full flex items-center justify-center mb-6
                            border
                            ${danger
                                ? "bg-red-500/10 border-red-500/20"
                                : "bg-white/5 border-white/10"}
                        `}
                    >
                        {icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-black text-white uppercase mb-2">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-zinc-500 uppercase leading-relaxed mb-8">
                        {description}
                    </p>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-3 w-full">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="
                                py-3 bg-white/5 hover:bg-white/10
                                border border-white/10 rounded-xl
                                text-[10px] font-black uppercase tracking-widest
                                text-zinc-300 transition-all
                                disabled:opacity-40
                            "
                        >
                            {cancelLabel}
                        </button>

                        <button
                            onClick={onConfirm}
                            disabled={loading}
                            className={`
                                py-3 rounded-xl
                                text-[10px] font-black uppercase tracking-widest
                                transition-all
                                flex items-center justify-center gap-2

                                ${danger
                                    ? "bg-red-600 hover:bg-red-500 text-white border border-red-400/20 shadow-lg shadow-red-600/10"
                                    : "bg-emerald-600 hover:bg-emerald-500 text-black"}
                                disabled:opacity-50
                            `}
                        >
                            {loading ? (
                                <Spinner size="xs" variant="muted" />
                            ) : (
                                confirmLabel
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
