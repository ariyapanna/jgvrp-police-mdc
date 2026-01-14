import { http } from "@/lib/api/http";
import type { ApiResponse } from "@/lib/api/response";
import { ApiEndpoint } from "@/types/api/endpoint";
import type { User } from "@/types/user/user";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface UserContextValue 
{
    user: User | null;
    setUser: (user: User) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [error, setError] = useState<string | null>(null);

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const loadUser = async() => {
            try 
            {
                const response = await http<ApiResponse<User>>(ApiEndpoint.USER);
                if(!response.success)
                    throw new Error(response.message);

                setUser(response.data);
            }
            catch(error: any)
            {
                setError(error.message);
            }
        }

        loadUser();
    }, []);

    useEffect(() => {
        if(error)
            toast.error(error);
    }, [error]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);

    if(!context)
        throw new Error('useUser must be used within a UserProvider');

    return context;
}