import { describe, expect, it, afterEach } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClientProvider } from "react-query";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { VirtuosoWrapper, getQueryClient } from "@/utils";
import { appRoutes } from "@/routes";
import "@testing-library/jest-dom/vitest";

describe("EditInvoice Page", () => {
  let user = userEvent.setup();
  let queryClient = getQueryClient();

  afterEach(() => {
    user = userEvent.setup();
    queryClient = getQueryClient();

    window.innerWidth = 375;
  });

  it("should redirect the user back to the Invoices Page when the viewport width is greater than or equal to 768px", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices/RT3080/edit"],
    });

    window.innerWidth = 768;

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ viewportHeight: 5000, itemHeight: 100 }),
      }
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    expect(
      screen.getByRole("heading", { name: /^invoices$/i })
    ).toBeInTheDocument();
  });

  it("should throw an error if provided with an invalid invoice id in the URL", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices/sdfwesfd1651/edit"],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ viewportHeight: 5000, itemHeight: 100 }),
      }
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it("should fill out the form fields with data from the selected invoice", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices/RT3080/edit"],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ viewportHeight: 5000, itemHeight: 100 }),
      }
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    const streetAddressFields = screen.getAllByLabelText(
      /street address/i
    ) as HTMLInputElement[];
    const cityFields = screen.getAllByLabelText(/city/i) as HTMLInputElement[];
    const postcodeFields = screen.getAllByLabelText(
      /post code/i
    ) as HTMLInputElement[];
    const countryFields = screen.getAllByLabelText(
      /country/i
    ) as HTMLInputElement[];
    const clientNameField = screen.getByLabelText(
      /client's name/i
    ) as HTMLInputElement;
    const clientEmailField = screen.getByLabelText(
      /client's email/i
    ) as HTMLInputElement;
    const invoiceDateField = screen.getByLabelText(
      /invoice date/i
    ) as HTMLInputElement;
    const descriptionField = screen.getByLabelText(
      /project description/i
    ) as HTMLInputElement;

    expect(streetAddressFields[0]).not.toBe("");
    expect(streetAddressFields[1]).not.toBe("");
    expect(cityFields[0].value).not.toBe("");
    expect(cityFields[1].value).not.toBe("");
    expect(postcodeFields[0].value).not.toBe("");
    expect(postcodeFields[1].value).not.toBe("");
    expect(countryFields[0].value).not.toBe("");
    expect(countryFields[1].value).not.toBe("");
    expect(clientNameField.value).not.toBe("");
    expect(clientEmailField.value).not.toBe("");
    expect(invoiceDateField.value).not.toBe("");
    expect(descriptionField.value).not.toBe("");
  });

  it("should edit the invoice when the user clicks on the 'Save Changes' button", async () => {
    const invoiceId = "RT3080";
    const newClientName = " | Edited";

    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices", `/invoices/${invoiceId}/edit`],
      initialIndex: 1,
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ viewportHeight: 10000, itemHeight: 100 }),
      }
    );

    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    const clientNameField = screen.getByLabelText(
      /client's name/i
    ) as HTMLInputElement;

    await user.type(clientNameField, clientNameField.value + newClientName);

    const submitBtn = screen.getByRole("button", { name: /save changes/i });

    await user.click(submitBtn);

    let items = container.querySelectorAll("div[class^='_invoice_list_item']");

    await waitFor(() => {
      items = container.querySelectorAll("div[class^='_invoice_list_item']");
      expect(items.length).toBeGreaterThan(0);
    });

    const arrItems = Array.from(items);
    const invoice = arrItems.find((item) =>
      item.textContent?.includes(invoiceId)
    );

    expect(invoice?.textContent?.includes(newClientName)).toBeTruthy();
  });
});
