import React from "react";
import { it, describe, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import HomepageComponent from "../../src/components/Homepage/Homepage.component";
import { Data } from "../../types";
import "@testing-library/jest-dom/vitest";

describe("Homepage Component", () => {
  it("should show the welcome and frontend quiz title", () => {
    const setQuiz: Data = {
      title: "Welcome to the Quiz App",
      icon: "icon",
      questions: [],
    };
    render(<HomepageComponent setQuiz={() => setQuiz} />);

    const welcomeToHeading1 = screen.getByRole("heading", { name: /welcome/i });
    const welcomeToHeading2 = screen.getByRole("heading", {
      name: /frontend/i,
    });
    expect(welcomeToHeading1).toBeInTheDocument();
    expect(welcomeToHeading2).toBeInTheDocument();
  });

  it("should render the quiz buttons", () => {
    const setQuiz: Data = {
      title: "Welcome to the Quiz App",
      icon: "icon",
      questions: [],
    };
    render(<HomepageComponent setQuiz={() => setQuiz} />);

    const quizButton = screen.getAllByRole("button");
    screen.debug(quizButton);
  });

  it("should be able to see all the four buttons on the homepage", () => {
    const mockSetQuiz = vi.fn();
    render(<HomepageComponent setQuiz={mockSetQuiz} />);
    const quizButton = screen.getAllByRole("button");
    expect(quizButton).toHaveLength(4);
  });

  it("should render the quiz when the quiz button is clicked", () => {
    const mockSetQuiz = vi.fn();

    render(<HomepageComponent setQuiz={mockSetQuiz} />);
    const startQuizButton = screen.getByRole("button", { name: /html/i });
    fireEvent.click(startQuizButton);
    expect(mockSetQuiz).toHaveBeenCalled();
  });
});
