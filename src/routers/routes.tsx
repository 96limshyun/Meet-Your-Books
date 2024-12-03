import NavigationLayout from "@components/Layout/NavigationLayout";
import { createBrowserRouter } from "react-router-dom";

import { Home, BookDetail, FavoriteBook, LibraryInfo, RegionInfo } from "@/pages";

const routes = createBrowserRouter(
    [
        {
            path: "/",
            element: <NavigationLayout/>,
            children: [
                {
                    index: true,
                    element: <Home/>
                },
                {
                    path: "book/:bookId",
                    element: <BookDetail/>
                },
                {
                    path: "favoriteBook",
                    element: <FavoriteBook/>
                },
                {
                    path: "regionInfo",
                    element: <RegionInfo/>
                },
                {
                    path: "libraryInfo",
                    element: <LibraryInfo/>
                }
            ]
        }
    ]
)

export default routes;