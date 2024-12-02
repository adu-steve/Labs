interface QuestionProps {
  currentQuestion: string;
  questionNumber: number;
  totalQuestions: number;
}
/**
 * Displays a question with a progress bar
 * @param currentQuestion The current question string
 * @param questionNumber The current question number
 * @param totalQuestions The total number of questions
 * @returns A JSX element containing the question and a progress bar
 */
const Question = ({
  currentQuestion,
  questionNumber,
  totalQuestions,
}: QuestionProps) => {
  // Calculate the progress bar percentage based on the current question number and total questions.
  const percentage = ((questionNumber + 1) / totalQuestions) * 100;

  return (
    <div className={"question-container"}>
      <p className="question__number">
        Question {questionNumber + 1} of {totalQuestions}
      </p>
      <h3 className={"question"}>{currentQuestion}</h3>
      <div className="question__progress_bar-container">
        <div
          className={`question__progress_bar`}
          style={{ width: percentage + "%" }}
        />
      </div>
    </div>
  );
};

export default Question;
