import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { loginButtonStyles, messageContainerStyles } from './style'

export default function CircularIndeterminate ({ kind, load }) {
  const classes = kind === 'message' ? messageContainerStyles() : loginButtonStyles()

  return (
    <div className={ `${classes.container} ${load ? 'loading' : ''}` }>
      <div className={classes.root}>
        <CircularProgress />
      </div>
    </div>
  )
}
