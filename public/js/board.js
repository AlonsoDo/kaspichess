var nCodigoAltaPartida = 0;
var TiempoPartida = 0;
var StartTime = 0;
var MyTimer = null;
var TiempoTranscurrido = 0;
var TiempoRestanteArriba = TiempoPartida;
var TiempoRestanteAbajo = TiempoPartida;
var ValorTiempoTranscurrido = 0;
var FlagAbort = true;
var PartidaTerminada = false;
var BufferMoveShow = 0;
var ResultadoPartida;

function StartTimer(Posicion) {

    clearInterval(MyTimer);
    StartTime = new Date();
    
    if (Posicion=='Arriba') {
        MyTimer = setInterval("UpdateTimer('Arriba')",50);    
    }else{
        MyTimer = setInterval("UpdateTimer('Abajo')",50);
    }        
  
}

function UpdateTimer(Posicion) {
	
    ValorTiempoTranscurrido = ContadorTiempo();
    
    if ((ValorTiempoTranscurrido>=15000)&&(Playing)&&(FlagAbort)&&(cColorSide=='White')){
        GameAborted({ByButton:false});
        socket.emit('AbortGame',{RoomName:cWhiteIdPrivate,ByButton:false,MyPlayerName:cUserName,OpPlayerName:OpName});
        socket.emit('UpdateGameStatus',{cStatus:'Aborted',nGameNumber:nCodigoAltaPartida});        
    }
    
    if ((ValorTiempoTranscurrido>=20000)&&(Playing)&&(FlagAbort)&&(cColorSide=='Black')){
        GameAborted({ByButton:false});
        socket.emit('AbortGame',{RoomName:cWhiteIdPrivate,ByButton:false,MyPlayerName:cUserName,OpPlayerName:OpName});
        socket.emit('UpdateGameStatus',{cStatus:'Aborted',nGameNumber:nCodigoAltaPartida});        
    }
        
    if (Posicion=='Arriba') {
        $('#RelojArribaLabel').text(FormatearMilisegundos(TiempoRestanteArriba - ValorTiempoTranscurrido));         
        if((TiempoRestanteArriba - ValorTiempoTranscurrido)<=0){
            $('#RelojArribaLabel').text('00:00:00');    
        }        
    }else{
        $('#RelojAbajoLabel').text(FormatearMilisegundos(TiempoRestanteAbajo - ValorTiempoTranscurrido));        
        if((TiempoRestanteAbajo - ValorTiempoTranscurrido)<=0){
            if (Playing) {
                GameTimeOff();    
            }            
        }       
    }
    
}

function ContadorTiempo() {

    var TempTime = new Date();
	
    TiempoTranscurrido = TempTime.getTime() - StartTime.getTime();
    
    aPos[76] = TiempoTranscurrido;
	  
    return TiempoTranscurrido;	   
  
}

function StopTimer(Posicion) {    

    clearInterval(MyTimer);
    if (Posicion=='Arriba') {
        TiempoRestanteArriba = TiempoRestanteArriba - ValorTiempoTranscurrido;
        TiempoRestanteArriba = TiempoRestanteArriba + parseInt(nSegundosPartida*1000);
        $('#RelojArribaLabel').text(FormatearMilisegundos(TiempoRestanteArriba));
        aPos[74] = TiempoRestanteArriba;
        aPos[75] = TiempoRestanteAbajo;        
    }else{
        TiempoRestanteAbajo = TiempoRestanteAbajo - ValorTiempoTranscurrido;
        TiempoRestanteAbajo = TiempoRestanteAbajo + parseInt(nSegundosPartida*1000);
        $('#RelojAbajoLabel').text(FormatearMilisegundos(TiempoRestanteAbajo));
        aPos[74] = TiempoRestanteArriba;
        aPos[75] = TiempoRestanteAbajo;        
    }    
    
}

function FormatearMilisegundos(Milisegundos){

    var d=new Date(Milisegundos);	
	
    var hora = (d.getHours()==0)?0:d.getHours()-1;
	
    hora = (hora<10)?""+hora:hora;
    
    var minuto = (d.getMinutes()<10)?""+d.getMinutes():d.getMinutes();
    var segundo = (d.getSeconds()<10)?"0"+d.getSeconds():d.getSeconds();
    var decimas = parseInt((d.getMilliseconds())/100);
	
    if (Milisegundos <= 20000){	
        segundo = (d.getSeconds()<10)?""+d.getSeconds():d.getSeconds();
        return segundo + ":" + decimas;
    }else if (Milisegundos <= 3600000){
        return minuto + ":" + segundo;
    }else{
        minuto = (d.getMinutes()<10)?"0"+d.getMinutes():d.getMinutes();
	return hora + ":" + minuto + ":" + segundo;
    }
        
}

function GameTimeOff(){
    
    clearInterval(MyTimer);
    
    $('#RelojAbajoLabel').text('Time');    
    
    var Dif = MyElo - OpElo;
    var Exig = CalcularExigencia(Dif);
    var VarElo;	
    var cVarElo = '';
    var cCadena = '';
    ResultadoPartida = '';
    var lKingAlone = false;
    var InsufficientMaterial = false;
    
    if (cColorSide == 'White'){
	lKingAlone = KingAlone('Black');
    }else{
	lKingAlone = KingAlone('White');
    }
    
    //VarElo = (0 - Exig)/5;    
    
    if (SelectRat=='Rated') {
        // Si su rey solo saco tablas
	if (lKingAlone){
	    VarElo = (50 - Exig)/5;
	}else{
	    VarElo = (0 - Exig)/5;	
	}
        MyElo = (parseFloat(MyElo) + parseFloat(VarElo));
        MyElo = Math.round(MyElo);
        OpElo = (parseFloat(OpElo) - parseFloat(VarElo));
        OpElo = Math.round(OpElo);
    }else{
        VarElo = 0;
        //cCadena = 'The game was unrated.';
    }    
    
    if (VarElo >= 0){
	cVarElo = '+' + VarElo;
    }else{
	cVarElo = VarElo;
    }    
    
    if (SelectRat=='Rated') {
        if (lKingAlone){
            cCadena = 'The game was draw by insufficient material. ( 0.5-0.5 ) The new rating is: ' + MyElo + ' (' + cVarElo + ')';		
            $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
            $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
            ResultadoPartida = '1/2-1/2';
            InsufficientMaterial = true;
        }else{
            cCadena = OpName + ' won by time. ( 0-1 ) The new rating is: ' + MyElo + ' (' + cVarElo + ')'; 
            $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">0</label>');    
            $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1</label>');    
            if (cColorSide=='White') {
                ResultadoPartida = '0-1';
            }else{
                ResultadoPartida = '1-0';
            }
        }    
    }else{
        if (lKingAlone){
            cCadena = 'The game was draw by insufficient material. ( 0.5-0.5 ) The game was unrated.';
            $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
            $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
            ResultadoPartida = '1/2-1/2';
            InsufficientMaterial = true;
        }else{
            cCadena = OpName + ' won by time. ( 0-1 ) The game was unrated.';
            $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">0</label>');    
            $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1</label>');    
            if (cColorSide=='White') {
                ResultadoPartida = '0-1';
            }else{
                ResultadoPartida = '1-0';
            }            
        }        
    }
    
    socket.emit('GameTimeOff',{RoomName:cWhiteIdPrivate,PlayerNameWhoLost:cUserName,EloWhoLost:MyElo,PlayerNameWhoWin:OpName,EloWhoWin:OpElo,VarElo:VarElo,ColorSide:cColorSide,InsufficientMaterial:InsufficientMaterial});
        
    $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
     
    $('#DatosAbajoPlayer').append('<label style="color:green; margin-left:12px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">(' + cVarElo + ')</label>');    
        
    $("#sdivGame").append("<label id='" + (ContPosi+1) + "' style='float:left; margin-left:7px; font-size:22px; font-weight:bold; font-family:Arial,Helvetica,sans-serif;'>" + ' ' + ResultadoPartida + "</label>");
        
    cPartidaCompleta = cPartidaCompleta + ' ' + ResultadoPartida;
    
    PartidaTerminada = true;
    $('#BotonesGame').show();
    
    $(document).attr('title','Game Time Off');
    
    // Reset all
    $('#Abort').hide();
    $('#Resign').hide();
    $('#Draw').hide();	
    $('#NewGame').show();
    if (Playing){
       $('#Rematch').show();
       OfferingRematch = true;
    }else{
       $('#Rematch').hide();
       OfferingRematch = false;
    }    
    $('#Resign').hide();                            
    $('#OfferingDraw').hide();
    $('#OfferingDrawLabel').hide();
    $('#DeclinedDrawLabel').hide();
    Playing = false;
    
     // play sound
    if ( lSound=='1') {
        ion.sound.play('lost');    
    }   
    
    socket.emit('UpdateGameStatus',{cStatus:ResultadoPartida,nGameNumber:nCodigoAltaPartida});
    
    $('#dialog-result').html(
			'<div id="dialog-result" title="Information">' +
			'<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+cCadena+'</p>' +
			'</div>'
                        );
    $('#dialog-result').dialog({height:330},{width:300});
    $('#dialog-result').dialog('open');
    
    BufferMoveShow = ContPosi;
    
    $('#dialog-promo').dialog('close');
        
}

