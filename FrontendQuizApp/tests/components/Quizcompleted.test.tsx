import React from "react";
import { it, describe, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { QuizCompletedProps } from "../../src/components/Quiz/QuizCompleted.component";
import QuizCompleted from "../../src/components/Quiz/QuizCompleted.component";
import "@testing-library/jest-dom/vitest";

describe("Quiz Completed component", () => {
  const quizCompletedProps: QuizCompletedProps = {
    setQuiz: () => {},
    score: 0,
    totalQuestions: 2,
    title: "Test",
    icon: "Test",
  };
  it("should display 'quiz is completed' and what you scored", () => {
    render(<QuizCompleted {...quizCompletedProps} />);

    expect(screen.getByText("Quiz Completed"));
    expect(screen.getByText("You scored..."));
  });
  it("should display the score", () => {
    render(<QuizCompleted {...quizCompletedProps} />);
    expect(screen.getByText(/out of 2/i));
  });
  it("should display the play again button", () => {
    render(<QuizCompleted {...quizCompletedProps} />);
    expect(screen.getByRole("button")).toHaveTextContent("Play Again");
  });
  it("should reset the session storage when play again button is clicked", () => {
    const setQuiz = vi.fn();
    render(<QuizCompleted {...quizCompletedProps} setQuiz={setQuiz} />);
    fireEvent.click(screen.getByRole("button"));
    screen.debug();
    expect(setQuiz).toHaveBeenCalledWith(undefined);
  });
});
