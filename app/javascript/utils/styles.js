import React from "react";

import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  childrenContainerTwo: {
    paddingTop: '80px',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    fontSize: '20px',
    fontWeight: '600',
    letterSpacing: '0rem',
    paddingTop: '40px',
  },
  mainContainer: {
    padding: '50px',
    background: '#f0f0f0'
  },
  subContainer: {
    boxShadow: '0px 2px 4px rgb(0 0 0 / 30%)',
    backgroundColor: 'white !important',
    paddingTop: '50px',
    minHeight: '90vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  brand: {
    display: { xs: 'none', md: 'flex' },
    fontWeight: 900,
    fontSize: '20px',
    letterSpacing: '.3rem',
    paddingTop: '0px !important',
  },
  horizontal: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: '40px'
  },
  basicInformation: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainTitle: {
    color: '#1976d2',
    fontSize: '36px',
  },
  mainTitleContainer: {
    paddingBottom: '20px'
  },
  basicInformation: {
    padding: '15px'
  },
  conciliationData: {
    padding: '15px'
  },
  histogramContainer: {
    paddingTop: '30px'
  },
  histoFilters: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    paddingBottom: '15px'
  },
  sectionTitle: {
    paddingBottom: '10px',
    color: 'rgb(79, 101, 241)'
  },
  conciliaciones: {
    paddingTop: '15px',
    paddingBottom: '15px'
  },
  conciliacion: {
    padding: '5px'
  }
});