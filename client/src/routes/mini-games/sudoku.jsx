import React from "react"
import SudokuGame from "../../components/minigamespage/sudoku/sudoku-game.jsx"
import Header from "../../components/homepage/header.jsx"
import NavBar from "../../components/homepage/nav-bar.jsx"


export default function Sudoku(){
  return (
    <>
      <div className="page-container">
        <Header />
        <SudokuGame />

        <NavBar />

      </div>
    </>
  )
};

