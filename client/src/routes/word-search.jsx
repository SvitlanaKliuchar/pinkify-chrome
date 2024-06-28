import React from "react"
import WordSearchGame from "../components/minigamespage/word-search/word-search-game.jsx"
import Header from "../components/homepage/header.jsx"
import NavBar from "../components/homepage/nav-bar.jsx"

export default function WordSearch(){
  return (
    <>
      <div className="wordsearchpage-container">
        <Header />
        <WordSearchGame />

        <NavBar />

      </div>
    </>
  )
};

