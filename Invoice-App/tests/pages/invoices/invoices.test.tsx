import { describe, it, expect, afterEach } from "vitest";
import { QueryClientProvider } from "react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { getQueryClient, VirtuosoWrapper } from "@/utils";
import { appRoutes } from "@/routes";
import "@testing-library/jest-dom/vitest";

describe("The Invoices Page", () => {
  let user = userEvent.setup();
  let queryClient = getQueryClient();

  const status = {
    pending: "pending",
    draft: "draft",
    paid: "paid",
  };

  afterEach(() => {
    user = userEvent.setup();
    queryClient = getQueryClient();

    window.innerWidth = 1024;
  });

  it("should render a loading message when mounted for the first time", () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices"],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should display all the invoices after the loading message disappears", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices"],
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ viewportHeight: 300, itemHeight: 100 }),
      }
    );

    let items = container.querySelectorAll("div[class^='_invoice_list_item']");

    await waitFor(() => {
      items = container.querySelectorAll("div[class^='_invoice_list_item']");
      expect(items.length).toBeGreaterThan(0);
    });

    expect(items.length).toBeGreaterThan(0);
  });

  it("should display invoices with a status of 'pending' when the user filters them by the 'pending' status", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices"],
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ viewportHeight: 300, itemHeight: 100 }),
      }
    );

    const filter = await screen.findByText(/filter/i);

    await user.click(filter);

    const pendingFilterOption = screen.getByLabelText(
      new RegExp(status.pending, "i")
    );

    await user.click(pendingFilterOption);

    let items = container.querySelectorAll("div[class^='_invoice_list_item']");

    await waitFor(() => {
      items = container.querySelectorAll("div[class^='_invoice_list_item']");
      expect(items.length).toBeGreaterThan(0);
    });

    const arr = Array.from(items);

    const condition = arr.every((item) =>
      item.textContent?.toLowerCase()?.includes(status.pending)
    );

    expect(condition).toBeTruthy();
  });

  it("should display invoices with a status of 'draft' when the user filters them by the 'draft' status", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices"],
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ viewportHeight: 300, itemHeight: 100 }),
      }
    );

    const filter = await screen.findByText(/filter/i);

    await user.click(filter);

    const draftFilterOption = screen.getByLabelText(
      new RegExp(status.draft, "i")
    );

    await user.click(draftFilterOption);

    let items = container.querySelectorAll("div[class^='_invoice_list_item']");

    await waitFor(() => {
      items = container.querySelectorAll("div[class^='_invoice_list_item']");
      expect(items.length).toBeGreaterThan(0);
    });

    const arr = Array.from(items);

    const condition = arr.every((item) =>
      item.textContent?.toLowerCase()?.includes(status.draft)
    );

    expect(condition).toBeTruthy();
  });

  it("should display invoices with status of 'paid' when the user filters them by the 'paid' status", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices"],
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ viewportHeight: 300, itemHeight: 100 }),
      }
    );

    const filter = await screen.findByText(/filter/i);

    await user.click(filter);

    const paidFilterOption = screen.getByLabelText(
      new RegExp(status.paid, "i")
    );

    await user.click(paidFilterOption);

    let items = container.querySelectorAll("div[class^='_invoice_list_item']");

    await waitFor(() => {
      items = container.querySelectorAll("div[class^='_invoice_list_item']");
      expect(items.length).toBeGreaterThan(0);
    });

    const arr = Array.from(items);

    const condition = arr.every((item) =>
      item.textContent?.toLowerCase()?.includes(status.paid)
    );

    expect(condition).toBeTruthy();
  });

  it("should display invoices with statuses of 'pending' and 'draft' when the user filters them by 'pending' and 'draft' status", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices"],
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ viewportHeight: 2000, itemHeight: 100 }),
      }
    );

    const filter = await screen.findByText(/filter/i);

    await user.click(filter);

    const pendingFilterOption = screen.getByLabelText(
      new RegExp(status.pending, "i")
    );
    const draftFilterOption = screen.getByLabelText(
      new RegExp(status.draft, "i")
    );

    await user.click(pendingFilterOption);
    await user.click(draftFilterOption);

    let items = container.querySelectorAll("div[class^='_invoice_list_item']");

    await waitFor(() => {
      items = container.querySelectorAll("div[class^='_invoice_list_item']");
      expect(items.length).toBeGreaterThan(0);
    });

    const arr = Array.from(items);

    const onlyPendingAndDraftInvoices = arr.every((item) => {
      const itemText = item.textContent?.toLowerCase();

      return (
        itemText?.includes(status.pending) || itemText?.includes(status.draft)
      );
    });

    expect(onlyPendingAndDraftInvoices).toBeTruthy();
  });

  it("should display invoices with statuses of 'pending' and 'paid' when the user filters them by 'pending' and 'paid' status", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices"],
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ viewportHeight: 2000, itemHeight: 100 }),
      }
    );

    const filter = await screen.findByText(/filter/i);

    await user.click(filter);

    const pendingFilterOption = screen.getByLabelText(
      new RegExp(status.pending, "i")
    );
    const paidFilterOption = screen.getByLabelText(
      new RegExp(status.paid, "i")
    );

    await user.click(pendingFilterOption);
    await user.click(paidFilterOption);

    let items = container.querySelectorAll("div[class^='_invoice_list_item']");

    await waitFor(() => {
      items = container.querySelectorAll("div[class^='_invoice_list_item']");
      expect(items.length).toBeGreaterThan(0);
    });

    const arr = Array.from(items);

    const onlyPaidAndPendingInvoices = arr.every((item) => {
      const itemText = item.textContent?.toLowerCase();

      return (
        itemText?.includes(status.pending) || itemText?.includes(status.paid)
      );
    });

    expect(onlyPaidAndPendingInvoices).toBeTruthy();
  });

  it("should display invoices with statuses of 'draft' and 'paid' when the user filters them by 'draft' and 'paid' status", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices"],
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ viewportHeight: 2000, itemHeight: 100 }),
      }
    );

    const filter = await screen.findByText(/filter/i);

    await user.click(filter);

    const draftFilterOption = screen.getByLabelText(
      new RegExp(status.draft, "i")
    );
    const paidFilterOption = screen.getByLabelText(
      new RegExp(status.paid, "i")
    );

    await user.click(draftFilterOption);
    await user.click(paidFilterOption);

    let items = container.querySelectorAll("div[class^='_invoice_list_item']");

    await waitFor(() => {
      items = container.querySelectorAll("div[class^='_invoice_list_item']");
      expect(items.length).toBeGreaterThan(0);
    });

    const arr = Array.from(items);

    const onlyDraftAndPaidInvoices = arr.every((item) => {
      const itemText = item.textContent?.toLowerCase();

      return (
        itemText?.includes(status.draft) || itemText?.includes(status.paid)
      );
    });

    expect(onlyDraftAndPaidInvoices).toBeTruthy();
  });

  it("should display all invoices when the user filters them by all the status", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices"],
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ viewportHeight: 2000, itemHeight: 100 }),
      }
    );

    const filter = await screen.findByText(/filter/i);

    await user.click(filter);

    const pendingFilterOption = screen.getByLabelText(
      new RegExp(status.pending, "i")
    );

    const draftFilterOption = screen.getByLabelText(
      new RegExp(status.draft, "i")
    );

    const paidFilterOption = screen.getByLabelText(
      new RegExp(status.paid, "i")
    );

    await user.click(pendingFilterOption);
    await user.click(draftFilterOption);
    await user.click(paidFilterOption);

    let items = container.querySelectorAll("div[class^='_invoice_list_item']");

    await waitFor(() => {
      items = container.querySelectorAll("div[class^='_invoice_list_item']");
      expect(items.length).toBeGreaterThan(0);
    });

    const arr = Array.from(items);

    const allInvoices = arr.every((item) => {
      const itemText = item.textContent?.toLowerCase();

      return (
        itemText?.includes(status.pending) ||
        itemText?.includes(status.draft) ||
        itemText?.includes(status.paid)
      );
    });

    expect(allInvoices).toBeTruthy();
  });

  it("should open a drawer when the user clicks on the new invoice button if the viewport width is greater than or equal to 768 pixels", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices"],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ viewportHeight: 2000, itemHeight: 100 }),
      }
    );

    const newInvoiceBtn = await screen.findByRole("button", {
      name: /new invoice/i,
    });

    await user.click(newInvoiceBtn);

    const drawer = document.querySelector("div[class^='_drawer']");

    const isDrawerOpened = drawer?.classList
      .toString()
      .includes("drawer__open");

    expect(isDrawerOpened).toBeTruthy();
  });

  it("should navigate to the new invoice page when the user clicks on the new invoice button if the viewport width is less than 768 pixels", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices"],
    });

    window.innerWidth = 375;

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ viewportHeight: 2000, itemHeight: 100 }),
      }
    );

    const newInvoiceBtn = await screen.findByRole("button", {
      name: /new invoice/i,
    });

    await user.click(newInvoiceBtn);

    expect(screen.getByText(/go back/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /new invoice/i })
    ).toBeInTheDocument();
  });
});
