import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Dropdown from "./Dropdown.tsx";

describe("Dropdown Component", () => {
  test("should render dropdown children", () => {
    // TODO: Implement test case for dropdown component
    render(
      <Dropdown>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Dropdown>,
    );

    const dropdown = screen.getAllByRole("option");

    dropdown.forEach((option) => expect(option).toBeInTheDocument());
  });
});
