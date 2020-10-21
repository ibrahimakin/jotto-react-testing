import React, { Component } from 'react';
import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import './App.css';

class App extends Component {
  
  render(){
    return (
      <div className="container" data-test="component-app">
        <h1>Jotto</h1>
        <Congrats success={true}/>
        <GuessedWords guessedWords= {[
          {guessedWord:'train', letterMatchCount:3},
          {guessedWord:'train', letterMatchCount:1},
          {guessedWord:'train', letterMatchCount:5}
        ]}/>
      </div>
    );
  }
}

export default App;
