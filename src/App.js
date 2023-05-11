import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
// import Header from './components/Header';
import Profile from './pages/Profile';
import RecipeInProgress from './components/RecipeInProgress';

function App() {
  return (
    <div className="app">
      {/* <Header /> */}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/recipes" component={ Recipes } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/profile" component={ Profile } />
      </Switch>

    </div>
  );
}

export default App;
