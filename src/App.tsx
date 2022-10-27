import React, { useContext } from 'react';
import {Route, Routes} from 'react-router-dom';
import {useProducts} from './hooks/login'
import './App.css';
import { Modal } from './components/Modal';
import { Login } from './components/Login';
import {Header} from './components/Header'
import { ModalContext } from './contexts/ModalContext';
import { LoginContext } from './contexts/LoginContext';
import { TestsPage } from './pages/TestPage';
import { UsersPage } from './pages/UsersPage';

function App() {
  const {modal, open, close} = useContext(ModalContext)
  const {login, log, unlog} = useContext(LoginContext)
  useProducts()
  const createHandler = () => {
    close()
    log()
  }
  const logout = ()=>{
    localStorage.setItem("login", "false");
    unlog()
    open()
  }
  return (
    <>
<Header login={login} onLogout={logout}></Header>
    {!login &&<div className="container mx-auto max-w-2xl pt-5">

      {modal && <Modal title="Login in System" onClose={()=>{}}>
        <Login onLogin={createHandler} />
      </Modal>}
    </div>
}
{login &&
<Routes>
  <Route path='/users' element={<UsersPage/>}></Route>
  <Route path='*' element={<TestsPage />}/>
</Routes>
}
    </>
  )
}

export default App;
