import React from 'react';
import { shallow, mount } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';
import Congrats from './Congrats';
import languageContext from './contexts/languageContext';


const defaultProps = { success: false };

const setup = ({ success, language }) => {
    // const setupProps = { ...defaultProps, ...props };
    // return shallow(<Congrats {...setupProps} />);
    language = language || 'en';
    success = success || false;
    return mount(
        <languageContext.Provider value={language}>
            <Congrats success={success} />
        </languageContext.Provider>
    );
};

describe('languagePicker', () => {
    test('correctly renders congrats string in english', () => {
        const wrapper = setup({ success: true });
        expect(wrapper.text()).toBe("Congratulations! You guessed the word!");
    });
    test('correctly renders congrats string in emoji', () => {
        const wrapper = setup({ success: true, language: 'emoji' });
        expect(wrapper.text()).toBe("🎯🎉");
    });

});


test('renders without error', () => {
    const wrapper = setup({});
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.length).toBe(1);
});
test('renders no text when `success` props is false', () => {
    const wrapper = setup({ success: false });
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.text()).toBe('');
});

test('renders non-empty congarts message when `success` props is true', () => {
    const wrapper = setup({ success: true });
    const message = findByTestAttr(wrapper, 'congrats-message');
    expect(message.text().length).not.toBe(0);
});

test('does not throw warning with expected props', () => {
    const expectedProps = { success: false };
    checkProps(Congrats, expectedProps);
});