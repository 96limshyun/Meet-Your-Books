import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import routes from "./routers/routes.tsx";
import GlobalStyle from "./styles/globalStyle.ts";
import theme from "./styles/theme.ts";


const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <RouterProvider router={routes} />
                <ReactQueryDevtools initialIsOpen={false} />
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>
);
