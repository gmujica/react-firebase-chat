import React from 'react';
import { Route, Switch } from 'react-router-dom';
// COMPONENTS
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/chat';

const Routes = () => (
    <Switch>
        <Route exact path='/' component={Chat} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
    </Switch>
);

export default Routes;

