import { ACCENT_STYLES } from "@/types/accent-color/accentColor";
import type { SectionPanelProps } from "./types";

// const SectionPanel = ({ title, subtitle, icon: Icon, actions, children, accent = "orange" }: SectionPanelProps) => {
//     const styles = ACCENT_STYLES[accent];

//     return (
//         <div className="grid grid-rows-[auto_1fr] h-full">
//             <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-zinc-800 px-4 py-3">
//                 <div className="flex items-center gap-4">
//                     <div className={`p-3 rounded-xl border ${styles.bg} ${styles.border}`}>
//                         <Icon className={`w-6 h-6 animate-pulse ${styles.icon}`} />
//                     </div>

//                     <div>
//                         <h2 className="text-xl font-black text-white uppercase tracking-tighter">
//                             {title}
//                         </h2>

//                         {subtitle && (
//                             <div className="mt-1 opacity-50">
//                                 {subtitle}
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 <div className="flex flex-col justify-center lg:flex-row lg:justify-start lg:items-center gap-4">
//                     {actions}
//                 </div>
//             </div>

//             <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
//                 {children}
//             </div>
//         </div>
//     )
// }

const SectionPanel = ({ title, subtitle, icon: Icon, actions, children, accent = "orange" }: SectionPanelProps) => {
  const styles = ACCENT_STYLES[accent];

  return (
    <div className="flex flex-col h-full min-h-0 font-mono">
        {/* Header */}
        <div className="flex-shrink-0 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-zinc-800 px-4 py-3">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl border ${styles.bg} ${styles.border}`}>
                <Icon className={`w-6 h-6 animate-pulse ${styles.icon}`} />
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

            <div className="flex flex-col justify-center lg:flex-row lg:justify-start lg:items-center gap-4">
                {actions}
            </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 min-h-0 overflow-y-auto p-6">
            {children}
        </div>
    </div>
  );
};


export default SectionPanel;