import {useState} from 'react'
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';



export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false) //by default we set isPlaying boolean variable to false

    const handlePlay = () => {
        if (!isPlaying) {
            setIsPlaying(true)
            console.log("isPlaying was FALSE, now is true")
        } else {
            setIsPlaying(false)
            console.log("isPlaying was TRUE, now is false")
        }
    }
    const handlePrev = () => {
        //need to get the array of songss.. particular songs id... and then minus 1 index in the array

        //store all your songs in an array
    }


    return (<>
    <div className="music-player">
        <button className="btn mp-btn prev"> <FaStepBackward /> </button>
        <button className="btn mp-btn play" onClick={handlePlay}> <FaPlay /> </button>
        <button className="btn mp-btn next"> <FaStepForward />  </button>
    </div>
    </>)
}