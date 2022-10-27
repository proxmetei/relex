import {useContext, useEffect, useState} from 'react'
import { ModalContext } from '../contexts/ModalContext'
import { ITest } from '../models/test'
import TestsJson from '../assets/data.json';

export function useTest() {
    const [tests, setTests] = useState<ITest[]>([])
  const [error, setError] = useState('')
  function addTest(test: ITest) {
    tests.push(test);
    setTests(tests);
    localStorage.setItem("tests", JSON.stringify(tests));
  }
  function changeVision(test: ITest) {
   tests[tests.findIndex((test1:ITest)=> test1.name === test.name)].vision = test.vision;
   localStorage.setItem("tests", JSON.stringify(tests));
}
  const {close} = useContext(ModalContext)
async function fetchTests() {
      setError('')
      if(localStorage.getItem("tests")===null)
      {
      setTests(TestsJson);
      localStorage.setItem("tests", JSON.stringify(TestsJson))
      }
      else
      {
      setTests(JSON.parse(localStorage.getItem("tests")!));
      }
  }
  useEffect(() => {
fetchTests();
close();
  }, [])

  return { error, tests, changeVision, addTest }
}