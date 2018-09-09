import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import NameChecker from './components/NameChecker';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" style={{backgroundColor : 'white'}}>
          <img src={logo} style={{ width: '386px', float: 'left'}} alt="logo" />
        </header>
        <NameChecker />
      </div>
    );
  }
}

export default App;