function GameTimeOffBack(data){
    
    var VarElo = (data.VarElo)*(-1);
    var cCadena = '';
    var cVarElo = '';
    var cCadena = '';
    ResultadoPartida = '';
    
    clearInterval(MyTimer);       
    
    if (VarElo >= 0){
	cVarElo = '+' + VarElo;
    }else{
	cVarElo = VarElo;
    } 
    
    if (SelectRat=='Rated') {
        if (Playing){
            MyElo = (parseFloat(MyElo) + parseFloat(VarElo));
            MyElo = Math.round(MyElo);
            OpElo = (parseFloat(OpElo) - parseFloat(VarElo));
            OpElo = Math.round(OpElo);
        }
        if (data.InsufficientMaterial){
            cCadena = 'The game was draw by insufficient material. ( 0.5-0.5 ) The new rating is: ' + data.EloWhoWin + ' (' + cVarElo + ')';
            ResultadoPartida = '1/2-1/2';
        }else{
            cCadena = data.PlayerNameWhoWin + ' won by time. ( 1-0 ) The new rating is: ' + data.EloWhoWin + ' (' + cVarElo + ')';
            if (cColorSide=='White') {
                ResultadoPartida = '1-0';
            }else{
                ResultadoPartida = '0-1';
            }
        }        
    }else{
        if (data.InsufficientMaterial){
            cCadena = 'The game was draw by insufficient material. ( 0.5-0.5 ) The game was unrated.';
            ResultadoPartida = '1/2-1/2';
        }else{
           cCadena = data.PlayerNameWhoWin + ' won by time. ( 1-0 ) The game was unrated.';
           if (cColorSide=='White') {
                ResultadoPartida = '1-0';
            }else{
                ResultadoPartida = '0-1';
            }
        }              
    }
    
    if (Playing){
        $('#RelojArribaLabel').text('Time');
        $("#sdivGame").append("<label id='" + (ContPosi+1) + "' style='float:left; margin-left:7px; font-size:22px; font-weight:bold; font-family:Arial,Helvetica,sans-serif;'>" + ' ' + ResultadoPartida + "</label>");
        cPartidaCompleta = cPartidaCompleta + ' ' + ResultadoPartida;
        PartidaTerminada = true;
        $('#BotonesGame').show();
    }else{
        if (cColorSide!=data.ColorSide){
            $('#RelojArribaLabel').text('Time');   
        }else{            
            $('#RelojAbajoLabel').text('Time');
        }        
    } 
    
    $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
        
    $(document).attr('title','Game Time Off');    
    
    if (data.InsufficientMaterial){
        $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
        $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
    }else{
        if (cColorSide!=data.ColorSide) {
           $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1</label>');    
           $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">0</label>');    
        }else{
           $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">0</label>');    
           $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1</label>');    
       }   
    }    
     
    $('#DatosAbajoPlayer').append('<label style="color:green; margin-left:12px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">(' + cVarElo + ')</label>');    
    
    if (Playing) {
        $('#dialog-result').html(
                            '<div id="dialog-result" title="Information">' +
                            '<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+cCadena+'</p>' +
                            '</div>'
                            );
        $('#dialog-result').dialog({height:330},{width:300});
        $('#dialog-result').dialog('open');    
    }
    
    // Reset all
    $('#Abort').hide();
    $('#Resign').hide();
    $('#Draw').hide();	
    $('#NewGame').show();
    if (Playing){
       $('#Rematch').show();
       OfferingRematch = true;
    }else{
       $('#Rematch').hide();
       OfferingRematch = false;
       // flag no seguir siguiente partida
       Following = false;
    }
    $('#OfferingDraw').hide();
    $('#OfferingDrawLabel').hide();
    $('#DeclinedDrawLabel').hide();
    Playing = false;
    
     // play sound
    if ( lSound=='1') {
        ion.sound.play('win');    
    }
    
    BufferMoveShow = ContPosi;
    
}

function GameResignBack(data){
    
    var VarElo = (data.VarElo)*(-1);
    var cCadena = '';
    var cVarElo = '';
    var cCadena = '';
    ResultadoPartida = '';
    
    clearInterval(MyTimer);
        
    if (VarElo >= 0){
	cVarElo = '+' + VarElo;
    }else{
	cVarElo = VarElo;
    } 
    
    if (SelectRat=='Rated'){
        if (Playing){        
            MyElo = (parseFloat(MyElo) + parseFloat(VarElo));
            MyElo = Math.round(MyElo);
            OpElo = (parseFloat(OpElo) - parseFloat(VarElo));
            OpElo = Math.round(OpElo);
        }
        if (data.InsufficientMaterial){
            cCadena = 'The game was draw by insufficient material. ( 0.5-0.5 ) The new rating is: ' + data.EloWhoWin + ' (' + cVarElo + ')';
            ResultadoPartida = '1/2-1/2';
        }else{
            cCadena = data.PlayerNameWhoWin + ' won by resign. ( 1-0 ) The new rating is: ' + data.EloWhoWin + ' (' + cVarElo + ')'; 
            if (cColorSide=='White') {
                ResultadoPartida = '1-0';
            }else{
                ResultadoPartida = '0-1';
            }
        }        
    }else{
        if (data.InsufficientMaterial){
            cCadena = 'The game was draw by insufficient material. ( 0.5-0.5 ) The game was unrated.';
            ResultadoPartida = '1/2-1/2';
        }else{
           cCadena = data.PlayerNameWhoWin + ' won by resign. ( 1-0 ) The game was unrated.';  
            if (cColorSide=='White') {
                ResultadoPartida = '1-0';
            }else{
                ResultadoPartida = '0-1';
            }
        }              
    }
    
    $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
        
    $(document).attr('title','Game Resign');
    
    if (data.InsufficientMaterial){
        $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
        $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
    }else{
        if (cColorSide!=data.ColorSide) {
           $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1</label>');    
           $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">0</label>');    
        }else{
           $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">0</label>');    
           $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1</label>');    
       }   
    }    
     
    $('#DatosAbajoPlayer').append('<label style="color:green; margin-left:12px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">(' + cVarElo + ')</label>');    
    
    if (Playing) {
        $("#sdivGame").append("<label id='" + (ContPosi+1) + "' style='float:left; margin-left:7px; font-size:22px; font-weight:bold; font-family:Arial,Helvetica,sans-serif;'>" + ' ' + ResultadoPartida + "</label>");
        cPartidaCompleta = cPartidaCompleta + ' ' + ResultadoPartida;
        PartidaTerminada = true;
        $('#BotonesGame').show();
        $('#dialog-result').html(
                            '<div id="dialog-result" title="Information">' +
                            '<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+cCadena+'</p>' +
                            '</div>'
                            );
        $('#dialog-result').dialog({height:330},{width:300});
        $('#dialog-result').dialog('open');    
    }
    
    // Reset all
    $('#Abort').hide();
    $('#Resign').hide();
    $('#Draw').hide();	
    $('#NewGame').show();
    if (Playing){
       $('#Rematch').show();
       OfferingRematch = true;
    }else{
       $('#Rematch').hide();
       OfferingRematch = false;
       // flag no seguir siguiente partida
       Following = false;
    }
    $('#OfferingDraw').hide();
    $('#OfferingDrawLabel').hide();
    $('#DeclinedDrawLabel').hide();
    Playing = false;
    
     // play sound
    if ( lSound=='1') {
        ion.sound.play('win');    
    }
    
    BufferMoveShow = ContPosi;
    
}

