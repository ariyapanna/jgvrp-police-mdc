import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

import { QrCode as QrCodeIcon } from "lucide-react";

import SectionPanel from "@/components/section-panel/SectionPanel";
import LoadingData from "@/components/section-panel/LoadingData";

const ScanQrCode = () => {
    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        setUrl(window.location.href);
    }, [])

    return (
        <SectionPanel
            title="QR Code"
            subtitle="Access from other devices by scanning the QR code"

            icon={QrCodeIcon}
            accent="sky"

            actions={null}
        >
            <div className="h-full flex justify-center items-center">
                {url ? (
                    <QRCode 
                        title="Scan Me!"
                        value={url} 
                    />
                ) : (
                    <LoadingData />
                )}
            </div>
        </SectionPanel>
    )
}

export default ScanQrCode;