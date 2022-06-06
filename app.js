const express = require('express')
const socketio = require('socket.io')
const app = express()


app.use(express.static('public'))

app.get('/', (req, res)=> {
    res.sendFile('index')
})

app.get('/test', (req, res)=> {
    res.sendFile('test')
})

var port = process.env.PORT || 3005;

const server = app.listen(port, () => {
    console.log("server is running "+port)
})

//initialize socket for the server
const io = socketio(server)

io.on('connection', socket => {
  console.log('connection establish')
  socket.on('user',function(userName){
      console.log('User '+ userName + ' connected');
  })

  socket.on('message',function(data){
      io.emit('message',data)
      console.log(data)
  })

  socket.emit('message',{
      userId:"From server",
      msg:"welcome to realtime chat"
  })

  socket.emit('sms',{
    userId:"From server",
    msg:"hello sir it's silent sms app",
    phoneNo:"919045124201"
})

})


/*
https://enigmatic-island-34591.herokuapp.com/

*/
