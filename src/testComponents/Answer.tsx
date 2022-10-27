import { useState } from 'react';
import { IAnswer } from '../models/answer';
interface TestProps{
    answer: IAnswer;
    edit: boolean
    onStateChange: (answer: IAnswer) => void
}
export function Answer({answer, onStateChange: onVisionChange, edit}: TestProps){
    const [value, setValue] = useState(answer.state);
    const changeHandler = (event: any)=>{
        if(!edit)
            return;
        answer.state =  event.target.checked;
        setValue(answer.state);
        onVisionChange(answer);
    }
    return(
        <div
        className="border py-2 px-4 rounded flex flex-col items-center mb-2"
      >
        <p>{ answer.answer }</p>
        <div className='flex items-center justify-between w-20 justify-between'>
       <p className="text-sm">State:</p> <input type="checkbox" checked={value} onChange={changeHandler}/>
       </div>
      </div>
    )
}