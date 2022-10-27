import { IAnswer } from "./answer";

export interface IQuestion{
    answers: IAnswer[];
    question: string;
}