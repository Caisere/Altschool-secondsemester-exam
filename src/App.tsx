import { lazy, Suspense} from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { PageLoader } from "./components/loadingskeleton";
import { PageProvider } from "./context/PageContext";
import DocumentTitle from "./components/pagetitle/DocumentTitle";

import ProtectedRoute from "./components/protectedroute";

// lazy loading of pages
const Dashboard = lazy(() => import("./pages/homepage"));
const SignUp = lazy(() => import("./pages/signup"));
const SignIn = lazy(() => import("./pages/signin"));
const Home = lazy(() => import("./pages/home"));
const PageNotFound = lazy(() => import("./pages/pagenotfound"));
const Todo = lazy(() => import("./components/todo"));
const Settings = lazy(() => import("./pages/settings"));
const Today = lazy(() => import("./pages/today"));
const Upcoming = lazy(() => import("./pages/upcoming"));
const Stickywall = lazy(() => import("./pages/stickywall"));
const Personal = lazy(() => import("./pages/personal"));
const Work = lazy(() => import("./pages/work"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // automatically refetch the data after 5 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
      gcTime: 1000 * 60 * 10, // Keep data in cache for 10 minutes
    },
  },
});

function App() {
  return (
    <PageProvider>
      <QueryClientProvider client={queryClient}>
        {/* Toaster for notifications */}
        <Toaster
          position="top-right"
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
          {/* <AuthHandler queryClient={queryClient} /> */}
          <DocumentTitle />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="signin" element={<SignIn />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Today />} />
                <Route path="settings" element={<Settings />} />
                <Route path="today" element={<Today />}>
                  <Route path="task/:id" element={<div />} />
                </Route>
                <Route path="upcoming" element={<Upcoming />} />
                <Route path="stickywall" element={<Stickywall />} />
                <Route path="personal" element={<Personal />} />
                <Route path="work" element={<Work />} />
                <Route path="todo/:id" element={<Todo />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        {process.env.NODE_ENV === 'development' && (<ReactQueryDevtools initialIsOpen={false} />)}
      </QueryClientProvider>
    </PageProvider>
  );
}

export default App;