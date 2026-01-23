import React, { useEffect, useState } from "react"
import { Clock, Timer, Trash2, User } from "lucide-react";
import { toast } from "react-toastify";

import SectionPanel from "@/components/section-panel/SectionPanel";
import CreateButton from "@/components/section-panel/actions/CreateButton";
import LoadingData from "@/components/section-panel/LoadingData";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import CreateBOLOModal from "./CreateBOLOModal";

import type { BOLOData } from "@/types/bolo/BOLOData"
import { FACTION_COLOR } from "@/types/faction/factionColor";
import { ACCENT_STYLES } from "@/types/accent-color/accentColor";

import { getFactionKey } from "@/lib/faction/mapping";

import { formatDate } from "@/utils/formatDate";

import { createBOLO, deleteBOLO, getBOLOs } from "./api";

interface BOLOCardProps 
{
    bolo: BOLOData;
    onDelete: (id: number) => void
}

const BOLOCard = ({ bolo, onDelete }: BOLOCardProps) => {
    const userFaction = getFactionKey(bolo.factionId);
    const factionColor = userFaction ? FACTION_COLOR[userFaction] : "text-zinc-400";

    return (
        <div
            className={`
                group relative bg-[#0d0d0d] border border-orange-500/20 rounded-2xl overflow-hidden
                transition-all duration-300 hover:border-white/10
                shadow-[0_4px_20px_-10px_rgba(249,115,22,0.1)]
            `}
        >
            {/* Priority Bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-orange-500`} />

                <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-mono opacity-40">
                        REF NO. #{bolo.id}
                    </span>
                </div>

                {/* Description */}
                <div className="bg-black/40 border border-white/5 rounded-xl p-5 mb-5 group-hover:bg-black/60 transition-colors">
                    <p className="text-sm font-bold text-zinc-200 uppercase leading-relaxed tracking-tight group-hover:text-white">
                        {bolo.description}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.03]">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-zinc-600" />
                            <div className="flex flex-col">
                                <span className="text-[8px] text-zinc-600 font-black uppercase tracking-tighter">
                                    Issuer
                                </span>
                                <span className="text-[10px] font-bold text-zinc-300 uppercase">
                                    {bolo.issuer} <span className={`${factionColor}`}>({userFaction})</span>
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-zinc-600" />
                            <div className="flex flex-col">
                            <span className="text-[8px] text-zinc-600 font-black uppercase tracking-tighter">
                                Logged At
                            </span>
                            <span className="text-[10px] font-mono text-zinc-400">
                                {formatDate(bolo.createdAt)}
                            </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-zinc-600">
                            <Timer className="w-3.5 h-3.5" />
                            <span className="text-[9px] font-mono">
                                Expired: {formatDate(bolo.expiredAt)}
                            </span>
                        </div>

                        <button 
                           onClick={() => onDelete(bolo.id)}
                           className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-600/10 hover:bg-red-600 border border-red-500/20 hover:border-red-400 text-red-500 hover:text-white transition-all text-[9px] font-black uppercase tracking-widest"
                         >
                           <Trash2 size={12} />
                           Delete
                         </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const BOLO = () => {
    const styles = ACCENT_STYLES["orange"];

    const [createBOLOModalState, setCreateBOLOModalState] = useState<boolean>(false);
    const [BOLOList, setBOLOList] = useState<BOLOData[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [dialogState, setDialogState] = useState<boolean>(false);
    const [boloToDelete, setBoloToDelete] = useState<number | null>(null);

    const [expire, setExpire] = useState<number>(3);
    const [description, setDescription] = useState<string>('');

    async function handleBOLOCreate(e: React.FormEvent)
    {
        e.preventDefault();
        setLoading(true);
        try 
        {
            if(description.length < 10)
                throw new Error('Description must be at least 10 characters long.');

            if(expire < 1 || expire > 365)
                throw new Error('Expire must be between 1 and 365 days.');

            const response = await createBOLO({ description, expire });
            if(!response.success)
                throw new Error(response.message);

            setBOLOList([...BOLOList, response.data]);

            setCreateBOLOModalState(false);
            setDescription("");
            setExpire(0);

            toast.success("BOLO successfully broadcasted.");
        }
        catch(error: any)
        {
            setError(error.message);
        }
        finally
        {
            setLoading(false);
        }
    }

    async function handleBOLODelete(id: number)
    {
        setLoading(true);
        try 
        {
            const response = await deleteBOLO(id);
            if(!response.success)
                throw new Error(response.message);

            setBOLOList(BOLOList.filter(bolo => bolo.id !== id));
            toast.success('BOLO successfully deleted.');
        }
        catch(error: any)
        {
            setError(error.message);
        }
        finally
        {
            setLoading(false);
        }
    }

    useEffect(() => {
        async function loadBOLOList()
        {
            setLoading(true);
            try 
            {
                const response = await getBOLOs();
                if(!response.success)
                    throw new Error(response.message);

                setBOLOList(response.data);
            }
            catch(error: any)
            {
                setError(error.message);
            }
            finally
            {
                setLoading(false);
            }
        }

        loadBOLOList();
    }, []);

    useEffect(() => {
        if(error)
            toast.error(error);
    }, [error]);

    return (
        <div className="flex flex-col h-full">
            <CreateBOLOModal
                open={createBOLOModalState}
                onClose={() => setCreateBOLOModalState(false)}

                description={description}
                setDescription={setDescription}

                expire={expire}
                setExpire={setExpire}

                loading={loading}
                onSubmit={(e) => handleBOLOCreate(e)}
            />  

            <ConfirmDialog
                open={dialogState}

                onClose={() => setDialogState(false)}
                onConfirm={async () => {
                    if(boloToDelete === null) 
                        return;
                        
                    await handleBOLODelete(boloToDelete);
                    setDialogState(false);
                    setBoloToDelete(null);
                }}

                icon={<Trash2 size={24} />}
                title="Purge BOLO"
                description="Confirming this action will permanently remove this BOLO record."

                loading={loading}
                danger={true}
            />

            <SectionPanel
                title="Be On Lookouts"
                subtitle={
                    <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest">
                        <span className="text-orange-500/80">
                            Active Records: {BOLOList.length}
                        </span>
                    </div>
                }
                icon={Timer}

                loading={loading}
                accent="orange"

                actions={
                    <CreateButton
                        onClick={() => setCreateBOLOModalState(true)}
                        label="New BOLO Entry"

                        loading={loading}

                        backgroundColor={styles.buttonBg}
                        hoverColor={styles.buttonHover}
                        shadow={styles.buttonShadow}
                    />
                }
            >
                {loading ? (
                    <LoadingData />
                ) : (
                    <div className="flex flex-col gap-4">
                        {BOLOList.map((bolo, index) => (
                            <BOLOCard 
                                key={index} 
                                bolo={bolo} 
                                onDelete={() => {
                                    setBoloToDelete(bolo.id);
                                    setDialogState(true);
                                }}
                            />
                        ))}
                    </div>
                )}
            </SectionPanel>
        </div>
    )
}

export default BOLO;