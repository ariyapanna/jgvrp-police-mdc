import type { ReactNode } from "react";

interface DossierProps 
{
    title: string;
    icon: any;
    iconColor?: string;
    className?: string;
    children: ReactNode;
}

const Dossier = ({ title, icon: Icon, iconColor = "text-zinc-500", className, children }: DossierProps) => {
    return (
        <div className={`bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 ${className}`}>
            <div className="flex items-center gap-2 mb-4 border-b border-zinc-800 pb-3">
                <Icon className={`w-4 h-4 ${iconColor}`} />
                <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                    {title}
                </h4>
            </div>
            {children}
        </div>
    );
}

export default Dossier;
