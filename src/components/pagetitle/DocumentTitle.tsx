import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DocumentTitle = () => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        let title = "Todo App | Altschool Africa Second Semester Project";

        if (path === "/") {
            title = "Home || Todo App | Altschool Africa Second Semester Project";
        } else if (path.startsWith("/todo/")) {
            const todoId = path.split("/").pop();
            title = `Todo ${todoId} || Todo App | Altschool Africa Second Semester Project`;
        } else if (path === "*") {
            title = "Page Not Found || Todo App | Altschool Africa Second Semester Project";
        }

        document.title = title;
    }, [location]);

    return null;
};

export default DocumentTitle;
