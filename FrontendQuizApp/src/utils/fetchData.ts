import data from "../data.json";
import {Data, DataResponse} from "../../types.ts";


/**
 * This function takes a string as a request and checks if it contains a number or symbol.
 * If it does, it returns a failed response with a message indicating that the request cannot contain number or symbol.
 * If it doesn't, it searches in the data.json file for a question with the same title as the request.
 * If the question is found, it returns a success response with the question.
 * If the question is not found, it returns a failed response with a message indicating that the question was not found.
 * If an error occurs, it returns a failed response with a message indicating that something went wrong.
 * @param req - The request string.
 * @returns - A DataResponse object.
 */
const fetchData = (req: string): DataResponse => {
    try {
        const hasNumber: boolean = /\d/.test(req);
        const hasSymbol: boolean = /[!@#$%^&*(),.?":{}|<>]/.test(req);

        if (hasNumber || hasSymbol) {
            return {
                status: "failed",
                message: "request cannot contain number or symbol",
            };
        }

        const question: Data | undefined = data.quizzes.find(
            (question: Data) => question.title.toLowerCase() === req.toLowerCase()
        );

        if (!question) {
            return {status: "failed", message: "Question not found"};
        }

        return {status: "success", data: question};
    } catch {
        return {status: "failed", message: "oops, something went wrong"};
    }
};

export default fetchData;
