import React from "react"
import princess from '../../assets/mini-games/princess.webp'
import message from '../../assets/mini-games/message.webp'
import { Link } from "react-router-dom"

export default function MiniGamesGreet(){
  return (<>
    <div className="mini-games-greet">
        <img className="princess-img" src={princess} alt="princess" />
        <div className="princess-greeting">Ah, a traveler has arrived! I bid thee welcome to our realm of delightful mini games!</div>
        <img className="greeting-box" src={message} alt="a pixelated message box" />
        <div className="mini-games-link">
            <Link to='/mini-games'><button className="btn explore-btn">Explore</button></Link>
        </div>
    </div>
  </>)
};

