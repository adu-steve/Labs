import { useEffect, useState } from "react";

import Options from "./Options.component.tsx";
import Question from "./Question.component.tsx";

import { Questions } from "../../../types.ts";

import errorIconSvg from "/assets/images/icon-error.svg";

import "./quiz.styles.css";

interface QuizProps {
  questions: Questions[];
  setHasCompleted: (value: boolean) => void;
  setScore: (value: number) => void;
  score: number;
}

const Quiz = ({ questions, setHasCompleted, setScore, score }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[] | undefined>(undefined);
  const [questionNumber, setQuestionNumber] = useState<number>(
    () => Number(sessionStorage.getItem("questionNumber")) || 0
  );
  const [answer, setAnswer] = useState<string>("");

  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  const handleNextQuestion = () =>
    questionNumber === questions.length - 1
      ? handleCompleted()
      : setQuestionNumber(questionNumber + 1);

  const handleSubmit = () => {
    if (!selectedAnswer) return setShowError(true);

    setAnswer(questions[questionNumber].answer);

    if (selectedAnswer === questions[questionNumber].answer) {
      sessionStorage.setItem("score", String(score + 1));
      setScore(score + 1);
    }

    return questionNumber < questions.length - 1
      ? sessionStorage.setItem("questionNumber", String(questionNumber + 1))
      : sessionStorage.setItem("hasCompleted", "true");
  };

  const handleCompleted = () => setHasCompleted(true);

  const handleSelection = (value: string) => {
    setShowError(false);
    setSelectedAnswer(value);
  };

  useEffect(() => {
    setCurrentQuestion(questions[questionNumber].question);
    setOptions(questions[questionNumber].options);
    setAnswer("");
    setSelectedAnswer("");
  }, [questions, questionNumber]);

  return (
    <div className={"quiz"}>
      <Question
        questionNumber={questionNumber}
        totalQuestions={questions.length}
        currentQuestion={currentQuestion}
      />

      <div className={"options-container"}>
        <Options
          answer={answer}
          selectedAnswer={selectedAnswer}
          options={options}
          handleSelection={handleSelection}
        />
        <button
          className={"submit__btn"}
          onClick={
            answer
              ? questionNumber === questions.length - 1
                ? handleCompleted
                : handleNextQuestion
              : handleSubmit
          }
        >
          {answer
            ? questionNumber === questions.length - 1
              ? "Complete"
              : "Next question"
            : "Submit answer"}
        </button>
        {!selectedAnswer && showError && (
          <p className="error-message">
            <img src={errorIconSvg} alt={"error icon"} /> Please select an
            answer
          </p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