function GameAborted(data){
    
    clearInterval(MyTimer);
    
    $('#Abort').hide();
    $('#Resign').hide();
    $('#Draw').hide();	
    $('#NewGame').show();
    $('#OfferingDraw').hide();
    $('#OfferingDrawLabel').hide();
    $('#DeclinedDrawLabel').hide();
    $(document).attr('title','Game Aborted');
    
    $('#RelojArribaLabel').text('00:00:00');
    $('#RelojAbajoLabel').text('00:00:00');
    
     // play sound
    if ( lSound=='1') {
        ion.sound.play('cancel');    
    } 
        
    if (data.ByButton) {
        $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">The game was aborted</label>');                            
        if (Playing){
            $('#dialog-result').html(
                            '<div id="dialog-result" title="Information">' +
                            '<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">The game was aborted</p>' +
                            '</div>'
                            );
            $('#dialog-result').dialog({height:330},{width:300});
            $('#dialog-result').dialog('open'); 
        }
    }else{ // By the server
        $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">The game was aborted by the server</label>');                            
        if (Playing){
            $('#dialog-result').html(
                            '<div id="dialog-result" title="Information">' +
                            '<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">The game was aborted by the server</p>' +
                            '</div>'
                            );
            $('#dialog-result').dialog({height:330},{ width:300});
            $('#dialog-result').dialog('open'); 
        }
    }
    
    Playing = false;
    
}

function GameResign() {
    
    clearInterval(MyTimer);    
    
    var Dif = MyElo - OpElo;
    var Exig = CalcularExigencia(Dif);
    var VarElo;	
    var cVarElo = '';
    var cCadena = '';
    ResultadoPartida = '';
    var lKingAlone = false;
    var InsufficientMaterial = false;
    
    if (cColorSide == 'White'){
	lKingAlone = KingAlone('Black');
    }else{
	lKingAlone = KingAlone('White');
    }      
    
    if (SelectRat=='Rated') {
        // Si su rey solo saco tablas
	if (lKingAlone){
	    VarElo = (50 - Exig)/5;
	}else{
	    VarElo = (0 - Exig)/5;	
	}
        MyElo = (parseFloat(MyElo) + parseFloat(VarElo));
        MyElo = Math.round(MyElo);
        OpElo = (parseFloat(OpElo) - parseFloat(VarElo));
        OpElo = Math.round(OpElo);
    }else{
        VarElo = 0;        
    }    
    
    if (VarElo >= 0){
	cVarElo = '+' + VarElo;
    }else{
	cVarElo = VarElo;
    }    
    
    if (SelectRat=='Rated') {
        if (lKingAlone){
            cCadena = 'The game was draw by insufficient material. ( 0.5-0.5 ) The new rating is: ' + MyElo + ' (' + cVarElo + ')';		
            $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
            $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
            ResultadoPartida = '1/2-1/2';
            InsufficientMaterial = true;
        }else{
            cCadena = OpName + ' won by resign. ( 0-1 ) The new rating is: ' + MyElo + ' (' + cVarElo + ')'; 
            $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">0</label>');    
            $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1</label>');    
            if (cColorSide=='White') {
                ResultadoPartida = '0-1';
            }else{
                ResultadoPartida = '1-0';
            }
        }    
    }else{
        if (lKingAlone){
            cCadena = 'The game was draw by insufficient material. ( 0.5-0.5 ) The game was unrated.';
            $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
            $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
            ResultadoPartida = '1/2-1/2';
            InsufficientMaterial = true;
        }else{
            cCadena = OpName + ' won by resign. ( 0-1 ) The game was unrated.';
            $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">0</label>');    
            $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1</label>');    
            if (cColorSide=='White') {
                ResultadoPartida = '0-1';
            }else{
                ResultadoPartida = '1-0';
            }            
        }        
    }
    
    socket.emit('GameResign',{RoomName:cWhiteIdPrivate,PlayerNameWhoLost:cUserName,EloWhoLost:MyElo,PlayerNameWhoWin:OpName,EloWhoWin:OpElo,VarElo:VarElo,ColorSide:cColorSide,InsufficientMaterial:InsufficientMaterial});
        
    $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
     
    $('#DatosAbajoPlayer').append('<label style="color:green; margin-left:12px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">(' + cVarElo + ')</label>');    
        
    $(document).attr('title','Game Resign');
    
    $("#sdivGame").append("<label id='" + (ContPosi+1) + "' style='float:left; margin-left:7px; font-size:22px; font-weight:bold; font-family:Arial,Helvetica,sans-serif;'>" + ' ' + ResultadoPartida + "</label>");
        
    cPartidaCompleta = cPartidaCompleta + ' ' + ResultadoPartida;
    
    PartidaTerminada = true;
    $('#BotonesGame').show();
    
    // Reset all
    $('#Abort').hide();
    $('#Resign').hide();
    $('#Draw').hide();	
    $('#NewGame').show();
    if (Playing){
       $('#Rematch').show();
       OfferingRematch = true;
    }else{
       $('#Rematch').hide();
       OfferingRematch = false;
    }
    $('#OfferingDraw').hide();
    $('#OfferingDrawLabel').hide();
    $('#DeclinedDrawLabel').hide();
        
     // play sound
    if ( lSound=='1') {
        ion.sound.play('lost');    
    }   
    
    socket.emit('UpdateGameStatus',{cStatus:ResultadoPartida,nGameNumber:nCodigoAltaPartida});
    
    if (Playing){
        $('#dialog-result').html(
                            '<div id="dialog-result" title="Information">' +
                            '<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+cCadena+'</p>' +
                            '</div>'
                            );
        $('#dialog-result').dialog({height:330},{width:300});
        $('#dialog-result').dialog('open');
    }
    
    Playing = false;
    
    BufferMoveShow = ContPosi;
       
}

function WinByMate(){
    
    clearInterval(MyTimer);    
    
    var Dif = OpElo - MyElo;
    var Exig = CalcularExigencia(Dif);
    var VarElo;	
    var cVarElo = '';
    var cCadena = '';
    ResultadoPartida = '';    
        
    if (SelectRat=='Rated') {
        VarElo = (0 - Exig)/5;	
	VarElo = VarElo * (-1);
        MyElo = (parseFloat(MyElo) + parseFloat(VarElo));
        MyElo = Math.round(MyElo);
        OpElo = (parseFloat(OpElo) - parseFloat(VarElo));
        OpElo = Math.round(OpElo);
    }else{
        VarElo = 0;        
    }    
    
    if (VarElo >= 0){
	cVarElo = '+' + VarElo;
    }else{
	cVarElo = VarElo;
    }    
    
    if (SelectRat=='Rated') {
        cCadena = cUserName + ' won by mate. ( 1-0 ) The new rating is: ' + MyElo + ' (' + cVarElo + ')'; 
        $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1</label>');    
        $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">0</label>');    
        if (cColorSide=='White') {
            ResultadoPartida = '1-0';
        }else{
            ResultadoPartida = '0-1';
        }            
    }else{
        cCadena = cUserName + ' won by mate. ( 1-0 ) The game was unrated.';
        $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1</label>');    
        $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">0</label>');    
        if (cColorSide=='White') {
            ResultadoPartida = '1-0';
        }else{
            ResultadoPartida = '0-1';
        }                
    }
    
    socket.emit('WinByMate',{RoomName:cWhiteIdPrivate,PlayerNameWhoLost:OpName,EloWhoLost:OpElo,PlayerNameWhoWin:cUserName,EloWhoWin:MyElo,VarElo:VarElo,ColorSide:cColorSide,Desconect:false});
        
    $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
     
    $('#DatosAbajoPlayer').append('<label style="color:green; margin-left:12px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">(' + cVarElo + ')</label>');    
        
    $(document).attr('title','Game Mate');
    
    $("#sdivGame").append("<label id='" + (ContPosi+1) + "' style='float:left; margin-left:7px; font-size:22px; font-weight:bold; font-family:Arial,Helvetica,sans-serif;'>" + ' ' + ResultadoPartida + "</label>");
        
    cPartidaCompleta = cPartidaCompleta + ' ' + ResultadoPartida;
    
    PartidaTerminada = true;
    $('#BotonesGame').show();
        
    // Reset all
    $('#Abort').hide();
    $('#Resign').hide();
    $('#Draw').hide();	
    $('#NewGame').show();
    if (Playing){
       $('#Rematch').show();
       OfferingRematch = true;
    }else{
       $('#Rematch').hide();
       OfferingRematch = false;
    }    
    $('#OfferingDraw').hide();
    $('#OfferingDrawLabel').hide();
    $('#DeclinedDrawLabel').hide();
    Playing = false;
    
     // play sound
    if ( lSound=='1') {
        ion.sound.play('win');    
    }   
    
    socket.emit('UpdateGameStatus',{cStatus:ResultadoPartida,nGameNumber:nCodigoAltaPartida});
    
    $('#dialog-result').html(
			'<div id="dialog-result" title="Information">' +
			'<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+cCadena+'</p>' +
			'</div>'
                        );
    $('#dialog-result').dialog({height:330},{width:300});
    $('#dialog-result').dialog('open');
    
    BufferMoveShow = ContPosi;
        
}

