import { createContext, useContext, useState, type ReactNode } from "react";


type PageProviderProps = {
    children: ReactNode
}

type PageContextType = {
    pageParam: number,
    setPageParam: React.Dispatch<React.SetStateAction<number>>
}

const PageContext = createContext<PageContextType | undefined>(undefined);

const PageProvider = ({ children }: PageProviderProps) => {
    const [pageParam, setPageParam] = useState(1);

    return (
        <PageContext.Provider value={{ pageParam, setPageParam }}>
        {children}
        </PageContext.Provider>
    );
};

function usePageContext () {
    const context = useContext(PageContext);
    if (!context) {
        throw new Error("usePageContext must be used within a PageProvider");
    }
    return context;
};

export {PageProvider, usePageContext}
