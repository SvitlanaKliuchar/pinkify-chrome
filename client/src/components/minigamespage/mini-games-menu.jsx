import React from "react"
import princess from '../../assets/mini-games/princess.webp'
import message from '../../assets/mini-games/message.webp'

import catMilk from '../../assets/mini-games/cat-with-milk.webp'
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
            <div className="word-search"><Link to='/word-search'><img src={catMilk} alt="word search icon" /></Link></div>
            <div className="sudoku"><Link to='/sudoku'><img src={catMilk} alt="sudoku icon" /></Link></div>
            <div className="game2048"><Link to='/2048'><img src={catMilk} alt="2048 icon" /></Link></div>
        </div>
    </div>
  </>)
};