function WinByMateBack(data){
    
    var VarElo = (data.VarElo)*(-1);        
    
    var cCadena = '';
    var cVarElo = '';
    var cCadena = '';
    ResultadoPartida = '';
    
    clearInterval(MyTimer);
        
    if (VarElo >= 0){
	cVarElo = '+' + VarElo;
    }else{
	cVarElo = VarElo;
    }       
         
    $(document).attr('title','Game Mate');    
    
    if (cColorSide!=data.ColorSide) {
        $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">0</label>');    
        $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1</label>');    
        ResultadoPartida = '0-1';
    }else{
        $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1</label>');    
        $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">0</label>');    
        ResultadoPartida = '1-0';
    }        
            
    if (Playing) {
        if (SelectRat=='Rated'){
            MyElo = (parseFloat(MyElo) + parseFloat(VarElo));
            MyElo = Math.round(MyElo);
            OpElo = (parseFloat(OpElo) - parseFloat(VarElo));
            OpElo = Math.round(OpElo);
            cCadena = data.PlayerNameWhoWin + ' won by mate. ( 0-1 ) The new rating is: ' + data.EloWhoLost + ' (' + cVarElo + ')'; 
        }else{
            cCadena = data.PlayerNameWhoWin + ' won by mate. ( 0-1 ) The game was unrated.';  
        }
        $('#DatosAbajoPlayer').append('<label style="color:green; margin-left:12px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">(' + cVarElo + ')</label>');    
        $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
        
        $("#sdivGame").append("<label id='" + (ContPosi+1) + "' style='float:left; margin-left:7px; font-size:22px; font-weight:bold; font-family:Arial,Helvetica,sans-serif;'>" + ' ' + ResultadoPartida + "</label>");
        
        cPartidaCompleta = cPartidaCompleta + ' ' + ResultadoPartida;
        
        PartidaTerminada = true;
        $('#BotonesGame').show();
        
        $('#dialog-result').html(
                            '<div id="dialog-result" title="Information">' +
                            '<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+cCadena+'</p>' +
                            '</div>'
                            );
        $('#dialog-result').dialog({height:330},{width:300});
        $('#dialog-result').dialog('open');    
    }else{
        if (data.Desconect==false){
            cCadena = data.PlayerNameWhoWin + ' won by mate.';
            $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
        }else{
            cCadena = data.PlayerNameWhoWin + ' won by disconnect.';
            $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
            $(document).attr('title','Won by Disconnect');
        }
    }
    
    // Reset all
    $('#Abort').hide();
    $('#Resign').hide();
    $('#Draw').hide();	
    $('#NewGame').show();
    if (Playing){
       $('#Rematch').show();
       OfferingRematch = true;
    }else{
       $('#Rematch').hide();
       OfferingRematch = false;
       // flag no seguir siguiente partida
       Following = false;
    }
    $('#OfferingDraw').hide();
    $('#OfferingDrawLabel').hide();
    $('#DeclinedDrawLabel').hide();
    $('#DeclinedRematchLabel').hide();
    Playing = false;
    
     // play sound
    if ( lSound=='1') {
        ion.sound.play('lost');    
    }
    
    BufferMoveShow = ContPosi;
        
}

function DrawByStaleMate(){
    
    clearInterval(MyTimer);    
    
    var Dif = OpElo - MyElo;
    var Exig = CalcularExigencia(Dif);
    var VarElo;	
    var cVarElo = '';
    var cCadena = '';
    ResultadoPartida = '';    
        
    if (SelectRat=='Rated'){        
        VarElo = (50 - Exig)/5;
        VarElo = VarElo * (-1);
        MyElo = (parseFloat(MyElo) + parseFloat(VarElo));
        MyElo = Math.round(MyElo);
        OpElo = (parseFloat(OpElo) - parseFloat(VarElo));
        OpElo = Math.round(OpElo);
    }else{
        VarElo = 0;        
    }    
    
    if (VarElo >= 0){
	cVarElo = '+' + VarElo;
    }else{
	cVarElo = VarElo;
    }    
    
    if (SelectRat=='Rated') {
        cCadena = 'The game was draw by StaleMate. ( 0.5-0.5 ) The new rating is: ' + MyElo + ' (' + cVarElo + ')'; 
        $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
        $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
    }else{
        cCadena = 'The game was draw by StaleMate. ( 0.5-0.5 ) The game was unrated.';
        $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
        $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
    }
    
    ResultadoPartida = '1/2-1/2';
    
    socket.emit('DrawByStaleMate',{RoomName:cWhiteIdPrivate,OpPlayerName:OpName,OpElo:OpElo,MyPlayerName:cUserName,MyElo:MyElo,VarElo:VarElo,ColorSide:cColorSide});
        
    $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
     
    $('#DatosAbajoPlayer').append('<label style="color:green; margin-left:12px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">(' + cVarElo + ')</label>');    
        
    $(document).attr('title','Game StaleMate');
    
    $("#sdivGame").append("<label id='" + (ContPosi+1) + "' style='float:left; margin-left:7px; font-size:22px; font-weight:bold; font-family:Arial,Helvetica,sans-serif;'>" + ' ' + ResultadoPartida + "</label>");
        
    cPartidaCompleta = cPartidaCompleta + ' ' + ResultadoPartida;
    
    PartidaTerminada = true;
    $('#BotonesGame').show();
    
    // Reset all
    $('#Abort').hide();
    $('#Resign').hide();
    $('#Draw').hide();	
    $('#NewGame').show();
    if (Playing){
       $('#Rematch').show();
       OfferingRematch = true;
    }else{
       $('#Rematch').hide();
       OfferingRematch = false;
    }    
    $('#OfferingDraw').hide();
    $('#OfferingDrawLabel').hide();
    $('#DeclinedDrawLabel').hide();
    Playing = false;
    
     // play sound
    if ( lSound=='1') {
        ion.sound.play('draw');    
    }   
    
    socket.emit('UpdateGameStatus',{cStatus:ResultadoPartida,nGameNumber:nCodigoAltaPartida});
    
    $('#dialog-result').html(
                        '<div id="dialog-result" title="Information">' +
                        '<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+cCadena+'</p>' +
                        '</div>'
                        );
    $('#dialog-result').dialog({height:330},{width:300});
    $('#dialog-result').dialog('open');
    
    BufferMoveShow = ContPosi;
    
}

