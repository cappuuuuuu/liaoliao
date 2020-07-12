import React, { useState, useEffect , useRef , useCallback} from 'react';
import queryString from 'query-string';
import debounce from "lodash/debounce";
import device from "current-device";
import Backdrop from '@material-ui/core/Backdrop';
import { animateScroll as scroll } from 'react-scroll';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

//components
import Messages from './Messages/Messages';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import Sticker from './Sticker/Sticker';
import Bubbles from '../Bubbles/Bubbles';
import Timer from '../Loader/timer';
import stickers from '../Image/StickerImage' ;
import './Chat.scss';
import './Sidebar/desktopSidebar.scss';



const { getTime } = require('./Time/Time.js');

const Chat = ({location , socket , endPoint }) => {
  

    const [name , setName] = useState('');
    const [avatar , setAvatar] = useState('');
    const [users, setUsers] = useState([]);
    const [msg,setMsg] = useState('');
    const [messages,setMessages] = useState([]);
    const [isTyping,setTyping] = useState(false);
    const [typing,setTypingStatus] = useState([]);
    const [loadingMessages,setLoadingMessages] = useState(true);

    //ref
    const inputText = useRef(null);
    const messageBox = useRef(null);
    const messageContent = useRef(null);
    const messagesContainer = useRef(null);
    if (device.os === 'ios') {
        let viewport = window.visualViewport;
        const viewportHandler = () => {
            var layoutViewport = document.getElementById('layoutViewport');

            var offsetLeft = viewport.offsetLeft;
            var offsetTop = viewport.height - layoutViewport.getBoundingClientRect().height + viewport.offsetTop;

            messageBox.current.style.transform = 'translate(' +
                offsetLeft + 'px,' +
                offsetTop + 'px) ' +
                'scale(' + 1 / viewport.scale + ')';
        }

        window.visualViewport.addEventListener('scroll', viewportHandler);
        window.visualViewport.addEventListener('resize', viewportHandler);
    }
    

    useEffect(()=>{
        stickers.forEach((sticker) => {
          sticker.imageUrl.forEach((url)=>{
            new Image().src= url;
          })
      });
    },[])

    useEffect(()=>{
        const { name , avatar }  = queryString.parse(location.search);
        setName(name);
        setAvatar(avatar)
        socket.emit('getRecord');

        return()=>{
            socket.disconnect();
            socket.removeAllListeners();
        } 

    },[ endPoint ,location.search ])

    useEffect(()=>{

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
            setMessages(messages => [...messages, { isNewUser: true , name: newUsers[newUsers.length - 1 ].name , time :getTime()}]);
            scroll.scrollToBottom({
                containerId: 'messages', 
                duration : 1000,
            })
        })
        
        socket.on('chatRecord',(history)=>{
            setMessages([...history ]); 
            scroll.scrollToBottom({
                containerId: 'messages', 
                duration : 1000,
            })
            setLoadingMessages(false);
            let userData = queryString.parse(location.search);
            socket.emit('join', userData );
        })

        socket.on('getMessage',(data)=>{
            setTypingStatus({
                isTyping:false
            });
            setMessages(messages => [...messages , data]);
            let {name} = queryString.parse(location.search) ;
            if(name === data.name){
                scroll.scrollToBottom({
                    containerId: 'messages', 
                    duration : 500,
                })
            }else{
                scrollController();
            }
            
            if (device.os !== 'ios') return ;
            if(messageContent.current.clientHeight < 273){
                 scroll.scrollTo(0,{
                     duration:500
                })
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

    },[])

    useEffect(()=>{
        socket.emit('typing',{ isTyping  , name , avatar});
    },[isTyping])

    const scrollController = () => {
        console.log(messagesContainer.current.scrollTop);
        console.log(messagesContainer.current.offsetHeight);
        console.log(messagesContainer.current.scrollHeight);

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

    return (
        <div className="chat-container">
            <div className="chat">
                <Navbar users={users} name={name} avatar={avatar}/>
                <Backdrop open={loadingMessages} style={{backgroundColor:'rgba(0,0,0,.75)',zIndex:'1',position:'absolute'}}>
                    <Timer />
                </Backdrop>
                <Messages messages={messages} name={name} isTyping={typing} messageContent={messageContent} messagesContainer={messagesContainer}/>
                
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