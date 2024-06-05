import {useState, useRef} from 'react'
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa'
import axios from 'axios'



export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false) //by default we set isPlaying boolean variable to false
    const [currentSong, setCurrentSong] = useState('')
    const audioRef = useRef(new Audio())
    const BASE_URL = 'http://localhost:3000'


   
    const handlePlay = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/play`);
            const newSongFilename = res.data.filename;
            setCurrentSong(newSongFilename);
            setIsPlaying(true);
            audioRef.current.src = `${BASE_URL}/songs/${newSongFilename}`;
            audioRef.current.play();
           
        } catch (error) {
            console.log("Error fetching or playing a song: ", error);
        }
    }
    
    const handlePrev = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/prev`);
            const newSongFilename = res.data.filename;
            setCurrentSong(newSongFilename);
            setIsPlaying(true);
            audioRef.current.src = `${BASE_URL}/songs/${newSongFilename}`;
            audioRef.current.play();
        } catch (error) {
            console.log("Error fetching or playing previous song");
        }
    }
    const handleNext = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/next`);
            const newSongFilename = res.data.filename;
            setCurrentSong(newSongFilename);
            setIsPlaying(true);
            audioRef.current.src = `${BASE_URL}/songs/${newSongFilename}`;
            audioRef.current.play();
        } catch (error) {
            console.log("Error fetching or playing next song");
        }
    }
    

    return (<>
    <div className="music-player">
        <button className="btn mp-btn prev" onClick={handlePrev}> <FaStepBackward /> </button>
        <button className="btn mp-btn play" onClick={handlePlay}> <FaPlay /> </button>
        <button className="btn mp-btn next" onClick={handleNext}> <FaStepForward />  </button>
    </div>
    </>)
}