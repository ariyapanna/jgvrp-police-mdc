import InfoCard from "@/components/cards/InfoCard";

import type { License } from "@/types/license/license";
import { LicenseStatus } from "@/types/license/licenseStatus";
import { formatDate } from "@/utils/formatDate";

interface LicenseItemCardProps 
{
    license: License
}

const LicenseItemCard = ({ license }: LicenseItemCardProps) => {    
    return (
        <InfoCard
            title={`${license.type.toUpperCase()} LICENSE`}
            subtitle={
                <div className="flex flex-col">
                    <span>ISSUED: {formatDate(license.createdAt)}</span>
                    <span>EXPIRED: {formatDate(license.expiredAt)}</span>
                </div>
            }
            badge={
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border
                    ${
                    license.status === LicenseStatus.ACTIVE
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                    }
                `}>
                    {license.status}
                </span>
            }
        />
    );
};

export default LicenseItemCard;