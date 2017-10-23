import React, { Component } from 'react';
import './App.css';

import BoolCheck from "./components/BoolCheck";
import Header from "./components/Header";

class App extends Component {
  render() {
    return (
      <main className="App">
        <Header content="Bool Checker" subheader="Enter your bool expression and see what it evaluates to" />
        <BoolCheck />
      </main>
    );
  }
}

export default App;
