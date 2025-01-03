import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import InvoiceCard from "./Invoice.Card.tsx";
import { renderWithProviders } from "../../../../utils/renderwithproviders.tsx";

describe("InvoiceCard Component", () => {
  const mockProps = {
    id: "12345",
    paymentDue: "2024-12-31",
    status: "pending",
    clientName: "John Doe",
    total: 5000,
  };

  test("renders the invoice details correctly", () => {
    renderWithProviders(<InvoiceCard {...mockProps} />);

    // Check if all elements renderWithProviders correctly
    expect(screen.getByText(mockProps.id)).toBeInTheDocument();
    expect(screen.getByText(/Due 31 Dec 2024/i)).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText(/5,000/i)).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
    expect(screen.getByAltText("arrow right")).toBeInTheDocument();
  });

  test("navigates to the correct route when clicked", async () => {
    const user = userEvent.setup();

    renderWithProviders(<InvoiceCard {...mockProps} />);

    const cardLink = screen.getByText(mockProps.id);
    await user.click(cardLink);

    expect(window.location.pathname).toEqual(`/${mockProps.id}`);
  });
});
