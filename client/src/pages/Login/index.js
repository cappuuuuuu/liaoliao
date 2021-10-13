import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { useDispatch, useSelector } from 'react-redux'
import { getAvatarDataThunk, avatarData } from '@/redux/slices/avatarDataSlice'
import { useSnackBar } from '@/contexts/SnackBarProvider.js'
import { timeout } from '@/helper'

// component
import AvatarChoose from '@/components/Avatar/AvatarChoose'
import Bubbles from '@/components/Bubbles'
import BongoCat from '@/components/BongoCat'
import SquareLoading from '@/components/Loading/SquareLoading'
import CheckUserLoader from '@/components/Loading/CircleLoading'

// CSS
import './style.scss'

// context
import { useSocket } from '@/contexts/SocketProvider.js'

const LoginAuthent = ({ className }) => (
  <div className={className}>
    <img src={require('@/assets/images/icon/authent.svg')} alt="登入中"/>
    <p>登入中...</p>
  </div>
)

const LoginSuccess = ({ loginSuccessClass }) => (
  <div className={`success ${loginSuccessClass}`}>
    <h2>趕快進來一起 ㄌㄌ 吧 !</h2>
    <BongoCat />
  </div>
)

const LoginForm = ({ nameInputChangeHandler, inputKeyDownHandler, isCheckUserLoading, loginRequestHandler }) => {
  return (
    <div className="login_fields">
      <div className="login_fields__user">
        <input className="user__name__input" placeholder="輸入暱稱" type="text" onChange={nameInputChangeHandler} onKeyDown ={inputKeyDownHandler}/>
      </div>
      <div className="login_fields__submit">
        <Button className={isCheckUserLoading ? 'check' : ''} type="submit" onClick= {loginRequestHandler} variant="outlined">
          <div className="progress">
            <CheckUserLoader />
          </div>
          <div className="text">開始聊天</div>
        </Button>
      </div>
    </div>
  )
}

const Login = ({ history }) => {
  const socket = useSocket()
  const dispatch = useDispatch()
  const { openSnackBar, closeSnackBar } = useSnackBar()
  const avatarList = useSelector(avatarData)
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [isExistUserName, setIsExistUserName] = useState(false)
  const [checkUserName, setCheckUserName] = useState(false)
  const [isCheckUserLoading, setIsCheckUserLoading] = useState(false)

  // 控制登入動畫
  const [loginAnimationClass, setLoginAnimationClass] = useState('')
  const [authentClass, setAuthentClass] = useState('')
  const [loginSuccessClass, setLoginSuccessClass] = useState('')

  const [pageLoadComplete, setPageLoadComplete] = useState(false)

  useEffect(() => {
    if (!avatarList.length) dispatch(getAvatarDataThunk())
  }, [])

  useEffect(() => {
    if (socket === null) return

    setTimeout(() => {
      setPageLoadComplete(true)
      openSnackBar('選一個頭貼，輸入暱稱就可以進入聊天室囉', 6000)
    }, 2000)

    socket.on('checkResult', (error) => {
      if (error === 'repeat') {
        setIsExistUserName(true)
      }
      setCheckUserName(true)
    })
  }, [socket])

  useEffect(() => {
    if (checkUserName) loginHandler()
  }, [checkUserName])

  const loginRequest = () => {
    closeSnackBar()
    setIsCheckUserLoading(true)
    setCheckUserName(false)
    setIsExistUserName(false)
    socket.emit('checkUser', userName)
  }

  const inputKeyDownHandler = (e) => {
    if (e.key === 'Enter') loginRequest()
  }

  const nameInputChangeHandler = (e) => {
    const name = e.target.value
    setUserName(name.trim())
  }

  const avatarChangeHandler = (e) => {
    setUserAvatar(e.target.value)
  }

  const loginHandler = () => {
    const checkLoginProcedure = [
      { promptText: '選一個頭貼', isFullFill: userAvatar },
      { promptText: '請輸入暱稱', isFullFill: userName },
      { promptText: '名字最多 8 個字唷', isFullFill: userName.length < 9 },
      { promptText: '暱稱已有人使用', isFullFill: !isExistUserName },
      { promptText: '', isFullFill: checkUserName }
    ]

    const isNotFullFillProcedure = checkLoginProcedure.find(item => !item.isFullFill)

    if (isNotFullFillProcedure) {
      const snackBarMessage = isNotFullFillProcedure.promptText
      if (snackBarMessage) openSnackBar(snackBarMessage)
      return setIsCheckUserLoading(false)
    } else {
      loginAnimation()
    }

    async function loginAnimation () {
      setIsCheckUserLoading(false)
      setLoginAnimationClass('tilt')

      await timeout(300)
      setLoginAnimationClass('tilt shift')

      await timeout(200)
      setAuthentClass('active')

      await timeout(2000)
      setLoginAnimationClass('tilt')
      setAuthentClass('')

      await timeout(300)
      setLoginAnimationClass('close')

      await timeout(200)
      setLoginSuccessClass('active')

      await timeout(2500)
      history.push('/chat', { name: userName, avatar: userAvatar })
    }
  }

  return (
    <div className="login-body">
        <div className={`login ${loginAnimationClass}`}>
          <div className='login-content'>
            <AvatarChoose avatarChangeHandler={avatarChangeHandler}/>
            <LoginForm
              loginRequestHandler={ loginRequest }
              inputKeyDownHandler= { inputKeyDownHandler }
              nameInputChangeHandler={ nameInputChangeHandler }
              isCheckUserLoading={isCheckUserLoading}
            />
            <LoginSuccess loginSuccessClass={loginSuccessClass}/>
          </div>
        </div>
        <LoginAuthent className={`authent ${authentClass}`}/>
        <Bubbles count={20}/>
        <SquareLoading loadComplete={pageLoadComplete}/>
    </div>
  )
}

export default Login
