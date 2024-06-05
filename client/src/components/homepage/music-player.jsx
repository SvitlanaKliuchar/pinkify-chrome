import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';



export default function MusicPlayer() {
    return (<>
    <div className="music-player">
        <button className="btn mp-btn prev"> <FaStepBackward /> </button>
        <button className="btn mp-btn play"> <FaPlay /> </button>
        <button className="btn mp-btn next"> <FaStepForward />  </button>
    </div>
    </>)
}