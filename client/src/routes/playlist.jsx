import Header from "../components/homepage/header"
import Heading from "../components/mailpage/heading"
import NavBar from "../components/homepage/nav-bar"
import BuildPlaylist from "../components/homepage/build-playlist"

export default function Playlist() {

    return  (<>
    <div className="homepage-container">
        <Header />
        <Heading text="Build your playlist"/>
        <BuildPlaylist />
        <NavBar />
    </div>
    </>)
}