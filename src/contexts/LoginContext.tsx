import React, {createContext, useState} from 'react'

interface IModalContext {
  login: boolean
  log: () => void
  unlog: () => void
}

export const LoginContext = createContext<IModalContext>({
  login: false,
  log: () => {},
  unlog: () => {}
})

export const LoginState = ({ children }: {children: React.ReactNode}) => {
  const [login, setLogin] = useState(false)

  const log = () => {setLogin(true);

}

  const unlog = () => {setLogin(false)}

  return (
    <LoginContext.Provider value={{ login, log, unlog }}>
      { children }
    </LoginContext.Provider>
  )
}