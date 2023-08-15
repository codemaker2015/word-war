import React from "react";

const Word = (props) => {
    
    return (
        <li key={props.id} data-testid={props.word} data-word={props.word} onClick={() => props.onClickHandler(props.letters, props.word)}>{props.word}</li>
    )
}

export default Word;