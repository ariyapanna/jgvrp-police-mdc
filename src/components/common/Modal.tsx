import { X } from "lucide-react";
import React from "react";

type ModalSize = "sm" | "md" | "lg" | "xl";

interface ModalProps
{
    open: boolean;
    onClose: () => void;

    title: string;
    icon?: React.ReactNode;

    children: React.ReactNode;
    size?: ModalSize;
}

const sizeClasses: Record<ModalSize, string> = 
{
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
};

const Modal = ({ open, onClose, title, icon, children, size = "md" }: ModalProps) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xs overflow-y-auto">
            <div className="flex justify-center p-6">
                <div
                    className={`
                        w-full ${sizeClasses[size]}
                        bg-[#0d0d0d] border border-zinc-500/30
                        rounded-2xl overflow-hidden shadow-2xl
                        animate-in zoom-in duration-300
                    `}
                >
                    {/* Header */}
                    <div className="px-6 py-4 bg-zinc-500/10 border-b border-zinc-500/20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {icon}
                            <h3 className="text-sm font-black uppercase tracking-widest text-white">
                                {title}
                            </h3>
                        </div>

                        <button
                            onClick={onClose}
                            className="text-zinc-500 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
