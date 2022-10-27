import { Link } from "react-router-dom"

interface ModalProps {
    // children: React.ReactNode
    login: boolean
    onLogout: () => void
  }
export function Header({login, onLogout}: ModalProps){
    return(
        <>
        { login &&
        <div className="h-[50px] flex justify-between px-5 bg-gray-500 items-center text-white">
         <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white" onClick={onLogout}>Logout</button>
         <span>
         <Link to="/tests" className="mr-2">Tests</Link>
        <Link to="/users">Users</Link>
        </span>
            </div>
}
      </>
    )
}