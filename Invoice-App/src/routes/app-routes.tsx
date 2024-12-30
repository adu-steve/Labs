import React from "react";
import { Navigate } from "react-router-dom";
import { InvoiceLayout } from "@/features/invoices";

const Invoices = React.lazy(() => import("@/pages/invoices/invoices"));
const InvoiceDetails = React.lazy(
  () => import("@/pages/invoice-details/invoice-details")
);
const NewInvoice = React.lazy(() => import("@/pages/new-invoice/new-invoice"));
const EditInvoice = React.lazy(
  () => import("@/pages/edit-invoice/edit-invoice")
);

export const appRoutes = [
  {
    element: <InvoiceLayout />,
    children: [
      {
        path: "/invoices",
        element: <Invoices />,
      },
      {
        path: "/invoices/:invoiceId",
        element: <InvoiceDetails />,
      },
      {
        path: "/invoices/new",
        element: <NewInvoice />,
      },
      {
        path: "/invoices/:invoiceId/edit",
        element: <EditInvoice />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/invoices" />,
  },
];
