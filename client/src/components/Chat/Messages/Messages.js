import React, { useRef, useState, useCallback, useEffect } from 'react';
import moment from 'moment';
import MessageLoader from '../../Loader/CircleLoader';
import debounce from "lodash/debounce";
import { animateScroll as scroll } from 'react-scroll';
import avatars from '../../Image/AvatarImage';
import './Messages.scss';

const Date = ({ messages , index }) => {
        if(index === 0){
            return (
                <div className="message-wrapper broadcast">
                    <div className="message new date">
                        {moment((messages[index]).time).format("ll")}
                    </div>  
                </div>
            )
        }else if(moment(messages[index].time).format("ll") !== moment((messages[index - 1]).time).format("ll")){
            return(
                <div className="message-wrapper broadcast">
                    <div className="message new date">
                        {moment((messages[index]).time).format("ll")}
                    </div>  
                </div>
            )
        }
        return null ;
    
}

const Messages = React.forwardRef(( { messages , name , isTyping, socket, loadMoreMessage, pullLoading, totalMessagePage } , ref) => {
    let time , prevMessageTime , repeat;
    const messagesContainer = ref.ref1.current
    const [ scrollPosition, setScrollPosition ] = useState({ arriveTop: false, arriveBottom: false })
    const [ backTopButtonActive, setbackTopButtonActive ] = useState(false)
    const loadMessagePage = useRef(2)
    const pullLoadingProps = useRef(false)
    const beforeUpdateContainerHeight = useRef(0)
    const hasSendGetMessageHistoryRequest = useRef(false)
    const beforeMessageRenderScrollTop = useRef(0)
    const [scrollBarArriveBottom, setscrollBarArriveBottom] = useState(false)

    const scrollDebounce = useCallback(debounce(() => {
        const messagesContainer = document.querySelector('.messages')
        setbackTopButtonActive(true)
        if (messagesContainer.scrollTop === 0) setScrollPosition({ ...scrollPosition, arriveTop: true })
        else setScrollPosition({ ...scrollPosition, arriveTop: false })
    }, 500), []);

    // const scrollFewDebounce = useCallback(debounce(() => {
    //     pullLoadMessage()
    // }, 100), []);

    const scrollToTop = () => {
        scroll.scrollToTop({
            containerId: 'messages', 
            duration : 1500,
            smooth: 'easeInOutQuint',
        })
    }

    const pullLoadMessage = () => {
        beforeMessageRenderScrollTop.current = document.querySelector('.messages').scrollTop
        const arriveTop = document.querySelector('.messages').scrollTop < 150
        const hasGetFullMessage = loadMessagePage.current - 1 >= (totalMessagePage / 10) 
        if (hasGetFullMessage) return 
        if (arriveTop && !pullLoadingProps.current && !hasSendGetMessageHistoryRequest.current && scrollBarArriveBottom) {
            hasSendGetMessageHistoryRequest.current = true
            socket.emit('getRecord', loadMessagePage.current)
            loadMoreMessage() 
            loadMessagePage.current++
            beforeUpdateContainerHeight.current = document.querySelector('.messages-content').offsetHeight
        }
    }

    const scrollHandler = () => {
        setbackTopButtonActive(false)
        scrollDebounce()
        pullLoadMessage()
        if (!scrollBarArriveBottom) {
            const arriveBottom = messagesContainer.scrollTop + messagesContainer.offsetHeight === messagesContainer.scrollHeight
            if (arriveBottom) setscrollBarArriveBottom(true)
        }
    }

    useEffect(() => {
        pullLoadingProps.current = pullLoading
        if (!pullLoadingProps.current) {
            const offsetHeight = document.querySelector('.messages-content').offsetHeight - beforeUpdateContainerHeight.current - 65
            document.querySelector('.messages').scrollTop = offsetHeight + beforeMessageRenderScrollTop.current
            setTimeout(() => { hasSendGetMessageHistoryRequest.current = false }, 650)
        }
    }, [pullLoading])

    return (
      <div id="messages" className="messages" ref={ref.ref1} onScroll={ scrollHandler }>
            <div className={`back__to__top ${ backTopButtonActive ? 'active' : '' } ${ scrollPosition.arriveTop ? 'arriveTop' : ''}`} onClick={ scrollToTop }>
                <img className="arrow__icon" src={require('../images/arrow-up.svg')} />
            </div>
            <div className="messages-content" name="messgaes-content" ref={ref.ref2}>
                <MessageLoader kind={'message'} load={ pullLoading }/>
                { messages.map((message, i , messages) => {
                    repeat = false ;
                    
                    if(message.name === name){
                        
                        if(message.isNewUser){
                            return(
                                <React.Fragment key={message.time}>
                                    <Date messages={messages} index={i}/>
                                    <div className="message-wrapper broadcast" key={message.time}>
                                        <div className="message new">
                                            你已進入聊天室 
                                        </div> 
                                    </div>
                               </React.Fragment>    
                            )
                        }else if (message.typesOf === 'sticker'){
                            return (
                                <div className="message-wrapper message-personal" key={message.time} name="message">
                                    <div className="message new sticker">
                                        <img src={message.msg} alt=""/>
                                    </div>
                                    <div className="time">{moment(message.time).format('LT')}</div>
                                </div>
                            )
                        }
                        
                        return (
                            <React.Fragment key={message.time}>
                                <Date messages={messages} index={i}/>
                                <div className="message-wrapper message-personal" name="message" key={message.time}>
                                    <div className="message new">
                                        {message.msg}
                                    </div>
                                    <div className="time">{moment(message.time).format('LT')}</div>
                                </div>
                            </React.Fragment>
                            
                        )  
                    }else{

                        if(message.isNewUser){
                            return(
                                <React.Fragment key={message.time}>
                                    <Date messages={messages} index={i}/>
                                    <div className="message-wrapper broadcast" key={message.time}>
                                        <div className="message new">
                                            {message.name} 已加入聊天室 
                                        </div> 
                                    </div>
                                </React.Fragment>
                                   
                            )
                        }else if(message.isLeftUser){
                            return(
                                <React.Fragment key={message.time}>
                                    <Date messages={messages} index={i}/>
                                    <div className="message-wrapper broadcast" key={message.time}>
                                        <div className="message new">
                                            {message.name} 離開聊天室 
                                        </div> 
                                    </div>
                                </React.Fragment>  
                            )
                        }

                        // 同一分鐘內同一人的訊息不顯示頭貼、名字
                        if(i>0 ){
                            time = moment(message.time).format('LT') ; 
                            prevMessageTime = moment(messages[i-1].time).format('LT');
                            if(messages[i-1].msg && (message.name === messages[i-1].name) && time === prevMessageTime){
                                repeat = true ;
                            }
                        }

                        return (
                            <React.Fragment key={message.time}>
                                <Date messages={messages} index={i}/>
                                <div className={`message-wrapper${repeat ? ' repeat' : ''}`} key={message.time} name="message">
                                    <div className="avatar">
                                        <img src={avatars[message.avatar]} alt=""/>
                                    </div>
                                    { message.typesOf === 'sticker' ? 
                                    <div style={{position:'relative'}}>
                                        <div className="name">{message.name}</div>
                                        
                                        <div className="message new sticker">
                                            <img src={message.msg} alt=""/>
                                        </div>
                                        <div className="time">{moment(message.time).format('LT')}</div>
                                    </div>
                                    :   
                                    <div style={{position:'relative'}}>  
                                        <div className="name">{message.name}</div>
                                        <div className="message new" key={message.time} style={{display:'inline-block'}}>
                                            {message.msg}
                                        </div>
                                        <div className="time">{moment(message.time).format('LT')}</div>
                                    </div>
                                    }
                                </div>
                            </React.Fragment>
                        )

                    }
                    
                })}

                {
                    isTyping.isTyping ?
                    <div className="message-wrapper typing">
                            <div className="avatar">
                                <img src={avatars[isTyping.avatar]} alt=""/>
                            </div>
                            <div>
                                <div className="name">{isTyping.name}</div>
                                <div className="message new loading">
                                    正在輸入
                                    <span></span>
                                </div>
                            </div>
                    </div>
                    : null
                }
            </div>
        </div>   
)
})

export default Messages ;