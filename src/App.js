import React, { Component } from 'react';
import './App.css';

import BoolCheck from "./components/BoolCheck";
import Footer from "./components/Footer";
import Header from "./components/Header";

class App extends Component {
  render() {
    return (
      <main className="App">
        <Header content="Bool Checker" subheader="Enter your bool expression and see what it evaluates to" />
        <div className="App-inner">
          <BoolCheck />
        </div>
        <Footer />
      </main>
    );
  }
}

export default App;
