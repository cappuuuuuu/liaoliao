import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  appBar: {
    color: '#35394a',
    backgroundColor: '#FFF',
    boxShadow: 'none',
    paddingLeft: 0,
    paddingBottom: '4px',
    '@media (min-width:992px)': {
      boxShadow: 'none'
    }
  },

  toolBar: {
    paddingRight: '5px',
    minHeight: '60px'
  },

  menuButton: {
    position: 'absolute',
    top: '50%',
    left: '25px',
    backgroundColor: 'rgba(175, 207, 232, .1)',
    padding: '3px 6px',
    borderRadius: '10px',
    transform: 'translateY(-50%)',
    '@media (min-width:992px)': {
      display: 'none'
    }

  },
  title: {
    flexGrow: 1,
    color: '#2c3e50',
    textAlign: 'center'
  },

  drawer: {
    backgroundColor: '#32465a',
    width: '70%',
    maxWidth: '250px',
    borderRadius: '0 30px 30px 0',
    zIndex: 2017,
    '@media (min-width:992px)': {
      display: 'none'
    }
  }

}))
