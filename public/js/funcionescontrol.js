function ChallengingBack(data){
    
    var SaveMode;
    var d = new Date();
    var moment = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
    var RowNumbers = $('#list1').getGridParam('reccount');
    
    if ($('#OnOfAutoSave').text()=='Disable'){
        SaveMode = 'No';            
    }else{
        SaveMode = 'Auto';           
    }
    
    jQuery('#list1').jqGrid('addRowData',RowNumbers+1,{Name:data.Name,Moment:moment,Games:data.TotalGames,Event:'Challenging',Save:SaveMode},'first');
    
    ion.sound.play('retando');
}

function DisconnectPlayingControl(data){
    
    var SaveMode;
    var d = new Date();
    var moment = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
    var RowNumbers = $('#list1').getGridParam('reccount');
    
    if ($('#OnOfAutoSave').text()=='Disable'){
        SaveMode = 'No';            
    }else{
        SaveMode = 'Auto';           
    }
    
    jQuery('#list1').jqGrid('addRowData',RowNumbers+1,{Name:data.PlayerName,Moment:moment,Games:data.TotalGames,Event:'Disconnect Playing',Save:SaveMode},'first');
    
    ion.sound.play('desconectarjugando'); 
}

function DisconnectControl(data){
    
    var SaveMode;
    var d = new Date();
    var moment = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
    var RowNumbers = $('#list1').getGridParam('reccount');
    
    if ($('#OnOfAutoSave').text()=='Disable'){
        SaveMode = 'No';            
    }else{
        SaveMode = 'Auto';           
    }
    
    jQuery('#list1').jqGrid('addRowData',RowNumbers+1,{Name:data.PlayerName,Moment:moment,Games:data.TotalGames,Event:'Disconnect',Save:SaveMode},'first');
    
    ion.sound.play('desconectado'); 
}

function PlayerConnectedControl(data){
    
    var SaveMode;
    var d = new Date();
    var moment = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
    var RowNumbers = $('#list1').getGridParam('reccount');
    
    if ($('#OnOfAutoSave').text()=='Disable'){
        SaveMode = 'No';            
    }else{
        SaveMode = 'Auto';           
    }
    
    jQuery('#list1').jqGrid('addRowData',RowNumbers+1,{Name:data.PlayerName,Moment:moment,Games:data.TotalGames,Event:'Connected',Save:SaveMode},'first');
     
    ion.sound.play('nuevoconectado'); 
}

function PlayerPlayingControl(data){
    
    var SaveMode;
    var d = new Date();
    var moment = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
    var RowNumbers = $('#list1').getGridParam('reccount');
    
    if ($('#OnOfAutoSave').text()=='Disable'){
        SaveMode = 'No';            
    }else{
        SaveMode = 'Auto';           
    }
    
    jQuery('#list1').jqGrid('addRowData',RowNumbers+1,{Name:data.PlayerName,Moment:moment,Games:data.TotalGames,Event:'Playing',Save:SaveMode},'first');
    
    ion.sound.play('jugando');
}

function PlayerDataWatching(data){
    
    var SaveMode;
    var d = new Date();
    var moment = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
    var RowNumbers = $('#list1').getGridParam('reccount');
    
    if ($('#OnOfAutoSave').text()=='Disable'){
        SaveMode = 'No';            
    }else{
        SaveMode = 'Auto';           
    }
    
    jQuery('#list1').jqGrid('addRowData',RowNumbers+1,{Name:data.PlayerName,Moment:moment,Games:data.TotalGames,Event:'Watching',Save:SaveMode},'first');
    
    ion.sound.play('mirar');    
}

function GameAbortedControl(data){
    
    var SaveMode;
    var d = new Date();
    var moment = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
    var RowNumbers = $('#list1').getGridParam('reccount');
    
    if ($('#OnOfAutoSave').text()=='Disable'){
        SaveMode = 'No';            
    }else{
        SaveMode = 'Auto';           
    }
    
    jQuery('#list1').jqGrid('addRowData',RowNumbers+1,{Name:data.PlayerName,Moment:moment,Games:data.TotalGames,Event:'Game Aborted',Save:SaveMode},'first');
    
    ion.sound.play('abortar');     
}

