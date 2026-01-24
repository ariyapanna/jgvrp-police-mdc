import React, { useEffect, useState } from "react";

import { useUser } from "@/context/user.context";

import { ChevronDown, ChevronRight, User, Circle } from "lucide-react";
import { toast } from "react-toastify";

import { http } from "@/lib/api/http";
import type { ApiResponse } from "@/lib/api/response";
import { getFactionKey } from "@/lib/faction/mapping";

import { ApiEndpoint } from "@/types/api/endpoint";
import type { Unit } from "@/types/unit/unit";

import { FACTIONS, type FactionType } from "@/types/faction/factionType";
import { FACTION_COLOR, FACTION_COLOR_MUTED } from "@/types/faction/factionColor";

type Department = FactionType;

const ActiveUnits: React.FC = () => {
    const { user } = useUser();

    const [units, setUnits] = useState<Unit[]>([]);
    const [collapsed, setCollapsed] = useState<Record<Department, boolean>>({
        LSPD: true,
        LSFD: true,
        LSSD: true,
    });
    const [error, setError] = useState<string | null>(null);

    const userFaction = getFactionKey(user?.factionId);

    useEffect(() => {
        if(!userFaction) 
            return;

        setCollapsed({
            LSPD: userFaction !== "LSPD",
            LSFD: userFaction !== "LSFD",
            LSSD: userFaction !== "LSSD",
        });
    }, [user]);

    useEffect(() => {
        const loadUnits = async () => {
            try 
            {
                const response = await http<ApiResponse<Unit[]>>(ApiEndpoint.UNITS);
                if(!response.success) throw new Error(response.message);

                setUnits(response.data);
            } 
            catch (error: any) 
            {
                setError(error.message);
            }
        };

    loadUnits();
    }, []);

    useEffect(() => {
        if(error)
            toast.error(error);
    }, [error]);

    const orderedFactions: FactionType[] = userFaction
        ? [userFaction, ...FACTIONS.filter(f => f !== userFaction)]
        : FACTIONS;

    const toggleDept = (dept: Department) => setCollapsed(prev => ({ ...prev, [dept]: !prev[dept] }));

    const renderDeptGroup = (dept: Department) => {
        const deptUnits = units.filter(u => getFactionKey(u.factionId) === dept);
        const isCollapsed = collapsed[dept];
        const Icon = isCollapsed ? ChevronRight : ChevronDown;
        const isUserFaction = dept === userFaction;

        return (
            <div key={dept} className="border-b border-white/5 last:border-0">
                <button
                    onClick={() => toggleDept(dept)}
                    className="w-full flex items-center justify-between p-3 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                >
                    <div className="flex items-center gap-2">
                      <Icon
                            className={`w-3.5 h-3.5 ${
                                isUserFaction ? FACTION_COLOR[dept] : "text-gray-500"
                            }`}
                        />
                        <span
                            className={`text-[10px] font-black tracking-[0.2em] ${
                                isUserFaction
                                    ? FACTION_COLOR[dept]
                                    : FACTION_COLOR_MUTED[dept]
                            }`}
                        >
                            {dept} <span className="opacity-40 font-mono ml-1">({deptUnits.length})</span>
                        </span>
                    </div>
                    <div className="h-[1px] flex-1 mx-3 bg-white/5" />
                </button>

                {!isCollapsed && (
                    <div className="animate-in slide-in-from-top-1 duration-200">
                        {deptUnits.map(unit => (
                            <div
                                key={unit.name}
                                className="px-4 py-2.5 hover:bg-white/[0.03] flex items-center justify-between group border-b border-white/[0.02] last:border-0"
                            >
                                <div className="flex flex-col gap-2">
                                    <span className="text-[11px] font-black tracking-wider text-gray-200 uppercase">
                                        {unit.name}
                                    </span>
                                        {unit.members.map(member => (
                                            <div key={member.id} className="flex items-center gap-1.5 opacity-60">
                                                <User className="w-2.5 h-2.5 text-gray-400" />
                                                <span className="text-[9px] font-mono uppercase text-gray-400">{member.name}</span>
                                            </div>
                                        ))}
                                </div>

                                <div className="flex items-center gap-2">
                                    {unit?.status && (
                                        <span
                                            className='text-[8px] font-black tracking-tighter uppercase px-1.5 py-0.5 rounded border border-white/5 text-gray-500'
                                        >
                                            {unit.status.toUpperCase()}
                                        </span>
                                    )}
                                    <div className='w-1.5 h-1.5 rounded-full bg-current text-gray-500' />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

  return (
    <div className="flex flex-col h-full bg-[#050505] border-l border-white/5">
        <div className="p-4 bg-[#0a0a0a] border-b border-white/5 space-y-3">
            <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40">
                    Active Units
                </h3>
                <div className="flex items-center gap-1.5">
                    <Circle className="w-1.5 h-1.5 fill-emerald-500 text-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono text-emerald-500/80 uppercase">Network Live</span>
                </div>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#050505]">
            {orderedFactions.map(renderDeptGroup)}
        </div>
    </div>
  );
};

export default ActiveUnits;
