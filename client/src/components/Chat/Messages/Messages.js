import React from 'react';
import moment from 'moment';
import avatars from '../../Image/AvatarImage';
import './Messages.scss';

const Date = ({ messages , index }) => {
        if(index === 0){
            return (
                <div className="message-wrapper broadcast">
                    <div className="message new date">
                        {moment((messages[index]).time).format("MMMDo")}
                    </div>  
                </div>
            )
        }else if(moment(messages[index].time).format("MMMDo") !== moment((messages[index - 1]).time).format("MMMDo")){
            return(
                <div className="message-wrapper broadcast">
                    <div className="message new date">
                        {moment((messages[index]).time).format("MMMDo")}
                    </div>  
                </div>
            )
        }
        return null ;
    
}

const Messages = React.forwardRef(( { messages , name , isTyping } , ref) => {

    let time , prevMessageTime , repeat;

    return (
      <div id="messages" className="messages" ref={ref.ref1}>
            <div className="messages-content" name="messgaes-content" ref={ref.ref2}>
                { messages.map((message,i , messages)=>{
                   
                    repeat = false ;
                    
                    if(message.name === name){
                        
                        if(message.isNewUser){
                            return(
                                <React.Fragment key={message.time}>
                                    <Date messages={messages} index={i}/>
                                    <div className="message-wrapper broadcast" key={i}>
                                        <div className="message new">
                                            你已進入聊天室 
                                        </div> 
                                    </div>
                               </React.Fragment>    
                            )
                        }else if (message.typesOf === 'sticker'){
                            return (
                                <div className="message-wrapper message-personal" key={i} name="message">
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
                                <div className="message-wrapper message-personal" name="message">
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
                                    <div className="message-wrapper broadcast" key={i}>
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
                                    <div className="message-wrapper broadcast" key={i}>
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
                                <div className={`message-wrapper${repeat ? ' repeat' : ''}`} key={i} name="message">
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
                                        <div className="message new" key={i} style={{display:'inline-block'}}>
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