function DrawByStaleMateBack(data){
    
    var VarElo = (data.VarElo)*(-1);        
    
    var cCadena = '';
    var cVarElo = '';
    var cCadena = '';
    ResultadoPartida = '';
    
    clearInterval(MyTimer);
        
    if (VarElo >= 0){
	cVarElo = '+' + VarElo;
    }else{
	cVarElo = VarElo;
    }       
         
    $(document).attr('title','Game StaleMate');    
    
    $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
    $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
                
    if (Playing) {
        if (SelectRat=='Rated'){                
            cCadena = 'The game was draw by StaleMate. ( 0.5-0.5 ) The new rating is: ' + data.OpElo + ' (' + cVarElo + ')'; 
            MyElo = (parseFloat(MyElo) + parseFloat(VarElo));
            MyElo = Math.round(MyElo);
            OpElo = (parseFloat(OpElo) - parseFloat(VarElo));
            OpElo = Math.round(OpElo);
        }else{
            cCadena = 'The game was draw by StaleMate. ( 0.5-0.5 ) The game was unrated.';  
        }
        ResultadoPartida = '1/2-1/2';
        $("#sdivGame").append("<label id='" + (ContPosi+1) + "' style='float:left; margin-left:7px; font-size:22px; font-weight:bold; font-family:Arial,Helvetica,sans-serif;'>" + ' ' + ResultadoPartida + "</label>");
        cPartidaCompleta = cPartidaCompleta + ' ' + ResultadoPartida;
        PartidaTerminada = true;
        $('#BotonesGame').show();
        $('#DatosAbajoPlayer').append('<label style="color:green; margin-left:12px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">(' + cVarElo + ')</label>');    
        $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
        $('#dialog-result').html(
                            '<div id="dialog-result" title="Information">' +
                            '<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+cCadena+'</p>' +
                            '</div>'
                            );
        $('#dialog-result').dialog({height:330},{width:300});
        $('#dialog-result').dialog('open');    
    }else{
        cCadena = 'The game was draw by StaleMate. ( 0.5-0.5 )';
        $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
    }
    
    // Reset all    
    $('#Abort').hide();
    $('#Resign').hide();
    $('#Draw').hide();	
    $('#NewGame').show();
    if (Playing){
       $('#Rematch').show();
       OfferingRematch = true;
    }else{
       $('#Rematch').hide();
       OfferingRematch = false;
       // flag no seguir siguiente partida
       Following = false;
    }
    $('#OfferingDraw').hide();
    $('#OfferingDrawLabel').hide();
    $('#DeclinedDrawLabel').hide();
    Playing = false;
    
     // play sound
    if ( lSound=='1') {
        ion.sound.play('draw');    
    }
    
    BufferMoveShow = ContPosi;
}

function DrawByInsuficientMaterial(){
	
	var cCadena = '';
	var i;
	var lInsuficientMaterial = false;
	
	// Recoger posicion
	for(i=0;i<144;i++){
		
		if ((aPosicion[i] != '=') && (aPosicion[i] != '0')){
			cCadena = cCadena + aPosicion[i];
		}
		
	}
	
	// Check cadena
	// Reyes solos
	if ((cCadena == 'Kk') || (cCadena == 'kK')){
		return true;
	}else if ((cCadena == 'KkN') || (cCadena == 'KkB') || (cCadena == 'Kkn') || (cCadena == 'Kkb')){
		return true;
	}else if ((cCadena == 'KNk') || (cCadena == 'KBk') || (cCadena == 'Knk') || (cCadena == 'Kbk')){
		return true;
	}else if ((cCadena == 'kKN') || (cCadena == 'kKB') || (cCadena == 'kKn') || (cCadena == 'kKb')){
		return true;
	}else if ((cCadena == 'kNK') || (cCadena == 'kBK') || (cCadena == 'knK') || (cCadena == 'kbK')){
		return true;
	}else if ((cCadena == 'NKk') || (cCadena == 'BKk') || (cCadena == 'nKk') || (cCadena == 'bKk')){
		return true;
	}else if ((cCadena == 'NkK') || (cCadena == 'BkK') || (cCadena == 'nkK') || (cCadena == 'bkK')){
		return true;
	}
	
	return lInsuficientMaterial;	
	
}

function UpdateDrawByInsuficientMaterial(){
    
    clearInterval(MyTimer);    
    
    var Dif = OpElo - MyElo;
    var Exig = CalcularExigencia(Dif);
    var VarElo;	
    var cVarElo = '';
    var cCadena = '';
    ResultadoPartida = '';    
        
    if (SelectRat=='Rated'){        
        VarElo = (50 - Exig)/5;
        VarElo = VarElo * (-1);
        MyElo = (parseFloat(MyElo) + parseFloat(VarElo));
        MyElo = Math.round(MyElo);
        OpElo = (parseFloat(OpElo) - parseFloat(VarElo));
        OpElo = Math.round(OpElo);
    }else{
        VarElo = 0;        
    }    
    
    if (VarElo >= 0){
	cVarElo = '+' + VarElo;
    }else{
	cVarElo = VarElo;
    }    
    
    if (SelectRat=='Rated') {
        cCadena = 'The game was draw by Insuficient Material. ( 0.5-0.5 ) The new rating is: ' + MyElo + ' (' + cVarElo + ')'; 
        $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
        $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
    }else{
        cCadena = 'The game was draw by Insuficient Material. ( 0.5-0.5 ) The game was unrated.';
        $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
        $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
    }
    
    ResultadoPartida = '1/2-1/2';
    
    socket.emit('DrawByInsuficientMaterial',{RoomName:cWhiteIdPrivate,OpPlayerName:OpName,OpElo:OpElo,MyPlayerName:cUserName,MyElo:MyElo,VarElo:VarElo,ColorSide:cColorSide});
        
    $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
     
    $('#DatosAbajoPlayer').append('<label style="color:green; margin-left:12px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">(' + cVarElo + ')</label>');    
        
    $(document).attr('title','Insuficient Material');
    
    $("#sdivGame").append("<label id='" + (ContPosi+1) + "' style='float:left; margin-left:7px; font-size:22px; font-weight:bold; font-family:Arial,Helvetica,sans-serif;'>" + ' ' + ResultadoPartida + "</label>");
        
    cPartidaCompleta = cPartidaCompleta + ' ' + ResultadoPartida;
    
    PartidaTerminada = true;
    $('#BotonesGame').show();
    
    // Reset all
    $('#Abort').hide();
    $('#Resign').hide();
    $('#Draw').hide();	
    $('#NewGame').show();
    if (Playing){
       $('#Rematch').show();
       OfferingRematch = true;
    }else{
       $('#Rematch').hide();
       OfferingRematch = false;
    }
    $('#OfferingDraw').hide();
    $('#OfferingDrawLabel').hide();
    $('#DeclinedDrawLabel').hide();
    Playing = false;
    
     // play sound
    if ( lSound=='1') {
        ion.sound.play('draw');    
    }   
    
    socket.emit('UpdateGameStatus',{cStatus:ResultadoPartida,nGameNumber:nCodigoAltaPartida});
    
    $('#dialog-result').html(
                        '<div id="dialog-result" title="Information">' +
                        '<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+cCadena+'</p>' +
                        '</div>'
                        );
    $('#dialog-result').dialog({height:330},{width:300});
    $('#dialog-result').dialog('open');
    
    BufferMoveShow = ContPosi;
        
}

