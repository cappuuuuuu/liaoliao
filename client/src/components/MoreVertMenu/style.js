import { makeStyles, withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'

export const useStyles = makeStyles(() => ({
  menuItem: {
    margin: 0,
    padding: '5px 10px 5px 25px',
    color: 'rgb(44, 62, 80)',
    fontWeight: '450',

    '&:first-child': {
      paddingTop: '15px'
    },

    '&:last-child': {
      paddingBottom: '15px'
    }
  },

  menuItemIcon: {
    marginLeft: '12px',
    fontSize: '18px',
    color: '#5081ad'
  },

  moreVertIcon: {
    color: 'rgb(44, 62, 80)'
  }
}))

export const BlueSwitch = withStyles({
  switchBase: {
    '&$checked': {
      color: '#5081ad',

      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
      }
    },
    '&$checked + $track': {
      backgroundColor: '#5081ad'
    }
  },
  checked: {},
  track: {}
})(Switch)
