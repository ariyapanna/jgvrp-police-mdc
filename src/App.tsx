import { useState } from 'react'

import Header from '@/components/layout/Header'
import ActiveUnits from './components/layout/ActiveUnits';
import Footer from '@/components/layout/Footer';

import Home from '@/features/home/Home';
import { Page } from './types/page/page';
import { useHistory } from './context/history.context';

function App() {
    const { current } = useHistory();
    const [unitPanelState, setUnitPanelState] = useState<boolean>(false);

    const renderPage = () => {
        switch(current)
        {
            case Page.HOME: return <Home  />
            default: return 'Under Development';
        }
    }

    return (
        <div className='flex flex-col h-screen bg-[#050505] text-white overflow-hidden font-sans'>
            <Header unitPanelState={unitPanelState} onToggleUnitPanelClicked={setUnitPanelState} />
            <div className="flex-1 flex overflow-hidden">
                <main className="flex-1 overflow-y-auto relative bg-[#050505] custom-scrollbar">
                    <div className="p-4 md:p-6 lg:p-8">
                        {renderPage()}
                    </div>
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
