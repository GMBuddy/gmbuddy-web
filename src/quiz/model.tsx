import { Question } from "../question/model";

export type Quiz = {
    id?: number;
    text: string;
    questions?: Question[]
};

export type IState = Quiz[];
