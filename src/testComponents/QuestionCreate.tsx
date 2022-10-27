import { useState } from "react";
import { ErrorMessage } from "../components/Error";
import { Modal } from "../components/Modal";
import { IAnswer } from "../models/answer";
import { IQuestion } from "../models/question";
import { Answer } from "./Answer";
import { AnswerCreate } from "./AnswerCreate";
interface TestCreateProps{
    onCreate(question: IQuestion): void
}
export function QuestionCreate({onCreate}:TestCreateProps){
    const [values, setValues] = useState<IQuestion>({question:'', answers:[]});
    const [error, setError] = useState('')
    const submitHandler = async (event: React.FormEvent) => {
      event.preventDefault()
      setError('');
      if(values.question.trim().length===0){
        setError("Question Cant Be Null");
        return;
    }
    let b = true; 
    let count = 0;
    values.answers.forEach((e)=>{
        if(e.state===true){
            count++;
        }
    });
    if(count>1){
        setError("Too many right answers");
        return;
    }
    if(count===0){
        setError("No right answers");
        return;
    }
    if(values.answers.length!==4)
    {
        setError("Wrong number of answers in question");
        b=false;
        return;
    }
    if(b)
      onCreate(values);
    }
    const [modal, setModal] = useState(false)
    const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setValues(values => ({...values, [name]: value}))
    }
    const changeAnswer = (answer: IAnswer)=>{
        values.answers[values.answers.findIndex(answer1=> answer1.answer===answer.answer)].state= answer.state;
    }
    const addAnswer = (answer: IAnswer)=>{
        setError('');
        setModal(false);
        let b = true;
        if(answer.state){
            values.answers.forEach((e)=>{
                if(e.state){
                    setError("More than 1 right answer");
                    b=false
                    return;
                }
            })
        }
        values.answers.forEach((e)=>{
            if(e.answer===answer.answer){
                setError("Same Answer");
                b=false;
                return;
            }
        })
        if(b)
        values.answers.push(answer); 

    }
    return(
        <>
        <form onSubmit={submitHandler}>
        <input
          name="question"
          type="text"
          className="border py-2 px-4 mb-2 w-full outline-0"
          placeholder="Enter Name"
          value={values.question}
          onChange={changeHandler}
        />
        {error && <ErrorMessage error={error} />}
        { values.answers.map(answer => <Answer answer={answer} key={answer.answer} edit={true} onStateChange={changeAnswer}/>) }
        {!modal && <button
  className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2"
  onClick={()=>{setModal(true)}}
>+</button>}
        <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white">Create</button>
      </form>
      {modal && <Modal title="Create Answer" onClose={()=>{setModal(false)}}>
  <AnswerCreate onCreate={addAnswer} />
</Modal>}
      </>
    )
}