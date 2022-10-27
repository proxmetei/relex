import { useState } from "react"
import { ILogin } from "../models/login"
import {ErrorMessage} from "./Error";
interface LoginProps {
    onLogin: (login: ILogin) => void
  }
export function Login({onLogin}: LoginProps){
    const [values, setValues] = useState<ILogin>({login:'', password:'' });
    const [error, setError] = useState('')
    const submitHandler = async (event: React.FormEvent) => {
      event.preventDefault()
      setError('')
  
      if (values.login !== "Administrator") {
        setError('Please enter correct login.')
        return
      }
      if (values.password !== "12345") {
        setError('Please enter valid password.')
        return
      }
  
    //   productData.title = value
    //   const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)
        localStorage.setItem("login", "true")
        onLogin(values);
    }
    const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setValues(values => ({...values, [name]: value}))
    }
    return(
        <form onSubmit={submitHandler}>
        <input
          name="login"
          type="text"
          className="border py-2 px-4 mb-2 w-full outline-0"
          placeholder="Enter Login"
          value={values.login}
          onChange={changeHandler}
        />
          <input
          name="password"
          type="text"
          className="border py-2 px-4 mb-2 w-full outline-0"
          placeholder="Enter Password"
          value={values.password}
          onChange={changeHandler}
        />
        {error && <ErrorMessage error={error} />}
  
        <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white">Login</button>
      </form>
    )
}