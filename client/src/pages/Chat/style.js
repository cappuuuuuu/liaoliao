import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(() => ({
  backDrop: {
    zIndex: '1',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, .75)'
  }
}))
