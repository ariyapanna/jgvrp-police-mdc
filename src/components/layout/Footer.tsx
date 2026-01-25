import { useHistory } from "@/context/history.context";
import { http } from "@/lib/api/http";
import type { ApiResponse } from "@/lib/api/response";
import { ApiEndpoint } from "@/types/api/endpoint";

import { ChevronLeft, Lock, Power, Square } from "lucide-react"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Footer = () => {
    const { goBack, backToRoot } = useHistory();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    async function closeMDC() 
    {
        setLoading(true);
        try 
        {
            const response = await http<ApiResponse<boolean>>(ApiEndpoint.CLOSE_MDC);
            if(!response.success)
                throw new Error(response.message);
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
        if(error)
            toast.error(error)
    }, [error])

    return (
        <footer className="h-10 bg-[#0a0a0a] border-t border-white/5 grid grid-cols-3 px-4 text-[8px] font-mono tracking-[0.2em] text-gray-600 z-50">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    <span>SECURE LINK ACTIVE</span>
                </div>
            </div>

            <div className="flex justify-between items-center text-gray-500">
                <button onClick={backToRoot} className="hover:text-white transition-colors"><Square className="w-3.5 h-3.5 rotate-45" /></button>
                <button disabled={loading} onClick={closeMDC} className="hover:text-red-500 disabled:text-gray-500 transition-colors"><Power className="w-4 h-4" /></button>
                <button onClick={goBack} className="hover:text-white transition-colors"><ChevronLeft className="w-4 h-4" /></button>
            </div>

            <div className="flex justify-end items-center gap-2">
                <Lock className="w-2.5 h-2.5 text-amber-500/60" />
                <span className="opacity-60">X-CRYPT AES-256</span>
            </div>
        </footer>
    )
}

export default Footer;