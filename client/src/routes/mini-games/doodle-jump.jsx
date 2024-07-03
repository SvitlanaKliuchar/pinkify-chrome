import React from "react"
import Header from '../../components/homepage/header.jsx'
import NavBar from '../../components/homepage/nav-bar.jsx'
import DoodleJumpGame from "../../components/minigamespage/doodle-jump/doodle-jump-game.jsx"


export default function DoodleJump() {
  return (
    <>
      <div className="page-container">
        <Header />
        <DoodleJumpGame />

        <NavBar />

      </div>
    </>
  )
};

