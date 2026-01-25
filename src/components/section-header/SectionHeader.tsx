import React from "react";
import { Plus, Radio } from "lucide-react";

import { ACCENT_STYLES, type AccentColor } from "@/types/accent-color/accentColor";

interface SectionHeaderProps {
    title: string;
    subtitle?: React.ReactNode;

    onCreate?: () => void;
    createLabel?: string;

    loading: boolean;
    accent?: AccentColor;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({title,subtitle, onCreate, createLabel = "New Entry", loading, accent = "orange"}) => {
    const styles = ACCENT_STYLES[accent];
    const disabled = loading || !onCreate;

    return (
        <div className="px-4 py-2 border-b border-white/5 flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-0">
            {/* LEFT */}
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl border ${styles.bg} ${styles.border}`}>
                    <Radio className={`w-6 h-6 animate-pulse ${styles.icon}`} />
                </div>

                <div>
                    <h2 className="text-xl font-black text-white uppercase tracking-tighter">
                        {title}
                    </h2>

                    {subtitle && (
                        <div className="mt-1 opacity-50">
                            {subtitle}
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT */}
            {onCreate && (
                <button
                    disabled={disabled}
                    onClick={onCreate}
                    className={`
                        flex items-center gap-2 px-5 py-2.5
                        rounded-lg text-[10px] font-black uppercase tracking-widest
                        transition-all
                        border border-white/10
                        ${disabled
                            ? "opacity-40 cursor-not-allowed bg-zinc-800 text-zinc-400 shadow-none"
                            : `
                                text-white
                                ${styles.buttonBg}
                                ${styles.buttonHover}
                                shadow-lg ${styles.buttonShadow}
                              `
                        }
                    `}
                >
                    <Plus className="w-3 h-3" />
                    {createLabel}
                </button>
            )}
        </div>
    );
};

export default SectionHeader;
