import Header from '../components/homepage/header.jsx'
import NavBar from '../components/homepage/nav-bar.jsx'
import Heading from '../components/mailpage/heading.jsx'


export default function ContactsPage() {
    
    return (<>
    <div className='contacts-container'>
        <Header />
        <Heading text="Contacts" />
        <NavBar />
    </div>
    </>)
}