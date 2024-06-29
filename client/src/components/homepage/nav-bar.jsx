import pinkDeer from '../../assets/homepage/pink-deer.webp';
import palette from '../../assets/homepage/palette.webp'
import mail from '../../assets/homepage/mail.webp'
import contacts from '../../assets/homepage/contacts.webp'
import {Link} from 'react-router-dom'
import miniGames from '../../assets/homepage/mini-games.webp'


export default function NavBar() {
    return (<>
    <div className="nav-bar-container">
            <div className="icons-left">
                <Link to='/mailbox'><img className='mailbox-img' src={mail} alt='mailbox icon' /></Link>
                <Link to='/mini-games-greet'><img className='mini-games-img' src={miniGames} alt='mini games icon' /></Link>
            </div>
           
            <Link to='/home'><img className='logo-img' src={pinkDeer} alt="pink deer" /></Link>
           
            <div className="icons-right">
                <Link to='/send-drawing'><img src={palette} alt='palette icon' /></Link>
                <Link to='/contacts'><img src={contacts} alt='contacts icon' /></Link>
            </div>
        </div>
    </>)
}