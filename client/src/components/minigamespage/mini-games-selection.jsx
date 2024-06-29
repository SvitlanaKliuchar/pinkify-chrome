import React from "react"

import catMilk from '../../assets/mini-games/cat-with-milk.webp'
import owl from '../../assets/mini-games/owl.webp'

import {Link} from 'react-router-dom'

export default function MiniGamesSelection(){
  return (<>
    <div className="mini-games-selection">
        <Link to='/doodle-jump'><div className="mini-game doodle-jump">Doodle Jump</div></Link>
        <Link to='/word-search'><div className="mini-game word-search">Word Search</div></Link>
        <Link to='/sudoku'><div className="mini-game sudoku">Sudoku</div></Link>
        <Link to='/2048'><div className="mini-game game2048">2048</div></Link>
    </div>
  </>)
};

