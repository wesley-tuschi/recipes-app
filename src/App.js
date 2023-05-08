import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/recipes" component={ Recipes } />
        <Route exact path="/profile" component={ Profile } />
      </Switch>
    </div>
  );
}

export default App;