function RematchingControlBack(data){
    
    var SaveMode;
    var d = new Date();
    var moment = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
    var RowNumbers = $('#list1').getGridParam('reccount');
    
    if ($('#OnOfAutoSave').text()=='Disable'){
        SaveMode = 'No';            
    }else{
        SaveMode = 'Auto';           
    }
    
    jQuery('#list1').jqGrid('addRowData',RowNumbers+1,{Name:data.PlayerName,Moment:moment,Games:data.TotalGames,Event:'Rematching',Save:SaveMode},'first');
    
    ion.sound.play('revancha');    
}

function SearchEventsBack(data){
    
    var dataJson = eval(data.Events);
    
    $('#list1').jqGrid('clearGridData');
    
    for(var j in dataJson){
        
        var MomentFormated = (dataJson[j].Moment).replace('T',' ');
        MomentFormated = MomentFormated.substring(0,19);
        
        var d = new Date(MomentFormated);
        var dplus = d.setHours(d.getHours() + 2);        
        
        var x = new Date(dplus).toLocaleString();
                     
        
        jQuery('#list1').jqGrid('addRowData',j+1,{ Name:dataJson[j].User , Moment:x , Games:dataJson[j].Games , Event:dataJson[j].Event , Save:dataJson[j].SaveMode });
        
    }
    
}

function SearchPlayerBack(data){
    
    var dataJson = eval(data.PlayerData);
    var DateSignUp = dataJson[0].DateSignUp
    DateSignUp = DateSignUp.substring(0,10);
   
    $('#NickName').text(dataJson[0].User);
    $('#EloPlayer').text(dataJson[0].Elo);
    $('#WinsGames').text(dataJson[0].Wins);
    $('#LostsGames').text(dataJson[0].Losts);
    $('#DrawsGames').text(dataJson[0].Draws);
    $('#EmailPlayer').text(dataJson[0].Email);
    $('#DateSignUp').text(DateSignUp);
    
    $('#CountryPlayer').html( '<img src="res/img/flags/' + dataJson[0].Country + '.png" style="border:1px black solid;margin-left:4px; margin-top:8px;"></a>' +
                                      '<label for="Country" style="color:green; margin-left:4px; margin-top:0px; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:14px">' + dataJson[0].Alt + '</label>'  	
			            );
    
}

function AddPlayerBack(data) {
    
    if (data.NewPlayer){
        
        var RowNumbers = $('#list2').getGridParam('reccount');
        var PlayerName = $('#PlayerName2').val();
        var Elo = $('#EloPlayer2').val();
        var flag = $('#CountryPlayer2').val();
        var PlayerCountry = $('#CountryPlayer2  option:selected').text();
        var TotalGames = $('#TotalGames2').val();
        
        jQuery('#list2').jqGrid('addRowData',RowNumbers+1,{Name:PlayerName,Elo:Elo,Country:flag,Alt:PlayerCountry,Status:'OnLine',Games:TotalGames,Type:'Virtual'},'first');
    
        $('#PlayerName2').val('');
        $('#EloPlayer2').val('');
        $('#TotalGames2').val('');
    
    }else{
        alert('El jugador ya existe')
    }
    
}

function ReloadPlayersDataBack(data){
    
    var cName,cElo,cCountry,cAlt,cStatus,cGames,cIdPlayer,cType;    
    
    $('#list2').jqGrid('clearGridData');
    
    for(var i=0;i<data.Players.length;i++){
        
        cName = data.Players[i][1];
        cElo = data.Players[i][2];
        cCountry = data.Players[i][3];
        cAlt = data.Players[i][6];
        cStatus = data.Players[i][5];
        cGames = data.Players[i][4];
        cIdPlayer = data.Players[i][0];
        
        if (cIdPlayer=='-2'){
            cType = 'Virtual';
        }else{
            cType = '';    
        }
        jQuery("#list2").jqGrid('addRowData',i+1,{ Name:cName , Elo:cElo , Country:cCountry , Alt:cAlt , Status:cStatus , Games:cGames , Type:cType});
            
    }
    
}

function DelPlayer(id,PlayerName2,TipoJugador) {
    
    //alert(PlayerName2);
    
    if (TipoJugador=='Virtual'){
        $('#list2').jqGrid('delRowData',id);
        socket.emit('DeletePlayer',{PlayerName:PlayerName2});
    }else{
        alert('Jugador no virtual')
    }    
    
}