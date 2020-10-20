export const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);    //takes css  or jquery style selector
}