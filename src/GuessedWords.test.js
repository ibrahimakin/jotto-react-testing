import { EnzymeAdapter } from 'enzyme';
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkProps } from '../test/testUtils';
import GuessedWords from './GuessedWords';

const defaultProps = {
    guessedWords: [{ guessedWord: 'train', letterMatchCount: 3 }],
};

const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props }
    return (shallow(<GuessedWords {...setupProps} />));
};

test('does not throw warning with expected props', () => {
    checkProps(GuessedWords, defaultProps);
});