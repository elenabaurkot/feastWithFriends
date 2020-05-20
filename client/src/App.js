import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import CreateRecipe from './components/profile-forms/CreateRecipe';
import Profiles from './components/profiles/Profiles';
import Recipes from './components/recipes/Recipes';
import PrivateRoute from './components/routing/PrivateRoute';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () =>  {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
  <Provider store={store}>
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/recipes" component={Recipes} />
          <PrivateRoute exact path="/profiles" component={Profiles} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/create-profile" component={CreateProfile} />
          <PrivateRoute exact path="/create-recipe" component={CreateRecipe} />
        </Switch>
    </Fragment>
  </Router>
  </Provider>
)};

export default App;
