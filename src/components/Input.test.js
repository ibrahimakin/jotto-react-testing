import React from 'react';
import { shallow } from 'enzyme';
import Input from './Input';
import { findByTestAttr } from '../../test/testUtils';

const setup = () => {
    return shallow(<Input />);
};

test('should ', () => {
    const wrapper = setup();
    const input = findByTestAttr(wrapper, "component-input");
    expect(input.length).toBe(1);
});
