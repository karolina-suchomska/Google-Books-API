import React, { Component } from 'react';
import './Style.css';
import Heading from './Heading'
import Home from './Home'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Heading />
        <Home />
      </div>
    );
  }
}

export default App;
