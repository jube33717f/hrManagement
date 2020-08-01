import React from 'react';
import './App.scss'
import Auth from './pages/auth/auth'
import ChangePassword from './pages/auth/changePassword'
import Home from './pages/home/home'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";


function App() {
  return (<>  
    <Router>     
        <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/login" component={Auth}></Route>
            <Route path="/changePassword" component={ChangePassword}></Route>
            <Route path="/home" component={Home}></Route>
        </Switch>           
    </Router></>
  );
}

export default App;
