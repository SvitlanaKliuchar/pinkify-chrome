import React from "react"
import Header from '../components/homepage/header.jsx'
import NavBar from '../components/homepage/nav-bar.jsx'
import Heading from '../components/mailpage/heading.jsx'
import DoodleJumpGame from "../components/minigamespage/doodle-jump/doodle-jump-game.jsx"

export default function DoodleJump(){
  return (
    <>
      <div className="doodlejumppage-container">
        <Header />
        <DoodleJumpGame />

        <NavBar />

      </div>
    </>
  )
};

