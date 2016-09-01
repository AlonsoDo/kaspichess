function EloToPos( Points ) {
	
	var Posicion;
        
        if (Points >= 2700){
		Posicion = 1;		
	}else if (Points <= 2700 && Points >= 2450){ //250
		Posicion = 2;		
	}else if (Points <= 2450 && Points >= 2250){ //200
		Posicion = 3;		
	}else if (Points <= 2250 && Points >= 2100){ //150
		Posicion = 4;		
	}else if (Points <= 2100 && Points >= 2000){ //100
		Posicion = 5;		
	}else if (Points <= 2000 && Points >= 1925){ //75
		Posicion = 6;		
	}else if (Points <= 1925 && Points >= 1875){ //50
		Posicion = 7;		
	}else if (Points <= 1875 && Points >= 1850){ //25
		Posicion = 8;		
	}else if (Points <= 1850 && Points >= 1825){ //25
		Posicion = 9;		
	}else if (Points <= 1825 && Points >= 1800){ //25 ----
		Posicion = 10;		
	}else if (Points <= 1800 && Points >= 1775){ //25
		Posicion = 11;			
	}else if (Points <= 1775 && Points >= 1750){ //25
		Posicion = 12;		
	}else if (Points <= 1750 && Points >= 1725){ //25
		Posicion = 13;		
	}else if (Points <= 1725 && Points >= 1700){ //25
		Posicion = 14;		
	}else if (Points <= 1700 && Points >= 1650){ //50
		Posicion = 15;		
	}else if (Points <= 1650 && Points >= 1525){ //75
		Posicion = 16;	
	}else if (Points <= 1525 && Points >= 1425){ //100
		Posicion = 17;		
	}else if (Points <= 1425 && Points >= 1275){ //150
		Posicion = 18;		
	}else if (Points <= 1275 && Points >= 1075){ //200
		Posicion = 19;
	}else if (Points <= 1075 && Points >= 875){ //200
		Posicion = 20;		
	}else if (Points <= 875){
		Posicion = 21;
	}
	
	return Posicion;	
}

function TimeToPos( Seg ) {
	
	var Posicion;
        
        if (Seg == 60){
		Posicion = 1;		
	}else if (Seg > 60 && Seg <= 90){
		Posicion = 2;
	}else if (Seg > 90 && Seg <= 120){
		Posicion = 3;
	}else if (Seg > 120 && Seg <= 180){
		Posicion = 4;
	}else if (Seg > 180 && Seg <= 210){
		Posicion = 5;
	}else if (Seg > 210 && Seg <= 240){
		Posicion = 6;
	}else if (Seg > 240 && Seg <= 270){
		Posicion = 7;
	}else if (Seg > 270 && Seg <= 300){ //5min
		Posicion = 8;
	}else if (Seg > 300 && Seg <= 330){
		Posicion = 9;
	}else if (Seg > 330 && Seg <= 360){ //6min
		Posicion = 10;
	}else if (Seg > 360 && Seg <= 420){ //60
		Posicion = 11;
	}else if (Seg > 420 && Seg <= 510){ //90
		Posicion = 12;
	}else if (Seg > 510 && Seg <= 630){ //120
		Posicion = 13;
	}else if (Seg > 630 && Seg <= 810){ //180
		Posicion = 14;
	}else if (Seg > 810 && Seg <= 1170){ //360
		Posicion = 15;
	}else if (Seg > 1170 && Seg <= 1890){ //720
		Posicion = 16;
	}else if (Seg > 1890 && Seg <= 3330){ //1440
		Posicion = 17;
	}else if (Seg > 3330 && Seg <= 6000){ 
		Posicion = 18;
	}else if (Seg > 6000){ 
		Posicion = 19;
	}	
	
	return Posicion;
}

