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

function GetChatText(data){
    
    $('#sdivChat').append('<span style="color:red; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                            data.Name + ': ' + '</span>' + 
                            '<span style="color:green; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                            data.Menssage + '</span><br>');
    $('#sdivChat').animate({scrollTop:$('#sdivChat').prop('scrollHeight')},500);
    
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

function VaciarRetos(){        
    
    for (var i=0;i<aControlRetos.length;i++) {
        getItemByName2(aControlRetos[i][0]).remove();        
    }
    
    aControlRetos = [];
    canvas2.renderAll();
    
}