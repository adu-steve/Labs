import { describe, expect, test, vi } from "vitest";
import DeleteModal from "./DeleteModal.tsx";
import { renderWithProviders } from "../../../utils/renderwithproviders.tsx";
import { fireEvent, screen } from "@testing-library/react";

describe("delete modal component", () => {
  const onClose = vi.fn();

  const data = {
    id: "RT3080",
    createdAt: "2021-08-18",
    paymentDue: "2021-08-19",
    description: "Re-branding",
    paymentTerms: 1,
    clientName: "Jensen Huang",
    clientEmail: "jensenh@mail.com",
    status: "paid",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    clientAddress: {
      street: "106 Kendell Street",
      city: "Sharrington",
      postCode: "NR24 5WQ",
      country: "United Kingdom",
    },
    items: [
      {
        name: "Brand Guidelines",
        quantity: 1,
        price: 1800.9,
        total: 1800.9,
      },
    ],
    total: 1800.9,
  };

  test("should render delete modal components", () => {
    // TODO: Implement this test
    renderWithProviders(<DeleteModal onClose={onClose} id={"1234"} />);

    const headline = screen.getByRole("heading", { name: /confirm deletion/i });
    const id = screen.getByText(/123/i);
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    const deleteButton = screen.getByRole("button", { name: /delete/i });

    expect(headline).toBeInTheDocument();
    expect(id).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
  test("should disable all buttons when loading", () => {
    // TODO: Implement this test
    renderWithProviders(<DeleteModal onClose={onClose} id={"1234"} />, {
      preloadedState: {
        invoice: {
          loading: "idle",
          currentInvoice: { loading: "idle", error: null, invoice: data },
          error: null,
          statusFilter: [],
          invoices: [],
        },
      },
    });

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    expect(deleteButton).not.toBeDisabled();
    expect(cancelButton).not.toBeDisabled();

    fireEvent.click(deleteButton);

    expect(deleteButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });

  test("should deleting... when delete button is clicked", () => {
    // TODO: Implement this test
    renderWithProviders(<DeleteModal onClose={onClose} id={"1234"} />, {
      preloadedState: {
        invoice: {
          loading: "idle",
          currentInvoice: { loading: "idle", error: null, invoice: data },
          error: null,
          statusFilter: [],
          invoices: [],
        },
      },
    });

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    expect(deleteButton).not.toBeDisabled();
    expect(cancelButton).not.toBeDisabled();

    fireEvent.click(deleteButton);

    expect(deleteButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
    expect(deleteButton.textContent).toEqual("Deleting...");
  });

  test("should close modal when cancel button is clicked", () => {
    // TODO: Implement this test
    renderWithProviders(<DeleteModal onClose={onClose} id={"1234"} />);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    fireEvent.click(cancelButton);

    expect(onClose).toBeCalledTimes(1);
  });

  test("should close modal when invoice is successfully deleted", () => {
    // TODO: Implement this test
    renderWithProviders(<DeleteModal onClose={onClose} id={"1234"} />, {
      preloadedState: {
        invoice: {
          loading: "idle",
          currentInvoice: { loading: "idle", error: null, invoice: data },
          error: null,
          statusFilter: [],
          invoices: [],
        },
      },
    });

    const deleteButton = screen.getByRole("button", { name: /delete/i });

    fireEvent.click(deleteButton);
    expect(onClose).toBeCalledTimes(1);
  });

  test("should redirect to home page when invoice is successfully deleted", () => {
    // TODO: Implement this test
    renderWithProviders(<DeleteModal onClose={onClose} id={"1234"} />, {
      preloadedState: {
        invoice: {
          loading: "idle",
          currentInvoice: { loading: "idle", error: null, invoice: data },
          error: null,
          statusFilter: [],
          invoices: [],
        },
      },
    });

    const deleteButton = screen.getByRole("button", { name: /delete/i });

    fireEvent.click(deleteButton);
    expect(window.location.pathname).toEqual("/");
  });
});
