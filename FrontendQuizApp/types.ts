export type Questions = {
    question: string;
    options: string[];
    answer: string;
}

export type Data = {
    title: string;
    icon: string;
    questions: Questions[]
}

export type DataResponse = {
    data?: Data;
    message?: string;
    status: string;
}
