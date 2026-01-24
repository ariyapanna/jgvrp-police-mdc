import type { ReactNode, MouseEvent } from "react";

interface InfoCardProps 
{
    title: string;
    subtitle?: ReactNode;
    badge?: ReactNode;
    
    onClick?: () => void;
    onBadgeClick?: () => void;
}

const InfoCard = ({ title, subtitle, badge, onClick, onBadgeClick }: InfoCardProps) => {
    function handleBadgeClick(e: MouseEvent) 
    {
        e.stopPropagation();
        onBadgeClick?.();
    }

    return (
        <div
            onClick={onClick}
            className="relative p-3 rounded-xl border border-zinc-800 bg-zinc-950/50 cursor-pointer"
        >
            <div className="
                absolute inset-0 rounded-xl pointer-events-none
                transition
                hover:border-zinc-700
            " />

            <div className="relative z-0 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-bold text-zinc-100">
                        {title}
                    </span>

                    {subtitle && (
                        <div className="text-[10px] font-mono text-zinc-600 uppercase">
                            {subtitle}
                        </div>
                    )}
                </div>

                {badge && (
                    <div
                        onClick={handleBadgeClick}
                        className={`
                            relative z-10
                            ${onBadgeClick ? 'cursor-copy hover:opacity-80' : ''}
                        `}
                    >
                        {badge}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfoCard;