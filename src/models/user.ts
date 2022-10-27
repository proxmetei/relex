import { IUserAnswer } from "./useranswer";

export interface IUser{
    name: string;
    attempts: IUserAnswer[];
}