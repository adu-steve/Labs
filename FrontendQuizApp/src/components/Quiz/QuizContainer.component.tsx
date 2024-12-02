import {useState} from "react";


import {Data} from "../../../types.ts";


import "./quiz.styles.css";
import Quiz from "./Quiz.component.tsx";
import QuizCompleted from "./QuizCompleted.component.tsx";

interface QuizContainerProps{
    quiz: Data;
    setQuiz: (value: Data | undefined) => void;
}

/**
 * QuizContainer is a component that conditionally renders either the Quiz or QuizCompleted components based on the state of the quiz.
 *
 * It expects a quiz object as a prop, which contains the title, icon, and questions of the quiz.
 * It also expects a setQuiz function as a prop, which is used to reset the quiz state in the App component.
 *
 * The component uses the useState hook to store the completion status of the quiz in session storage.
 * It also uses the useState hook to store the score of the user in session storage.
 *
 * If the quiz has not been completed, it renders the Quiz component with the questions, score, and setHasCompleted/setScore functions as props.
 * If the quiz has been completed, it renders the QuizCompleted component with the title, icon, score, totalQuestions, and setQuiz function as props.
 */
const QuizContainer = ({quiz, setQuiz}: QuizContainerProps) => {
    const {questions} = quiz;


    const [hasCompleted, setHasCompleted] = useState<boolean>(() => sessionStorage.getItem("hasCompleted") === "true");
    const [score, setScore] = useState<number>(
        () => Number(sessionStorage.getItem("score")) || 0
    );

    return (
        !hasCompleted ?
            <Quiz questions={questions} score={score} setHasCompleted={setHasCompleted} setScore={setScore}/>
            : <QuizCompleted title={quiz?.title || ""} icon={quiz?.icon || ""} setQuiz={setQuiz} score={score}
                             totalQuestions={questions.length}/>
    );
};

export default QuizContainer;
