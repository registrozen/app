import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { LayoutPage } from "./routes/layout";
import { SignInPage } from "./routes/sign-in/page";
import { AuthProvider, AuthRequired } from "./auth";
import { IndexPage } from "./routes/app/page";
import { PocketBaseProvider } from "./pocketbase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "/",
        element: <AuthRequired />,
        children: [
          {
            index: true,
            element: <IndexPage />,
          },
        ],
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
