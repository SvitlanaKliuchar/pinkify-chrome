import Header from '../components/homepage/header.jsx'
import NavBar from '../components/homepage/nav-bar.jsx'
import Heading from '../components/mailpage/heading.jsx'
import Notes from '../components/mailpage/notes.jsx'
import Drawings from '../components/mailpage/drawings.jsx'
import Tabs from '../components/mailpage/tabs.jsx'; 
import { useState } from 'react';
import Favourites from '../components/mailpage/favourites.jsx'

export default function MailPage() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = ["Notes", "Drawings", "Favourites"];

    return (<>
    <div className='page-container'>
        <Header />
        <Heading  text="MailBox" />
        <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
        {activeTab === 0 && <Notes />}
        {activeTab === 1 && <Drawings />}
        {activeTab === 2 && <Favourites />}
        <NavBar />
    </div>
    </>)
}