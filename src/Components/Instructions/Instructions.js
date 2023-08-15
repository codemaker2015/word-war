import React from 'react'

export default function Instructions() {
  return (
    <div>
        <h2>Instructions:</h2><br/>    
        <p>Each player takes turns to reveal a letter from the grid.</p><br/>
        <p>When a player thinks they can make a word, they click on their designated player number, select their letters and submit the word.</p><br/>
        <p>Players can steal a word from the other player if they think they can make a better word out of it and the letters available by clicking on it and using the stolen letters in their new word.</p><br/>
        <p>The game is over when no more words can be created from the grid.</p><br/>
    </div>
  )
}
