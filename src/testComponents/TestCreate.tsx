import { useState } from "react";
import { ErrorMessage } from "../components/Error";
import { Modal } from "../components/Modal";
import { IQuestion } from "../models/question";
import {ITest} from "../models/test";
import { Question } from "./Question";
import { QuestionCreate } from "./QuestionCreate";
interface TestCreateProps{
    onCreate(value: ITest): void
}
export function TestCreate({onCreate}:TestCreateProps){
    const [values, setValues] = useState<ITest>({name:'', questions:[], vision:false});
    const [error, setError] = useState('')
    const submitHandler = async (event: React.FormEvent) => {
      event.preventDefault()
      setError('')
      if(values.questions.length<5||values.questions.length>15){
          setError("Number of questions must be between 5 and 15");
          return;
      }
      let b=true;
        let tests: ITest[] =JSON.parse(localStorage.getItem("tests")!);
        tests.forEach((e)=>{
            if(e.name===values.name){
                setError("Same test name exsists");
                b=false
            }
        })
        if(b)
        onCreate(values);
    }
    const [modal, setModal] = useState(false)
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
    const addQuestion = (question: IQuestion)=>{
        setError('');
        setModal(false);
        let b = true; 
        values.questions.forEach((e)=>{
            if(e.question===question.question){
                setError("Same Question");
                b=false;
                return;
            }
        })
        if(b)
        values.questions.push(question);
    }
    return(
        <>
        <form onSubmit={submitHandler}>
        <input
          name="name"
          type="text"
          className="border py-2 px-4 mb-2 w-full outline-0"
          placeholder="Enter Name"
          value={values.name}
          onChange={changeHandler}
        />
         <div className="justify-between items-center w-20 flex"><p>Vision: </p> <input
          name="vision"
          type="checkbox"
          className="border py-2 px-4 mb-2 w-full outline-0"
          placeholder="Choose Vision"
          checked={values.vision}
          onChange={changeHandlerCheckBox}
        />
        </div>
        {error && <ErrorMessage error={error} />}

        { values.questions.map(question => <Question question={question} key={question.question}/>) }
      {!modal &&  <button
  className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2"
  onClick={()=>{setModal(true)}}
>+</button>}
        <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white">Create</button>
      </form>
              {modal && <Modal title="Create Question" onClose={()=>{setModal(false)}}>
              <QuestionCreate onCreate={addQuestion} />
            </Modal>}
            </>
    )
}