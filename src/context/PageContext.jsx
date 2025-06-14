import React, { createContext, useContext, useState } from "react";

const PageContext = createContext();

const PageProvider = ({ children }) => {
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
