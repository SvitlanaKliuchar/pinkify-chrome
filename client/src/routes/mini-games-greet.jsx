import Header from '../components/homepage/header.jsx'
import NavBar from '../components/homepage/nav-bar.jsx'
import Heading from '../components/mailpage/heading.jsx'
import MiniGamesGreet from '../components/minigamespage/mini-games-greet.jsx'



export default function MiniGamesGreetPage() {
    
    return (<>
    <div className='minigamesgreetpage-container'>
        <Header />
        <Heading text="Mini Games" />
        <MiniGamesGreet />
        <NavBar />
    </div>
    </>)
}