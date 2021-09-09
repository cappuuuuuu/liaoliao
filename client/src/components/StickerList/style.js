import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    '& .MuiBox-root': {
      padding: '15px'
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#5081ad'
    },
    '& .MuiTab-textColorPrimary.Mui-selected ': {
      color: '#5081ad'
    },
    '& .MuiTab-root': {
      minWidth: 'auto'
    },
    '& .react-swipeable-view-container > div': {
      display: 'flex',
      alignItems: 'center',
      height: '220px',
      overflow: 'hidden !important'
    }

  },
  listWrapper: {
    display: 'flex',
    boxSizing: 'border-box',
    width: '100%',
    color: '#FFF',
    textAlign: 'center'
  },

  stickerList: {
    margin: 'auto',
    listStyle: 'none',
    overflow: 'hidden',
    padding: '10px',

    '& li': {
      display: 'inline-flex',
      boxSizing: 'border-box',
      width: '25%',
      padding: '5px',
      textAlign: 'center',
      borderRadius: '10px',
      '& img': {
        margin: 'auto',
        width: '80px'
      }
    }
  },
  stickerArticle: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: '25px 25px',
    backgroundPosition: 'center center'
  }
}))
