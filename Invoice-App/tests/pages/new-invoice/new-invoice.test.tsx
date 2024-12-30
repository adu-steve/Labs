import { describe, it, expect, afterEach } from "vitest";
import { QueryClientProvider } from "react-query";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { getQueryClient, VirtuosoWrapper } from "@/utils";
import { appRoutes } from "@/routes";
import selectEvent from "react-select-event";
import "@testing-library/jest-dom/vitest";

describe("The NewInvoice Page", () => {
  let user = userEvent.setup();
  let queryClient = getQueryClient();

  afterEach(() => {
    user = userEvent.setup();
    queryClient = getQueryClient();
    window.innerWidth = 1024;
  });

  it("should redirect the user back to the Invoices page when they attempt to access the NewInvoice Page using a viewport width greater than or equal to 768px", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices/new"],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ viewportHeight: 5000, itemHeight: 100 }),
      }
    );

    expect(
      screen.getByRole("heading", { name: /^invoices$/i })
    ).toBeInTheDocument();
  });

  it("should allow the submission of the form without any validation when the user clicks on the 'save as draft' button", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices/new"],
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ viewportHeight: 5000, itemHeight: 100 }),
      }
    );

    const saveAsDraftBtn = screen.getByRole("button", {
      name: /save as draft/i,
    });

    await user.click(saveAsDraftBtn);

    await waitFor(() =>
      expect(
        screen.queryByRole("heading", { name: /invoices/i })
      ).toBeInTheDocument()
    );

    await user.click(screen.getByText(/filter/i));
    await user.click(screen.getByLabelText(/draft/i));

    await waitForElementToBeRemoved(screen.getByText(/loading/i));

    const items = container.querySelectorAll(
      "div[class^='_invoice_list_item']"
    );

    const arrItems = Array.from(items);
    const lastItem = arrItems.pop();

    expect(lastItem?.textContent?.toLowerCase().includes("tbd")).toBeTruthy();
  });

  it("should forbid the submission of the form when the user clicks on the 'save & send' button if there are empty fields", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices/new"],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ viewportHeight: 5000, itemHeight: 100 }),
      }
    );

    const saveAndSend = screen.getByRole("button", {
      name: /save & send/i,
    });

    await user.click(saveAndSend);

    await expect(screen.getAllByText(/required/i).length).toBeGreaterThan(0);
  });

  it("should allow the submission of the form when the user clicks on the 'save & send' button if all fields are filled correctly", async () => {
    const router = createMemoryRouter(appRoutes, {
      initialEntries: ["/invoices/new"],
    });

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
      {
        wrapper: VirtuosoWrapper({ viewportHeight: 10000, itemHeight: 100 }),
      }
    );

    const streetAddressFields = screen.getAllByLabelText(/street address/i);
    const cityFields = screen.getAllByLabelText(/city/i);
    const postcodeFields = screen.getAllByLabelText(/post code/i);
    const countryFields = screen.getAllByLabelText(/country/i);
    const clientNameField = screen.getByLabelText(/client's name/i);
    const clientEmailField = screen.getByLabelText(/client's email/i);
    const invoiceDateField = screen.getByLabelText(/invoice date/i);
    const paymentTermsField = screen.getByLabelText(/payment terms/i);
    const descriptionField = screen.getByLabelText(/project description/i);

    await user.type(streetAddressFields[0], "3649 Mission Inn Ave");
    await user.type(cityFields[0], "Riverside");
    await user.type(postcodeFields[0], "92501");
    await user.type(countryFields[0], "United States");
    await user.type(clientNameField, "John Doe");
    await user.type(clientEmailField, "john.doe@gmail.com");
    await user.type(streetAddressFields[1], "808 E Thousand Oaks Blvd");
    await user.type(cityFields[1], "Thousand Oaks");
    await user.type(postcodeFields[1], "91360");
    await user.type(countryFields[1], "United States");

    await user.click(invoiceDateField);
    await user.click(
      screen.getByRole("option", {
        name: /Choose Thursday, September 28th, 2023/i,
      })
    );

    await selectEvent.select(paymentTermsField, "Net 7 Days");
    await user.type(
      descriptionField,
      "This is an awesome application!! You should hire me!! :D"
    );

    const saveAndSend = screen.getByRole("button", {
      name: /save & send/i,
    });

    await user.click(saveAndSend);

    await waitFor(() =>
      expect(
        screen.queryByRole("heading", { level: 1, name: /^invoices$/i })
      ).toBeInTheDocument()
    );

    await user.click(screen.getByText(/filter/i));
    await user.click(screen.getByLabelText(/pending/i));

    await waitForElementToBeRemoved(screen.getByText(/loading/i));

    const items = container.querySelectorAll(
      "div[class^='_invoice_list_item']"
    );

    const arrItems = Array.from(items);

    const lastItem = arrItems.pop();

    expect(
      lastItem?.textContent?.toLowerCase().includes("john doe")
    ).toBeTruthy();
  });
});
