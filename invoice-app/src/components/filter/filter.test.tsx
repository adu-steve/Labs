import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Filter from "./Filter.tsx";
import { renderWithProviders } from "../../utils/renderwithproviders.tsx";

describe("Filter Component", () => {
  test("should render button with filter text", () => {
    renderWithProviders(<Filter />);

    const button = screen.getByRole("button", { name: /filter/i });

    expect(button).toBeInTheDocument();
  });

  test("should toggle dropdown when button is clicked", () => {
    renderWithProviders(<Filter />);

    const button = screen.getByRole("button", { name: /filter/i });
    fireEvent.click(button);

    const paid = screen.getByText(/paid/i);
    const pending = screen.getByText(/pending/i);
    const draft = screen.getByText(/draft/i);

    expect(paid).toBeInTheDocument();
    expect(pending).toBeInTheDocument();
    expect(draft).toBeInTheDocument();

    fireEvent.click(button);

    expect(paid).not.toBeInTheDocument();
    expect(pending).not.toBeInTheDocument();
    expect(draft).not.toBeInTheDocument();
  });
});
