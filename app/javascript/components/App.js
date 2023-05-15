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

const baseUrl = 'https://pubsub.onrender.com'
// const baseUrl = 'https://localhost:3000'

const App = () => {

  const [subscribed, setSubscribed] = useState(false)

  const getStatus = async () => {
    axios
      .get(baseUrl + '/api/v1/status_subscription')
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
        .get(baseUrl + '/api/v1/delete_subscription')
        .then( resp => {
          if (resp.status === 200){
            setSubscribed(false)
          }
          console.log(resp)
        })
        .catch( resp => console.log(resp) )

    } else {
      axios
        .get(baseUrl + '/api/v1/create_subscription')
        .then( resp => {
          if (resp.status === 200){
            setSubscribed(true)
          }
          console.log(resp)
        })
        .catch( resp => console.log(resp) )
    }
  }

  useEffect(() => {
      getStatus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getStatus();
    }, 10000);
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