import SearchAction from "@/components/section-panel/actions/SearchAction";
import SectionPanel from "@/components/section-panel/SectionPanel"
import { Database } from "lucide-react"
import { useEffect, useState } from "react";
import { getPersonDetail, getPersons } from "./api";
import type { Person } from "@/types/person/person";
import { toast } from "react-toastify";
import PersonCard from "./PersonCard";
import { useHistory } from "@/context/history.context";
import { usePersonDetail } from "@/context/person-detail.context";
import { Page } from "@/types/page/page";

const PersonLookup = () => {
    const { goTo } = useHistory();
    const { setPerson } = usePersonDetail();

    const [persons, setPersons] = useState<Person[]>([]);

    const [searchQuery, setSearchQuery] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>('');

    async function loadPersons()
    {
        setLoading(true);
        try 
        {
            if(searchQuery.length < 3)
                throw new Error('Search query must be at least 3 characters long.');

            const response = await getPersons(searchQuery);
            if(!response.success)
                throw new Error(response.message);

            setPersons(response.data);
            toast.info(`Found ${response.data.length} person(s)`);
        }
        catch(error: any)
        {
            setError(error.message);
        }
        finally
        {
            setLoading(false);
        }
    }

    async function loadPersonDetail(id: number)
    {
        setLoading(true);
        try 
        {
            const response = await getPersonDetail(id);
            if(!response.success)
                throw new Error(response.message);

            setPerson(response.data);
            goTo(Page.PERSON_DETAIL);
        }
        catch(error: any)
        {
            setError(error.message);
        }
        finally
        {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(error)
            toast.error(error);
    }, [error]);

    return (
        <SectionPanel
            title="Person Lookup"
            icon={Database}

            accent="blue"

            actions={
                <SearchAction
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSubmit={loadPersons}
                    loading={loading}
                    placeholder="Search name..."
                />
            }
        >
            {persons.length == 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-3 opacity-30">
                    <Database className="w-10 h-10" />
                    <p className="font-mono uppercase tracking-[0.4em] text-center">
                        Initialize database query via search interface
                    </p>
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-4">
                    {persons.map((person) => {
                        return (
                            <PersonCard 
                                key={person.id}
                                loading={loading}
                                person={person}
                                onView={() => loadPersonDetail(person.id)}
                            />
                        );
                    })}
                </div>
            )}
        </SectionPanel>
    )
}

export default PersonLookup;