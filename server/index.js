const fs = require('fs');
const cors = require('cors');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const { pushData , getData } = require('./records.js');
const { removeUser , addUser , checkUsers } = require('./users');


const port = process.env.PORT || 5000 ; 

app.get('/', (req, res) => {
    res.send("<h1>Hello here is liaoliao's backend server</h1>");
    
  });

app.use(cors());  

io.on('connection', (socket) => {

    socket.on('getRecord', async (page) => {
        const loadNumber = 20
        const allHistory = await getData()
        const sliceIndex = allHistory.length - (page - 1) * loadNumber
        const pageHistory = allHistory.slice(sliceIndex - loadNumber < 0 ? 0 : sliceIndex - loadNumber, sliceIndex)
        const data = {
          page: page,
          data: pageHistory,
          total: allHistory.length,
        }
        socket.emit("chatRecord", data)
    })

    socket.on('checkUser', (user)=>{
      socket.emit('checkResult',checkUsers(user))
      
    })

    socket.on('join',({ name , avatar})=>{
      let newUsers = addUser({ name , avatar ,id: socket.id });
      io.emit('join', newUsers );
      
    })

    socket.on('sendMessage', (data) => {
        pushData(data);
        io.emit('getMessage',data);
    });

    socket.on('typing',(data)=>{
        io.emit('typing', data)
    })

    socket.on('disconnect',()=>{
      let leftUser = removeUser(socket.id);
      if(leftUser){
          io.emit('userLeft',leftUser);
      }
      
      
    })
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
