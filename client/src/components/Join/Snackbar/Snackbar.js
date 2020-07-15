import React  , { forwardRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  snackbar: {
    top:'35px',
    "& .MuiSnackbarContent-root": {
        zIndex:1600,
        backgroundColor:'#5081ad',
        fontSize:'.975rem',
        minWidth:'100px',
        flexGrow:'0',
        "& .MuiSnackbarContent-message": {
            margin:'auto',

        }
    },
  },  
  close: {
    padding: theme.spacing(0.5),
    
  },
  

}));

const ConsecutiveSnackbars = forwardRef(( props, ref ) => {
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState(undefined);
  const [duration , setDuration] = React.useState(0);
  
  useImperativeHandle(ref, () => ({

    handleClick : (message , duration = 2000)  => {
        setDuration(duration);
        setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
        return message
    },
    
    handleClose : (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    setOpen(false);
    }

  }));

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);
  

    const handleClose =  (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    setOpen(false);
}
  

const handleExited = () => {
setMessageInfo(undefined);
};

const classes = useStyles();

  return (
    <div>
      <Snackbar
        className={classes.snackbar}
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={duration}
        TransitionComponent={Slide}
        onClose={handleClose}
        onExited={handleExited}
        message={messageInfo ? messageInfo.message : undefined}
       
      />
    </div>
  )
})

export default ConsecutiveSnackbars ;
