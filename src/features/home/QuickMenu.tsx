import type { PageType } from "@/types/page/page";

export interface QuickMenuProps 
{
    label: string;
    description: string;

    icon: any;
    iconColor: string;

    borderColor: string;
    backgroundColor: string;

    onClick: () => void
}

export interface QuickMenuData
{
    id: PageType

    label: string;
    description: string;

    icon: any;
    iconColor: string;

    borderColor: string;
    backgroundColor: string;
}

export const QuickMenu = ({ label, icon: Icon, iconColor, description, borderColor, backgroundColor, onClick}: QuickMenuProps) => {
    return (
        <button
            onClick={onClick}
            className={`
                group relative h-40 border-2 ${borderColor} ${backgroundColor} rounded-xl p-6 text-left 
                transition-all duration-200 hover:brightness-125 hover:scale-[1.02]
                flex flex-col justify-between overflow-hidden
            `}
        >
            <div className="absolute top-2 right-2 opacity-10 transition-opacity group-hover:opacity-20 pointer-events-none">
                <Icon size={120} strokeWidth={1} />
            </div>

            <div className={iconColor}>
                <Icon className="w-8 h-8" />
            </div>

            <div>
                <h3 className="text-xl font-black text-white uppercase tracking-wider mb-1">
                    {label}
                </h3>
                <p className="text-[9px] font-mono text-gray-400 leading-tight tracking-widest">
                    {description}
                </p>
            </div>
        </button>
    )
}