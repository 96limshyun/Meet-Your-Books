import ErrorFallBack from "@components/ErrorFallBack/ErrorFallBack";
import DefaultLayout from "@components/Layout/DefaultLayout";
import { ErrorBoundary } from "async-error-boundary";
import { createBrowserRouter } from "react-router-dom";

import {
    Home,
    BookDetail,
    FavoriteBook,
    LibraryInfo,
    RegionInfo,
} from "@/pages";
import Login from "@/pages/Login";

const routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <ErrorBoundary
                fallback={ErrorFallBack}
                onReset={() => window.location.reload()}
            >
                <DefaultLayout />
            </ErrorBoundary>
        ),
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "book/:isbn",
                element: <BookDetail />,
            },
            {
                path: "favoriteBook",
                element: <FavoriteBook />,
            },
            {
                path: "regionInfo",
                element: <RegionInfo />,
            },
            {
                path: "libraryInfo",
                element: <LibraryInfo />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*",
        element: <ErrorFallBack />,
    },
]);

export default routes;
