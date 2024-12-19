import React from "react";
import { it, describe, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Quiz from "../../src/components/Quiz/Quiz.component";
import "@testing-library/jest-dom/vitest";
import { QuizProps } from "../../src/components/Quiz/Quiz.component";
import { Questions } from "../../types";

describe("Quiz component", () => {
  const mockQuestions: Questions[] = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris",
    },

    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      answer: "Mars",
    },
  ];

  // Create the quizProps with mock data for testing
  const quizProps: QuizProps = {
    questions: mockQuestions,
    setHasCompleted: vi.fn(),
    setScore: vi.fn(),
    score: 0,
  };

  it("should render question and the answers correctly", () => {
    render(<Quiz {...quizProps} />);
    expect(screen.getByText(mockQuestions[0].question)).toBeInTheDocument();
    mockQuestions[0].options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
      fireEvent.click(screen.getByText(option));
    });
  });

  it("the submit answer button should be visible on the screen together with the options", () => {
    render(<Quiz {...quizProps} />);
    expect(
      screen.getByRole("button", { name: /Submit Answer/i })
    ).toBeInTheDocument();
  });

  it("should show that the answer is highlighted", () => {
    render(<Quiz {...quizProps} />);
    const allHeadings = screen.getAllByRole("button");
    const firstAnswer = allHeadings[2];
    const secondAnswer = allHeadings[3];
    expect(firstAnswer).toBeVisible();
    expect(secondAnswer).toBeVisible();
    fireEvent.click(firstAnswer);
    expect(firstAnswer).toHaveStyle("background: 2px solid #A729F5 ");
    fireEvent.click(secondAnswer);
    expect(secondAnswer).toHaveStyle("background: 2px solid #A729F5 ");
  });

  it("should display the next question button and the correct answer before submitting an answer", () => {
    render(<Quiz {...quizProps} />);
    fireEvent.click(screen.getByText("Paris"));
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    expect(screen.getByRole("button", { name: /Next/i }));
    const icon_img = screen.getByRole("img");

    expect(icon_img).toHaveAttribute("src", "/assets/images/icon-correct.svg");
  });

  it("should see the next question and question number", () => {
    render(<Quiz {...quizProps} />);

    expect(screen.getByText(/Question 2 of/i)).toBeInTheDocument();
    expect(screen.getByText(mockQuestions[1].question)).toBeInTheDocument();
  });

  it(`should display "Please select an answer" when the submit button is clicked with no answer selected`, () => {
    render(<Quiz {...quizProps} />);

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));
    screen.debug();
    expect(screen.getByText(/Please select/i)).toBeInTheDocument();
  });
});
