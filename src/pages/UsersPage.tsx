import { useUsers } from "../hooks/user"
import { User } from '../userComponents/User';
export function UsersPage(){
    const {users,tests} = useUsers();
    return (
        <>
        { users.map(user => <User tests={tests} user={user} key={user.name}/>) }
        </>
    )
}