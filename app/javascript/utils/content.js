
import React from "react";

import { makeStyles } from '@mui/styles';

import Topbar from "./topbar";
import { useStyles } from './styles';

const Content = (props) => {

  const {
    subscribed,
    subEvent
  } = props
  
  const classes = useStyles()


  return (
    <div className={classes.mainContainer}>
      <Topbar subscribed={subscribed} subEvent={subEvent}/>
      <div className={classes.childrenContainerTwo}>
        <div className={classes.container}>
          <div className={classes.subContainer}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content;
