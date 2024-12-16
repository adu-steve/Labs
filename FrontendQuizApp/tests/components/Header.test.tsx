import React from "react";
import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeaderComponent from "../../src/components/Header/Header.component";
import "@testing-library/jest-dom";
describe("Header Component", () => {
  it("should render the two svg images for the toggle theme ", () => {
    render(<HeaderComponent />);
    const svg_img = screen.getAllByRole("img");
    expect(svg_img).toHaveLength(2);
    expect(svg_img[0]).toHaveAttribute(
      "src",
      "/assets/images/icon-sun-dark.svg"
    );
    expect(svg_img[1]).toHaveAttribute(
      "src",
      "/assets/images/icon-moon-dark.svg"
    );
  });
  it("the user should see toggle button using input which was styled to toggle", () => {
    render(<HeaderComponent />);
    const toggleButton = screen.queryByRole("input");
    expect(toggleButton).not.toBeInTheDocument();
  });
});
