import type { VehicleOwnerType } from "./vehicleOwnerType";

export interface Vehicle
{
    id: number;
    model: string;
    numberPlate: string;
    ownerType: VehicleOwnerType;
    ownerId: number;
}