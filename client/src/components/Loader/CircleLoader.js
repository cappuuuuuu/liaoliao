import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const loginButtonStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },

    "& .MuiCircularProgress-colorPrimary":{
        color:'#fff',
        width:'20px !important',
        height:'20px !important'
    }
  },
}));

const messageContainerStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '65px',
    
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },

    "& .MuiCircularProgress-colorPrimary":{
        transition: '.4s ease',
        color:'#5081ad',
        width:'0px !important',
        height:'0px !important'
    }
  },

  container: {
    height: '0px',
    transition: '.3s ease',

    '&.loading': {
      height: '65px',

      '& .MuiCircularProgress-colorPrimary':{
        width:'30px !important',
        height:'30px !important'
      }
    },
  },
}));

export default function CircularIndeterminate({ kind, load }) {
  const classes = kind === 'message' ? messageContainerStyles() : loginButtonStyles();

  return (
    <div className={ `${classes.container} ${ load ? 'loading' : '' }` }>
      <div className={classes.root}>
        <CircularProgress />
      </div>
    </div>
  );
}
