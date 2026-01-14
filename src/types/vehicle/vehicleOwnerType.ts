export const VehicleOwnerType = {
    PLAYER_OWNED: 'PlayerOwned',
    PLAYER_RENTAL: 'PlayerRental',
}
export type VehicleOwnerType = typeof VehicleOwnerType[keyof typeof VehicleOwnerType];