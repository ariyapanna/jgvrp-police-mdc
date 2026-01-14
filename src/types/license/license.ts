import type { LicenseStatus } from "./licenseStatus";
import type { LicenseType } from "./licenseType";

export interface License
{
    id: number;
    charId: number;
    type: LicenseType;
    status: LicenseStatus;

    expiredAt: string;
    createdAt: string;
    updatedAt: string;
}