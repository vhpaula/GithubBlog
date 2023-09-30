import { createBrowserRouter } from "react-router-dom";

import { Home } from "./assets/pages/home";
import { Repository } from "./assets/pages/repository";
import { Layout } from "./assets/components/layout";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/repository/:repository",
                element: <Repository />,
            },
        ],
    },
]);

export { router };
