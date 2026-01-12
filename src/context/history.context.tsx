import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { Page, type PageType } from '@/types/page/page';

interface HistoryContextValue {
    current: PageType;
    history: PageType[];
    
    goTo: (page: PageType) => void;
    goBack: () => void;
    backToRoot: () => void;
}

const HistoryContext = createContext<HistoryContextValue | null>(null);

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
    const [history, setHistory] = useState<PageType[]>([]);
    const [current, setCurrent] = useState<PageType>(Page.HOME);

    const goTo = (page: PageType) => {
        if(page === current) 
            return;

        setHistory(prev => [...prev, current]); 
        setCurrent(page);
    };

    const goBack = () => {
        setHistory(prev => {
            if (prev.length === 0) return prev;

            const last = prev[prev.length - 1];
            setCurrent(last);
            return prev.slice(0, prev.length - 1);
        });
    };

    const backToRoot = () => {
        setHistory([]);
        setCurrent(Page.HOME);
    };

    return (
        <HistoryContext.Provider value={{ current, history, goTo, goBack, backToRoot }}>
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = () => {
    const context = useContext(HistoryContext);
    if (!context) 
        throw new Error('useHistory must be used within a HistoryProvider');

    return context;
};
