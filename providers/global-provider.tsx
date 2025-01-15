import { createContext, useContext, ReactNode } from "react"
import { useAppwrite } from "../hooks/useAppwrite"
import { getCurrentUser } from "../lib/appwrite"

interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    refetch: (newParams?: Record<string, string | number>) => Promise<void>;
    // token: string | null;
    // theme: "light" | "dark"
}

interface GlobalProviderProps {
    children: ReactNode;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const { data: user, loading, refetch } = useAppwrite({
        fn: getCurrentUser,
    })

    const isLoggedIn = !!user

    console.log(JSON.stringify(user, null, 2))

    const value: GlobalContextType = {
        isLoggedIn,
        user,
        loading,
        refetch,
        // token,
        // theme
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext)
    if (context === undefined) {
        throw new Error("useGlobalContext must be used within a GlobalProvider")
    }
    return context
}

export default GlobalProvider;