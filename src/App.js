import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import RecipeInProgress from './components/RecipeInProgress';
import RecipesDetails from './pages/RecipeDetails';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import SearchProvider from './context/SearchProvider';

function App() {
  return (
    <div className="app">
      <SearchProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />
          <Route exact path="/recipes" component={ Recipes } />
          <Route exact path="/meals" component={ Recipes } />
          <Route exact path="/drinks" component={ Recipes } />
          <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/meals/:id" component={ RecipesDetails } />
          <Route exact path="/drinks/:id" component={ RecipesDetails } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        </Switch>
      </SearchProvider>
    </div>
  );
}

export default App;
