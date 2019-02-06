$(document).ready(function (){
    var socket = io();

    setInterval(function(){ 
        socket.emit('realTime');   
    }, 5000);

    socket.on('result', function(data){
        $('#countNum').html(JSON.stringify(data.amount));
    })

    $('#clicker').click(function(){
        socket.emit('clicked');
    })

    $('#reset').click(function(){
        socket.emit('reset');
    })
    
 })