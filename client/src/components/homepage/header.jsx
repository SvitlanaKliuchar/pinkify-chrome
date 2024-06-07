import {useUser} from '@clerk/clerk-react'
import gear from '../../assets/homepage/gear.webp'
import {Link} from 'react-router-dom'

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
            <Link to='/settings'><img className='settings-img' src={gear} alt='settings icon' /></Link>
            
        </div>
    </div>
    </>)
}