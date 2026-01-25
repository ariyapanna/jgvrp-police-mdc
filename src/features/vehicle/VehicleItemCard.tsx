import { useUser } from "@/context/user.context";

import { Files } from "lucide-react";
import { toast } from "react-toastify";

import InfoCard from "@/components/cards/InfoCard";

import { getFactionKey } from "@/lib/faction/mapping";

import type { Vehicle } from "@/types/vehicle/vehicle";
import { FACTION_COLOR } from "@/types/faction/factionColor";

import { copyToClipboard } from "@/utils/clipboard";

interface VehicleItemCardProps 
{
    vehicle: Vehicle
    onClick?: () => void
}

const VehicleItemCard = ({ vehicle, onClick }: VehicleItemCardProps) => {
    const { user } = useUser();

    const userFaction = getFactionKey(user?.factionId);
    const factionColor = userFaction ? FACTION_COLOR[userFaction] : "text-zinc-400";
    
    return (
        <InfoCard
            title={vehicle.model.toUpperCase()}
            subtitle={`REG. #${vehicle.id}`}
            badge={
                <span className={`flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800
                    font-mono text-xs font-bold ${factionColor}`}>
                    {vehicle.numberPlate}
                    <Files className="w-3 h-3" />
                </span>
            }
            onClick={onClick}
            onBadgeClick={() => {
                copyToClipboard(vehicle.numberPlate)
                toast.info("Plate copied to clipboard");
            }}
        />
    );
};

export default VehicleItemCard;