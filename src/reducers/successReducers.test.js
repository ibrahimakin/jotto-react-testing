import { actionTypes } from '../actions';
import successReducers from './successReducers';

test('returns default state of `false` when no action is passed', () => {
    const newState = successReducers(undefined, {});
    expect(newState).toBe(false);
});

test('returns state of true upon receiving an action of type `CORRECT_GUESS`', () => {
    const newState = successReducers(undefined, { type: actionTypes.CORRECT_GUESS });
    expect(newState).toBe(true);
});
