/* Ayuda de https://mui.com/material-ui/react-app-bar/ */

import React from 'react'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { makeStyles } from '@material-ui/styles';
import Switch from '@mui/material/Switch';
import { useStyles } from './styles';

const Topbar = (props) => {

  const {
    subscribed,
    subEvent
  } = props

  const classes = useStyles()

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className={classes.horizontal}>
            <PublishedWithChangesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Box
              className={classes.brand}
              sx={{ display: { xs: 'none', md: 'flex' }}}
            >
              SubPub
            </Box>
          </div>
          <div className={classes.horizontal}>
            <Switch
              checked={subscribed}
              onChange={subEvent}
              inputProps={{ 'aria-label': 'controlled' }}
              color="secondary"
            />
            <h3>Subscribed?</h3>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Topbar;