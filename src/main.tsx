import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { LayoutPage } from "./routes/layout";
import { AuthProvider } from "./auth";
import { IndexPage } from "./routes/app/page";
import { PocketBaseProvider } from "./pocketbase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClassesPage } from "./routes/app/classes/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: "classes",
        element: <ClassesPage />,
      },
    ],
  },
]);

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
