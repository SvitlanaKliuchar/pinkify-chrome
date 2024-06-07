import Header from '../components/homepage/header.jsx'
import NavBar from '../components/homepage/nav-bar.jsx'
import Heading from '../components/mailpage/heading.jsx'
import Contacts from '../components/contactspage/contacts.jsx'


export default function ContactsPage() {
    
    return (<>
    <div className='contactspage-container'>
        <Header />
        <Heading text="Contacts" />
        <Contacts />
        <NavBar />
    </div>
    </>)
}