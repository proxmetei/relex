import {useContext, useEffect, useState} from 'react'
import { LoginContext } from '../contexts/LoginContext'

export function useProducts() {
  const [error] = useState('')
  const {login, log} = useContext(LoginContext)

  useEffect(() => {
    if(localStorage.getItem("login")==="true"){
        log();
    }
  }, [])

  return { login, error }
}