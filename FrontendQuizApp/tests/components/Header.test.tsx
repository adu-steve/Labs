import React from "react";
import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HeaderComponent from "../../src/components/Header/Header.component";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

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



  it("should toggle the theme button", async () => {
    render(<HeaderComponent />);
    screen.debug();
    const toggleButton = screen.getByRole("checkbox");
    const user = userEvent.setup();
    await user.click(toggleButton);
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toBeEnabled();
  });

  // it("should see that the theme icon has switched from dark to light and vice versa", async () => {
  //   render(<HeaderComponent />);

  //   const theme_svg = screen.getAllByRole("img");

  //   expect(theme_svg[0]).toHaveAttribute(
  //     "src",
  //     "/assets/images/icon-sun-light.svg"
  //   );
  //   expect(theme_svg[1]).toHaveAttribute(
  //     "src",
  //     "/assets/images/icon-moon-light.svg"
  //   );
  //   const body = document.querySelector("body");
  //   expect(body).toHaveStyle("background: --dark-navy");

  //   const user = userEvent.setup();
  //   const toggleButton = screen.getByRole("checkbox");
  //   await user.click(toggleButton);
  //   expect(theme_svg[0]).toHaveAttribute(
  //     "src",
  //     "/assets/images/icon-sun-dark.svg"
  //   );
  //   expect(theme_svg[1]).toHaveAttribute(
  //     "src",
  //     "/assets/images/icon-moon-dark.svg"
  //   );
  //   expect(body).toHaveStyle("background: --light-gray");
  // });
});
