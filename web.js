var express = require('express') ;
var http = require('http');
var app = express();
var server = http.createServer(app);
var mysql = require('mysql');
var io = require('socket.io').listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.static(__dirname + '/public'));
});

server.listen(app.get('port'),function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var aPlayers = [];
var aPlayer = ['Id','Name','Elo','Country','Games'];

io.sockets.on('connection',function(socket){  
    
  socket.emit('connected',{PlayerId:socket.id}); 
  
  socket.on('AceptarReto',function(data){
    io.sockets.socket(data.OpId).emit('AceptarRetoBack',data);
  });
  
  socket.on('CancelarReto',function(data){
    socket.broadcast.emit('CancelarRetoBack',data);
  });
  
  socket.on('MandarReto',function(data){
    socket.broadcast.emit('MandarRetoBack',data);
  }); 
  
  socket.on('disconnect', function(){
    console.log('disconnect');
    //Delete Player
    for (var i=0;i<aPlayers.length;i++) {
      if (aPlayers[i][0]==socket.id){
        console.log('coincide');
        aPlayers.splice(i,1);        
      }      
    }
    console.log(aPlayers.length);
  });  
  
  socket.on('SendPlayerData',function(data){    
    aPlayer[0]=data.MyPlayerId;
    aPlayer[1]=data.MyPlayerName;
    aPlayer[2]=data.Elo;
    aPlayer[3]=data.Country;
    aPlayer[4]=data.Games;
    var aBuffer = new Array(5);
    for	(var i = 0; i < aBuffer.length; i++){
        aBuffer[i] = aPlayer[i];
    }
    aPlayers.push(aBuffer);
    console.log(aPlayer);
    socket.emit('PlayersOnline',{PlayersOnline:aPlayers.length});  //Clients onLine
  });
  
  socket.on('chat',function(data){
    console.log(data);
    socket.broadcast.emit('chatback',data);
  });
  
  socket.on('login',function(data){
    
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
        
    client.query("SELECT * FROM autentificacion WHERE User='"+data.cName+"' AND PassWord='"+data.cPassword+"'",
      function SelectPlayer(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client.end();
        socket.emit('LoginBack',JSON.stringify(results));
    });
    
  });
  
  
  socket.on('TryRegister',function(data){
    
    var lFound = false;
    
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
        
    client.query("SELECT * FROM autentificacion WHERE User='"+data.cName+"'",
      function TryRegisterPlayer(err,results,fields){ 
        if (err){
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client.end();        
        if (results.length==1){
          lFound = true;
        }        
        socket.emit('CheckIfRegisterBack',{Found:lFound});                
    });    
    
  });
  
  socket.on('RegisterPlayer',function(data){
    
    var lFound = false;
    
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
        
    client.query("INSERT INTO autentificacion(User,PassWord,Email,DateSignUp,Country,Alt) VALUES ('"+data.cName+"','"+data.cPassword+"','"+data.cEmail+"','"+data.dDate+"','"+data.cCountry+"','"+data.cAlt+"')",
      function RegisterPlayer(err,results,fields){ 
        if (err){
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client.end();
        socket.emit('RegisterPlayerBack',{User:data.cName,Country:data.cCountry});
    });    
    
  });  
  
 
}); // End io.sockets.on('connection')