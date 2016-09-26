export type Question = {
    id?: number;
    quizId: number;
    text: string;
};

export type IState = Question[];
