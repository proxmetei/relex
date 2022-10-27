import { IQuestion } from "./question";

export interface ITest{
    name: string;
    vision: boolean;
    questions: IQuestion[];
}