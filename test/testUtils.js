import checkPropTypes from 'check-prop-types';
import { createStore, CreateStore } from 'redux';
import rootReducer from '../src/reducers';

export const storeFactory = (initialState) => {
    return createStore(rootReducer, initialState);
};

export const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);    //takes css  or jquery style selector
};

export const checkProps = (component, confirmProps) => {
    const propError = checkPropTypes(component.propTypes, confirmProps, 'prop', component.name);
    //console.log(component.propTypes);
    //console.log(typeof (propError));
    expect(propError).toBeUndefined();
};