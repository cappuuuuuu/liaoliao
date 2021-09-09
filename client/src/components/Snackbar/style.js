import { makeStyles } from '@material-ui/core/styles'
export const useStyles = makeStyles((theme) => ({
  snackbar: {
    top: '35px !important',
    '& .MuiSnackbarContent-root': {
      zIndex: 1600,
      backgroundColor: '#5081ad',
      fontSize: '.975rem',
      minWidth: '100px',
      flexGrow: '0',
      '& .MuiSnackbarContent-message': {
        margin: 'auto'
      }
    }
  },
  close: {
    padding: theme.spacing(0.5)
  }

}))