function DrawByInsuficientMaterialBack(data){
    
    var VarElo = (data.VarElo)*(-1);        
    
    var cCadena = '';
    var cVarElo = '';
    var cCadena = '';
    ResultadoPartida = '';
    
    clearInterval(MyTimer);
        
    if (VarElo >= 0){
	cVarElo = '+' + VarElo;
    }else{
	cVarElo = VarElo;
    }       
         
    $(document).attr('title','Insuficient Material');    
    
    $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
    $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
                
    if (Playing) {
        if (SelectRat=='Rated'){                
            cCadena = 'The game was draw by Insuficient Material. ( 0.5-0.5 ) The new rating is: ' + data.OpElo + ' (' + cVarElo + ')';
            MyElo = (parseFloat(MyElo) + parseFloat(VarElo));
            MyElo = Math.round(MyElo);
            OpElo = (parseFloat(OpElo) - parseFloat(VarElo));
            OpElo = Math.round(OpElo);
        }else{
            cCadena = 'The game was draw by Insuficient Material. ( 0.5-0.5 ) The game was unrated.';  
        }
        
        ResultadoPartida = '1/2-1/2';
        $("#sdivGame").append("<label id='" + (ContPosi+1) + "' style='float:left; margin-left:7px; font-size:22px; font-weight:bold; font-family:Arial,Helvetica,sans-serif;'>" + ' ' + ResultadoPartida + "</label>");
        cPartidaCompleta = cPartidaCompleta + ' ' + ResultadoPartida;
        PartidaTerminada = true;
        $('#BotonesGame').show();
        $('#DatosAbajoPlayer').append('<label style="color:green; margin-left:12px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">(' + cVarElo + ')</label>');    
        $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
        $('#dialog-result').html(
                            '<div id="dialog-result" title="Information">' +
                            '<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+cCadena+'</p>' +
                            '</div>'
                            );
        $('#dialog-result').dialog({height:330},{width:300});
        $('#dialog-result').dialog('open');    
    }else{
        cCadena = 'The game was draw by Insuficient Material. ( 0.5-0.5 )';
        $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
    }
    
    // Reset all
    $('#Abort').hide();
    $('#Resign').hide();
    $('#Draw').hide();	
    $('#NewGame').show();
    if (Playing){
       $('#Rematch').show();
       OfferingRematch = true;
    }else{
       $('#Rematch').hide();
       OfferingRematch = false;
       // flag no seguir siguiente partida
       Following = false;
    }
    $('#OfferingDraw').hide();
    $('#OfferingDrawLabel').hide();
    $('#DeclinedDrawLabel').hide();
    Playing = false;
    
     // play sound
    if ( lSound=='1') {
        ion.sound.play('draw');    
    }
    
    BufferMoveShow = ContPosi;
    
}

function DrawBy3Repeat(){  
	
	var cPosicion = '';
        var cPosicion2 = '';
        var nCont;
	var j;
	var k;
	var lTresRepeticiones = false;
	
	var aBufferBig = new Array(149);        
        for (j = 0; j < aBufferBig.length; j++){
            aBufferBig[j] = aPosicion[j];
            cPosicion = cPosicion + aBufferBig[j]; 
        }    
        aPosicionesBig.push(aBufferBig);
        ContPosiBig = aPosicionesBig.length-1;
        
        nCont = 0;
        
        for(k=0;k<aPosicionesBig.length;k++){                       
            
            for (j = 0; j < aBufferBig.length; j++){
                cPosicion2 = cPosicion2 + aPosicionesBig[k][j]; 
            }
                        
            if (cPosicion == cPosicion2){
		nCont = nCont + 1;               
	    }
	    if (nCont == 3){                
		lTresRepeticiones = true;
		return lTresRepeticiones;
	    }
            
            cPosicion2 = '';
                
	}	
	
	return lTresRepeticiones;
			
}

function UpdateDrawBy3Repeat(){
    
    clearInterval(MyTimer);    
    
    var Dif = OpElo - MyElo;
    var Exig = CalcularExigencia(Dif);
    var VarElo;	
    var cVarElo = '';
    var cCadena = '';
    ResultadoPartida = '';    
        
    if (SelectRat=='Rated'){        
        VarElo = (50 - Exig)/5;
        VarElo = VarElo * (-1);
        MyElo = (parseFloat(MyElo) + parseFloat(VarElo));
        MyElo = Math.round(MyElo);
        OpElo = (parseFloat(OpElo) - parseFloat(VarElo));
        OpElo = Math.round(OpElo);
    }else{
        VarElo = 0;        
    }    
    
    if (VarElo >= 0){
	cVarElo = '+' + VarElo;
    }else{
	cVarElo = VarElo;
    }    
    
    if (SelectRat=='Rated') {
        cCadena = 'The game was draw by 3 repeat position. ( 0.5-0.5 ) The new rating is: ' + MyElo + ' (' + cVarElo + ')'; 
        $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
        $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
    }else{
        cCadena = 'The game was draw by 3 repeat position. ( 0.5-0.5 ) The game was unrated.';
        $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
        $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
    }
    
    ResultadoPartida = '1/2-1/2';
    
    socket.emit('DrawBy3Repeat',{RoomName:cWhiteIdPrivate,OpPlayerName:OpName,OpElo:OpElo,MyPlayerName:cUserName,MyElo:MyElo,VarElo:VarElo,ColorSide:cColorSide});
        
    $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
     
    $('#DatosAbajoPlayer').append('<label style="color:green; margin-left:12px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">(' + cVarElo + ')</label>');    
        
    $(document).attr('title','3 Repeat Position');
    
    $("#sdivGame").append("<label id='" + (ContPosi+1) + "' style='float:left; margin-left:7px; font-size:22px; font-weight:bold; font-family:Arial,Helvetica,sans-serif;'>" + ' ' + ResultadoPartida + "</label>");
        
    cPartidaCompleta = cPartidaCompleta + ' ' + ResultadoPartida;
    
    PartidaTerminada = true;
    $('#BotonesGame').show();
    
    // Reset all
    $('#Abort').hide();
    $('#Resign').hide();
    $('#Draw').hide();
    $('#NewGame').show();
    if (Playing){
       $('#Rematch').show();
       OfferingRematch = true;
    }else{
       $('#Rematch').hide();
       OfferingRematch = false;
    }
    $('#OfferingDraw').hide();
    $('#OfferingDrawLabel').hide();
    $('#DeclinedDrawLabel').hide();
    
    Playing = false;
    
     // play sound
    if ( lSound=='1') {
        ion.sound.play('draw');    
    }   
    
    socket.emit('UpdateGameStatus',{cStatus:ResultadoPartida,nGameNumber:nCodigoAltaPartida});
    
    $('#dialog-result').html(
                        '<div id="dialog-result" title="Information">' +
                        '<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+cCadena+'</p>' +
                        '</div>'
                        );
    $('#dialog-result').dialog({height:330},{width:300});
    $('#dialog-result').dialog('open');
    
    BufferMoveShow = ContPosi;
    
}

function DrawBy3RepeatBack(data){
    
    var VarElo = (data.VarElo)*(-1);        
    
    var cCadena = '';
    var cVarElo = '';
    var cCadena = '';
    ResultadoPartida = '';
    
    clearInterval(MyTimer);
        
    if (VarElo >= 0){
	cVarElo = '+' + VarElo;
    }else{
	cVarElo = VarElo;
    }       
         
    $(document).attr('title','3 Repeat Position');    
    
    $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
    $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
                
    if (Playing) {
        if (SelectRat=='Rated'){                
            cCadena = 'The game was draw by 3 repeat position. ( 0.5-0.5 ) The new rating is: ' + data.OpElo + ' (' + cVarElo + ')'; 
            MyElo = (parseFloat(MyElo) + parseFloat(VarElo));
            MyElo = Math.round(MyElo);
            OpElo = (parseFloat(OpElo) - parseFloat(VarElo));
            OpElo = Math.round(OpElo);
        }else{
            cCadena = 'The game was draw by 3 repeat position. ( 0.5-0.5 ) The game was unrated.';  
        }
        
        ResultadoPartida = '1/2-1/2';
        $("#sdivGame").append("<label id='" + (ContPosi+1) + "' style='float:left; margin-left:7px; font-size:22px; font-weight:bold; font-family:Arial,Helvetica,sans-serif;'>" + ' ' + ResultadoPartida + "</label>");
        cPartidaCompleta = cPartidaCompleta + ' ' + ResultadoPartida;
        PartidaTerminada = true;
        $('#BotonesGame').show();
        $('#DatosAbajoPlayer').append('<label style="color:green; margin-left:12px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">(' + cVarElo + ')</label>');    
        $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
        $('#dialog-result').html(
                            '<div id="dialog-result" title="Information">' +
                            '<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+cCadena+'</p>' +
                            '</div>'
                            );
        $('#dialog-result').dialog({height:330},{width:300});
        $('#dialog-result').dialog('open');    
    }else{
        cCadena = 'The game was draw by 3 repeat position. ( 0.5-0.5 )';
        $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
    }
    
    // Reset all
    $('#Abort').hide();
    $('#Resign').hide();
    $('#Draw').hide();	
    $('#NewGame').show();
    if (Playing){
       $('#Rematch').show();
       OfferingRematch = true;
    }else{
       $('#Rematch').hide();
       OfferingRematch = false;
       // flag no seguir siguiente partida
       Following = false;
    }    
    $('#OfferingDraw').hide();
    $('#OfferingDrawLabel').hide();
    $('#DeclinedDrawLabel').hide();
    Playing = false;
    
     // play sound
    if ( lSound=='1') {
        ion.sound.play('draw');    
    }
    
    BufferMoveShow = ContPosi;
    
}

