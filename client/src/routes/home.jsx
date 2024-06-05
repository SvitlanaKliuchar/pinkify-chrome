import Header from "../components/homepage/header"
import Quote from "../components/homepage/quote"
import MusicPlayer from "../components/homepage/music-player"
import SendNote from "../components/homepage/send-note"
import NavBar from "../components/homepage/nav-bar"

export default function HomePage() {

    return  (<>
    <div className="homepage-container">
        <Header />
        <Quote />
        <MusicPlayer />
        <SendNote />
        <NavBar />
    </div>
    </>)
}