import { useState } from 'react';
import { ITest } from '../models/test';
import { IUser } from '../models/user';
import { IResult } from '../models/result';
import { Attempt } from './Attempt';
interface UserProps {
    user: IUser;
    tests: ITest[]
}
export function User({ user, tests }: UserProps) {
    const [value, setValue] = useState('');
    const [results, setResults] = useState<IResult>();
    const [showResults, setshowResults] = useState(false)
    const setTest = (event: any) => {
        let e = event.currentTarget;
        let value = (e.options[e.selectedIndex].text)
        setValue(value);
        if (value.trim().length !== 0) {
            setshowResults(true);
        }
        let count = 0;
        let countCorrect = 0;
        let point = 0;
        let test = tests[tests.findIndex((test) => { return test.name.toLowerCase() === value.toLowerCase() })];
        console.log(test);
        let totalQuestions = test.questions.length;
        user.attempts.forEach((attempt) => {
            if (attempt.test.toLowerCase() === value.toLowerCase()) {
                count++;
                point += attempt.correctAnswers;
                if (attempt.correctAnswers === totalQuestions) {
                    countCorrect++;
                }
            }
        })
        let res: IResult = {
            totalAttempts: count,
            percent: countCorrect / count * 100,
            passed: countCorrect,
            avg: point / (count * totalQuestions)
        }
        setResults(res);
    }
    return (
        <div
            className="border py-2 px-4 rounded flex flex-col items-center mb-2"
        >
            <p>{user.name}</p>
            {/* <div className='flex items-center justify-between w-20'> */}
            <select onChange={setTest}>
                <option></option>
                {tests.map(test => <option key={test.name}>{test.name}</option>)}
            </select>
            {showResults && <div >
                <div><span>Total Attempts: {results?.totalAttempts}</span></div>
                <div><span>Total Passed: {results?.passed}</span></div>
                <div><span>Percent: {results?.percent}</span></div>
                <div><span>Average Score: {results?.avg}</span></div>
            </div>
            }
            <div className='flex'>
            {showResults && user.attempts.map((attempt) => { if (attempt.test.toLowerCase() === value.toLowerCase()) return <Attempt attempt={attempt} key={attempt.test+attempt.start} /> })}
            </div>
            {/* <p className="text-sm">Vision:</p> <input type="checkbox" checked={value} onChange={changeHandler}/> */}
            {/* </div> */}
        </div>
    )
}