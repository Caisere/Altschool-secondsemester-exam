import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { PageLoader } from "./components/loadingskeleton";
import { PageProvider } from "./context/PageContext";
import DocumentTitle from "./components/pagetitle/DocumentTitle";
// import { PageNavigationSkeleton } from './components/loadingskeleton'

// lazy loading of pages
const HomePage = lazy(() => import("./pages/homepage"));
const PageNotFound = lazy(() => import("./pages/pagenotfound"));
const Todo = lazy(() => import("./components/todo"));
const MainPage = lazy(() => import("./components/mainpage"));

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // automatically refetch the data after 5 minutes
            refetchOnWindowFocus: false,
        },
    },
});

function App() {
    return (
        <PageProvider>
            <QueryClientProvider client={queryClient}>
                {/* Toaster for notifications */}
                <Toaster
                    position="top-center"
                    gutter={12} //space between the toast
                    containerStyle={{
                        //style of the toast container
                        margin: "8px", //margin of the toast container
                    }}
                    toastOptions={{
                        // toast options (success, error)
                        success: {
                            duration: 3000, //success toast duration (3s)
                            },
                        error: {
                            duration: 3000, //error toast duration (5s)
                            },
                        style: {
                            //style of the toast
                            fontSize: "16px",
                            maxWidth: "500px",
                            padding: "16px 24px",
                            backgroundColor: "#000",
                            color: "#fff",
                            borderRadius: "4px",
                            boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        },
                    }}
                />
                <BrowserRouter>
                    <DocumentTitle />
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            <Route path="/" element={<HomePage />}>
                                <Route index element={<MainPage />} />
                                <Route path="todo/:id" element={<Todo />} />
                            </Route>
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </PageProvider>
    );
}

export default App;