function UpdateDrawBy50MovesRule(){
    
    clearInterval(MyTimer);    
    
    var Dif = OpElo - MyElo;
    var Exig = CalcularExigencia(Dif);
    var VarElo;	
    var cVarElo = '';
    var cCadena = '';
    ResultadoPartida = '';    
        
    if (SelectRat=='Rated'){        
        VarElo = (50 - Exig)/5;
        VarElo = VarElo * (-1);
        MyElo = (parseFloat(MyElo) + parseFloat(VarElo));
        MyElo = Math.round(MyElo);
        OpElo = (parseFloat(OpElo) - parseFloat(VarElo));
        OpElo = Math.round(OpElo);
    }else{
        VarElo = 0;        
    }    
    
    if (VarElo >= 0){
	cVarElo = '+' + VarElo;
    }else{
	cVarElo = VarElo;
    }    
    
    if (SelectRat=='Rated') {
        cCadena = 'The game was draw by 50 moves rule. ( 0.5-0.5 ) The new rating is: ' + MyElo + ' (' + cVarElo + ')'; 
        $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
        $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
    }else{
        cCadena = 'The game was draw by 50 moves rule. ( 0.5-0.5 ) The game was unrated.';
        $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
        $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
    }
    
    ResultadoPartida = '1/2-1/2';
    
    socket.emit('DrawBy50MovesRule',{RoomName:cWhiteIdPrivate,OpPlayerName:OpName,OpElo:OpElo,MyPlayerName:cUserName,MyElo:MyElo,VarElo:VarElo,ColorSide:cColorSide});
        
    $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
     
    $('#DatosAbajoPlayer').append('<label style="color:green; margin-left:12px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">(' + cVarElo + ')</label>');    
        
    $(document).attr('title','50 Moves Rule');
    
    $("#sdivGame").append("<label id='" + (ContPosi+1) + "' style='float:left; margin-left:7px; font-size:22px; font-weight:bold; font-family:Arial,Helvetica,sans-serif;'>" + ' ' + ResultadoPartida + "</label>");
        
    cPartidaCompleta = cPartidaCompleta + ' ' + ResultadoPartida;
    
    PartidaTerminada = true;
    $('#BotonesGame').show();
    
    // Reset all
    $('#Abort').hide();
    $('#Resign').hide();
    $('#Draw').hide();	
    $('#NewGame').show();
    if (Playing){
       $('#Rematch').show();
       OfferingRematch = true;
    }else{
       $('#Rematch').hide();
       OfferingRematch = false;
    }
    $('#OfferingDraw').hide();
    $('#OfferingDrawLabel').hide();
    $('#DeclinedDrawLabel').hide();
    Playing = false;
    
     // play sound
    if ( lSound=='1') {
        ion.sound.play('draw');    
    }   
    
    socket.emit('UpdateGameStatus',{cStatus:ResultadoPartida,nGameNumber:nCodigoAltaPartida});
    
    $('#dialog-result').html(
                        '<div id="dialog-result" title="Information">' +
                        '<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+cCadena+'</p>' +
                        '</div>'
                        );
    $('#dialog-result').dialog({height:330},{width:300});
    $('#dialog-result').dialog('open');
    
    BufferMoveShow = ContPosi;
    
}

function DrawBy50MovesRuleBack(data){
    
    var VarElo = (data.VarElo)*(-1);        
    
    var cCadena = '';
    var cVarElo = '';
    var cCadena = '';
    ResultadoPartida = '';
    
    clearInterval(MyTimer);
        
    if (VarElo >= 0){
	cVarElo = '+' + VarElo;
    }else{
	cVarElo = VarElo;
    }       
         
    $(document).attr('title','50 Moves Rule');    
    
    $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
    $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
                
    if (Playing) {
        if (SelectRat=='Rated'){                
            cCadena = 'The game was draw by 50 Moves Rule. ( 0.5-0.5 ) The new rating is: ' + data.OpElo + ' (' + cVarElo + ')'; 
            MyElo = (parseFloat(MyElo) + parseFloat(VarElo));
            MyElo = Math.round(MyElo);
            OpElo = (parseFloat(OpElo) - parseFloat(VarElo));
            OpElo = Math.round(OpElo);
        }else{
            cCadena = 'The game was draw by 50 Moves Rule. ( 0.5-0.5 ) The game was unrated.';  
        }
        
        ResultadoPartida = '1/2-1/2';
        $("#sdivGame").append("<label id='" + (ContPosi+1) + "' style='float:left; margin-left:7px; font-size:22px; font-weight:bold; font-family:Arial,Helvetica,sans-serif;'>" + ' ' + ResultadoPartida + "</label>");
        cPartidaCompleta = cPartidaCompleta + ' ' + ResultadoPartida;
        
        PartidaTerminada = true;
        $('#BotonesGame').show();
        
        $('#DatosAbajoPlayer').append('<label style="color:green; margin-left:12px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">(' + cVarElo + ')</label>');    
        $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
        $('#dialog-result').html(
                            '<div id="dialog-result" title="Information">' +
                            '<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+cCadena+'</p>' +
                            '</div>'
                            );
        $('#dialog-result').dialog({height:330},{width:300});
        $('#dialog-result').dialog('open');    
    }else{
        cCadena = 'The game was draw by 50 Moves Rule. ( 0.5-0.5 )';
        $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
    }
    
    // Reset all
    $('#Abort').hide();
    $('#Resign').hide();
    $('#Draw').hide();	
    $('#NewGame').show();
    if (Playing){
       $('#Rematch').show();
       OfferingRematch = true;
    }else{
       $('#Rematch').hide();
       OfferingRematch = false;
       // flag no seguir siguiente partida
       Following = false;
    }
    $('#OfferingDraw').hide();
    $('#OfferingDrawLabel').hide();
    $('#DeclinedDrawLabel').hide();
    Playing = false;
    
     // play sound
    if ( lSound=='1') {
        ion.sound.play('draw');    
    }
    
    BufferMoveShow = ContPosi;
    
}

