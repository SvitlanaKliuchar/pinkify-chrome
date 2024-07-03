import Header from "../components/homepage/header"
import NavBar from "../components/homepage/nav-bar"
import SendDrawing from "../components/senddrawingpage/send-drawing"
import Heading from "../components/mailpage/heading.jsx"

export default function SendDrawingPage() {

    return  (<>
    <div className="page-container">
        <Header />
        <Heading text="Make somebody happy by sending them a drawing" />
        <SendDrawing />
        <NavBar />
    </div>
    </>)
}