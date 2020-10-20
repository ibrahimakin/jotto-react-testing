import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter });

/**
 * @function setup
 * @returns {ShallowWrapper}"
 */

const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test('renders learn react link', () => {
  const wrapper = setup();
  // console.log(wrapper.debug());
  //  expect(wrapper).toBeFalsy();
  // const { getByText } = render(<App />);
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  const appComponent = findByTestAttr(wrapper, "component-app"); // use for any component
  expect(appComponent.length).toBe(1);
});

test('renders button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button'); // use for any component
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');// use for any component
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});

test('click the button increments counter display', () => {
  const wrapper = setup();
  // find the button
  const button = findByTestAttr(wrapper, "increment-button");

  // click the button
  button.simulate('click');

  // find the display, and that number has been incremented
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
});


// my solution
/*test('click the button decrements counter display', () => {
  const wrapper = setup();

  //find the button
  const button = findByTestAttr(wrapper, "decrement-button");

  const countDefault = findByTestAttr(wrapper, "count").text();
  let expectedValue = 0;
  if (countDefault > 0) {
    expectedValue = countDefault - 1;
  }
  // click the button
  button.simulate('click');

  // find the display, and that number has been decremented
  const count = findByTestAttr(wrapper, "count").text();

  expect(count).toBe("" + expectedValue);
});*/
describe('decrement button', () => {
  test('renders decrement button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'decrement-button');
    expect(button.length).toBe(1);
  });

  test('clicking decrement button decrements counter display when state is greater than 0', () => {
    const wrapper = setup();

    // click the increment button so that the counter is greater than 0
    const incButton = findByTestAttr(wrapper, 'increment-button');
    incButton.simulate('click');

    // find decrement button and click
    const decButton = findByTestAttr(wrapper, 'decrement-button');
    decButton.simulate('click');

    // find display and test value
    const count = findByTestAttr(wrapper, 'count').text();
    expect(count).toBe("0");
  });
});
describe('error when counter goes below 0', () => {
  test('error does not show when not needed', () => {
    // I plan to implement this by using a "hidden" class for the error div
    // I plan to use the data-test value 'error-message' for the error div
    const wrapper = setup();
    const errorDiv = findByTestAttr(wrapper, 'error-message');

    // using enzyme's ".hasClass()" method
    // http://airbnb.io/enzyme/docs/api/ShallowWrapper/hasClass.html
    const errorHasHiddenClass = errorDiv.hasClass('hidden');
    console.log(wrapper.debug());
    expect(errorHasHiddenClass).toBe(true);
  });

  describe('counter is 0 and decrement is clicked', () => {
    // using a describe here so I can use a "beforeEach" for shared setup

    // scoping wrapper to the describe, so it can be used in beforeEach and the tests
    let wrapper
    beforeEach(() => {
      // no need to set counter value here; default value of 0 is good
      wrapper = setup();

      // find button and click
      const button = findByTestAttr(wrapper, 'decrement-button');
      button.simulate('click');
    });
    test('error shows', () => {
      // check the class of the error message
      const errorDiv = findByTestAttr(wrapper, 'error-message');
      const errorHasHiddenClass = errorDiv.hasClass('hidden');
      expect(errorHasHiddenClass).toBe(false);
    });
    test('counter still displays 0', () => {
      const count = findByTestAttr(wrapper, 'count').text();
      expect(count).toBe("0");
    });
    test('clicking increment clears the error', () => {
      // find and click the increment button
      const incButton = findByTestAttr(wrapper, 'increment-button');
      incButton.simulate('click');

      // check the class of the error message
      const errorDiv = findByTestAttr(wrapper, 'error-message');
      const errorHasHiddenClass = errorDiv.hasClass('hidden');
      expect(errorHasHiddenClass).toBe(true);
    });
  });
});