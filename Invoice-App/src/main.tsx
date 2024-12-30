import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { queryClient } from "./lib/react-query";
import { appRoutes } from "./routes";
import "../sass/style.scss";

const router = createHashRouter(appRoutes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
