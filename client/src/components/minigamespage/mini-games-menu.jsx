import React from "react"
import princess from '../../assets/mini-games/princess.webp'
import message from '../../assets/mini-games/message.webp'
import whiteCat from '../../assets/mini-games/white-cat.webp'
import unicorn from '../../assets/mini-games/unicorn.webp'
import catMilk from '../../assets/mini-games/cat-with-milk.webp'
import snake from '../../assets/mini-games/snake.webp'
import owl from '../../assets/mini-games/owl.webp'
import {Link} from 'react-router-dom'

export default function MiniGamesMenu(){
  return (<>
    <div className="mini-games-grid">
        <img className="princess-img" src={princess} alt="princess" />
        <div className="princess-greeting">Ah, a traveler has arrived! I bid thee welcome to our realm of delightful mini games!</div>
        <img className="greeting-box" src={message} alt="a pixelated message box" />
        <div className="mini-games">
            <div className="doodle-jump"><Link to='/doodle-jump'><img src={owl} alt="owl icon" /></Link></div>
            <div className="game2"><img src={snake} alt="" /></div>
            <div className="cards"><img src={catMilk} alt="" /></div>
        </div>
    </div>
  </>)
};

