import { describe, expect, test } from "vitest";
import { renderWithProviders } from "../../utils/renderwithproviders.tsx";
import { fireEvent, screen } from "@testing-library/react";
import FilterDropdown from "./filter-dropdown.tsx";

describe("Filter dropdown component", () => {
  const mockOptions = ["paid", "pending", "draft"];

  test("renders all options", () => {
    renderWithProviders(<FilterDropdown options={mockOptions} />);

    mockOptions.forEach((option) => {
      const optionElement = screen.getByText(option);
      expect(optionElement).toBeInTheDocument();
    });
  });

  test("toggles checked state when clicked", () => {
    renderWithProviders(<FilterDropdown options={mockOptions} />);

    mockOptions.forEach((option) => {
      const optionElement = screen.getByRole("checkbox", { name: option });

      expect(optionElement).not.toBeChecked();

      fireEvent.click(optionElement);

      expect(optionElement).toBeChecked();
    });
  });

  test("should be checked when stastusFilter contains option", () => {
    const { store } = renderWithProviders(
      <FilterDropdown options={mockOptions} />,
      {
        preloadedState: {
          invoice: {
            invoices: [],
            currentInvoice: {
              invoice: undefined,
              loading: "idle",
              error: null,
            },
            statusFilter: ["paid"],
            loading: "idle",
            error: null,
          },
        },
      },
    );

    const state = store.getState();

    mockOptions.forEach((option) => {
      const optionElement = screen.getByRole("checkbox", { name: option });
      if (state.invoice.statusFilter.includes(option)) {
        expect(optionElement).toBeChecked();
      } else {
        expect(optionElement).not.toBeChecked();
      }
    });
  });

  test("filters invoices based on selected status", () => {
    const { store } = renderWithProviders(
      <FilterDropdown options={mockOptions} />,
      {
        preloadedState: {
          invoice: {
            invoices: [],
            currentInvoice: {
              invoice: undefined,
              loading: "idle",
              error: null,
            },
            statusFilter: [],
            loading: "idle",
            error: null,
          },
        },
      },
    );

    const checkbox = screen.getByRole("checkbox", { name: /paid/i });
    fireEvent.click(checkbox);

    const state = store.getState();
    expect(state.invoice.statusFilter).toContain("paid");

    fireEvent.click(checkbox);

    const updatedState = store.getState();
    expect(updatedState.invoice.statusFilter).not.toContain("paid");
  });
});
