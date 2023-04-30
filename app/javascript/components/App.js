import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Subscription from '../components/Subscriptions';
import Content from "../utils/content";

const App = () => {

  const [subscribed, setSubscribed] = useState(false)

  return (
    <Router>
      <Content>
        <Switch>
          <Route exact path="/" component={Subscription}/>
        </Switch>
      </Content>
    </Router>
  )
}

export default App