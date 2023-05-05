import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/recipes" component={ Recipes } />
      </Switch>
      <Footer />

    </div>
  );
}

export default App;
