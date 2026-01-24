import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getVehicles } from "./api";
import SectionPanel from "@/components/section-panel/SectionPanel";
import { Car } from "lucide-react";
import VehicleItemCard from "./VehicleItemCard";
import type { Vehicle } from "@/types/vehicle/vehicle";
import SearchAction from "@/components/section-panel/actions/SearchAction";
import { getPersonDetail } from "../person/api";
import { usePersonDetail } from "@/context/person-detail.context";
import { useHistory } from "@/context/history.context";
import { Page } from "@/types/page/page";

const VehicleLookup = () => {
    const { goTo } = useHistory();
    const { setPerson } = usePersonDetail();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>('');

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);

    async function searchVehicle()
    {
        setLoading(true)
        try 
        {
            if(searchQuery.length < 2)
                return setError("Search query must be at least 2 characters long.");

            const response = await getVehicles(searchQuery);
            if(!response.success)
                throw new Error(response.message);

            if(response.data.length === 0)
                return setError("No vehicles found.");

            setVehicleList(response.data);
            toast.info(`Found ${response.data.length} vehicle(s)`);
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

    async function loadPersonDetail(id: number) 
    {
        setLoading(true);
        try 
        {
            const response = await getPersonDetail(id);
            if(!response.success)
                throw new Error(response.message);

            setPerson(response.data);
            goTo(Page.PERSON_DETAIL);
        }
        catch(error: any)
        {
            setError(error.message);
        }
        {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(error)
            toast.error(error);
    }, [error])

    return (
        <SectionPanel
            title="Vehicle Database"
            icon={Car}

            accent="emerald"

            actions={
                <SearchAction
                    loading={loading}
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSubmit={() => searchVehicle()}
                    placeholder="Search plate..."
                />
            }
        >
            {vehicleList.length == 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-3 opacity-30">
                    <Car className="w-10 h-10" />
                    <p className="font-mono uppercase tracking-[0.4em] text-center">
                        Initialize database query via search interface
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {vehicleList.map((vehicle: Vehicle) => {
                        return <VehicleItemCard vehicle={vehicle} onClick={() => loadPersonDetail(vehicle.ownerId)} />
                    })}
                </div>
            )}
        </SectionPanel>
    )
}

export default VehicleLookup;