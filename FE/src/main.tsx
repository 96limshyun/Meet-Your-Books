import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import routes from "./routers/routes.tsx";
import GlobalStyle from "./styles/globalStyle.ts";
import theme from "./styles/theme.ts";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <RouterProvider router={routes} />
        </ThemeProvider>
    </StrictMode>
);
