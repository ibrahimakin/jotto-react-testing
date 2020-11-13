import React from 'react';
import { shallow, mount } from 'enzyme';
import Input from './Input';
import languageContext from '../contexts/languageContext';
import successContext from '../contexts/successContext';
import { checkProps, findByTestAttr } from '../../test/testUtils';

const setup = ({ language, secretWord, success }) => {
    //return shallow(<Input secretWord={secretWord} />);
    language = language || "en";
    secretWord = secretWord || "party";
    success = success || false;

    return mount(
        <languageContext.Provider value={language} >
            <successContext.SuccessProvider value={[success, jest.fn()]}>
                <Input secretWord={secretWord} />
            </successContext.SuccessProvider>
        </languageContext.Provider>
    );
};

describe('Input placeholder language', () => {
    test('correctly renders placeholder string in english', () => {
        const wrapper = setup({ language: "en" });
        const input = findByTestAttr(wrapper, 'input-box');
        expect(input.props().placeholder).toBe('enter guess');
    });
    test('correctly renders placeholder string in emoji', () => {
        const wrapper = setup({ language: "emoji" });
        const input = findByTestAttr(wrapper, 'input-box');
        expect(input.props().placeholder).toBe('⌨️🤔');
    });
});

describe('Submit button language', () => {
    test('correctly renders submit button string in english', () => {
        const wrapper = setup({ language: "en" });
        const button = findByTestAttr(wrapper, 'submit-button');
        expect(button.text()).toBe('Submit');
    });
    test('correctly renders submit button string in emoji', () => {
        const wrapper = setup({ language: "emoji" });
        const button = findByTestAttr(wrapper, 'submit-button');
        expect(button.text()).toBe('🚀');
    });

});



test('Input renders without error ', () => {
    const wrapper = setup({});
    const input = findByTestAttr(wrapper, "component-input");
    expect(input.length).toBe(1);
});

test('does not throw warning with expected props', () => {
    checkProps(Input, { secretWord: 'party' });
});

describe('state controlled input field', () => {
    let mockSetCurrentGuess = jest.fn();
    let wrapper;
    beforeEach(() => {
        mockSetCurrentGuess.mockClear();
        React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

        wrapper = setup({});
    });
    test('state updates with value of input box upon change', () => {


        const inputBox = findByTestAttr(wrapper, 'input-box');

        const mockEvent = { target: { value: 'train' } };
        inputBox.simulate("change", mockEvent);
        //console.log(mockSetCurrentGuess);

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
    });

    test('field is cleared upon submit button click', () => {


        const submitButton = findByTestAttr(wrapper, 'submit-button');

        submitButton.simulate('click', { preventDefault () { } });
        expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
    });


});

test('Input component does not show when success is true', () => {
    const wrapper = setup({ secretWord: 'party', success: true });
    expect(wrapper.isEmptyRender()).toBe(true);
});