import { useEffect, useState } from "react";

import { BatteryFull, User, Users, Wifi } from "lucide-react";

import { useUser } from "@/context/user.context";

interface HeaderProps 
{
    unitPanelState: boolean;
    onToggleUnitPanelClicked: (state: boolean) => void;
}

const Header = ({ unitPanelState, onToggleUnitPanelClicked }: HeaderProps) => {
    const { user } = useUser();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getDisplayName = (fullname?: string) => {
        if(!fullname)
            return 'N/A';

        const parts = fullname.trim().split(" ");
        return `${parts[0][0]}. ${parts[1]}`.toUpperCase();
    }

    return (
        <header className="h-14 bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between px-4 z-50">
            <div className="flex items-center gap-3 min-w-[150px]">
                <div className="w-10 h-10 bg-[#1a1a1a] rounded flex items-center justify-center border border-white/10">
                    {user?.mugshot && (
                        <img className="w-10 h-10 rounded" src={user?.mugshot} alt={user?.name} />
                    )}
                    <User className="w-6 h-6 text-gray-500" />
                </div>
                <div className="leading-none hidden sm:block">
                    <h2 className="text-xs font-bold tracking-wider uppercase">{`${user?.rankNameShort ?? 'N/A'} ${getDisplayName(user?.name)}`}</h2>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">{(!user?.badgeNumber || user?.badgeNumber.length === 0) ? 'N/A' : user?.badgeNumber} | {user?.unit?.name ?? 'N/A'}</p>
                </div>
            </div>

            <div className="hidden md:block md:text-center">
                <h1 className="text-sm font-black tracking-[0.3em] uppercase opacity-80">Mobile Data Computers</h1>
            </div>

            <div className="flex items-center gap-4">
                <button 
                    onClick={() => onToggleUnitPanelClicked(!unitPanelState)}
                    className={`p-2 rounded transition-colors xl:hidden ${unitPanelState ? 'bg-blue-600/20 text-blue-400' : 'text-gray-500'}`}
                >
                    <Users className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3 text-emerald-500">
                    <Wifi className="w-4 h-4" />
                    <BatteryFull className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold font-mono tracking-tighter">
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </div>
            </div>
        </header>
    );
}

export default Header;