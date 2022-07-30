import React from 'react';
import './App.css';
import './styles/Login.scss';
import './styles/Header.scss';
import './styles/Footer.scss';
import './styles/Recipes.scss';
import './styles/Profile.scss';
import './styles/DoneRecipes.scss';
import './styles/RecipeDetails.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import DrinkDetails from './pages/DrinkDetails';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Recipes } />
      <Route
        path="/foods/:id/in-progress"
        render={ (props) => <RecipeInProgress props={ props } title="Foods" /> }
      />
      <Route path="/foods/:id" component={ RecipeDetails } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route
        path="/drinks/:id/in-progress"
        render={ (props) => <RecipeInProgress props={ props } title="Drinks" /> }
      />
      <Route path="/drinks/:id" component={ DrinkDetails } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
