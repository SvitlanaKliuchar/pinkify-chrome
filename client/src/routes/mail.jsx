import Header from '../components/homepage/header.jsx'
import NavBar from '../components/homepage/nav-bar.jsx'
import Heading from '../components/mailpage/heading.jsx'
import Note from '../components/mailpage/note.jsx'

export default function MailPage() {
    
    return (<>
    <div className='mailpage-container'>
        <Header />
        <Heading />
        <Note />
        <NavBar />
    </div>
    </>)
}