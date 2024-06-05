import pinkDeer from '../../assets/nav-bar/pink-deer.webp';
import favs from '../../assets/nav-bar/favs.webp'
import settings from '../../assets/nav-bar/settings.webp'
import mail from '../../assets/nav-bar/mail.webp'
import contacts from '../../assets/nav-bar/contacts.webp'


export default function NavBar() {
    return (<>
    <div className="nav-bar-container">
         <div className="icons-left">
            <div><img src={mail} alt='mail icon'></img></div>
            <div><img src={favs} alt='favorites icon'></img></div>
         </div>
         <div className="logo"><img src={pinkDeer} alt="pink deer"></img></div>
        <div className="icons-right">
            <div><img src={contacts} alt='contacts icon'></img></div>
            <div><img src={settings} alt='settings icon'></img></div>
        </div>
    </div>
    </>)
}