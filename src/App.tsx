import { useState } from 'react'

import Header from '@/components/layout/Header'
import ActiveUnits from './components/layout/ActiveUnits';
import Footer from '@/components/layout/Footer';

import { Page } from './types/page/page';
import { useHistory } from './context/history.context';

import Home from '@/features/home/Home';
// import PersonLookup from '@/features/person/PersonLookup';
// import PersonDetail from '@/features/person/PersonDetail';
// import VehicleLookup from '@/features/vehicle/VehicleLookup';
import ArrestWarrants from './features/arrest-warrant/ArrestWarrants';
import ArrestRecords from './features/arrest-records/ArrestRecords';
import Tickets from '@/features/tickets/Tickets';
import BOLO from '@/features/bolo/BOLO';
import TracePhone from '@/features/trace-phone/TracePhone';

function App() {
    const { current } = useHistory();
    const [unitPanelState, setUnitPanelState] = useState<boolean>(false);

    const renderPage = () => {
        switch(current)
        {
            case Page.HOME: return <Home  />
            // case Page.PERSON_LOOKUP: return <PersonLookup />;
            // case Page.PERSON_DETAIL: return <PersonDetail />
            // case Page.VEHICLE_LOOKUP: return <VehicleLookup />
            case Page.ARREST_WARRANTS: return <ArrestWarrants />
            case Page.ARREST_RECORDS: return <ArrestRecords />
            case Page.TICKETS: return <Tickets />
            case Page.BOLO: return <BOLO />
            case Page.PHONE_TRACE: return <TracePhone />;
            default: return 'Under Development';
        }
    }

    return (
        <div className='flex flex-col h-screen bg-[#050505] text-white overflow-hidden font-sans'>
            <Header unitPanelState={unitPanelState} onToggleUnitPanelClicked={setUnitPanelState} />
            <div className="flex-1 flex overflow-hidden">
                <main className="flex-1 overflow-y-auto relative bg-[#050505]">
                    {renderPage()}
                </main>
                <aside className={`
                    ${unitPanelState ? 'flex' : 'hidden'} 
                    xl:flex w-72 bg-[#0a0a0a] border-l border-white/5 flex-col shrink-0
                    transition-all duration-300
                `}>
                    <ActiveUnits />
                </aside>
            </div>
            <Footer />
        </div>
    )
}

export default App
