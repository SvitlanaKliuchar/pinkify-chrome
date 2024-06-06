import {useUser} from '@clerk/clerk-react'

export default function Header(){
    const {user} = useUser()
    const userName = user ? user.fullName : "Guest";
    return (<>
    <div className="header">
        <div>user: {userName} </div>
        <div className="language-config">
            <button className="btn lang-btn">eng</button>
            <button className="btn lang-btn">ukr</button>
            <button className="btn lang-btn">pt</button>
        </div>
    </div>
    </>)
}