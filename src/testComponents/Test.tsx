import { useState } from 'react';
import {ITest} from '../models/test';
import { Question } from './Question';
interface TestProps{
    test: ITest;
    onVisionChange: (test: ITest) => void
}
export function Test({test, onVisionChange}: TestProps){
    const [value, setValue] = useState(test.vision);
    const changeHandler = (event: any)=>{
        test.vision =  event.target.checked;
        setValue(test.vision);
        onVisionChange(test);
    }
    return(
        <div
        className="border py-2 px-4 rounded flex flex-col items-center mb-2"
      >
        <p>{ test.name }</p>
        <div className='flex items-center justify-between w-20'>
       <p className="text-sm">Vision:</p> <input type="checkbox" checked={value} onChange={changeHandler}/>
       </div>
       { test.questions.map(question => <Question question={question} key={question.question}/>) }
      </div>
    )
}