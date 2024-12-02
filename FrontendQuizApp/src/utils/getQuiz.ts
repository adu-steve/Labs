import { Data, DataResponse } from "../../types";
import fetchData from "./fetchData";

const getQuiz = ({
  value,
  callback,
}: {
  value: string | "";
  callback: (value: Data) => void;
}) => {
  const quiz = sessionStorage.getItem("quiz");

  const response: DataResponse = fetchData(quiz || value);

  if (response.status === "failed") {
    return;
  }

  sessionStorage.setItem("quiz", quiz || value);

  return (
    response.status === "success" && response?.data && callback(response.data)
  );
};

export default getQuiz;
