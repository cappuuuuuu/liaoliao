import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  profile: {
    margin: '20px auto',
    textAlign: 'center',
    color: '#fff',
    fontSize: '1.1rem',

    '& > .single-avatar > label': {
      width: '70px',
      height: '70px',
      backgroundColor: 'rgba(111, 160, 224, 0.25)'
    }
  },
  arrowBtn: {
    backgroundColor: '#32465a',
    color: 'rgb(255,255,255)',
    padding: '20px',
    position: 'absolute',
    top: 0,
    right: 0

  },
  arrowIcon: {
    width: 40,
    height: 40
  },
  name: {
    color: '#fff'
  },
  list: {
    boxSizing: 'border-box',
    backgroundColor: '#2c3e50',
    width: '100%',
    padding: '25px 10px',
    color: '#FFF',
    textAlign: 'center',
    borderRadius: '30px 30px 0 0',
    height: '90vh'
  },
  listNav: {
    position: 'relative',
    height: '80px',
    backgroundColor: '#32465a',
    color: '#fff',
    textAlign: 'center',
    '& p': {
      fontSize: '1.2rem',
      height: '80px',
      lineHeight: '80px'
    }
  },
  userList: {
    listStyle: 'none',
    marginTop: '20px',
    height: '700px',
    overflowY: 'auto',
    padding: '0 15px',
    '@media (max-width:992px)': {
      height: '320px'
    },
    '& li': {
      display: 'flex',
      height: '35px',
      lineHeight: '35px',
      backgroundColor: '#32465a',
      padding: '10px 15px',
      marginBottom: '15px',
      borderRadius: '10px',
      fontSize: '1rem',
      color: '#94b2d3',
      textAlign: 'left',
      '@media (min-width:992px)': {
        height: '55px'
      },
      '& .single-avatar': {
        width: '35px',
        verticalAlign: 'top',
        margin: 0,
        marginRight: '15px',

        '& > label': {
          backgroundColor: 'transparent',
          width: '35px',
          height: '30px',
          backgroundSize: 'cover'
        }
      }
    }
  },
  buttonBar: {
    position: 'absolute',
    width: '60%',
    borderRadius: '20px',
    height: '50px',
    margin: '0 auto',
    left: '50%',
    bottom: '10px',
    transform: 'translateX(-50%)',
    background: '#32465a',
    overflow: 'hidden',
    '& button': {
      color: '#fff',
      width: '100%',
      height: '100%',
      fontSize: '1rem',
      padding: '10px 0',
      borderRadius: '0',
      '&:hover': {
        background: '#435f7a'
      }

    }
  },
  LogoutLink: {
    textDecoration: 'none'
  },

  exitToAppIcon: {
    marginRight: '10px',
    marginBottom: '2px',
    width: 20,
    height: 20
  },

  userListOnlySelf: {
    fontSize: '.9rem',
    marginTop: '20px',
    color: '#5081AD',

    '& > p': {
      margin: '5px 0'
    }
  }
}))
