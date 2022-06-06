const socket = io(); // remove it to connect with localhost  https://enigmatic-island-34591.herokuapp.com/
var userName = '';
var content ="";


userName =  'user_'+Math.floor(Math.random() * 1000000);

socket.emit('user',userName);

socket.on('message',function(data){
    var msg = data.msg;
    var userId = data.userId;

    if(userId==userName){
        var inbox = document.getElementById('userName').innerHTML = "Me: "+data.msg;
        content +=  '<div class="me"><p id="myMsg">'+msg+'</p></div>'
    }
    else{
        var inbox = document.getElementById('userName').innerHTML =data.userId +": "+data.msg;
        content +=  '<div class="you"><p id="myMsg">'+msg+'</p></div>'
    }
    document.getElementById('inbox').innerHTML = content;
})


 function sendMsg(){

     var inbox = document.getElementById('input').value;
     var msgBody = {
        msg:inbox,
        userId:userName
     }
     socket.emit('message',msgBody);
     document.getElementById('input').value = '';
 }

