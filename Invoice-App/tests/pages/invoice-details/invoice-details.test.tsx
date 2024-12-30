import { describe, it, expect, afterEach } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { VirtuosoWrapper, getQueryClient } from "@/utils";
import { appRoutes } from "@/routes";
import "@testing-library/jest-dom/vitest";

describe("InvoiceDetails Page", () => {
  let user = userEvent.setup();
  let queryClient = getQueryClient();

  const invoices = window.localStorage.getItem("invoices");
  const invoiceId = "XM9141";

  afterEach(() => {
    user = userEvent.setup();
    queryClient = getQueryClient();
    window.localStorage.setItem("invoices", invoices!);

    window.innerWidth = 1024;
  });

  it("should delete the invoice when the user clicks on the 'delete' button", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: [`/invoices/${invoiceId}`],
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ itemHeight: 100, viewportHeight: 5000 }),
      }
    );

    const deleteBtns = await screen.findAllByRole("button", {
      name: /delete/i,
    });

    const pageDeleteBtn = deleteBtns[0];
    const modalDeleteBtn = deleteBtns[1];

    // Trigger confirmation modal
    await user.click(pageDeleteBtn);

    // Confirm deletion of the invoice
    await user.click(modalDeleteBtn);

    let items = container.querySelectorAll("div[class^='_invoice_list_item']");

    await waitFor(() => {
      items = container.querySelectorAll("div[class^='_invoice_list_item']");
      expect(items.length).toBeGreaterThan(0);
    });

    const arrItems = Array.from(items);

    const existInvoice = arrItems.some((item) =>
      item.textContent?.includes(invoiceId)
    );

    expect(existInvoice).not.toBeTruthy();
  });

  it("should mark the status of an invoice as paid when the user clicks on the 'mark as paid' button", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: [`/invoices/${invoiceId}`],
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    const markAsPaidBtn = await screen.findByRole("button", {
      name: /mark as paid/i,
    });

    const statusContainer = container.querySelector("div[class^='_status']");

    await user.click(markAsPaidBtn);

    await waitFor(() =>
      expect(statusContainer).not.toHaveTextContent("pending")
    );

    expect(statusContainer).toHaveTextContent("paid");
  });

  it("should display a drawer when the user clicks on the 'edit' button if the viewport width is greater than or equal to 768px", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: [`/invoices/${invoiceId}`],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    const editBtn = await screen.findByRole("button", { name: /edit/i });
    const drawer = document.querySelector("div[class^='_drawer']");

    await user.click(editBtn);

    const drawerClasses = drawer?.classList.toString();

    expect(drawerClasses?.includes("open")).toBeTruthy();
  });

  it("should redirect the user to the EditInvoice Page when they click on the 'edit' button if the viewport width is less than 768px", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: [`/invoices/${invoiceId}`],
    });

    window.innerWidth = 375;

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    const editBtn = await screen.findByRole("button", { name: /edit/i });

    await user.click(editBtn);

    const title = await screen.findByRole("heading", {
      level: 1,
      name: new RegExp(`${invoiceId}`, "i"),
    });

    expect(title).toHaveTextContent(`Edit ${invoiceId}`);
  });
});
