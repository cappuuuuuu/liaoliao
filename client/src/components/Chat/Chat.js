import React, { useState, useEffect , useRef , useCallback } from 'react';
import queryString from 'query-string';
import debounce from "lodash/debounce";
import device from "current-device";
import Backdrop from '@material-ui/core/Backdrop';
import { animateScroll as scroll } from 'react-scroll';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { disableBodyScroll } from 'body-scroll-lock';

// components
import Messages from './Messages/Messages';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import Sticker from './Sticker/Sticker';
import Bubbles from '../Bubbles/Bubbles';
import Timer from '../Loader/timer';

// image
import stickers from '../Image/StickerImage' ;

// CSS
import './Chat.scss';

const { getTime } = require('./Time/Time.js');

const Chat = ({ location , socket , endPoint }) => {
  
    const [name , setName] = useState('');
    const [avatar , setAvatar] = useState('');
    const [users, setUsers] = useState([]);
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setTyping] = useState(false);
    const [typingStatus, setTypingStatus] = useState([]);
    const [firstLoadingMessage, setfirstLoadingMessage] = useState(true);
    const [pullLoading, setpullLoading] = useState(false);
    const [totalMessagePage, setTotalMessagePage] = useState(0)

    //ref
    const inputText = useRef(null);
    const messageBox = useRef(null);
    const messageContent = useRef(null);
    const messagesContainer = useRef(null);

    useEffect(()=>{
        const { name , avatar }  = queryString.parse(location.search);
        setName(name);
        setAvatar(avatar);

        // 一開始先載入第一頁訊息
        socket.emit('getRecord', 1);

        // 修正畫面滾動問題
        if(device.os === 'ios'){
            disableBodyScroll(document.getElementById("messages"));
        }
        // Preload sticker images
        stickers.forEach((sticker) => {
            sticker.imageUrl.forEach((url)=>{
                new Image().src= url;
            })
        });

        socket.on('userLeft',(leftUser) => {
            setUsers(users => users.filter((user)=> user.name !== leftUser.name));
            setMessages(messages => [...messages , { isLeftUser : true , name : leftUser.name , time :getTime()} ]);
            scroll.scrollToBottom({
                containerId: 'messages', 
                duration : 1000,
            })
        })

        socket.on('join',(newUsers)=>{
            setUsers(newUsers);
            setMessages(messages => [...messages, { isNewUser: true , name: newUsers[newUsers.length - 1].name , time :getTime()}]);
            scroll.scrollToBottom({
                containerId: 'messages', 
                duration : 1000,
                ignoreCancelEvents: true,
            })
        })
        
        socket.on('chatRecord', (history) =>{
            const { page, data, total } = history
            setTotalMessagePage(total)

            // 上拉加載 
            if (page !== 1) {
                setTimeout(() => {
                    setMessages(messages => [ ...data, ...messages ]);
                    setpullLoading(false);
                }, 750)
            } else {
                // 第一次載入
                let userData = queryString.parse(location.search);
                setMessages(messages => [ ...data, ...messages ]);
                socket.emit('join', userData );
                scroll.scrollToBottom({
                    containerId: 'messages', 
                    duration : 1000,
                    ignoreCancelEvents: true,
                })
                setTimeout(() => {
                    setfirstLoadingMessage(false);
                }, 1100)
            }
        })

        socket.on('getMessage',(data)=>{
            let { name } = queryString.parse(location.search) ;
            setTypingStatus({
                isTyping:false
            });
            setMessages(messages => [...messages , data]);
            if(name === data.name){
                scroll.scrollToBottom({
                    containerId: 'messages', 
                    duration : 500,
                })
            }else{
                scrollController();
            }
        })
        

        socket.on('typing',(data)=>{
            let user = queryString.parse(location.search).name ;
            if(data.name !== user ){
                if(data.isTyping){
                        setTypingStatus({
                            isTyping: true ,
                            name: data.name,
                            avatar : data.avatar
                        });
                        scrollController();
                }else{
                    setTypingStatus({
                        isTyping: false 
                    });
                }
            }
        })

        return()=>{
            socket.disconnect();
            socket.removeAllListeners();
        } 

    },[socket, location.search])

    // 根據是否有人正在打字，傳送某人打字狀態到 server
    useEffect(()=>{
        socket.emit('typing',{ isTyping  , name , avatar });
    },[name, avatar, socket, isTyping])

    // 若 viewport底部 距離 messagesContainer底部 400px 以下 ， scrollbar 將滑至底部 
    const scrollController = () => {
        if( messagesContainer.current.scrollTop + 400 >= messagesContainer.current.scrollHeight - messagesContainer.current.offsetHeight) {
            scroll.scrollToBottom({
                containerId: 'messages', 
                duration : 500,
            })
        }
    }

    const sendSticker = (e) => {
        if(e.target.tagName !== 'IMG'){
            return ;
        }
        let data = {
            typesOf:'sticker',
            name,
            avatar,
            msg:e.target.src,
            time: getTime()
        }
        socket.emit('sendMessage' , data);
    }

    const changeHandler = (e) => {
        setMsg(e.target.value);
        setTyping(true);
        handleTyping();
    }
    
    // debounce will be a new function for every render.
    // use the useCallback hook to make sure that 
    // the same function is being persisted between renders.
    const handleTyping = useCallback(debounce(() => {
        setTyping(false);
    }, 1000),[]);


    const sendMessage =  (e) => {
        e.preventDefault();
        inputText.current.focus();
        if(!msg) return ;
        let time = getTime();
        socket.emit('sendMessage' , { typesOf:'text', name , avatar , msg , time });
        setMsg('');
    }

    const loadMoreMessage = () => {
        setpullLoading(true)
    }

    return (
        <div className="chat-container">
            <div className="chat">
                <Navbar users={users} name={name} avatar={avatar}/>
                <Backdrop open={firstLoadingMessage} style={{backgroundColor:'rgba(0,0,0,.75)',zIndex:'1',position:'absolute'}}>
                    <Timer />
                </Backdrop>
                <Messages 
                    loadMoreMessage={ loadMoreMessage } 
                    firstLoadingMessage = {firstLoadingMessage}
                    pullLoading= {pullLoading}
                    socket={socket} 
                    messages={messages} 
                    name={name} 
                    isTyping={typingStatus} 
                    ref={{ref1:messagesContainer,ref2:messageContent}}
                    totalMessagePage={totalMessagePage}
                />
                <div className="message-box" ref={messageBox}>
                    <input type="text"
                    className="message-input"
                    ref={inputText}
                    value={msg}
                    onKeyPress={ e => e.key === 'Enter' ? sendMessage(e) : null }
                    onChange={changeHandler}
                    placeholder="輸入訊息" />
                    <Sticker sendSticker={sendSticker} stickers={stickers}/>
                    <IconButton className="message-submit" onClick={ sendMessage }>
                        <SendIcon style={{color:'#5081ad'}}/>
                    </IconButton>
                </div>
                <div id="layoutViewport"></div>
            </div>
            <div className='desktopSidebar'>
                <Sidebar users={users} name={name} avatar={avatar}/>
            </div>   
            <Bubbles />
        </div>

    )
}

export default Chat ;