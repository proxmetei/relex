
import { IUserAnswer } from '../models/useranswer';
interface AttemptProps{
    attempt: IUserAnswer;
}
export function Attempt({attempt}: AttemptProps){
    return(
        <div
        className="border py-2 px-4 rounded flex flex-col items-center mb-2"
      >
       <div> <p>{ attempt.start }</p></div>
       <div> <p>{ attempt.spent }</p></div>
       <div> <p>{ attempt.correctAnswers }</p></div>
      </div>
    )
}