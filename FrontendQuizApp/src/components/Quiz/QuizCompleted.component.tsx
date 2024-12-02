import {Data} from "../../../types.ts";
import SelectedQuiz from "../Selected Quiz/SelectedQuiz.component.tsx";
import MessageComponent from "../Message/Message.component.tsx";


interface QuizCompletedProps {
    setQuiz: (value: Data | undefined) => void;
    score: number;
    totalQuestions: number;
    title: string;
    icon: string;
}

/**
 * QuizCompleted is a component that displays the results of a completed quiz.
 *
 * It shows the quiz title and icon, the score achieved by the user, and the total number of questions.
 * It also provides a "Play Again" button that resets the quiz state and clears relevant session storage data.
 *
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the quiz.
 * @param {string} props.icon - The icon associated with the quiz.
 * @param {number} props.score - The score achieved by the user.
 * @param {number} props.totalQuestions - The total number of questions in the quiz.
 * @param {Function} props.setQuiz - A callback function to reset the quiz state.
 */
const QuizCompleted = ({title, icon, score, totalQuestions, setQuiz}: QuizCompletedProps) => {
    
    /**
     * Resets the quiz state and clears relevant session storage data.
     *
     * It removes the following session storage items:
     * - score
     * - questionNumber
     * - hasCompleted
     * - quiz
     *
     * It also sets the quiz state to undefined.
     */
    const reset = () => {
        sessionStorage.removeItem("score");
        sessionStorage.removeItem("questionNumber");
        sessionStorage.removeItem("hasCompleted");
        sessionStorage.removeItem("quiz")
        setQuiz(undefined)
    }
    return (
        <div className={"quiz-completed"}>
            <MessageComponent title={"Quiz Completed"} subtitle={"You scored..."} message={""}/>
            <div className="results-container">
                <div className={"score-container"}>
                    <SelectedQuiz title={title} icon={icon}/>
                    <h1 className="score">{score}</h1>
                    <p className="totalScore">out of {totalQuestions}</p>
                </div>
                <button className={"submit__btn reset__btn"} onClick={reset}>Play Again</button>
            </div>
        </div>
    )
}

export default QuizCompleted