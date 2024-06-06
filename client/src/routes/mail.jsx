import Header from '../components/homepage/header.jsx'
import NavBar from '../components/homepage/nav-bar.jsx'
import Heading from '../components/mailpage/heading.jsx'
import Notes from '../components/mailpage/notes.jsx'

export default function MailPage() {
    
    return (<>
    <div className='mailpage-container'>
        <Header />
        <Heading  text="MailBox" />
        <Notes />
        <NavBar />
    </div>
    </>)
}