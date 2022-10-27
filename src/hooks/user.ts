import { useEffect, useState} from 'react'
import UserJSON from '../assets/userdata.json';
import { IUser } from '../models/user';
import { ITest } from '../models/test';

export function useUsers() {
    const [users, setUsers] = useState<IUser[]>([])
    const [tests, setTests] = useState<ITest[]>([])
  const [error, setError] = useState('')
async function fetchUsers() {
    
      setError('')
      setTests(JSON.parse(localStorage.getItem("tests")!));
      if(localStorage.getItem("users")===null)
      {
      setUsers(UserJSON);
      localStorage.setItem("users", JSON.stringify(UserJSON))
      }
      else
      {
      setUsers(JSON.parse(localStorage.getItem("users")!));
      }
      console.log(users)
  }
  useEffect(() => {
 fetchUsers();
  }, [])

  return { error, users, tests}
}