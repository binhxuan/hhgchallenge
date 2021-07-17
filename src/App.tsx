import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import Login from './Login/login'
import Container from './Container/container'
import 'rsuite/dist/styles/rsuite-default.css';

function App() {
  return (
    <div className="App">
      {/* <Login name='test'/> */}
      <Container />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
