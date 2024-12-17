import React from "react";
import { it, describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Question from "../../src/components/Quiz/Question.component";
import "@testing-library/jest-dom/vitest";
import { QuestionProps } from "../../src/components/Quiz/Question.component";

describe("Quiz Question", () => {
  it("should render the question number", () => {
    const questions: QuestionProps = {
      questionNumber: 1,
      totalQuestions: 2,
      currentQuestion: "",
    };
    render(<Question {...questions} />);
    screen.debug();
    const questionNumberText = screen.getByText(/Question/i, {
      exact: false,
    });
    expect(questionNumberText).toBeInTheDocument();
  });
});
