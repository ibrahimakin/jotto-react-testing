import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import App from './App';
import hookActions from './actions/hookActions';

const mockGetSecretWord = jest.fn();

const setup = () => {
    mockGetSecretWord.mockClear();
    hookActions.getSecretWord = mockGetSecretWord;

    // use mount because use effect not called on shallow
    //  
    return mount(<App />);
};

test('App renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-app');
    expect(component.length).toBe(1);
});

describe('getSecretWord calls', () => {
    test('getSecretWord gets called on App mount', () => {
        setup();

        // check to see if secret word was updated
        expect(mockGetSecretWord).toHaveBeenCalled();
    })

})
