import React from "react";
import { it, describe, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Quiz from "../../src/components/Quiz/Quiz.component";
import "@testing-library/jest-dom/vitest";
import { QuizProps } from "../../src/components/Quiz/Quiz.component";
import { Questions } from "../../types";

describe("Quiz component", () => {
  it("should render questions and the answers correctly", () => {
    // Define mock questions with the shape of Questions type
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

    // Render the Quiz component with the mock questions
    render(<Quiz {...quizProps} />);

    expect(
      screen.getByText("What is the capital of France?")
    ).toBeInTheDocument();

    mockQuestions[0].options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
      fireEvent.click(screen.getByText(option));
    });
  });
  it("should handle answer submission ", () => {
    // Define mock questions
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

    // Create mock functions for handling completion and score
    const mockSetHasCompleted = vi.fn();
    const mockSetScore = vi.fn();

    // Set up the initial score and render the component
    const quizProps: QuizProps = {
      questions: mockQuestions,
      setHasCompleted: mockSetHasCompleted,
      setScore: mockSetScore,
      score: 0,
    };

    render(<Quiz {...quizProps} />);
    screen.debug();
  });
});
