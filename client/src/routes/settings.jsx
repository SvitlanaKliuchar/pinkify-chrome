import Header from "../components/homepage/header"
import Heading from "../components/mailpage/heading"
import NavBar from "../components/homepage/nav-bar"
import Settings from "../components/settingspage/settings"

export default function SettingsPage() {

    return  (<>
    <div className="page-container">
        <Header />
        <Heading text="Settings"/>
        <Settings />
        <NavBar />
    </div>
    </>)
}