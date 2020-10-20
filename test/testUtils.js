import checkPropTypes from 'check-prop-types';

export const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);    //takes css  or jquery style selector
}

export const checkProps = (component, confirmProps) => {
    const propError = checkPropTypes(component.propTypes, confirmProps, 'prop', component.name);
    console.log(component.propTypes);
    console.log(typeof (propError));
    expect(propError).toBeUndefined();
}