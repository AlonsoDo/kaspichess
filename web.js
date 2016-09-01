var express = require('express') ;
var http = require('http');
var app = express();
var server = http.createServer(app);
var mysql = require('mysql');
var io = require('socket.io').listen(server);

var nodemailer = require("nodemailer");

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.static(__dirname + '/public'));
});

server.listen(app.get('port'),function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var aPlayers = [];
var aPlayer = ['Id','Name','Elo','Country','Games','Estado','Alt','Room','LastGame'];

io.sockets.on('connection',function(socket){
  
  //socket.set("heartbeat timeout", 10);
  //socket.set("heartbeat interval", 5);
    
  socket.emit('connected',{PlayerId:socket.id});  
  
  socket.on('GetPlayersData',function(data){
    socket.emit('GetPlayersDataBack',{Players:aPlayers}); 
  });
  
  socket.on('CheckPlayerStatus',function(data){
    var PlayerStatus = 'OnLine';
    var Room = -1;
    var GameNumber = -1;
    for (var i=0;i<aPlayers.length;i++) {
      if (aPlayers[i][0]==data){
        PlayerStatus = aPlayers[i][5];
        Room = aPlayers[i][7];
        GameNumber = aPlayers[i][8];
      }      
    }
    console.log(PlayerStatus);
    socket.emit('CheckPlayerStatusBack',{PlayerStatus:PlayerStatus,Room:Room,GameNumber:GameNumber});
  });
  
  socket.on('GetGamesData',function(data){
    
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
        
    client.query("SELECT * FROM games ORDER BY number DESC LIMIT 50",
      function SelectGames(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client.end();
        
        var i;
        var Playing = 0;
        for (i = 0; i < results.length; i++) {
          if (results[i].status=='playing') {
            Playing++;
          }
        }        
        
        socket.emit('GetGamesDataBack',{Games:JSON.stringify(results),GamesPlaying:Playing});       
        
    });
    
  });
  
  socket.on('GetStats',function(data){
    console.log(data.PlayerName);
    
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
        
    client.query("SELECT * FROM autentificacion WHERE User='"+data.PlayerName+"'",
      function SelectGames(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client.end();                
        
        socket.emit('GetStatsBack',{PlayerData:JSON.stringify(results)});       
        
    });
    
  });
  
  socket.on('SendPos',function(data){
    
    //Pedir Pos por followgame
    console.log(data.FromAskPos);
    if (data.FromAskPos) {
      io.sockets.socket(data.IdWhoAsk).emit('SendPosBack',data);  
    }else{ //Normal
      socket.broadcast.to(data.RoomName).emit('SendPosBack',data);
    }
    
    //socket.broadcast.to(data.RoomName).emit('SendPosBack',data);
    
  });
  
  socket.on('GameTimeOff',function(data){
    
    var cQuery;
    
    for (var i=0;i<aPlayers.length;i++) {
      if (aPlayers[i][1]==data.PlayerNameWhoLost){        
        aPlayers[i][2]=data.EloWhoLost;
        aPlayers[i][4]=parseInt(aPlayers[i][4]) + 1;
        aPlayers[i][5]='OnLine';
      }
      if (aPlayers[i][1]==data.PlayerNameWhoWin){        
        aPlayers[i][2]=data.EloWhoWin;
        aPlayers[i][4]=parseInt(aPlayers[i][4]) + 1;
        aPlayers[i][5]='OnLine';
      }
    }
    
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
    
    if (data.InsufficientMaterial){
      cQuery = "UPDATE autentificacion SET Elo='" + data.EloWhoLost+"' , Games=Games+1 , Draws=Draws+1 WHERE User='"+data.PlayerNameWhoLost+"'";
    }else{
      cQuery = "UPDATE autentificacion SET Elo='" + data.EloWhoLost+"' , Games=Games+1 , Losts=Losts+1 WHERE User='"+data.PlayerNameWhoLost+"'";  
    }
    client.query(cQuery,
      function Datos(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client.end();                
    });
    
    var client2 = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client2.query('USE heroku_d6062326996f9df');
        
    if (data.InsufficientMaterial){
      cQuery = "UPDATE autentificacion SET Elo='" + data.EloWhoWin+"' , Games=Games+1 , Draws=Draws+1 WHERE User='"+data.PlayerNameWhoWin+"'"
    }else{
      cQuery = "UPDATE autentificacion SET Elo='" + data.EloWhoWin+"' , Games=Games+1 , Wins=Wins+1 WHERE User='"+data.PlayerNameWhoWin+"'";
    }
    
    client2.query(cQuery,
      function Datos(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client2.end();                
    });
    
    socket.broadcast.to(data.RoomName).emit('GameTimeOffBack',data);
  });
  
  socket.on('DrawByStaleMate',function(data){
    
    var cQuery;
    
    for (var i=0;i<aPlayers.length;i++) {
      if (aPlayers[i][1]==data.OpPlayerName){        
        aPlayers[i][2]=data.OpElo;
        aPlayers[i][4]=parseInt(aPlayers[i][4]) + 1;
        aPlayers[i][5]='OnLine';
      }
      if (aPlayers[i][1]==data.MyPlayerName){        
        aPlayers[i][2]=data.MyElo;
        aPlayers[i][4]=parseInt(aPlayers[i][4]) + 1;
        aPlayers[i][5]='OnLine';
      }
    }
    
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
    
    cQuery = "UPDATE autentificacion SET Elo='" + data.OpElo+"' , Games=Games+1 , Draws=Draws+1 WHERE User='"+data.OpPlayerName+"'";
    
    client.query(cQuery,
      function Datos(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client.end();                
    });
    
    var client2 = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client2.query('USE heroku_d6062326996f9df');
        
    cQuery = "UPDATE autentificacion SET Elo='" + data.MyElo+"' , Games=Games+1 , Draws=Draws+1 WHERE User='"+data.MyPlayerName+"'"
        
    client2.query(cQuery,
      function Datos(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client2.end();                
    });
    
    socket.broadcast.to(data.RoomName).emit('DrawByStaleMateBack',data);
  });
  
  socket.on('DrawBy3Repeat',function(data){
    
    var cQuery;
    
    for (var i=0;i<aPlayers.length;i++) {
      if (aPlayers[i][1]==data.OpPlayerName){        
        aPlayers[i][2]=data.OpElo;
        aPlayers[i][4]=parseInt(aPlayers[i][4]) + 1;
        aPlayers[i][5]='OnLine';
      }
      if (aPlayers[i][1]==data.MyPlayerName){        
        aPlayers[i][2]=data.MyElo;
        aPlayers[i][4]=parseInt(aPlayers[i][4]) + 1;
        aPlayers[i][5]='OnLine';
      }
    }
    
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
    
    cQuery = "UPDATE autentificacion SET Elo='" + data.OpElo+"' , Games=Games+1 , Draws=Draws+1 WHERE User='"+data.OpPlayerName+"'";
    
    client.query(cQuery,
      function Datos(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client.end();                
    });
    
    var client2 = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client2.query('USE heroku_d6062326996f9df');
        
    cQuery = "UPDATE autentificacion SET Elo='" + data.MyElo+"' , Games=Games+1 , Draws=Draws+1 WHERE User='"+data.MyPlayerName+"'"
        
    client2.query(cQuery,
      function Datos(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client2.end();                
    });
    
    socket.broadcast.to(data.RoomName).emit('DrawBy3RepeatBack',data);
  });
  
  socket.on('DrawByInsuficientMaterial',function(data){
    
    var cQuery;
    
    for (var i=0;i<aPlayers.length;i++) {
      if (aPlayers[i][1]==data.OpPlayerName){        
        aPlayers[i][2]=data.OpElo;
        aPlayers[i][4]=parseInt(aPlayers[i][4]) + 1;
        aPlayers[i][5]='OnLine';
      }
      if (aPlayers[i][1]==data.MyPlayerName){        
        aPlayers[i][2]=data.MyElo;
        aPlayers[i][4]=parseInt(aPlayers[i][4]) + 1;
        aPlayers[i][5]='OnLine';
      }
    }
    
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
    
    cQuery = "UPDATE autentificacion SET Elo='" + data.OpElo+"' , Games=Games+1 , Draws=Draws+1 WHERE User='"+data.OpPlayerName+"'";
    
    client.query(cQuery,
      function Datos(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client.end();                
    });
    
    var client2 = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client2.query('USE heroku_d6062326996f9df');
        
    cQuery = "UPDATE autentificacion SET Elo='" + data.MyElo+"' , Games=Games+1 , Draws=Draws+1 WHERE User='"+data.MyPlayerName+"'"
        
    client2.query(cQuery,
      function Datos(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client2.end();                
    });
    
    socket.broadcast.to(data.RoomName).emit('DrawByInsuficientMaterialBack',data);
  });
  
  socket.on('DrawBy50MovesRule',function(data){
    
    var cQuery;
    
    for (var i=0;i<aPlayers.length;i++) {
      if (aPlayers[i][1]==data.OpPlayerName){        
        aPlayers[i][2]=data.OpElo;
        aPlayers[i][4]=parseInt(aPlayers[i][4]) + 1;
        aPlayers[i][5]='OnLine';
      }
      if (aPlayers[i][1]==data.MyPlayerName){        
        aPlayers[i][2]=data.MyElo;
        aPlayers[i][4]=parseInt(aPlayers[i][4]) + 1;
        aPlayers[i][5]='OnLine';
      }
    }
    
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
    
    cQuery = "UPDATE autentificacion SET Elo='" + data.OpElo+"' , Games=Games+1 , Draws=Draws+1 WHERE User='"+data.OpPlayerName+"'";
    
    client.query(cQuery,
      function Datos(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client.end();                
    });
    
    var client2 = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client2.query('USE heroku_d6062326996f9df');
        
    cQuery = "UPDATE autentificacion SET Elo='" + data.MyElo+"' , Games=Games+1 , Draws=Draws+1 WHERE User='"+data.MyPlayerName+"'"
        
    client2.query(cQuery,
      function Datos(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client2.end();                
    });
    
    socket.broadcast.to(data.RoomName).emit('DrawBy50MovesRuleBack',data);
  });
  
  socket.on('AcceptDraw',function(data){
    
    var cQuery;
    
    for (var i=0;i<aPlayers.length;i++) {
      if (aPlayers[i][1]==data.OpPlayerName){        
        aPlayers[i][2]=data.OpElo;
        aPlayers[i][4]=parseInt(aPlayers[i][4]) + 1;
        aPlayers[i][5]='OnLine';
      }
      if (aPlayers[i][1]==data.MyPlayerName){        
        aPlayers[i][2]=data.MyElo;
        aPlayers[i][4]=parseInt(aPlayers[i][4]) + 1;
        aPlayers[i][5]='OnLine';
      }
    }
    
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
    
    cQuery = "UPDATE autentificacion SET Elo='" + data.OpElo+"' , Games=Games+1 , Draws=Draws+1 WHERE User='"+data.OpPlayerName+"'";
    
    client.query(cQuery,
      function Datos(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client.end();                
    });
    
    var client2 = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client2.query('USE heroku_d6062326996f9df');
        
    cQuery = "UPDATE autentificacion SET Elo='" + data.MyElo+"' , Games=Games+1 , Draws=Draws+1 WHERE User='"+data.MyPlayerName+"'"
        
    client2.query(cQuery,
      function Datos(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client2.end();                
    });
    
    socket.broadcast.to(data.RoomName).emit('AcceptDrawBack',data);
  });
  
  socket.on('GameResign',function(data){
    
    var cQuery;
    
    for (var i=0;i<aPlayers.length;i++) {
      if (aPlayers[i][1]==data.PlayerNameWhoLost){        
        aPlayers[i][2]=data.EloWhoLost;
        aPlayers[i][4]=parseInt(aPlayers[i][4]) + 1;
        aPlayers[i][5]='OnLine';
      }
      if (aPlayers[i][1]==data.PlayerNameWhoWin){        
        aPlayers[i][2]=data.EloWhoWin;
        aPlayers[i][4]=parseInt(aPlayers[i][4]) + 1;
        aPlayers[i][5]='OnLine';
      }
    }
    
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
    
    if (data.InsufficientMaterial){
      cQuery = "UPDATE autentificacion SET Elo='" + data.EloWhoLost+"' , Games=Games+1 , Draws=Draws+1 WHERE User='"+data.PlayerNameWhoLost+"'";
    }else{
      cQuery = "UPDATE autentificacion SET Elo='" + data.EloWhoLost+"' , Games=Games+1 , Losts=Losts+1 WHERE User='"+data.PlayerNameWhoLost+"'";  
    }
    client.query(cQuery,
      function Datos(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client.end();                
    });
    
    var client2 = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client2.query('USE heroku_d6062326996f9df');
        
    if (data.InsufficientMaterial){
      cQuery = "UPDATE autentificacion SET Elo='" + data.EloWhoWin+"' , Games=Games+1 , Draws=Draws+1 WHERE User='"+data.PlayerNameWhoWin+"'"
    }else{
      cQuery = "UPDATE autentificacion SET Elo='" + data.EloWhoWin+"' , Games=Games+1 , Wins=Wins+1 WHERE User='"+data.PlayerNameWhoWin+"'";
    }
    
    client2.query(cQuery,
      function Datos(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client2.end();                
    });
    
    socket.broadcast.to(data.RoomName).emit('GameResignBack',data);
  });
  
  socket.on('WinByMate',function(data){
    
    var cQuery;
    
    for (var i=0;i<aPlayers.length;i++) {
      if (aPlayers[i][1]==data.PlayerNameWhoLost){        
        aPlayers[i][2]=data.EloWhoLost;
        aPlayers[i][4]=parseInt(aPlayers[i][4]) + 1;
        aPlayers[i][5]='OnLine';
      }
      if (aPlayers[i][1]==data.PlayerNameWhoWin){        
        aPlayers[i][2]=data.EloWhoWin;
        aPlayers[i][4]=parseInt(aPlayers[i][4]) + 1;
        aPlayers[i][5]='OnLine';
      }
    }
    
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
        
    cQuery = "UPDATE autentificacion SET Elo='" + data.EloWhoLost+"' , Games=Games+1 , Losts=Losts+1 WHERE User='"+data.PlayerNameWhoLost+"'";  
    
    client.query(cQuery,
      function Datos(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client.end();                
    });
    
    var client2 = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client2.query('USE heroku_d6062326996f9df');
        
    cQuery = "UPDATE autentificacion SET Elo='" + data.EloWhoWin+"' , Games=Games+1 , Wins=Wins+1 WHERE User='"+data.PlayerNameWhoWin+"'";
        
    client2.query(cQuery,
      function Datos(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client2.end();                
    });
    
    socket.broadcast.to(data.RoomName).emit('WinByMateBack',data);
  });
  
  socket.on('AbortGame',function(data){
    console.log('Game Aborted');
    for (var i=0;i<aPlayers.length;i++) {
      if (aPlayers[i][1]==data.MyPlayerName){        
        aPlayers[i][5]='Aborted';
      }
      if (aPlayers[i][1]==data.OpPlayerName){         
        aPlayers[i][5]='Aborted';
      }
    }
    socket.broadcast.to(data.RoomName).emit('GameAbortedBack',data);
  });
    
  socket.on('AceptarReto',function(data){
    io.sockets.socket(data.OpId).emit('AceptarRetoBack',data);
  });
  
  socket.on('MakeCall',function(data){
    var lFound = false;
    var PlayerName = 'Not Found';
    for (var i=0;i<aPlayers.length;i++) {
      if (aPlayers[i][0]==data.WhoPlayer){                
        lFound = true;
        PlayerName = aPlayers[i][1];
        io.sockets.socket(data.WhoPlayer).emit('MakeBackCall',data);
        socket.emit('PlayerName',{PlayerName:PlayerName});
      }      
    }
    if (lFound==false) {
      socket.emit('PlayerName',{PlayerName:PlayerName}); 
    }
    console.log(PlayerName);
    console.log('ID: '+data.WhoPlayer);
    console.log('Call from: '+data.NamePlayer);
  });
  
  socket.on('CancelarReto',function(data){
    for (var i=0;i<aPlayers.length;i++) {
      if (aPlayers[i][0]==data.PlayerId){
        if (aPlayers[i][5]=='Challenging') {
          aPlayers[i][5]='OnLine';  
        }        
        console.log('Cancelar Reto');                
      }      
    }
    socket.broadcast.emit('CancelarRetoBack',data);
  });
  
  socket.on('MandarReto',function(data){
    for (var i=0;i<aPlayers.length;i++) {
      if (aPlayers[i][0]==data.DatosReto.Id){
        aPlayers[i][5]='Challenging';
        console.log('coincide');                
      }      
    }
    socket.broadcast.emit('MandarRetoBack',data);
  }); 
  
  socket.on('disconnect', function(){
    var Room;    
    //Delete Player
    for (var i=0;i<aPlayers.length;i++) {
      if (aPlayers[i][0]==socket.id){
        if (aPlayers[i][5]=='Playing') {
          console.log('disconnect playing');
          Room=aPlayers[i][7];
          socket.broadcast.to(Room).emit('DisconnectPlaying',{PlayerName:aPlayers[i][1]});
        }        
        aPlayers.splice(i,1);        
      }      
    }
    console.log(aPlayers.length);
  });
  
  socket.on('AskPlayersLabels', function(data){    
    var WhiteName = 'Not Found';
    var WhiteElo = '1200';
    var WhiteCountry = 'AD';
    var WhiteAlt = 'Andorra';
    var BlackName = 'Not Found';
    var BlackElo = '1200';
    var BlackCountry = 'AD';
    var BlackAlt = 'Andorra';
    var GameNumber = -1;
    var WhoPlayer = -1;
    
    for (var i=0;i<aPlayers.length;i++) {
      if (aPlayers[i][1]==data.WhiteName){        
        WhiteName = aPlayers[i][1];
        WhiteElo = aPlayers[i][2];
        WhiteCountry = aPlayers[i][3];
        WhiteAlt = aPlayers[i][6];
        GameNumber = aPlayers[i][8];
      }
      if (aPlayers[i][1]==data.BlackName){        
        BlackName = aPlayers[i][1];
        BlackElo = aPlayers[i][2];
        BlackCountry = aPlayers[i][3];
        BlackAlt = aPlayers[i][6];       
      }
      if (aPlayers[i][0]==data.MyId) {
        aPlayers[i][5]='Watching';
        WhoPlayer = i;
      }      
    }
    aPlayers[WhoPlayer][8]=GameNumber;
    // Mandar a Observador
    io.sockets.socket(data.MyId).emit('AskPlayersLabelsBack',{Timing:data.Timing,WhiteName:WhiteName,BlackName:BlackName,WhiteElo:WhiteElo,BlackElo:BlackElo,WhiteCountry:WhiteCountry,BlackCountry:BlackCountry,WhiteAlt:WhiteAlt,BlackAlt:BlackAlt});
    console.log(data.WhiteName);
  }); 
  
  socket.on('SendPlayerData',function(data){    
    aPlayer[0]=data.MyPlayerId;
    aPlayer[1]=data.MyPlayerName;
    aPlayer[2]=data.Elo;
    aPlayer[3]=data.Country;
    aPlayer[4]=data.Games;
    aPlayer[5]='OnLine';
    aPlayer[6]=data.Alt;
    var aBuffer = new Array(8);
    for(var i = 0; i < aBuffer.length; i++){
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
  
  socket.on('chat2',function(data){
    console.log(data);    
    //io.sockets.in(data.WhiteIdPrivate).emit('chatback2',data);
    socket.broadcast.to(data.WhiteIdPrivate).emit('chatback2',data);
  });
  
  socket.on('subscribe', function(data){
    // Set Room to player
    for (var i=0;i<aPlayers.length;i++) {
      if (aPlayers[i][0]==socket.id){        
        aPlayers[i][7]=data.WhiteIdPrivate;
      }
    }
    socket.join(data.WhiteIdPrivate);
    console.log(data.WhiteIdPrivate);
    console.log('Join');
  })
  
  socket.on('unsubscribe', function(data){
    socket.leave(data.WhiteIdPrivate);
    console.log('Leave room: '+data.WhiteIdPrivate);
  })
  
  socket.on('OfferingDraw', function(data){    
    console.log('recived offering draw');
    socket.broadcast.to(data.RoomName).emit('OfferingDrawRecive',{});
  })
  
  socket.on('OfferingRematch', function(data){    
    console.log('recived offering rematch');
    //socket.broadcast.to(data.RoomName).emit('OfferingRematchRecive',{});
    io.sockets.socket(data.OpId).emit('OfferingRematchRecive',{});
  })  
  
  socket.on('DeclinedDraw', function(data){    
    console.log('declined draw');
    socket.broadcast.to(data.RoomName).emit('DeclinedDrawBack',{});
  })
  
  socket.on('DeclinedRematch', function(data){    
    console.log('declined rematch');
    socket.broadcast.to(data.RoomName).emit('DeclinedRematchBack',{});
  })
  
  socket.on('AcceptRematch', function(data){    
    console.log('accept rematch');
    //socket.broadcast.to(data.RoomName).emit('AcceptRematchBack',data);
    io.sockets.socket(data.OpId).emit('AcceptRematchBack',data);
  })
  
  socket.on('AskPos', function(data){
    //Pedir posicion
    io.sockets.socket(data.WhiteIdPrivate).emit('AskPos',data);    
    console.log('Ask position');
  })
  
  socket.on('IfGameActive',function(data){
    console.log(data);
    
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
        
    client.query("SELECT * FROM games WHERE number=" + data + " and status='Playing'",
      function SelectPlayer(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client.end();
        socket.emit('IfGameActiveBack',JSON.stringify(results));
    });
    
  })
  
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
        socket.emit('RegisterPlayerBack',{User:data.cName,Country:data.cCountry,Alt:data.cAlt});
    });    
    
  });
  
  socket.on('RegisterGame',function(data){
    
    // Set Players Playing
    for (var i=0;i<aPlayers.length;i++) {
      if (aPlayers[i][0]==data.whiteid){
          aPlayers[i][5]='Playing';
          console.log('Playing');
      }
      if (aPlayers[i][0]==data.blackid){
          aPlayers[i][5]='Playing';
          console.log('Playing');
      }
    }
    
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');    
      
    var momento = data.when;
    var estado = data.status;
    var mostrar = data.show;
    
    client.query("INSERT INTO games (cuando,status,mostrar,whitename,blackname,whiteelo,blackelo,whiteid,blackid,timing) VALUES ('"+momento+"','"+estado+"','"+mostrar+"','"+data.whitename+"','"+data.blackname+"','"+data.whiteelo+"','"+data.blackelo+"','"+data.whiteid+"','"+data.blackid+"','"+data.timing+"')",
      function RegisterGame(err,results,fields){ 
        if (err){
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);        
        // Set Last Game number playing
        for (var i=0;i<aPlayers.length;i++) {
          if (aPlayers[i][0]==data.whiteid){
            aPlayers[i][8]=results.insertId;
            console.log(results.insertId);
            io.sockets.socket(data.whiteid).emit('RegisterGameBack',{GameNumber:results.insertId});            
          }
          if (aPlayers[i][0]==data.blackid){
            aPlayers[i][8]=results.insertId;
            console.log(results.insertId);
            io.sockets.socket(data.blackid).emit('RegisterGameBack',{GameNumber:results.insertId});
          }
        }
        client.end();       
    });  
    
  });  
  
  socket.on('SalvarDatosReto',function(data){
    
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
        
    client.query("UPDATE autentificacion SET Minutes='" + data.Minutos + "' , Seconds='"+data.Segundos+"' , MinElo='"+data.MinRat+"' , MaxElo='"+data.MaxRat+"' , Rated='"+data.SelectRated+"' , Color='"+data.ColorPartida+"' WHERE User='"+data.Name+"'",
      function DatosReto(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client.end();                
    });    
    
  });
  
  socket.on('SalvarDatosSetting',function(data){
    
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
        
    client.query("UPDATE autentificacion SET HighLight='" + data.HighLight + "' , Promote='"+data.Promote+"' , Sound='"+data.Sound+"' , Welcome='"+data.Welcome+"' , Country='"+data.MyCountry+"' , Alt='"+data.Alt+"' , Coordenadas='"+data.ShowCoord+"' WHERE User='"+data.MyName+"'",
      function DatosReto(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client.end();                
    });
    console.log('SalvarDatosSetting');
    
  });

  socket.on('SendPass',function(data){  
  
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
        
    client.query("SELECT PassWord,Email FROM autentificacion WHERE User='"+data.cName+"'",
      function SelectPlayer(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results[0].PassWord);
        
        var cPassWord = results[0].PassWord;
        var cEmail = results[0].Email;
        
        var smtpTransport = nodemailer.createTransport("SMTP",{
          service: "Gmail",
          auth: {
              user: "alonso.caspi@gmail.com",
              pass: "AJDEMCBMAMDBSDB"
         }
        });        
        smtpTransport.sendMail({
          from: "KaspiChess <alonso.caspi@gmail.com>", // sender address
          to: cEmail , // comma separated list of receivers
          subject: "Here is your password",    
          text:   
              "Hello Friend \r\n" +
              " \r\n" +
              " Forgot your data? Do not worry.\r\n" +
              " Here are.\r\n" +
              " \r\n" +
              " Your User Name: " + data.cName + "\r\n" +
              " Your Password: " + cPassWord + "\r\n" +
              " \r\n" +
              " I hope you continue enjoying at KaspiChess.\r\n" +
              " Best regards."   
        }, function(error, response){
          if(error){
            console.log(error);
          }else{
            console.log("Message sent: " + response.message);
          }
        });
        smtpTransport.close();
        console.log('hecho');              
        client.end();        
    });  
  });
  
  socket.on('SendGame',function(data){  
  
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
        
    client.query("SELECT Email FROM autentificacion WHERE User='"+data.cName+"'",
      function SelectPlayer(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results[0].Email);
        
        var cEmail = results[0].Email;
        
        var smtpTransport = nodemailer.createTransport("SMTP",{
          service: "Gmail",
          auth: {
              user: "alonso.caspi@gmail.com",
              pass: "AJDEMCBMAMDBSDB"
         }
        });        
        smtpTransport.sendMail({
          from: "KaspiChess <alonso.caspi@gmail.com>", // sender address
          to: cEmail , // comma separated list of receivers
          subject: "Here is your game",    
          text: data.Partida                
        }, function(error, response){
          if(error){
            console.log(error);
          }else{
            console.log("Message sent: " + response.message);
          }
        });
        smtpTransport.close();
        console.log('hecho');              
        client.end();        
    });  
  });
  
  socket.on('UpdateGameStatus',function(data){
    
    console.log('Resultado Partida: ' + data.cStatus);
    console.log('Numero Partida: ' + data.nGameNumber);
    
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306'      
      
    });
    
    client.query('USE heroku_d6062326996f9df');
        
    client.query("UPDATE games SET status='" + data.cStatus + "' WHERE number='"+data.nGameNumber+"'",
      function DatosReto(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client.end();                
    });
  }); 
 
}); // End io.sockets.on('connection')