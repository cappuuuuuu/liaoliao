# liaoliao
<img src="https://i.ibb.co/9nHd9y8/2020-07-25-1-01-39.png">

# 匿名即時聊天室
選個頭貼、想個暱稱就可以進入聊天室聊天
<p></p>
主要以 React 搭配 WebSocket 套件 socket.io 來進行前、後端訊息的接收與傳遞<br>
建立一個即時性的 Web 聊天 APP

# <a href="https://cappuuliaoliao.netlify.app/">Demo</a>

# 版本更新 ( Latest version: v2.0.1 )
> v2.0.1
* 新增吐槽白熊貼圖
* 訊息日期新增年份
* 修改泡泡背景上升長度、飛行時間
* 新增聊天室置頂按鈕
* 新增作者名稱、版本

# 聊天室功能
* 基本的日期、時間、傳送貼圖訊息 

  <img src="https://i.ibb.co/zft6v12/RPReplay-Final1594563401.gif" width=250>

* 進入、離開聊天室狀態顯示

  <img src="https://i.ibb.co/m4SMPrP/RPReplay-Final1594568340.gif" width=250>
  
* 顯示他人傳送訊息中狀態

  <img src="https://i.ibb.co/j3tyMBq/RPReplay-Final1594563310.gif" width=250/>

* 同一人在同一分鐘內連續傳送訊息不顯示頭貼及名字，較為簡潔

  <img src="https://i.ibb.co/grTVZpR/2020-07-13-12-15-54.png" width=250>
  
* 聊天室線上名單

# 架構
## client 端
* 部署於 Netlify
* 主要架構使用 React Function Component 配合 Hooks

  * 部分 component 使用 Material-UI 套件 
    <br>EX :  首頁提示使用者選擇頭貼、輸入暱稱之 **snackbar** 、 聊天室內的 **sidebar drawer** 、 **sticker drawer** 、 **sticker popover**
* socket.io-client 

  * 連接 server 端建置完成的 WebSocket
## server 端
* 部署於 Heroku
* 環境為 Node.js ， Web 架構使用 express
* 以 socket.io 建置 WebSocket 服務
* 透過 mongoose 操作 MongoDB 資料庫 (儲存聊天記錄)

# 專案安裝流程
## client 端
<ol>
  <li>
    開啟 Terminal 進入 client 資料夾
    <p></p>
    <pre><code>cd client</code></pre>
  </li>
  <li>
    安裝 npm 套件
    <p></p>
    <pre><code>npm install</code></pre>
  </li>
  <li>
    啟動應用程式，本機運行
    <p></p>
    <pre><code>npm run start</code></pre>
  </li>
  <li>
    port 預設開啟在 http://localhost:3000
  </li>
  <p></p>
  <li>
    socket.io-client 預設連接至部署於 Heroku 之 server <code>https://caputalk.herokuapp.com/</code> <br>
    <p></p>
    如欲改連接至本地端 server ， 可至 <code>client/src/App.js</code> 改變端點 
    <p></p>
    <pre><code>const endPoint = 'https://caputalk.herokuapp.com/';</code></pre>
    <p></p>
    <pre><code>const endPoint = 'localhost:5000';</code></pre>
  </li>
</ol>

## server 端
<ol>
  <li>
    開啟 Terminal 進入 server 資料夾
    <p></p>
    <pre><code>cd server</code></pre>
  </li>
  <li>
    安裝 npm 套件
    <p></p>
    <pre><code>npm install</code></pre>
  </li>
  
  <li>
    開啟後端 server 
    <p></p>
    <pre><code>npm run start</code></pre>
  </li>
  
  <li>
  Terminal 出現 <code>listening on * : 5000 </code> 訊息代表 server 已成功開啟<br>
  </li>
</ol>

