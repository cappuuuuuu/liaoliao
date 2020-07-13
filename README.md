# liaoliao
<img src="https://i.ibb.co/YjPfXJD/2020-07-12-9-08-18.png">


# 匿名即時聊天室
選一個可愛的頭貼、想一個暱稱就可以進入聊天室開始聊天，

# Demo
<a href="https://liaoliao.netlify.app/"target="_blank">LIVE DEMO</a>
  
[Demo](https://liaoliao.netlify.app/)

# 聊天室功能
* 基本的日期、時間、傳送貼圖訊息 

  <img src="https://i.ibb.co/zft6v12/RPReplay-Final1594563401.gif" width=250>

* 進入、離開聊天室狀態顯示

  <img src="https://i.ibb.co/m4SMPrP/RPReplay-Final1594568340.gif" width=250>
  
* 顯示他人傳送訊息中狀態

  <img src="https://i.ibb.co/j3tyMBq/RPReplay-Final1594563310.gif" width=250/>

* 同一人在同一分鐘內連續傳送訊息不顯示頭貼及名字，較為簡潔

  <img src="https://i.ibb.co/grTVZpR/2020-07-13-12-15-54.png" width=250>
  
* 上線名單
  




## client 端
* 主要架構使用 React Hook

  * 部分 component 使用 Material-UI 套件 
    <br>如 : 首頁提示使用者選擇頭貼、輸入暱稱之 **snackbar** 、 聊天室內的 **sidebar drawer** 、 **sticker drawer** 、 **sticker popover**
* socket.io-client 

  * 用來和 server 端 socket 溝通
## server 端
* socket.io express 資料庫 mongoDB
