import { useState } from "react";
import { ErrorMessage } from "../components/Error";
import { IAnswer } from "../models/answer";
interface AnswerCreateProps{
    onCreate(answer: IAnswer): void
}
export function AnswerCreate({onCreate}:AnswerCreateProps){
    const [values, setValues] = useState<IAnswer>({answer:'',state:false});
    const [error, setError] = useState('')
    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        if(values.answer===''){
            setError("Not Valid Answer");
        }
        onCreate(values);
    }
    const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setValues(values => ({...values, [name]: value}))
    }
    const changeHandlerCheckBox = (event: any)=>{
        const name = event.currentTarget.name;
        const value = event.currentTarget.checked;
        setValues(values => ({...values, [name]: value}))
    }
    return(
        <form onSubmit={submitHandler}>
        <input
          name="answer"
          type="text"
          className="border py-2 px-4 mb-2 w-full outline-0"
          placeholder="Enter Name"
          value={values.answer}
          onChange={changeHandler}
        />
           <div className="flex items-center"> <p>Correct</p>      <input
          name="state"
          type="checkbox"
          className="border py-2 px-4 mb-2 w-full outline-0"
          placeholder="Choose Vision"
          checked={values.state}
          onChange={changeHandlerCheckBox}
        /></div>
        {error && <ErrorMessage error={error} />}
  
        <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white">Create</button>
      </form>
    )
}