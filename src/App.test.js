// import puppeteer from 'puppeteer';
import React from 'react';
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from './App';


beforeEach(() => {
    render(<App />);
})

//cleanup happens automatically

describe('App', () => {
    test('Game renders correctly', () => {
        const playerOne = screen.getByText('Player One');
        const playerTwo = screen.getByText('Player Two');
        const submit = screen.getByText('Submit');
        const clear = screen.getByText('Clear');
        const grid = screen.getByTestId('letter-grid');
        const letterA = screen.getAllByTestId('a')[0];
        expect(playerOne).toBeInTheDocument();
        expect(playerTwo).toBeInTheDocument();
        expect(submit).toBeInTheDocument();
        expect(clear).toBeInTheDocument();
        expect(grid).toBeInTheDocument();
        expect(letterA).toBeInTheDocument();
    });
});

describe('Letter', () => {
    test('Player can click on a letter and it gets "revealed" class', () => {
        const letterA = screen.getAllByTestId('a');
        const firstLetterA = letterA[0]
        userEvent.click(firstLetterA);
        expect(firstLetterA).toHaveClass('letter revealed');
    });

    test('When a player clicks on a letter, it appears in active word', () => {
        const letterA = screen.getAllByTestId('a');
        const firstLetterA = letterA[0];
        //first click to reveal letter
        userEvent.click(firstLetterA);
        //second click to select letter
        userEvent.click(firstLetterA);
        const word = screen.getByTestId('word');
        expect(word).toHaveTextContent('a');
    })

    test('Player can clear the letter', () => {
        const letterA = screen.getAllByTestId('a');
        const firstLetterA = letterA[0];
        //first click to reveal letter
        userEvent.click(firstLetterA);
        //second click to select letter
        userEvent.click(firstLetterA);
        const word = screen.getByTestId('word');
        expect(word).toHaveTextContent('a');
        const clearBtn = screen.getByText('Clear');
        userEvent.click(clearBtn);
        expect(word).toHaveTextContent('');
    })
})


describe('Player', () => {
    test('Player One is rendered with "active" class', async () => {
        //test player one is active from start
        const playerOne = screen.getByTestId('Player One');
        expect(playerOne).toHaveClass('player-flex active');
    });

    test('Player Two class changes to "active" when clicked, Player One changes to "inactive"', () => {
        const playerOne = screen.getByTestId('Player One');
        const playerTwo = screen.getByTestId('Player Two');
        userEvent.click(playerTwo);
        expect(playerTwo).toHaveClass('player-flex active');
        expect(playerOne).toHaveClass('player-flex inactive');
    })

    test('Player One can submit a word', async () => {
        //first click reveal
        userEvent.click(screen.getAllByText('a')[0]);
        userEvent.click(screen.getAllByText('t')[0]);
        //second click select
        userEvent.click(screen.getAllByText('a')[0]);
        userEvent.click(screen.getAllByText('t')[0]);
        // submit
        userEvent.click(screen.getByText('Submit'));
        //wait for api to check word - default timeout for findBy* is 1000ms
        const submittedWord = await screen.findByTestId('at', {}, { timeout: 2000});
        expect(submittedWord).toBeInTheDocument();
        
    });

    test('Player Two can create a word after Player One', async () => {
        userEvent.click(screen.getByText('Player Two'));
        //first click reveal
        userEvent.click(screen.getAllByText('s')[0]);
        userEvent.click(screen.getAllByText('o')[0]);
        //second click select
        userEvent.click(screen.getAllByText('s')[0]);
        userEvent.click(screen.getAllByText('o')[0]);
        // submit
        userEvent.click(screen.getByText('Submit'));
        //wait for api call for word - default timeout for findBy* is 1000ms
        const submittedWord = await screen.findByTestId('so', {}, { timeout: 2000});
        expect(submittedWord).toBeInTheDocument();  
    }) 
})   

describe('Word Steal', () => {
    test('Player Two can "steal" a word from Player One', async () => {
        const letterS = screen.getAllByText('s')[0];
        const letterO = screen.getAllByText('o')[0];
        // first click reveal - Player One
        userEvent.click(letterS);
        userEvent.click(letterO);
        //second click select - Player One
        userEvent.click(letterS);
        userEvent.click(letterO);
        // submit - Player One
        userEvent.click(screen.getByText('Submit'));
        //wait for api call for word - default timeout for findBy* is 1000ms
        const submittedWord = await screen.findByTestId('so', {}, { timeout: 2000});
        expect(submittedWord).toBeInTheDocument();

        //click Player Two header to make active
        userEvent.click(screen.getByText('Player Two'));

        const letterA = screen.getAllByText('a')[0];
        const letterP = screen.getAllByText('p')[0];
        //first click reveal - Player Two
        userEvent.click(letterA);
        userEvent.click(letterP);

        //click word 'so' in Player One list - returns letters to grid
        userEvent.click(submittedWord);

        //player two clicks S and O from returned letters and O and P.
        userEvent.click(letterS);
        userEvent.click(letterO);
        userEvent.click(letterA);
        userEvent.click(letterP);
        //submit - Player Two
        userEvent.click(screen.getByText('Submit'));
        const stolenWord = await screen.findByTestId('soap', {}, { timeout: 2000});
        expect(stolenWord).toBeInTheDocument();
    })
})





    

