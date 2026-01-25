import { useEffect, useState } from "react";

import { Phone } from "lucide-react";
import { toast } from "react-toastify";

import { tracePhone } from "./api";
import { delay } from "@/utils/delay";
import { TraceStage } from "@/types/trace-phone/traceStage";
import SectionPanel from "@/components/section-panel/SectionPanel";
import SearchAction from "@/components/section-panel/actions/SearchAction";

const TracePhone = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>('');

    const [stage, setStage] = useState<TraceStage>(TraceStage.IDLE);
    const [searchQuery, setSearchQuery] = useState<string>('');

    async function trace()
    {
        setLoading(true);
        try 
        {
            if(!searchQuery)
                throw new Error("Please enter a phone number.");

            setStage(TraceStage.INIT);
            await Promise.resolve()

            await delay(1200);
            setStage(TraceStage.PINGING);

            await delay(2400);
            setStage(TraceStage.TRIANGULATING);

            const response = await tracePhone(searchQuery);
            if(!response.success)
                throw new Error(response.message);

            await delay(700);
            setStage(TraceStage.RESOLVING);

            await delay(500);
            setStage(TraceStage.SUCCESS);

            toast.success("Location acquired.");
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

    function TracePanel({ stage }: { stage: TraceStage }) 
    {
        const labelMap: Record<TraceStage, string> = {
            IDLE: "Awaiting phone number input",
            INIT: "Initializing signal trace…",
            PINGING: "Pinging cellular towers…",
            TRIANGULATING: "Resolving triangulation…",
            RESOLVING: "Decrypting carrier response…",
            SUCCESS: "Location acquired"
        };

        return (
            <div className="h-full flex items-center justify-center">
                <div className="flex items-center gap-3 text-sm font-mono text-zinc-400 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    {labelMap[stage]}
                </div>
            </div>
        );
    }

    useEffect(() => {
        if(error)
            toast.error(error);
    }, [error]);

    return (
        <SectionPanel
            title="Trace Phone"
            icon={Phone}
            accent="cyan"

            actions={
                <SearchAction 
                    value={searchQuery} 
                    onChange={setSearchQuery} 
                    onSubmit={trace} 
                    loading={loading} 
                />
            }
        >
            <TracePanel stage={stage} />
        </SectionPanel>
    );
}

export default TracePhone;