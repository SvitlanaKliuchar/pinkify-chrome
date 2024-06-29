import React from "react"
import Game2048 from "../components/minigamespage/2048/2048-game.jsx"
import Header from "../components/homepage/header.jsx"
import NavBar from "../components/homepage/nav-bar.jsx"


export default function TwoZeroFourEight(){
  return (
    <>
      <div className="game2048page-container">
        <Header />
        <Game2048 />

        <NavBar />

      </div>
    </>
  )
};

