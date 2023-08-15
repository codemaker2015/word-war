import React from "react";
import { useState, useEffect } from "react";
import ActiveWord from "../ActiveWord/ActiveWord";
import Letter from "../Letter/Letter";
import { nanoid } from 'nanoid'

const LetterGrid = () => {
    const [letters, setLetters] = useState([]);
    const [selectedLetters, setSelectedLetters] = useState([]);

    const generateGrid = () => {
        const letterArray = [];
        const extraLetters = [10, 12, 14, 18, 21, 23, 24, 27, 28, 29, 30];

        for (let j = 0; j < 3; j++) {
            for (let i = 10; i < 36; i++) {
                letterArray.push(i.toString(36))
                if (extraLetters.some(el => el === i && j > 0)) {
                    letterArray.push(i.toString(36))
                }
            }
        }
        letterArray.forEach((letter, ind, arr) => arr.splice(ind, 1, { id: nanoid(), letter: letter }));
        letterArray.sort(function () {
            return 0.5 - Math.random()
        });

        setLetters(letterArray);
    };

    useEffect(() => {
        generateGrid();
    }, []);




    return (
        <div id='game-container'>
            <ActiveWord selectedLetters={selectedLetters} setSelectedLetters={setSelectedLetters} />
            <div id='letter-grid' data-testid='letter-grid'>
                {letters.map(letter => {
                    return <Letter selectedLetters={selectedLetters} setSelectedLetters={setSelectedLetters} key={letter.id} id={letter.id} value={letter.letter} />
                })}
            </div>
        </div>

    )
}

export default LetterGrid;