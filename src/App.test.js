import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import App from './App';
import hookActions from './actions/hookActions';

const mockGetSecretWord = jest.fn();

const setup = (secretWord = "party") => {
    mockGetSecretWord.mockClear();
    hookActions.getSecretWord = mockGetSecretWord;

    const mockUseReducer = jest.fn().mockReturnValue([
        { secretWord, language: 'en' },
        jest.fn()
    ]);

    React.useReducer = mockUseReducer;

    // use mount because use effect not called on shallow
    //  https://github.com/airbnb/enzyme/issues/2086
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
    });
    test('secret word does not update on App update', () => {
        const wrapper = setup();

        // useEffect runs when we mount the app, clear it
        mockGetSecretWord.mockClear();


        wrapper.setProps();
        expect(mockGetSecretWord).not.toHaveBeenCalled();
    });

});

describe('secretWord is not null', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = setup("party");
    });

    test('renders app when is not null', () => {
        const appComponent = findByTestAttr(wrapper, "component-app");
        expect(appComponent.exists()).toBe(true);
    });
    test('does not render spinner when secretWord is not null', () => {
        const spinnerComponent = findByTestAttr(wrapper, "spinner");
        expect(spinnerComponent.exists()).toBe(false);
    });

});

describe('secretWord is null', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = setup(null);
    });

    test('does not renders app when secretWord is null', () => {
        const appComponent = findByTestAttr(wrapper, "component-app");
        expect(appComponent.exists()).toBe(false);
    });
    test('render spinner when secretWord is null', () => {
        const spinnerComponent = findByTestAttr(wrapper, "spinner");
        expect(spinnerComponent.exists()).toBe(true);
    });

});
