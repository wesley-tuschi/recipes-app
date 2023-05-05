import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>

    </div>
  );
}

export default App;
