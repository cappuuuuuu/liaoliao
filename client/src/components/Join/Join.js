import React, { useState, useEffect , useRef } from 'react';
import Button from '@material-ui/core/Button';

//component
import Avatar from './Avatar/Avatar';
import Bubbles from '../Bubbles/Bubbles';
import BongoCat from './BongoCat/BongoCat';
import HomeLoader from '../Loader/HomeLoader';
import ConsecutiveSnackbars from './Snackbar/Snackbar';
import CheckUserLoader from '../Loader/CheckUserLoader';

//CSS
import './Join.scss';


const Authent = (props) => {
    return (
        <div className={props.className}>
            <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/puff.svg ' alt="登入中"/>
            <p>登入中...</p>
        </div>
    )
}
const Success = (props) => {
    return (
        <div className={`success ${props.success}`}>
            <h2>趕快進來一起 ㄌㄌ 吧 !</h2>
            <BongoCat />
        </div>
    )
}

const LoginFieldsUser = (props) => {
    return (
        <div className="login_fields__user" >
            <input placeholder="輸入暱稱" type="text" onChange = { props.getUser } />
        </div>
    )
}


const LoginFields = (props) => {

    return (
        <div className="login_fields">
            <LoginFieldsUser getUser={props.getUser} />
            <div className="login_fields__submit">
                <Button className={props.checkProgress?'check':''} type="submit" onClick= { props.onClick } variant="outlined">
                    <div className="progress">
                        <CheckUserLoader />
                    </div>
                    <div className="text">
                        開始聊天
                    </div>
                </Button>
            </div>
        </div>

    )
}


const Join = ({ history , socket }) => {
    const [user, setUser] = useState(''); // 登入名字
    const [avatar ,setAvatar ] = useState('');
    const [existUser , setExistUser] = useState(false);
    const [checkUser , setCheckUser] = useState(false);
    const [checkProgress , setCheckProgress ] = useState(false);
    const [status, setStatus] = useState(''); // 控制登入動畫
    const [authent , setAuthent ] = useState('') ; // 控制登入動畫
    const [success , setSuccess ] = useState('') ; // 控制登入動畫
    const [loadComplete , setLoadComplete ] = useState(false);
    const firstRender = useRef(true);
    const consecutiveSnackbars = useRef(null);


    useEffect(()=>{
        if (!!window.performance && window.performance.navigation.type === 0) {
            //!! 用來檢查 window.performance 是否存在
            //window.performance.navigation.type ===2 表示使用 back or forward
            window.location.reload();//或是其他動作
        }

        setTimeout(()=>{
            setLoadComplete(true);
            consecutiveSnackbars.current.handleOpen('選一個頭貼，輸入暱稱就可以進入聊天室囉',6000);
        },2000)

        socket.on('checkResult',(error)=>{
            if(error === 'repeat'){
                setExistUser(true);
            }
            setCheckUser(true);
        })

    },[socket])


    useEffect(()=>{
        if(firstRender.current){
            firstRender.current = false;
            return ;
        }
        else if (checkUser) loginHandler()

    },[checkUser])



    const loginRequest = () => {
        setCheckProgress(true);
        setCheckUser(false);
        setExistUser(false);
        socket.emit('checkUser', user);
    }

    const getUser = (e) => {
        let name = e.target.value;
        setUser(name.trim());
    }

    const getAvatar = (e) => {
        setAvatar(e.target.value);
    }

    const loginHandler = () => {
        if(!avatar){
            consecutiveSnackbars.current.handleOpen('選一個頭貼');
            setCheckProgress(false);
            return ''
        }
        if(!user){
            consecutiveSnackbars.current.handleOpen('請輸入暱稱');
            setCheckProgress(false);
            return ''
        }
        if(user.length > 8){
            consecutiveSnackbars.current.handleOpen('名字最多 8 個字');
            setCheckProgress(false);
            return ''
        }

        if(existUser){
            consecutiveSnackbars.current.handleOpen('暱稱已有人使用');
            setCheckProgress(false);
            return ;
        }

        if(!checkUser){
            return ;
        }

        setCheckProgress(false);
        setStatus('test');
        setTimeout(()=>{
            setStatus('test testtwo');
        },300);

        setTimeout(()=>{
            setAuthent('active')
        },500)

        setTimeout(()=>{
            setStatus('test');
            setAuthent('');
        },2500)

        setTimeout(()=>{
            setStatus('close');
        },2800)

        setTimeout(()=>{
            setSuccess('active');
        },3000)

        setTimeout(()=>{
            history.push(`/chat?name=${user}&avatar=${avatar}`);
        },5500)
    }

    return (
        <div className="join-body">
            <div className={`login ${status}`}>
                <div className='login-content'>
                    <Avatar getAvatar={getAvatar}/>
                    <LoginFields onClick={ loginRequest } getUser={ getUser} checkProgress={checkProgress}/>
                    <Success success={success}/>
                </div>
            </div>
            <Authent className={`authent ${authent}`}/>
            <Bubbles />
            <HomeLoader loadComplete={loadComplete}/>
            <ConsecutiveSnackbars ref={ consecutiveSnackbars }/>
        </div>

    )
}

export default Join ;
