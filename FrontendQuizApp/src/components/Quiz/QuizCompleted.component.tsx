import { Data } from "../../../types.ts";
import SelectedQuiz from "../Selected Quiz/SelectedQuiz.component.tsx";
import MessageComponent from "../Message/Message.component.tsx";

export interface QuizCompletedProps {
  setQuiz: (value: Data | undefined) => void;
  score: number;
  totalQuestions: number;
  title: string;
  icon: string;
}

const QuizCompleted = ({
  title,
  icon,
  score,
  totalQuestions,
  setQuiz,
}: QuizCompletedProps) => {
  const reset = () => {
    sessionStorage.removeItem("score");
    sessionStorage.removeItem("questionNumber");
    sessionStorage.removeItem("hasCompleted");
    sessionStorage.removeItem("quiz");
    setQuiz(undefined);
  };
  return (
    <div className={"quiz-completed"}>
      <MessageComponent
        title={"Quiz Completed"}
        subtitle={"You scored..."}
        message={""}
      />
      <div className="results-container">
        <div className={"score-container"}>
          <SelectedQuiz title={title} icon={icon} />
          <h1 className="score">{score}</h1>
          <p className="totalScore">out of {totalQuestions}</p>
        </div>
        <button className={"submit__btn reset__btn"} onClick={reset}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default QuizCompleted;
