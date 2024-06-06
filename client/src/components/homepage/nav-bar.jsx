import pinkDeer from '../../assets/nav-bar/pink-deer.webp';
import favs from '../../assets/nav-bar/favs.webp'
import settings from '../../assets/nav-bar/settings.webp'
import mail from '../../assets/nav-bar/mail.webp'
import contacts from '../../assets/nav-bar/contacts.webp'
import {Link} from 'react-router-dom'


export default function NavBar() {
    return (<>
    <div className="nav-bar-container">
            <div className="icons-left">
                <Link to='/mailbox'><img src={mail} alt='mail icon' /></Link>
                <Link to='/favorites'><img src={favs} alt='favorites icon' /></Link>
            </div>
           
            <Link to='/home'><img className='logo-img' src={pinkDeer} alt="pink deer" /></Link>
           
            <div className="icons-right">
                <Link to='/contacts'><img src={contacts} alt='contacts icon' /></Link>
                <Link to='/settings'><img src={settings} alt='settings icon' /></Link>
            </div>
        </div>
    </>)
}