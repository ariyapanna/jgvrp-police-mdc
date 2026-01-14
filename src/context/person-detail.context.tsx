import { createContext, useContext, useState } from "react";
import type { PersonDetail } from "@/types/person/personDetail";

interface PersonDetailContextType 
{
    person: PersonDetail | null;
    setPerson: (person: PersonDetail | null) => void;
}

const PersonDetailContext = createContext<PersonDetailContextType | null>(null);

export const PersonDetailProvider = ({ children }: { children: React.ReactNode }) => {
    const [person, setPerson] = useState<PersonDetail | null>(null);

    return (
        <PersonDetailContext.Provider value={{ person, setPerson }}>
            {children}
        </PersonDetailContext.Provider>
    );
};

export const usePersonDetail = () => {
    const context = useContext(PersonDetailContext);
    if (!context)
        throw new Error("usePersonDetail must be used inside PersonDetailProvider");

    return context;
};
