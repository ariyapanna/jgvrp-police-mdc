import { useHistory } from "@/context/history.context";

import { Car, FileText, Phone, QrCode, Radio, Search, ShieldAlert, Ticket } from "lucide-react";

import { QuickMenu, type QuickMenuData } from "./QuickMenu";
import { Page } from "@/types/page/page";


const Home = () => {
    const { goTo } = useHistory();
    const menuCards: QuickMenuData[] = [
        { 
            id: Page.PERSON_LOOKUP, 
            label: 'Person Look Up', 
            description: 'CHECK A PERSON\'S INFO IN THE DATABASE',

            icon: Search, 
            iconColor: 'text-blue-500',

            borderColor: 'border-blue-900/40',
            backgroundColor: 'bg-blue-500/5'
        },
        { 
            id: Page.VEHICLE_LOOKUP, 
            label: 'Vehicle Look Up', 
            description: 'BROWSE VEHICLES IN THE DATABASE',

            icon: Car, 
            iconColor: 'text-emerald-500',

            borderColor: 'border-emerald-900/40',
            backgroundColor: 'bg-emerald-500/5'
        },
        { 
            id: Page.TICKETS, 
            label: 'Tickets', 
            description: 'ISSUE OR REVIEW TRAFFIC AND VIOLATION TICKETS',

            icon: Ticket, 
            iconColor: 'text-amber-500',

            borderColor: 'border-amber-900/40',
            backgroundColor: 'bg-amber-500/5'
        },
        { 
            id: Page.ARREST_WARRANTS, 
            label: 'Warrants', 
            description: 'ACCESS ACTIVE WARRANTS FOR SUSPECTS',

            icon: ShieldAlert, 
            iconColor: 'text-rose-500',

            borderColor: 'border-rose-900/40',
            backgroundColor: 'bg-rose-500/5'
        },
        { 
            id: Page.ARREST_RECORDS, 
            label: 'Arrest Records', 
            description: 'REVIEW PREVIOUS ARRESTS OF INDIVIDUALS',

            icon: FileText, 
            iconColor: 'text-indigo-500',

            borderColor: 'border-indigo-900/40',
            backgroundColor: 'bg-indigo-500/5'
        },
        { 
            id: Page.BOLO, 
            label: 'BOLO', 
            description: 'RECEIVE ALERTS FOR WANTED PERSONS',

            icon: Radio, 
            iconColor: 'text-pink-500',

            borderColor: 'border-pink-900/40',
            backgroundColor: 'bg-pink-500/5'
        },
        { 
            id: Page.PHONE_TRACE, 
            label: 'Trace Phone', 
            description: 'PING A PHONE TO DETERMINE CURRENT LOCATION',

            icon: Phone, 
            iconColor: 'text-cyan-500',

            borderColor: 'border-cyan-900/40',
            backgroundColor: 'bg-cyan-500/5'
        },
        {
            id: Page.QR_CODE,
            label: 'QR Code',
            description: '(( SCAN TO OPEN ON YOUR DEVICE ))',

            icon: QrCode,
            iconColor: 'text-sky-500',

            borderColor: 'border-sky-900/40',
            backgroundColor: 'bg-sky-500/5'
        }
    ];

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in zoom-in duration-500">
                    {menuCards.map((card) => (
                        <QuickMenu
                            key={card.id}
                            label={card.label}
                            description={card.description}

                            icon={card.icon}
                            iconColor={card.iconColor}
                            
                            borderColor={card.borderColor}
                            backgroundColor={card.backgroundColor}
                            
                            onClick={() => goTo(card.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;