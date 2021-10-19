# liaoliao
<img src="https://i.ibb.co/9nHd9y8/2020-07-25-1-01-39.png">

# 匿名即時聊天室
選個頭貼、想個暱稱就可以進入聊天室聊天
<p></p>
主要以 React 搭配 WebSocket 套件 socket.io 進行前、後端訊息的接收與傳遞<br>
建立一個即時性的 Web 聊天 APP

# <a href="https://cappuuliaoliao.netlify.app/">Demo 連結</a>

# 版本更新 
> v2.1.8
* 修正 - 登入頁面等待頭貼資料取完才結束 Loading

> v2.1.7 (Latest Version)
* 修正 - BongoCat (登入過場動畫) 跑版 

> v2.1.6
* `import axios, eslint, stylelint, editorconfig`
* 新增 - HTML Tag: Open Graph Protocol `<meta property="og:title">`, etc.
* 調整 - 頭貼、貼圖 imageUrl 資訊，由後端 API 取得
* 新增 - 分享功能
* 新增 - 本地開發環境變數
* 重構專案

> v2.1.5
* 設置 - webpack alias (簡化路徑別名 `'../../src' => '@/'`)
* 新增 - 分享功能

> v2.1.4
* `import - redux`
* `update - lodash, webpack-dev-server version`
* 新增 - 泡泡背景開關
* 調整 - 漢堡按鈕樣式
* 修正 - 剛進入聊天室時就加載第二頁訊息
* 新增 - 訊息全部載入完畢的提示

> v2.1.3
* 新增 - Github 連結動畫

> v2.1.2
* 修正 - safari 滾動回彈一次加載兩頁訊息

> v2.1.0
* 新增 - 下拉加載訊息功能
* 新增 - 吐槽白熊貼圖
* 新增 - 訊息日期年份
* 調整 - 泡泡背景上升長度、飛行時間
* 新增 - 聊天室置頂按鈕
* 新增 - sidebar 作者名稱、版本

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
## client side
* 部署 Netlify
* 主要架構使用 React Function Component 、React Hooks

  * 部分 component 使用 Material-UI 套件 
    <br>如 :  首頁提示使用者選擇頭貼、輸入暱稱之 **snackbar** 、 聊天室內的 **sidebar drawer** 、 **sticker drawer** 、 **sticker popover**
* socket.io-client 

  * 與 server side websocket 溝通
* HTTP Request : 以 axios 套件 取得後端 API 貼圖、頭貼資訊

## server side
* 部署 Heroku
* 環境 Node.js, 框架 Express
* socket.io 建置 WebSocket 服務
* 透過 Mongoose 操作 MongoDB 資料庫
* `REST API - route: /avatars (GET), /stickers (GET)`

# 專案安裝流程
## client side    
1. 安裝相依套件   
```
yarn install
```   
2. 設置本地環境變數 - SERVER_ORIGIN  ( 為 socket.io-client 連接的 server endpoint ) 
   
    * 連接至 本地端 server
              
      ```
      yarn server_env --env DEV
      ```   
    * 連接至 Heroku Server
          
      ```
      yarn server_env --env PRD
      ```
3. 啟動應用程式，本機運行
         
    ```
    yarn start    
    ```

## server side       
1. 安裝相依套件
         
      ```
      yarn install
      ```   
2. 開啟後端 server
          
     ```
     yarn start
     ```  
