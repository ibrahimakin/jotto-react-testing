import React from 'react';
import hookActions from './actions/hookActions';
import Input from './components/Input';

function reducer (state, action) {
    switch (action.type) {
        case "setSecretWord":
            return { ...state, secretWord: action.payload };

        default:
            throw new Error(`Invalid action type: ${action.type}`);
        //break;
    }
}

function App () {
    const [state, dispatch] = React.useReducer(
        reducer,
        { secretWord: null }
    );

    const setSecretWord = (secretWord) => {
        return dispatch({ type: "setSecretWord", payload: secretWord });
    };

    React.useEffect(() => {
        //setInterval(() => { 
        hookActions.getSecretWord(setSecretWord);
        //}, 1000);

    }, []);

    if (!state.secretWord) {
        return (
            <div className="container" data-test="spinner">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <p>Loading secret word</p>
            </div>
        );
    }

    return (
        <div className="container" data-test="component-app">
            <Input secretWord={state.secretWord} />
            <h3>{state.secretWord}</h3>
        </div>
    );
}

export default App;