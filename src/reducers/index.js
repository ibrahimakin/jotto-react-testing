import { combineReducers } from 'redux';
import success from './successReducers';
import guessedWords from './guessedWordsReducers';

export default combineReducers({
    success,
    guessedWords
});