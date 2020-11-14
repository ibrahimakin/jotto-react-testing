import { EnzymeAdapter, ShallowWrapper } from 'enzyme';
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, /*checkProps*/ } from '../test/testUtils';
import GuessedWords from './GuessedWords';

import guessedWordsContext from './contexts/guessedWordsContext';

// const defaultProps = {
//     guessedWords: [{ guessedWord: 'train', letterMatchCount: 3 }],
// };

/**
 * @funtion setup
 * @param {Array} guessedWords - guessedWords value specific to this setup
 * @returns {ShallowWrapper}
 */

const setup = (guessedWords = []) => {
    //const setupProps = { ...defaultProps, ...props };
    const mockUseGuessedWords = jest.fn().mockReturnValue([guessedWords, jest.fn()]);
    guessedWordsContext.useGuessedWords = mockUseGuessedWords;
    return (shallow(<GuessedWords />));
};

// test('does not throw warning with expected props', () => {
//     checkProps(GuessedWords, defaultProps);
// });

describe('if there are no words guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup([]);
    });
    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });
    test('renders instruction to guess a word', () => {
        const instructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(instructions.text().length).not.toBe(0);
    });
});

describe('if there are words guessed', () => {
    let wrapper;
    const guessedWords = [
        { guessedWord: 'train', letterMatchCount: 3 },
        { guessedWord: 'party', letterMatchCount: 1 },
        { guessedWord: 'agile', letterMatchCount: 5 },
    ];
    beforeEach(() => {
        //console.log(guessedWords);
        wrapper = setup(guessedWords);
    });
    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });
    test('renders "guessed words" section', () => {
        const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
        expect(guessedWordsNode.length).toBe(1);
    });
    test('correct number of guessed words', () => {
        const guessedWordsNodes = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsNodes.length).toBe(guessedWords.length);
    });
});

describe('language Picker', () => {
    test("correctly renders guess instructions string in English by default", () => {
        const wrapper = setup([]);
        const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(guessInstructions.text()).toBe('Try to guess the secret word!');
    });
    test('correctly renders guess instructions string in emoji', () => {
        const mockUseContext = jest.fn().mockReturnValue('emoji');
        React.useContext = mockUseContext;
        const wrapper = setup([]);
        const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(guessInstructions.text()).toBe('🤔🤫🔤');
    });

});
