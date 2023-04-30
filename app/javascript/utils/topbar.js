/* Ayuda de https://mui.com/material-ui/react-app-bar/ */

import React from 'react'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  brand: {
    display: { xs: 'none', md: 'flex' },
    fontWeight: 900,
    fontSize: '20px',
    letterSpacing: '.3rem',
    paddingTop: '0px !important',
  }
})

const pages = [{ }];

const Topbar = (props) => {

  const [value, setValue] = React.useState('')
  const history = useHistory();

  const classes = useStyles()

  const goToLink = (page) => {
    history.push(`${page.to}`);
    setValue('')
  }


  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <RestaurantIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Box
            className={classes.brand}
            sx={{ display: { xs: 'none', md: 'flex' }}}
          >
            SubPub
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'block', sm: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => goToLink(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Topbar;