function DisconnectPlaying(data){
    
    clearInterval(MyTimer);
    
    if (Playing){            
        
        var Dif = OpElo - MyElo;
        var Exig = CalcularExigencia(Dif);
        var VarElo;	
        var cVarElo = '';
        var cCadena = '';
        ResultadoPartida = '';    
            
        if (SelectRat=='Rated') {
            VarElo = (0 - Exig)/5;	
            VarElo = VarElo * (-1);
            MyElo = (parseFloat(MyElo) + parseFloat(VarElo));
            MyElo = Math.round(MyElo);
            OpElo = (parseFloat(OpElo) - parseFloat(VarElo));
            OpElo = Math.round(OpElo);
        }else{
            VarElo = 0;        
        }    
        
        if (VarElo >= 0){
            cVarElo = '+' + VarElo;
        }else{
            cVarElo = VarElo;
        }    
    
        if (SelectRat=='Rated') {
            cCadena = cUserName + ' won by disconnect. ( 1-0 ) The new rating is: ' + MyElo + ' (' + cVarElo + ')'; 
            $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1</label>');    
            $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">0</label>');    
            if (cColorSide=='White') {
                ResultadoPartida = '1-0';
            }else{
                ResultadoPartida = '0-1';
            }            
        }else{
            cCadena = cUserName + ' won by disconnect. ( 1-0 ) The game was unrated.';
            $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1</label>');    
            $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">0</label>');    
            if (cColorSide=='White') {
                ResultadoPartida = '1-0';
            }else{
                ResultadoPartida = '0-1';
            }                
        }
        
        socket.emit('WinByMate',{RoomName:cWhiteIdPrivate,PlayerNameWhoLost:OpName,EloWhoLost:OpElo,PlayerNameWhoWin:cUserName,EloWhoWin:MyElo,VarElo:VarElo,ColorSide:cColorSide,Desconect:true});
            
        $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
         
        $('#DatosAbajoPlayer').append('<label style="color:green; margin-left:12px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">(' + cVarElo + ')</label>');    
                
        $("#sdivGame").append("<label id='" + (ContPosi+1) + "' style='float:left; margin-left:7px; font-size:22px; font-weight:bold; font-family:Arial,Helvetica,sans-serif;'>" + ' ' + ResultadoPartida + "</label>");
        
        cPartidaCompleta = cPartidaCompleta + ' ' + ResultadoPartida;
        
        PartidaTerminada = true;
        $('#BotonesGame').show();
        
        // Reset all
        $('#Abort').hide();
        $('#Resign').hide();
        $('#Draw').hide();	
        $('#NewGame').show();
        $('#OfferingDraw').hide();
        $('#OfferingDrawLabel').hide();
        $('#DeclinedDrawLabel').hide();
        $('#DeclinedRematchLabel').hide();
        
         // play sound
        if ( lSound=='1') {
            ion.sound.play('win');    
        }   
        
        socket.emit('UpdateGameStatus',{cStatus:ResultadoPartida,nGameNumber:nCodigoAltaPartida});    
        
        $('#dialog-result').html(
                            '<div id="dialog-result" title="Information">' +
                            '<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+cCadena+'</p>' +
                            '</div>'
                            );
        $('#dialog-result').dialog({height:330},{width:300});
        $('#dialog-result').dialog('open');
        
        $(document).attr('title','Won by Disconnect');
        
    }
    
    Playing = false;
    
    BufferMoveShow = ContPosi;
    
}

function AcceptDraw(){    
    
    clearInterval(MyTimer);    
    
    var Dif = OpElo - MyElo;
    var Exig = CalcularExigencia(Dif);
    var VarElo;	
    var cVarElo = '';
    var cCadena = '';
    ResultadoPartida = '';    
        
    if (SelectRat=='Rated'){        
        VarElo = (50 - Exig)/5;
        VarElo = VarElo * (-1);
        MyElo = (parseFloat(MyElo) + parseFloat(VarElo));
        MyElo = Math.round(MyElo);
        OpElo = (parseFloat(OpElo) - parseFloat(VarElo));
        OpElo = Math.round(OpElo);
    }else{
        VarElo = 0;        
    }    
    
    if (VarElo >= 0){
	cVarElo = '+' + VarElo;
    }else{
	cVarElo = VarElo;
    }    
    
    if (SelectRat=='Rated') {
        cCadena = 'The game was draw by agreement. ( 0.5-0.5 ) The new rating is: ' + MyElo + ' (' + cVarElo + ')'; 
        $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
        $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
    }else{
        cCadena = 'The game was draw by agreement. ( 0.5-0.5 ) The game was unrated.';
        $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
        $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
    }
    
    ResultadoPartida = '1/2-1/2';
    
    socket.emit('AcceptDraw',{RoomName:cWhiteIdPrivate,OpPlayerName:OpName,OpElo:OpElo,MyPlayerName:cUserName,MyElo:MyElo,VarElo:VarElo,ColorSide:cColorSide});
        
    $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
     
    $('#DatosAbajoPlayer').append('<label style="color:green; margin-left:12px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">(' + cVarElo + ')</label>');    
        
    $(document).attr('title','Draw by Agreement');
    
    $("#sdivGame").append("<label id='" + (ContPosi+1) + "' style='float:left; margin-left:7px; font-size:22px; font-weight:bold; font-family:Arial,Helvetica,sans-serif;'>" + ' ' + ResultadoPartida + "</label>");
        
    cPartidaCompleta = cPartidaCompleta + ' ' + ResultadoPartida;
    
    PartidaTerminada = true;
    $('#BotonesGame').show();
    
    // Reset all
    $('#Abort').hide();
    $('#Resign').hide();
    $('#Draw').hide();	
    $('#NewGame').show();
    if (Playing){
       $('#Rematch').show();
       OfferingRematch = true;
    }else{
       $('#Rematch').hide();
       OfferingRematch = false;
    }
    $('#OfferingDraw').hide();
    $('#OfferingDrawLabel').hide();
    $('#DeclinedDrawLabel').hide();
    Playing = false;
    
     // play sound
    if ( lSound=='1') {
        ion.sound.play('draw');    
    }   
    
    socket.emit('UpdateGameStatus',{cStatus:ResultadoPartida,nGameNumber:nCodigoAltaPartida});
    
    $('#dialog-result').html(
                        '<div id="dialog-result" title="Information">' +
                        '<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+cCadena+'</p>' +
                        '</div>'
                        );
    $('#dialog-result').dialog({height:330},{width:300});
    $('#dialog-result').dialog('open');
    
    BufferMoveShow = ContPosi;
    
}

function AcceptDrawBack(data){
    
   var VarElo = (data.VarElo)*(-1);        
    
    var cCadena = '';
    var cVarElo = '';
    var cCadena = '';
    ResultadoPartida = '';
    
    clearInterval(MyTimer);
        
    if (VarElo >= 0){
	cVarElo = '+' + VarElo;
    }else{
	cVarElo = VarElo;
    }       
         
    $(document).attr('title','Draw by Agreement');    
    
    $('#DatosAbajoPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
    $('#DatosArribaPlayer').append('<label style="margin-left:6px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:22px">1/2</label>');    
                
    if (Playing) {
        if (SelectRat=='Rated'){                
            cCadena = 'The game was draw by agreement. ( 0.5-0.5 ) The new rating is: ' + data.OpElo + ' (' + cVarElo + ')'; 
            MyElo = (parseFloat(MyElo) + parseFloat(VarElo));
            MyElo = Math.round(MyElo);
            OpElo = (parseFloat(OpElo) - parseFloat(VarElo));
            OpElo = Math.round(OpElo);
        }else{
            cCadena = 'The game was draw by agreement. ( 0.5-0.5 ) The game was unrated.';  
        }
        
        ResultadoPartida = '1/2-1/2';
        $("#sdivGame").append("<label id='" + (ContPosi+1) + "' style='float:left; margin-left:7px; font-size:22px; font-weight:bold; font-family:Arial,Helvetica,sans-serif;'>" + ' ' + ResultadoPartida + "</label>");
        cPartidaCompleta = cPartidaCompleta + ' ' + ResultadoPartida;
        PartidaTerminada = true;
        $('#BotonesGame').show();
        
        $('#DatosAbajoPlayer').append('<label style="color:green; margin-left:12px; margin-top:2px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">(' + cVarElo + ')</label>');    
        $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
        $('#dialog-result').html(
                            '<div id="dialog-result" title="Information">' +
                            '<p style="color:red; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+cCadena+'</p>' +
                            '</div>'
                            );
        $('#dialog-result').dialog({height:330},{width:300});
        $('#dialog-result').dialog('open');    
    }else{
        cCadena = 'The game was draw by agreement. ( 0.5-0.5 )';
        $('#status').append('<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + cCadena + '</label>');                            
    }
    
    // Reset all
    $('#Abort').hide();
    $('#Resign').hide();
    $('#Draw').hide();	
    $('#NewGame').show();
    if (Playing){
       $('#Rematch').show();
       OfferingRematch = true;
    }else{
       $('#Rematch').hide();
       OfferingRematch = false;
       // flag no seguir siguiente partida
       Following = false;
    }
    $('#OfferingDraw').hide();
    $('#OfferingDrawLabel').hide();
    $('#DeclinedDrawLabel').hide();
    Playing = false;
    
     // play sound
    if ( lSound=='1') {
        ion.sound.play('draw');    
    }
    
    BufferMoveShow = ContPosi;
    
}