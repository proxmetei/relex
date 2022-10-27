import { useContext } from "react";
import { Modal } from "../components/Modal";
import { ModalContext, ModalState } from "../contexts/ModalContext";
import { useTest } from "../hooks/test";
import { ITest } from "../models/test";
import { Test } from "../testComponents/Test";
import { TestCreate } from "../testComponents/TestCreate";

export function TestsPage (){
    const {modal, open, close} = useContext(ModalContext)
    const create = (test: ITest)=>{
            close();
            addTest(test);
    }
   const {tests, changeVision, addTest} = useTest();
    return(
        <ModalState>
<div className="container mx-auto max-w-2xl pt-5">

{modal &&  <ModalState><Modal title="Create Test" onClose={close}>
  <TestCreate onCreate={create} />
</Modal></ModalState>}
{ tests.map(test => <Test test={test} key={test.name} onVisionChange={changeVision}/>) }
{!modal && <button
  className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2"
  onClick={open}
>+</button>}
</div>
</ModalState>
    )
}