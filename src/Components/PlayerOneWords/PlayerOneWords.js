import React from "react";
import Word from "../Word/Word";

const PlayerOneWords = (props) => {

    const onClickHandler = (letters, word) => {
        
        let grid = document.getElementById('letter-grid');
        let letterIds = letters.map(el => el.id);
        let submittedLetters = Array.from(grid.querySelectorAll('div.submitted'));

        submittedLetters.forEach(letter => {
            if (letterIds.includes(letter.dataset.id)) {
                letter.className = 'letter stolen';
            } 
        });

        props.setWords(prev => {
            return prev.filter(el => el.word !== word)
        })  
    }

    return (
        <div id='playerOne' className='player'>
            <div data-testid='Player One' className={props.isTurn? 'player-flex active' : 'player-flex inactive'} onClick={() => props.changePlayer('Player1')}>
                <h1>Player One</h1>
                <p className='score'>{props.words.length}</p>
                <p>{props.isTurn ? 'active': 'click for turn'}</p>
            </div>
            <ul>
            {props.words.map(word => {
                return (
                    <Word key={word.id} id={word.id} word={word.word} letters={word.letters} onClickHandler={onClickHandler} />    
                )
            })}
            </ul>
        </div>  
    )
}

export default PlayerOneWords;