import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    right: '55px'

  },
  appBar: {
    color: '#727373',
    backgroundColor: 'transparent',
    boxShadow: 'none'

  },
  title: {
    flexGrow: 1,
    color: '#2c3e50'
  },
  drawer: {
    backgroundColor: '#fff',
    height: '300px',
    '@media (max-width:576px)': {
      height: 'auto'
    }

  },

  arrowBtn: {
    backgroundColor: '#32465a',
    color: 'rgb(255,255,255)',
    float: 'right'

  },
  arrowIcon: {
    width: 40,
    height: 40
  },
  listWrapper: {
    boxSizing: 'border-box',
    width: '100%',
    padding: '20px',
    color: '#FFF',
    textAlign: 'center'
  },

  stickerPopover: {

    '& .MuiPopover-paper': {
      width: '500px',
      borderRadius: '10px'

    }
  }

}))
