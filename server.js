const { createConnection } = require('net');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
   cors: {
     origin: "http://localhost:4200",
     methods: ["GET", "POST"]
   }
 });
const cors = require('cors');
app.use(cors());
// app.get('/', function(req, res) {
//    res.sendfile('index.html');
// });



//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   let generatedNumber;
   setInterval(()=>{
      generatedNumber= Math.floor(Math.random()*4);
      socket.emit('show',generatedNumber);
      console.log('generatedNumber',generatedNumber);
   },2000)
    
 
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });


http.listen(3000, function() {
   console.log('listening on *:3000');
});