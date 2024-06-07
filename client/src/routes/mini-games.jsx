import Header from '../components/homepage/header.jsx'
import NavBar from '../components/homepage/nav-bar.jsx'
import Heading from '../components/mailpage/heading.jsx'
import MiniGamesMenu from '../components/minigamespage/mini-games-menu.jsx'



export default function MiniGamesPage() {
    
    return (<>
    <div className='minigamespage-container'>
        <Header />
        <Heading text="Mini Games" />
        <MiniGamesMenu />
        <NavBar />
    </div>
    </>)
}