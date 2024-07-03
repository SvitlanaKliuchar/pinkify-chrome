import Header from '../../components/homepage/header.jsx'
import NavBar from '../../components/homepage/nav-bar.jsx'
import Heading from '../../components/mailpage/heading.jsx'
import MiniGamesSelection from '../../components/minigamespage/mini-games-selection.jsx'



export default function MiniGamesPage() {
    
    return (<>
    <div className='page-container'>
        <Header />
        <Heading text="Mini Games" />
        <MiniGamesSelection />
        <NavBar />
    </div>
    </>)
}