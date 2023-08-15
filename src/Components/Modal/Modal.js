import React from 'react'

export default function Modal({ content, onClickHandler }) {
    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className='close' onClick={() => onClickHandler(false)}>+</div>
                {content}
                <button onClick={() => onClickHandler(false)}>OK</button>
            </div>
        </div>
    )
}