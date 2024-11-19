import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./auth";
import { PocketBaseProvider } from "./pocketbase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createFilesystemRouter } from "./fs-router";

const router = createFilesystemRouter();

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PocketBaseProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </PocketBaseProvider>
    </QueryClientProvider>
  </StrictMode>,
);
