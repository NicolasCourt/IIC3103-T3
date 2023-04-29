import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Home from '../components/Home'

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
      </Switch>
    </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})