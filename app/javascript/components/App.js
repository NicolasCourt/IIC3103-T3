import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Data from './Data';
import Content from "../utils/content";
import axios from 'axios'

const App = () => {

  const [subscribed, setSubscribed] = useState(false)

  const getStatus = async () => {
    axios
      .get('/api/v1/status_subscription')
      .then( resp => {
        if (resp.data.subscription === 'active'){
          setSubscribed(true)
        } else {
          setSubscribed(false)
        }
       })
      .catch( resp => console.log(resp) )
  }

  const subEvent = () => {
    if (subscribed){
      axios
        .get('/api/v1/delete_subscription')
        .then( resp => {
          console.log(resp)
        })
        .catch( resp => console.log(resp) )

    } else {
      axios
        .get('/api/v1/create_subscription')
        .then( resp => {
          console.log(resp)
        })
        .catch( resp => console.log(resp) )
    }
    getStatus();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getStatus();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Content subscribed={subscribed} subEvent={subEvent}>
        <Switch>
          <Route exact path="/" component={Data}/>
          <Redirect to="/" />
        </Switch>
      </Content>
    </Router>
  )
}

export default App