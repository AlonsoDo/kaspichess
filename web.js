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

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


/* Heroku setting for long polling
io.configure(function () { 
    io.set("transports", ["xhr-polling"]); 
    io.set("polling duration", 10); 
});*/

io.sockets.on('connection', function (socket) {
  
  socket.emit('news', { hello: 'world' });
  
  socket.on('my other event', function (data) {
    console.log(data);
  });
  
  /*socket.on('Ejemplo', function (data) {
    console.log(data);
    var client = mysql.createConnection({
      
      user: 'b8173383f00cf9',
      password: 'eef44ffc',
      host: 'us-cdbr-east-04.cleardb.com',
      port: '3306',
      
      user: 'root',
      password: 'charly',
      host: '',
      port: '3306',
      
    });
    
    //client.query('USE heroku_d6062326996f9df');
    client.query('USE comander');
    
    client.query('SELECT * FROM producto WHERE CodigoPadre='+data.codigoproducto,
      function selectGrupos(err, results, fields) { 
        if (err) {
          console.log('Error: ' + err.message);
          throw err;
        } 
        console.log('Number of rows: '+results.length);
        console.log(results);
        client.end();
        socket.emit('EjemploBack',JSON.stringify(results));
    });      
  });*/
 
}); // End io.sockets.on('connection')