function getUrlVars(){
    
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
   
    for(var i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        hash[1] = unescape(hash[1]);
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
   
    return vars;
}

function SendChatText(){
        
    var cNickName = cUserName;
    var cTxtChat = $('#stxaMsg').val();
    
    socket.emit('chat',{Name:cUserName,Menssage:cTxtChat});
                
    $('#sdivChat').append('<span style="color:red; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                            cNickName + ': ' + '</span>' + 
                            '<span style="color:green; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                            cTxtChat + '</span><br>');
    $('#sdivChat').animate({scrollTop:$('#sdivChat').prop('scrollHeight')},500);
    $('#stxaMsg').val('');    
        
}

function SendChatText2(){
        
    var cNickName = cUserName;
    var cTxtChat2 = $('#stxaMsg2').val();
    
    socket.emit('chat2',{Name:cUserName,Menssage:cTxtChat2,WhiteIdPrivate:cWhiteIdPrivate});
                
    $('#sdivChat2').append('<span style="color:red; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                            cNickName + ': ' + '</span>' + 
                            '<span style="color:green; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                            cTxtChat2 + '</span><br>');
    $('#sdivChat2').animate({scrollTop:$('#sdivChat2').prop('scrollHeight')},500);
    $('#stxaMsg2').val('');    
        
}

function GetChatText(data){
    
    $('#sdivChat').append('<span style="color:red; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                            data.Name + ': ' + '</span>' + 
                            '<span style="color:green; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                            data.Menssage + '</span><br>');
    $('#sdivChat').animate({scrollTop:$('#sdivChat').prop('scrollHeight')},500);
    
}

function GetChatText2(data){
    
    $('#sdivChat2').append('<span style="color:red; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                            data.Name + ': ' + '</span>' + 
                            '<span style="color:green; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                            data.Menssage + '</span><br>');
    $('#sdivChat2').animate({scrollTop:$('#sdivChat2').prop('scrollHeight')},500);
    
}

function Welcome(){
    
    var cNickName = cUserName;
    
    $('#sdivChat').append('<span style="color:red; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                            'Sys: ' + '</span>' + 
                            '<span style="color:green; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                            'Welcome ' + cNickName +'</span><br>');
    $('#sdivChat').append('<span style="color:red; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                            'Sys: ' + '</span>' + 
                            '<span style="color:green; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                            'Your initial rating is:  ' + MyElo +'</span><br>');
}

function PlayersOnLine(nPlayersOnline){
    
    $('#sdivChat').append('<span style="color:red; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                            'Sys: ' + '</span>' + 
                            '<span style="color:green; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                            'Players Online: ('+ nPlayersOnline +')</span><br>');

}

function QueenExist(Name){
    
    var objects = canvas.getObjects();

    for ( var x=0; x < objects.length; x++){
        if (canvas.item(x).name==Name) {
            return true;          
        }        
    }
    
    return false;
}

function PieceExist(Name){
    
    var objects = canvas.getObjects();

    for ( var x=0; x < objects.length; x++){
        if (canvas.item(x).name==Name) {
            return true;          
        }        
    }
    
    return false;
}

function VaciarRetos(){
    
    clearInterval(Temp);
    
    for (var i=0;i<aControlRetos.length;i++) {
        getItemByName2(aControlRetos[i].Id).remove();        
    }
    
    aControlRetos = [];
    canvas2.renderAll();
    
}

function GetPlayersData(data){    
    
    WhoPlayer = -1;    
    
    var cName,cElo,cCountry,cAlt,cStatus,cGames,cIdPlayer;    
    
    $('#list1').jqGrid('clearGridData');
    
    for(var i=0;i<data.Players.length;i++){
        
        cName = data.Players[i][1];
        cElo = data.Players[i][2];
        cCountry = data.Players[i][3];
        cAlt = data.Players[i][6];
        cStatus = data.Players[i][5];
        cGames = data.Players[i][4];
        cIdPlayer = data.Players[i][0];
                
        jQuery("#list1").jqGrid('addRowData',i+1,{ Name:cName , Elo:cElo , Country:cCountry , Alt:cAlt , Status:cStatus , Games:cGames , IdPlayer:cIdPlayer});
            
    }
    
    $('#lPlayerOnLine').remove();
    $('#lPlayerOnLine2').remove();
    
    $('#BotonesPlayers').append('<label id="lPlayerOnLine" style="color:red; margin-left:10px; margin-top:18px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px;">Player onLine:</label>');								
    $('#BotonesPlayers').append('<label id="lPlayerOnLine2" style="color:green; margin-left:10px; margin-top:18px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px;">'+data.Players.length+'</label>');								
    
}

function GetGamesData(data){
    
    nGameNumber = -1;
    
    var nGamesInProgress = data.GamesPlaying;
    var dataJson = eval(data.Games);
    
    var cWhiteName;
    var cWhiteElo;
    var cBlackName;
    var cBlackElo;
    var cNumber;
    var cWhen;
    var cStatus;
    var cTiming;				
    var cWhiteId;
    var cBlackId;
    var cShow;

    $('#list2').jqGrid('clearGridData');
    
    for(var j in dataJson){
	             
	cWhiteName = dataJson[j].whitename;
	cWhiteElo = dataJson[j].whiteelo;
	cBlackName = dataJson[j].blackname;
	cBlackElo = dataJson[j].blackelo;
	cNumber = dataJson[j].number;
	cWhen = dataJson[j].cuando;
	cStatus = dataJson[j].status;
	cTiming = dataJson[j].timing;				
	cWhiteId = dataJson[j].whiteid;
	cBlackId = dataJson[j].blackid;
	cShow = dataJson[j].mostrar;

	jQuery('#list2').jqGrid('addRowData',j+1,{ whitename:cWhiteName , whiteelo:cWhiteElo , blackname:cBlackName , blackelo:cBlackElo , status:cStatus , number:cNumber , when:cWhen , whiteid:cWhiteId , blackid:cBlackId , show:cShow , timing:cTiming });
        
    }
    
    $('#GamesInProgress').remove();
    $('#GamesInProgress2').remove();
    $('#BotonesGames').append('<label id="GamesInProgress" style="color:red; margin-left:10px; margin-top:18px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px;">Games in progress:</label>');								
    $('#BotonesGames').append('<label id="GamesInProgress2" style="color:green; margin-left:10px; margin-top:18px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px;">'+nGamesInProgress+'</label>');								
        
}

function GetStatsBack(data){
    
   var dataJson = eval(data.PlayerData);
   
   $('#status2').html('<img src="res/img/flags/' + MyCountry + '.png" style="border:1px black solid;margin-left:8px; margin-top:9px; margin-right:8px; float:left;"></a>' +
                              '<label for="Statst" style="color:red; margin-left: 8px; margin-top: 10px; margin-right: 4px; float: left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">Stats for: </label>' +
                              '<label for="User" style="color:green; margin-left: 8px; margin-top: 10px; margin-right: 4px; float: left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cUserName + '</label>' +
                              '<label for="Elo" style="color:red; margin-left: 8px; margin-top: 10px; margin-right: 4px; float: left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">Elo: </label>' +
                              '<label for="nElo" id="nEloVal" style="color:green; margin-left: 8px; margin-top: 10px; margin-right: 4px; float: left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + MyElo + '</label>' +
			      '<label for="Games" style="color:red; margin-left: 8px; margin-top: 10px; margin-right: 4px; float: left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">Games: </label>' +
                              '<label for="nGames" style="color:green; margin-left: 8px; margin-top: 10px; margin-right: 4px; float: left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + dataJson[0].Games + '</label>' + 	
			      '<label for="Wins" style="color:red; margin-left: 8px; margin-top: 10px; margin-right: 4px; float: left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">Wins: </label>' +
                              '<label for="nWins" style="color:green; margin-left: 8px; margin-top: 10px; margin-right: 4px; float: left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + dataJson[0].Wins + '</label>' +  	
			      '<label for="Losts" style="color:red; margin-left: 8px; margin-top: 10px; margin-right: 4px; float: left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">Losts: </label>' +
                              '<label for="nLosts" style="color:green; margin-left: 8px; margin-top: 10px; margin-right: 4px; float: left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + dataJson[0].Losts + '</label>' +  	
			      '<label for="Draws" style="color:red; margin-left: 8px; margin-top: 10px; margin-right: 4px; float: left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">Draws: </label>' +
                              '<label for="nDraws" style="color:green; margin-left: 8px; margin-top: 10px; margin-right: 4px; float: left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + dataJson[0].Draws + '</label>'  	
			      );
   
}

function FollowPlayer(){
    
    socket.emit('DeclinedRematch',{RoomName:cWhiteIdPrivate});    
        
    $('#OfferingRematchLabel').hide();
    $('#DeclinedRematchLabel').hide();
    $('#OfferingRematch').hide();
    
    if (Playing){
	
	$("#dialog-result").html(
				"<div id=\"dialog-result\" title=\"Information\">" +
				"<p style=\"color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px\">You are playing a game and must finish before.</p>" +
				"</div>"
				);
	
	$("#dialog-result").dialog({ height: 240 },{ width: 310 });
	$('.ui-button:contains(Reconnect)').hide();
	$('.ui-button:contains(Ok)').show();			
	$("#dialog-result").dialog( "open" );
	
    }else if (WhoPlayer==-1) {
        
        $("#dialog-result").html(
				"<div id=\"dialog-result\" title=\"Information\">" +
				"<p style=\"color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px\">Select a Player from the List.</p>" +
				"</div>"
				);
	
	$("#dialog-result").dialog({ height: 240 },{ width: 310 });
	$('.ui-button:contains(Reconnect)').hide();
	$('.ui-button:contains(Ok)').show();			
	$("#dialog-result").dialog( "open" );
        
    }else{
        
        socket.emit('CheckPlayerStatus',WhoPlayer);
        
    }
    
    socket.on('CheckPlayerStatusBack',function(data){        
        
        if ((data.PlayerStatus=='OnLine')||(data.PlayerStatus=='Challenging')) {
            
            $("#dialog-result").html(
				"<div id=\"dialog-result\" title=\"Information\">" +
				"<p style=\"color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px\">Player is " + data.PlayerStatus + " now.</p>" +
				"</div>"
				);
	
            $("#dialog-result").dialog({ height: 240 },{ width: 310 });
            $('.ui-button:contains(Reconnect)').hide();
            $('.ui-button:contains(Ok)').show();			
            $("#dialog-result").dialog( "open" );
                
        }else{
           
            nGameNumber=data.GameNumber;
            socket.emit('IfGameActive',nGameNumber);
            
        }
        
    });
    
}

function FollowGame(){
    
    socket.emit('DeclinedRematch',{RoomName:cWhiteIdPrivate});    
        
    $('#OfferingRematchLabel').hide();
    $('#DeclinedRematchLabel').hide();
    $('#OfferingRematch').hide();
    
    if (Playing){
	
	$("#dialog-result").html(
				"<div id=\"dialog-result\" title=\"Information\">" +
				"<p style=\"color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px\">You are playing a game and must finish before.</p>" +
				"</div>"
				);
	
	$("#dialog-result").dialog({ height: 240 },{ width: 310 });
	$('.ui-button:contains(Reconnect)').hide();
	$('.ui-button:contains(Ok)').show();			
	$("#dialog-result").dialog( "open" );
	
    }else if (nGameNumber==-1) {
	
	$("#dialog-result").html(
				"<div id=\"dialog-result\" title=\"Information\">" +
				"<p style=\"color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px\">Select a Game from the List.</p>" +
				"</div>"
				);
	
	$("#dialog-result").dialog({ height: 240 },{ width: 310 });
	$('.ui-button:contains(Reconnect)').hide();
	$('.ui-button:contains(Ok)').show();			
	$("#dialog-result").dialog( "open" );
	
    }else{
	
	socket.emit('IfGameActive',nGameNumber);        
                  
    }		
	
}
    
function IfGameActive(data){
    
    var dataJson = eval(data)
        
    if (dataJson.length==0){			    
			    
	$("#dialog-result").html(
                                    "<div id=\"dialog-result\" title=\"Information\">" +
                                    "<p style=\"color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px\">Game not active. Reload Games to get the last status.</p>" +
                                    "</div>"
                                    );
			    
	$("#dialog-result").dialog({ height: 240 },{ width: 360 });
	$('.ui-button:contains(Reconnect)').hide();
	$('.ui-button:contains(Ok)').show();			
	$("#dialog-result").dialog( "open" );			    
			    
    }else{
        
        //Vaciar retos
        VaciarRetos();
        socket.emit('CancelarReto',{PlayerId:MyId});
        
        //Join to room
        socket.emit('subscribe',{WhiteIdPrivate:dataJson[0].whiteid});
        
        cWhiteIdPrivate = dataJson[0].whiteid;        
			
        $('#sdivChat2').empty();	    
        $('#sdivChat2').append('<span style="color:red; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                                        'Sys: ' + '</span>' + 
                                        '<span style="color:green; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                                        'Entering the chat...Ok' + '</span><br>');
	$('#tabs').tabs('option','active', 4); //jQuery 1.9+
	        
        $('#ContenedorRetos').hide();
        $('#ContenedorBoard').show();
        $('#Cancel').hide();
        $('#NewGame').show();
        $('#BotonesGame').hide();
        $('#sdivGame').html('');        
        
        if (lHighlight=='1') {
            CasIniSel.visible = true;
            CasFinSel.visible = true;
        }else{
            CasIniSel.visible = false;
            CasFinSel.visible = false;
        }        
        
        $(document).attr('title','Following Game!');        
        
        //Pedir posicion
        socket.emit('AskPos',{WhiteIdPrivate:dataJson[0].whiteid,FromAskPos:true,IdWhoAsk:MyId});
        
        //Pedir labels de jugadores        
        socket.emit('AskPlayersLabels',{MyId:MyId,WhiteName:dataJson[0].whitename,BlackName:dataJson[0].blackname,Timing:dataJson[0].timing});
        
        cColorSide = 'White';
        
        VerCoords();
        
        Following = true;
			    
    }    
    
}

function AskPlayersLabels(data){
       
    $('#DatosArribaPlayer').html(
                                            '<label id="blackname" style="color:red; margin-left:0px; margin-top:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+data.BlackName+'</label>' +
                                            '<label style="color:green; margin-left:8px; margin-top:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">('+data.BlackElo+')</label>' +
                                            '<img src="res/img/flags/16/' + data.BlackCountry + '.png"  title="'+data.BlackAlt+'" style="border:0px black solid;margin-left:8px; margin-top:6px; float:left;"></a>'  
                                         ); 
    
    $('#DatosAbajoPlayer').html(
                                            '<label id="whitename" style="color:red; margin-left:0px; margin-top:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+data.WhiteName+'</label>' +
                                            '<label style="color:green; margin-left:8px; margin-top:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">('+data.WhiteElo+')</label>' +
                                            '<img src="res/img/flags/16/' + data.WhiteCountry + '.png"  title="'+data.WhiteAlt+'" style="border:0px black solid;margin-left:8px; margin-top:6px; float:left;"></a>'  
                                         );
    
    $('#status').html(
                            '<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">Timing: </label>' +
                            '<label style="color:green; margin-left:2px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">('+data.Timing+')</label>'
                           ) 
    
}

function VerCoords(){   
        
        if (cColorSide=='White') {
            getItemByName('a').set({left:45,top:423});
            getItemByName('a').setCoords();
            getItemByName('b').set({left:94,top:423});
            getItemByName('b').setCoords();
            getItemByName('c').set({left:143,top:423});
            getItemByName('c').setCoords();
            getItemByName('d').set({left:192,top:423});
            getItemByName('d').setCoords();
            getItemByName('e').set({left:241,top:423});
            getItemByName('e').setCoords();
            getItemByName('f').set({left:290,top:423});
            getItemByName('f').setCoords();
            getItemByName('g').set({left:339,top:421});
            getItemByName('g').setCoords();
            getItemByName('h').set({left:388,top:423});
            getItemByName('h').setCoords();
            getItemByName('1').set({left:6,top:388});
            getItemByName('1').setCoords();
            getItemByName('2').set({left:6,top:339});
            getItemByName('2').setCoords();
            getItemByName('3').set({left:6,top:290});
            getItemByName('3').setCoords();
            getItemByName('4').set({left:6,top:241});
            getItemByName('4').setCoords();
            getItemByName('5').set({left:6,top:192});
            getItemByName('5').setCoords();
            getItemByName('6').set({left:6,top:143});
            getItemByName('6').setCoords();
            getItemByName('7').set({left:6,top:94});
            getItemByName('7').setCoords();
            getItemByName('8').set({left:6,top:45});
            getItemByName('8').setCoords();
        }else{
            getItemByName('a').set({left:388,top:423});
            getItemByName('a').setCoords();
            getItemByName('b').set({left:339,top:423});
            getItemByName('b').setCoords();
            getItemByName('c').set({left:290,top:423});
            getItemByName('c').setCoords();
            getItemByName('d').set({left:241,top:423});
            getItemByName('d').setCoords();
            getItemByName('e').set({left:192,top:423});
            getItemByName('e').setCoords();
            getItemByName('f').set({left:143,top:423});
            getItemByName('f').setCoords();
            getItemByName('g').set({left:94,top:421});
            getItemByName('g').setCoords();
            getItemByName('h').set({left:45,top:423});
            getItemByName('h').setCoords();
            getItemByName('1').set({left:6,top:45});
            getItemByName('1').setCoords();
            getItemByName('2').set({left:6,top:94});
            getItemByName('2').setCoords();
            getItemByName('3').set({left:6,top:143});
            getItemByName('3').setCoords();
            getItemByName('4').set({left:6,top:192});
            getItemByName('4').setCoords();
            getItemByName('5').set({left:6,top:241});
            getItemByName('5').setCoords();
            getItemByName('6').set({left:6,top:290});
            getItemByName('6').setCoords();
            getItemByName('7').set({left:6,top:339});
            getItemByName('7').setCoords();
            getItemByName('8').set({left:6,top:388});
            getItemByName('8').setCoords();
        }
        
        if ( lShowCoord == '1') {
            getItemByName('a').visible = true;
            getItemByName('b').visible = true;
            getItemByName('c').visible = true;
            getItemByName('d').visible = true;
            getItemByName('e').visible = true;
            getItemByName('f').visible = true;
            getItemByName('g').visible = true;
            getItemByName('h').visible = true;
            getItemByName('1').visible = true;
            getItemByName('2').visible = true;
            getItemByName('3').visible = true;
            getItemByName('4').visible = true;
            getItemByName('5').visible = true;
            getItemByName('6').visible = true;
            getItemByName('7').visible = true;
            getItemByName('8').visible = true;
        }else{
            getItemByName('a').visible = false;
            getItemByName('b').visible = false;
            getItemByName('c').visible = false;
            getItemByName('d').visible = false;
            getItemByName('e').visible = false;
            getItemByName('f').visible = false;
            getItemByName('g').visible = false;
            getItemByName('h').visible = false;
            getItemByName('1').visible = false;
            getItemByName('2').visible = false;
            getItemByName('3').visible = false;
            getItemByName('4').visible = false;
            getItemByName('5').visible = false;
            getItemByName('6').visible = false;
            getItemByName('7').visible = false;
            getItemByName('8').visible = false;
        }        
        
        canvas.renderAll();
    
}

function CallPlayer() {
    
    if (WhoPlayer==-1) {
        
        $("#dialog-result").html(
				"<div id=\"dialog-result\" title=\"Information\">" +
				"<p style=\"color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px\">Select a Player from the List.</p>" +
				"</div>"
				);
	
	$("#dialog-result").dialog({ height: 240 },{ width: 310 });
	$('.ui-button:contains(Reconnect)').hide();
	$('.ui-button:contains(Ok)').show();			
	$("#dialog-result").dialog( "open" );
        
    }else{
        
        if (nNumberOfCalls > 0) {
            nNumberOfCalls--;
            socket.emit('MakeCall',{WhoPlayer:WhoPlayer,NamePlayer:cUserName});   
        }                
        
    }       
    
}

function GetCall(data){
    
    var cTextChat = 'You have recived a call from...' + data.NamePlayer;
    
    $('#sdivChat').append('<span style="color:red; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                            'Sys: ' + '</span>' + 
                            '<span style="color:green; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                            cTextChat + '</span><br>');
    $('#sdivChat').animate({scrollTop:$('#sdivChat').prop('scrollHeight')},500);
    
    $('#sdivChat2').append('<span style="color:red; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                            'Sys: ' + '</span>' + 
                            '<span style="color:green; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                            cTextChat + '</span><br>');
    $('#sdivChat2').animate({scrollTop:$('#sdivChat2').prop('scrollHeight')},500);
    
    // play sound
    if ( lSound=='1') {
        ion.sound.play('call');    
    }
    
}

function PlayerNameFromCall(data){
        
    var cTextChat = 'You have made a call to... ' + data.PlayerName + ', do not put upon, please.'
    
    $('#sdivChat').append('<span style="color:red; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                            'Sys: ' + '</span>' + 
                            '<span style="color:green; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                            cTextChat + '</span><br>');
    $('#sdivChat').animate({scrollTop:$('#sdivChat').prop('scrollHeight')},500);
    
    $('#sdivChat2').append('<span style="color:red; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                            'Sys: ' + '</span>' + 
                            '<span style="color:green; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                            cTextChat + '</span><br>');
    $('#sdivChat2').animate({scrollTop:$('#sdivChat2').prop('scrollHeight')},500);
    
    // play sound
    if ( lSound=='1') {
        ion.sound.play('call');    
    }
    
}

function CalcularExigencia(nDif){
	
	var nExig;
	
	if (nDif>=0 && nDif<=3){
		nExig = 50;
	}else if (nDif>=4 && nDif<=10){
		nExig = 51;
	}else if (nDif>=11 && nDif<=17){
		nExig = 52;
	}else if (nDif>=18 && nDif<=25){
		nExig = 53;
	}else if (nDif>=26 && nDif<=32){
		nExig = 54;
	}else if (nDif>=33 && nDif<=39){
		nExig = 55;
	}else if (nDif>=40 && nDif<=46){
		nExig = 56;
	}else if (nDif>=47 && nDif<=53){
		nExig = 57;
	}else if (nDif>=54 && nDif<=61){
		nExig = 58;
	}else if (nDif>=62 && nDif<=68){
		nExig = 59;
	}else if (nDif>=69 && nDif<=76){
		nExig = 60;
	}else if (nDif>=77 && nDif<=83){
		nExig = 61;
	}else if (nDif>=84 && nDif<=91){
		nExig = 62;
	}else if (nDif>=92 && nDif<=98){
		nExig = 63;
	}else if (nDif>=99 && nDif<=106){
		nExig = 64;
	}else if (nDif>=107 && nDif<=113){
		nExig = 65;
	}else if (nDif>=114 && nDif<=121){
		nExig = 66;
	}else if (nDif>=122 && nDif<=129){
		nExig = 67;
	}else if (nDif>=130 && nDif<=137){
		nExig = 68;
	}else if (nDif>=138 && nDif<=145){
		nExig = 69;
	}else if (nDif>=146 && nDif<=153){
		nExig = 70;
	}else if (nDif>=154 && nDif<=162){
		nExig = 71;
	}else if (nDif>=163 && nDif<=170){
		nExig = 72;
	}else if (nDif>=171 && nDif<=179){
		nExig = 73;
	}else if (nDif>=180 && nDif<=188){
		nExig = 74;
	}else if (nDif>=189&& nDif<=197){
		nExig = 75;
	}else if (nDif>=198 && nDif<=206){
		nExig = 76;
	}else if (nDif>=207 && nDif<=215){
		nExig = 77;
	}else if (nDif>=216 && nDif<=225){
		nExig = 78;
	}else if (nDif>=226 && nDif<=235){
		nExig = 79;
	}else if (nDif>=236 && nDif<=245){
		nExig = 80;
	}else if (nDif>=246 && nDif<=256){
		nExig = 81;
	}else if (nDif>=257 && nDif<=267){
		nExig = 82;
	}else if (nDif>=268 && nDif<=278){
		nExig = 83;
	}else if (nDif>=279 && nDif<=290){
		nExig = 84;
	}else if (nDif>=291 && nDif<=302){
		nExig = 85;
	}else if (nDif>=303 && nDif<=315){
		nExig = 86;
	}else if (nDif>=316 && nDif<=328){
		nExig = 87;
	}else if (nDif>=329 && nDif<=344){
		nExig = 88;
	}else if (nDif>=345 && nDif<=357){
		nExig = 89;
	}else if (nDif>=358 && nDif<=374){
		nExig = 90;
	}else if (nDif>=375 && nDif<=391){
		nExig = 91;
	}else if (nDif>=392 && nDif<=411){
		nExig = 92;
	}else if (nDif>=412 && nDif<=432){
		nExig = 93;
	}else if (nDif>=433 && nDif<=456){
		nExig = 94;
	}else if (nDif>=457 && nDif<=484){
		nExig = 95;
	}else if (nDif>=485 && nDif<=517){
		nExig = 96;
	}else if (nDif>=518 && nDif<=559){
		nExig = 97;
	}else if (nDif>=560 && nDif<=619){
		nExig = 98;
	}else if (nDif>=620 && nDif<=734){
		nExig = 99;
	}else if (nDif>=735){
		nExig = 100;
	}else if (nDif<=0 && nDif>=-3){
		nExig = 50;
	}else if (nDif<=-4 && nDif>=-10){
		nExig = 49;
	}else if (nDif<=-11 && nDif>=-17){
		nExig = 48;
	}else if (nDif<=-18 && nDif>=-25){
		nExig = 47;
	}else if (nDif<=-26 && nDif>=-32){
		nExig = 46;
	}else if (nDif<=-33 && nDif>=-39){
		nExig = 45;
	}else if (nDif<=-40 && nDif>=-46){
		nExig = 44;
	}else if (nDif<=-47 && nDif>=-53){
		nExig = 43;
	}else if (nDif<=-54 && nDif>=-61){
		nExig = 42;
	}else if (nDif<=-62 && nDif>=-68){
		nExig = 41;
	}else if (nDif<=-69 && nDif>=-76){
		nExig = 40;
	}else if (nDif<=-77 && nDif>=-83){
		nExig = 39;
	}else if (nDif<=-84 && nDif>=-91){
		nExig = 38;
	}else if (nDif<=-92 && nDif>=-98){
		nExig = 37;
	}else if (nDif<=-99 && nDif>=-106){
		nExig = 36 ;
	}else if (nDif<=-107 && nDif>=-113){
		nExig = 35;
	}else if (nDif<=-114 && nDif>=-121){
		nExig = 34;
	}else if (nDif<=-122 && nDif>=-129){
		nExig = 33;
	}else if (nDif<=-130 && nDif>=-137){
		nExig = 32;
	}else if (nDif<=-138 && nDif>=-145){
		nExig = 31;
	}else if (nDif<=-146 && nDif>=-153){
		nExig = 30;
	}else if (nDif<=-154 && nDif>=-162){
		nExig = 29;
	}else if (nDif<=-163 && nDif>=-170){
		nExig = 28;
	}else if (nDif<=-171 && nDif>=-179){
		nExig = 27;
	}else if (nDif<=-180 && nDif>=-188){
		nExig = 26;
	}else if (nDif<=-189 && nDif>=-197){
		nExig = 25;
	}else if (nDif<=-198 && nDif>=-206){
		nExig = 24;
	}else if (nDif<=-207 && nDif>=-215){
		nExig = 23;
	}else if (nDif<=-216 && nDif>=-225){
		nExig = 22;
	}else if (nDif<=-226 && nDif>=-235){
		nExig = 21;
	}else if (nDif<=-236 && nDif>=-245){
		nExig = 20;
	}else if (nDif<=-246 && nDif>=-256){
		nExig = 19;
	}else if (nDif<=-257 && nDif>=-267){
		nExig = 18;
	}else if (nDif<=-268 && nDif>=-278){
		nExig = 17;
	}else if (nDif<=-279 && nDif>=-290){
		nExig = 16;
	}else if (nDif<=-291 && nDif>=-302){
		nExig = 15;
	}else if (nDif<=-303 && nDif>=-315){
		nExig = 14;
	}else if (nDif<=-316 && nDif>=-328){
		nExig = 13;
	}else if (nDif<=-329 && nDif>=-344){
		nExig = 12;
	}else if (nDif<=-345 && nDif>=-357){
		nExig = 11;
	}else if (nDif<=-358 && nDif>=-374){
		nExig = 10;
	}else if (nDif<=-375 && nDif>=-391){
		nExig = 9;
	}else if (nDif<=-392 && nDif>=-411){
		nExig = 8;
	}else if (nDif<=-412 && nDif>=-432){
		nExig = 7;
	}else if (nDif<=-433 && nDif>=-456){
		nExig = 6;
	}else if (nDif<=-457 && nDif>=-484){
		nExig = 5;
	}else if (nDif<=-485 && nDif>=-517){
		nExig = 4;
	}else if (nDif<=-518 && nDif>=-559){
		nExig = 3;
	}else if (nDif<=-560 && nDif>=-619){
		nExig = 2;
	}else if (nDif<=-620 && nDif>=-734){
		nExig = 1;
	}else if (nDif<=-735){
		nExig = 0;
	}	
	
	return nExig;
	
}

function IsPromotion(){
    
    var cPiezaMove = aPos[CasIni].substring(1,2);    
    cPiezaMove = cPiezaMove.toUpperCase();
    
    if (lPromote=='0'){
        if (cPiezaMove == 'P'){
            if ((CasIni>7)&&(CasIni<16)&&(CasFin>-1)&&(CasFin<8)){
                $('#wqpromo').show();
                $('#wrpromo').show();
                $('#wnpromo').show();
                $('#wbpromo').show();
                $('#bqpromo').hide();
                $('#brpromo').hide();
                $('#bnpromo').hide();
                $('#bbpromo').hide();
                return true;
            }else if ((CasIni>47)&&(CasIni<56)&&(CasFin>55)&&(CasFin<64)){
                $('#wqpromo').hide();
                $('#wrpromo').hide();
                $('#wnpromo').hide();
                $('#wbpromo').hide();
                $('#bqpromo').show();
                $('#brpromo').show();
                $('#bnpromo').show();
                $('#bbpromo').show();
                return true;
            }            
        }
    }else{
        return false;
    }
    
    return false;
    
}

function CheckForPromoctions(){
    
    var Pieza;
    var i;
    
    for(i = 0; i < 64; i++){
        
        Pieza = aPos[i];
        //Comprobar si es pieza de promocion
        if (Pieza.length==5){
            
            if (Pieza.substring(0,2)=='wq'){
                if (!QueenExist(Pieza)){
                    var object = fabric.util.object.clone(getItemByName('wq'));
                    object.name = Pieza;
                    canvas.add(object);                    
                }
            }else if (Pieza.substring(0,2)=='bq'){
                if (!QueenExist(Pieza)){
                    var object = fabric.util.object.clone(getItemByName('bq'));
                    object.name = Pieza;
                    canvas.add(object);                    
                }
            }else if (Pieza.substring(0,2)=='wr') {
                if (!PieceExist(Pieza)){
                    var object = fabric.util.object.clone(getItemByName('wr1'));
                    object.name = Pieza;
                    canvas.add(object);                    
                }
            }else if (Pieza.substring(0,2)=='wn') {
                if (!PieceExist(Pieza)){
                    var object = fabric.util.object.clone(getItemByName('wn1'));
                    object.name = Pieza;
                    canvas.add(object);                    
                }
            }else if (Pieza.substring(0,2)=='wb') {
                if (!PieceExist(Pieza)){
                    var object = fabric.util.object.clone(getItemByName('wb1'));
                    object.name = Pieza;
                    canvas.add(object);                    
                }
            }else if (Pieza.substring(0,2)=='br') {
                if (!PieceExist(Pieza)){
                    var object = fabric.util.object.clone(getItemByName('br1'));
                    object.name = Pieza;
                    canvas.add(object);                    
                }
            }else if (Pieza.substring(0,2)=='bn') {
                if (!PieceExist(Pieza)){
                    var object = fabric.util.object.clone(getItemByName('bn1'));
                    object.name = Pieza;
                    canvas.add(object);                    
                }
            }else if (Pieza.substring(0,2)=='bb') {
                if (!PieceExist(Pieza)){
                    var object = fabric.util.object.clone(getItemByName('bb1'));
                    object.name = Pieza;
                    canvas.add(object);                    
                }
            } 
            
        }
        
    }
    
}

function ShowGame(PiezaIni,CasFinVacia,CodigoPromo){
    
    var cLetraIni;
    var cPor;
    var cResultado;
    var cCasFin = aCas[CasFin];
    var cExtra;
    var cCoronacion = '';
    var ContJug;
    
    //Letra casilla para captura peones
    cLetraIni = aCas[CasIni];
    cLetraIni = cLetraIni.substring(0,1);
    
    //Signo Captura
    if (CasFinVacia){
	cPor = '';
    }else{
	cPor = 'x';
    }
    
    cExtra = CheckCoordenadas(PiezaIni,CasFin,CasIni);    
    
    if (PiezaIni == 'K'){
        //Enroques
	if (((CasIni=='60') && (CasFin=='62')) || ((CasIni=='4') && (CasFin=='6'))){
	    PiezaIni = 'O-O';
            cCasFin = '';
	}else if (((CasIni=='60') && (CasFin=='58')) || ((CasIni=='4') && (CasFin=='2'))){
	    PiezaIni = 'O-O-O';
            cCasFin = '';
	}
    }else if (PiezaIni == 'P'){
        cExtra = '';
	if (CasFinVacia){
	    PiezaIni = '';
	}else{
	    PiezaIni = cLetraIni;
	}
        //Coronacion
	if ((CasFin>=0) && (CasFin<8)){				
	    if (CodigoPromo=='0'){
		cCoronacion = '=' + 'Q';					
	    }else if (CodigoPromo=='1'){
		cCoronacion = '=' + 'Q';					
	    }else if (CodigoPromo=='2'){
		cCoronacion = '=' + 'R';					
	    }else if (CodigoPromo=='3'){
		cCoronacion = '=' + 'N';					
	    }else if (CodigoPromo=='4'){
		cCoronacion = '=' + 'B';					
	    }				
	}else if ((CasFin<64) && (CasFin>55)){				
	    if (CodigoPromo=='0'){
		cCoronacion = '=' + 'Q';					
	    }else if (CodigoPromo=='5'){
		cCoronacion = '=' + 'Q';										
	    }else if (CodigoPromo=='6'){
		cCoronacion = '=' + 'R';					
	    }else if (CodigoPromo=='7'){
		cCoronacion = '=' + 'N';					
	    }else if (CodigoPromo=='8'){
		cCoronacion = '=' + 'B';					
            }			
	}
    }
    
    cResultado = PiezaIni + cExtra + cPor + cCasFin + cCoronacion;
    
    if (cColorSide=='White'){
        ContJug = (ContPosi + 2)/2;
        if (ContJug==1){            
            cResultado = ContJug + '.' + cResultado;
        }else{
            cResultado = ' ' + ContJug + '.' + cResultado;
        }	
    }else{
        cResultado = ' ' + cResultado;
    }    
    	
    return cResultado;
   
}

function CheckCoordenadas(PiezaIni,CasFin,CasIni){
	
    var cResultado = '';
    var cQuePieza;
    var lNormal = false;
    var lMismaCol = false;
    var lMismaFila = false;
    var i;
    var j = 0;
	
    var aCasillas = ['00','00','00','00','00','00','00','00','00','00','00','00',
	                 '00','00','00','00','00','00','00','00','00','00','00','00',
	                 '00','00','a8','b8','c8','d8','e8','f8','g8','h8','00','00',
	                 '00','00','a7','b7','c7','d7','e7','f7','g7','h7','00','00',
	                 '00','00','a6','b6','c6','d6','e6','f6','g6','h6','00','00',
	                 '00','00','a5','b5','c5','d5','e5','f5','g5','h5','00','00',
	                 '00','00','a4','b4','c4','d4','e4','f4','g4','h4','00','00',
	                 '00','00','a3','b3','c3','d3','e3','f3','g3','h3','00','00',
	                 '00','00','a2','b2','c2','d2','e2','f2','g2','h2','00','00',
	                 '00','00','a1','b1','c1','d1','e1','f1','g1','h1','00','00',
	                 '00','00','00','00','00','00','00','00','00','00','00','00',
	                 '00','00','00','00','00','00','00','00','00','00','00','00'];
	
    //Convertir CasFin, CasIni
    var nCasFinGra = aConversion[CasFin];
    var nCasIniGra = aConversion[CasIni];
	
    var nColPiezaIni = (aCasillas[nCasIniGra]).substring(0,1);
    var nFilaPiezaIni = (aCasillas[nCasIniGra]).substring(1,2);
		
    //Recorrer array LegalMoves
    for(i=0;i<LegalMovesIndex;i++){		
	//Sacar Pieza Inicial de aPosicion
	cQuePieza = (aPosicion[LegalMoves[i][0]]).toUpperCase();		                      
	//Comparar Pieza Inicial 
	if (cQuePieza == PiezaIni){		
	    //Comparar Casilla Final
	    if (LegalMoves[i][1] == nCasFinGra){		                                   
                //Descartar Mismo movimiento
                if (LegalMoves[i][0] == nCasIniGra) {
                    continue;    
                }                    
                //Si misma col
                if (nColPiezaIni == (aCasillas[LegalMoves[i][0]]).substring(0,1)){
                    lMismaCol = true;
                }else if (nFilaPiezaIni == (aCasillas[LegalMoves[i][0]]).substring(1,2)){ // Misma Fila					
                    lMismaFila = true;
                }else{
                    lNormal = true;
                }                		    		
	    }	
	}
    }
    
    if ((lMismaCol) && (lMismaFila)){
	return aCasillas[nCasIniGra];
    }else if (lMismaCol){
	return (aCasillas[nCasIniGra]).substring(1,2);
    }else if (lMismaFila){		
	return (aCasillas[nCasIniGra]).substring(0,1);		
    }else if (lNormal){
	return (aCasillas[nCasIniGra]).substring(0,1);
    }	
	
    return cResultado;
	
}

function CheckPap(){
    
    var ContJug
    var cLetraIni = cLetraIni = (aCas[CasIni]).substring(0,1);
    var cResultado = ' ' + cLetraIni + 'x' + aCas[CasFin];
	
    if (cColorSide=='White'){
        ContJug = (ContPosi + 2)/2;
	cResultado = ContJug + '.' + cResultado;
    }    
    
    return cResultado;
}

function SimboloJaque(){
	
	var cResultado;
	
	cResultado = $('#'+(ContPosi+1)).text() + '+';
	$('#'+(ContPosi+1)).text(cResultado);
	cPartidaCompleta = cPartidaCompleta + '+';
	
}

function SimboloMate(){
	
	var cResultado;
	
	cResultado = $('#'+(ContPosi+1)).text() + '#';
	$('#'+(ContPosi+1)).text(cResultado);
        cPartidaCompleta = cPartidaCompleta + '#';
	
}

function GameLabelClick(id){
    
    if (PartidaTerminada){
        $('#'+BufferMoveShow).css('background-color','#FBEDFF');
        aPos = aPosiciones[id];
        DrawPos();
        $('#'+id).css('background-color','#9AF612');    //verde claro
        BufferMoveShow = id;
    }
    
}

function Prev(){	
	
    $('#'+BufferMoveShow).css('background-color','#FBEDFF');
	
    BufferMoveShow = BufferMoveShow - 1;
	
    if ( BufferMoveShow == 0){
	BufferMoveShow = 1;
    }
	
    $('#'+BufferMoveShow).css('background-color','#9AF612');
	
    aPos = aPosiciones[BufferMoveShow];
    DrawPos();
	
}

function Ini(){
    
    $('#'+BufferMoveShow).css('background-color','#FBEDFF');
    
    BufferMoveShow = 1;
    
    $('#'+BufferMoveShow).css('background-color','#9AF612');
    
    aPos = aPosiciones[BufferMoveShow];
    DrawPos();
    
}

function Next(){
    
    $('#'+BufferMoveShow).css('background-color','#FBEDFF');
    
    BufferMoveShow++;
    
    if (BufferMoveShow>ContPosi){
        BufferMoveShow--;
    }
    
    $('#'+BufferMoveShow).css('background-color','#9AF612');
    
    aPos = aPosiciones[BufferMoveShow];
    DrawPos();
    
}

function End(){
    
    $('#'+BufferMoveShow).css('background-color','#FBEDFF');
    
    BufferMoveShow = ContPosi;
    
    $('#'+BufferMoveShow).css('background-color','#9AF612');
    
    aPos = aPosiciones[BufferMoveShow];
    DrawPos();
    
}

function SendGame(){
    
    var cPartidaAsPgn = 'test';
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    curr_month++;
    var curr_year = d.getFullYear();
    var cDate = curr_year + "." + curr_month + "." + curr_date;
    var cMiElo,cOpElo;
    var cMiNombre,cOpNombre;
    var cMinutosPartida = nMinutosPartida;
    var cSegundosPartida = nSegundosPartida;     
    
    if (cColorSide=='White'){
        cMiNombre = cUserName;
        cOpNombre = OpName;
        cMiElo = MyElo;
        cOpElo = OpElo;
    }else{
        cMiNombre = OpName;
        cOpNombre = cUserName;
        cMiElo = OpElo;
        cOpElo = MyElo;
    }
    
    cPartidaAsPgn = '[Event "' + 'KaspiChess' + '"]' + '\n' +
	                   '[Site "' + 'www.kaspichess.com' + '"]' + '\n' +
	                   '[Date "' + cDate + '"]' + '\n' + 
	                   '[White "' + cMiNombre + '"]' + '\n' +
	                   '[Black "' + cOpNombre + '"]' + '\n' +
	                   '[Result "' + ResultadoPartida + '"]' + '\n' + 
	                   '[WhiteElo "' + cMiElo + '"]' + '\n' + 
	                   '[BlackElo "' + cOpElo + '"]' + '\n' +
	                   '[TimeControl "' + cMinutosPartida + '/' + cSegundosPartida + '"]' + '\n' + '\n' + 
	                   cPartidaCompleta;                           
        
    socket.emit('SendGame',{cName:cUserName,Partida:cPartidaAsPgn});
    $('#dialog-result').html(
		'<div id="dialog-result">' +
		'<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px;">Your game has been sent to your email address.</p>' +
		'</div>'
    );
    $('#dialog-result').dialog({height:330},{width:300});
    $('#dialog-result').dialog('open');
    
}