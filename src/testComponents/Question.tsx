import { IQuestion } from '../models/question';
import { Answer } from './Answer';
interface QuestionProps{
    question: IQuestion;
}
export function Question({question}: QuestionProps){
    const changeAnswer = ()=>{

    }
    return(
        <div
        className="border py-2 px-4 rounded flex flex-col items-center mb-2"
      >
        <p>{ question.question }</p>
        <div className='flex items-center justify-between w-1/1'>
       { question.answers.map(answer => <Answer answer={answer} key={answer.answer} edit={false} onStateChange={changeAnswer}/>) }
       </div>
      </div>
    )
}