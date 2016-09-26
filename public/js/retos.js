var aControlRetos = [];
var nMinutosPartida = 5;
var nSegundosPartida = 0;
var OpId,OpName,OpElo,OpCountry,OpAlt,OpWelcomeMenssage;
var Playing = false;
var Temp;

function CrearRetoLocal(){

    var nTotalSeg = (nMinutosPartida*60)+(nSegundosPartida*30);
    var y = EloToPos(MyElo)*20;
    var x = TimeToPos(nTotalSeg)*20;
        
    //Dibujar reto local
    var circle = new fabric.Circle({
        radius:12,fill:'green',left:x+3+12,top:y+3-24
    });
    circle.name = MyId;    
    canvas2.add(circle);
    getItemByName2(MyId).hasControls = getItemByName2(MyId).hasBorders = false;
    canvas2.renderAll();
    
    var aReto = {};
    
    aReto.Id=MyId; aReto.Name=cUserName; aReto.Elo=MyElo; aReto.Alt=MyAlt;
    aReto.Country=MyCountry; aReto.MinutosPartida=nMinutosPartida; aReto.SegundosPartida=nSegundosPartida;
    aReto.MinElo=MinElo; aReto.MaxElo=MaxElo; aReto.SelectRat=SelectRat; aReto.ColorPartida=ColorPartida; aReto.WelcomeMenssage=cWelcomeMenssage;
    
    aControlRetos.push(aReto);
    
    //Propagar
    socket.emit('MandarReto',{DatosReto:aReto});
    
    //Repetir cada 6 segundos
    Temp = setInterval(function(){socket.emit('MandarReto',{DatosReto:aReto});},6000);
    
    //Para control
    socket.emit('Challenging',{DatosReto:aReto});
    
}

function CancelarReto(PlayerId,Local){
    
    getItemByName2(PlayerId).remove();    
    canvas2.renderAll();
    
    for (var i=0;i<aControlRetos.length;i++) {      
      if (aControlRetos[i].Id==PlayerId){
        aControlRetos.splice(i,1);        
      }      
    }
    
    //Propagar
    if (Local){
        $(document).attr('title','KaspiChess');
        clearInterval(Temp);
        socket.emit('CancelarReto',{PlayerId:PlayerId});    
    }
    
}

function CrearRetoRemoto(data){
    
    var nTotalSeg = (data.DatosReto.MinutosPartida*60)+(data.DatosReto.SegundosPartida*30);
    var y = EloToPos(data.DatosReto.Elo)*20;
    var x = TimeToPos(nTotalSeg)*20;
        
    //Comprobar si el reto existe
    if (!CheckIfExist2(data.DatosReto.Id)) {   //Nuevo 
    
        //Dibujar reto remoto
        var rect = new fabric.Rect({
            width:20,height:20,fill:'red',left:x-3+12,top:y-3-24
            });
        rect.name = data.DatosReto.Id;    
        canvas2.add(rect);
        getItemByName2(data.DatosReto.Id).hasControls = getItemByName2(data.DatosReto.Id).hasBorders = false;
        canvas2.renderAll();
        
        var aReto = {};
        
        aReto.Id=data.DatosReto.Id; aReto.Name=data.DatosReto.Name; aReto.Elo=data.DatosReto.Elo; aReto.Alt=data.DatosReto.Alt;
        aReto.Country=data.DatosReto.Country; aReto.MinutosPartida=data.DatosReto.MinutosPartida; aReto.SegundosPartida=data.DatosReto.SegundosPartida;
        aReto.MinElo=data.DatosReto.MinElo; aReto.MaxElo=data.DatosReto.MaxElo; aReto.SelectRat=data.DatosReto.SelectRat; aReto.ColorPartida=data.DatosReto.ColorPartida; aReto.WelcomeMenssage=data.DatosReto.WelcomeMenssage;
        
        aControlRetos.push(aReto);          
            
    }
    
}

function CargarRecursosRetos(){
    
    var OpColorOpcion;
    
    canvas2 = new fabric.Canvas('RetosCanvas',{
            hoverCursor: 'pointer'            
    });
    
    canvas2.backgroundColor = '#FBEDFF';  
    canvas2.selection = false;
    canvas2.renderAll();
    
    fabric.Image.fromURL('res/img/barritavertical.gif',function(oImg){        
        oImg.set({left:4,top:23});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'bv';         
        canvas2.add(oImg);
    });
    
    fabric.Image.fromURL('res/img/barritahorizontal.png',function(oImg){        
        oImg.set({left:23,top:422});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'bh';         
        canvas2.add(oImg);
    });
    
    canvas2.on('mouse:over',function(e){
                
        if ((e.target.get('type')=='circle')||(e.target.get('type')=='rect')) {             
            
            //Buscar datos del reto
            for (var i=0;i<aControlRetos.length;i++) {
                if (aControlRetos[i].Id==e.target.name){
                    
                    OpColorOpcion = aControlRetos[i].ColorPartida;
                    
                    $('#status').html(
                        '<img src="res/img/flags/' + aControlRetos[i].Country + '.png" style="border:1px black solid;margin-left:8px; margin-top:9px; margin-right:8px; float:left;"></a>' +
                        '<label style="color:red; margin-left:8px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">Player: </label>' +
			'<label style="color:green; margin-left:8px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + aControlRetos[i].Name + '</label>' +       
                        '<label style="color:red; margin-left:8px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">Elo: </label>' +
			'<label style="color:green; margin-left:8px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + aControlRetos[i].Elo + '</label>' +      
                        '<label style="color:red; margin-left:8px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">Minutos: </label>' +
			'<label style="color:green; margin-left:8px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + aControlRetos[i].MinutosPartida + '</label>' +       
                        '<label style="color:red; margin-left:8px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">Segundos: </label>' +
			'<label style="color:green; margin-left:8px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + aControlRetos[i].SegundosPartida + '</label>' +       
                        '<label style="color:green; margin-left:20px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + aControlRetos[i].MinElo + '-' + aControlRetos[i].MaxElo + '</label>' +       
                        '<label style="color:green; margin-left:20px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + '(' + aControlRetos[i].SelectRat + ')' + '</label>' +
                        '<label style="color:green; margin-left:20px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">' + aControlRetos[i].ColorPartida + '</label>'
                    );                    
                }      
            }        
        }        
        
    });

    canvas2.on('mouse:out',function(e){
        $('#status').html("");
    });
    
    canvas2.on('mouse:down',function(e){
        
        if (e.target.get('type')=='circle') {
            CancelarReto(MyId,true);
            $('#NewGame').show();
            $('#Cancel').hide();
             // play sound
            if ( lSound=='1') {
                ion.sound.play('cancel');    
            }
        }
        
        if (e.target.get('type')=='rect') {                      
            
            //Buscar datos del reto
            for (var i=0;i<aControlRetos.length;i++) {
                
                if (aControlRetos[i].Id==e.target.name){
                    
                    //alert(aControlRetos[i].MinElo)
                    //alert(aControlRetos[i].MaxElo)
                    //alert(MyElo)
                    
                    if ((MyElo>=aControlRetos[i].MinElo)&&(MyElo<=aControlRetos[i].MaxElo)){                        
                        
                        $('#ContenedorRetos').hide();
                        $('#ContenedorBoard').show();
                        $('#NewGame').hide();
                        $('#Abort').show();
                        $('#Cancel').hide();
                        $(document).attr('title','Playing Game!');
                        $("#tabs").tabs("option", "active", 4); //jQuery 1.9+
                        
                        cColorSide = OpColorOpcion;           
                        
                        var cOpColor;
                        
                        if (cColorSide=='Random'){                            
                            var myRandomNumber = Math.floor(Math.random()*2);		
                            if (myRandomNumber == 0){
                                    cColorSide = 'White';
                                    cOpColor = 'Black';
                                    StartTimer('Abajo');
                            }else{
                                    cColorSide = 'Black';
                                    cOpColor = 'White';
                                    StartTimer('Arriba');
                            }                                    
                        }else if (cColorSide=='White'){
                            StartTimer('Arriba');
                            cColorSide = 'Black';
                            cOpColor = 'White';                            
                        }else if (cColorSide=='Black'){
                            StartTimer('Abajo');
                            cColorSide = 'White';
                            cOpColor = 'Black';                            
                        }            
                        // Mi color es cColorSide
                        DrawPos();                         
                        
                        //Id to send
                        OpId = aControlRetos[i].Id;
                        
                        //Cargar resto datos Op
                        OpName = aControlRetos[i].Name;
                        OpElo = aControlRetos[i].Elo;
                        OpCountry = aControlRetos[i].Country;
                        OpAlt = aControlRetos[i].Alt;                    
                        nMinutosPartida = aControlRetos[i].MinutosPartida;
                        nSegundosPartida = aControlRetos[i].SegundosPartida;
                        OpWelcomeMenssage = aControlRetos[i].WelcomeMenssage;
                        
                        //BufferMinutosPartida = nMinutosPartida;
                        //BufferSegundosPartida = nSegundosPartida;
                        
                        $('#sdivChat2').html('');
                        if (cWelcomeMenssage!=''){                        
                            $('#sdivChat2').append('<span style="color:red; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                                    cUserName + ': ' + '</span>' + 
                                    '<span style="color:green; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                                    cWelcomeMenssage + '</span><br>');
                            $('#sdivChat2').animate({scrollTop:$('#sdivChat2').prop('scrollHeight')},500);
                        }                        
                        if (OpWelcomeMenssage!=''){                    
                            $('#sdivChat2').append('<span style="color:red; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                                    OpName + ': ' + '</span>' + 
                                    '<span style="color:green; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                                     OpWelcomeMenssage + '</span><br>');
                            $('#sdivChat2').animate({scrollTop:$('#sdivChat2').prop('scrollHeight')},500);
                        }
                        
                        //Devolver mis datos
                        socket.emit('AceptarReto',{OpId:OpId,ColorSide:cOpColor,Id:MyId,Name:cUserName,Elo:MyElo,Country:MyCountry,Alt:MyAlt,MinutosPartida:nMinutosPartida,SegundosPartida:nSegundosPartida,WelcomeMenssage:cWelcomeMenssage}); 
                        
                        SelectRat = aControlRetos[i].SelectRat;
                        
                        //Cancelar ambos retos remotos
                        socket.emit('CancelarReto',{PlayerId:OpId});
                        socket.emit('CancelarReto',{PlayerId:MyId});
                        
                        VaciarRetos();
                
                        VerCoords();
                        
                        AltaPartida('');
                        
                        Playing = true;
                        
                        if ( lSound=='1') {
                            ion.sound.play('comienzopartida');                
                        }
                        
                        nNumberOfCalls = 4;                        
                        
                    }else{
                        $('#status').html('<label style="color:red; margin-left:8px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">The Challenger is out of Range.</label>');
		    }
                    
                }
                
            }            
            
        }
        
    });    
    
}

function LoadBoard(data){
    
    //En caso de varios oponentes accediendo al
    //mismo tiempo, entra solo el primero
    if (Playing==false) {
        
        Playing = true;          
        
        //Datos Op
        OpId = data.Id;
        OpName = data.Name;
        OpElo = data.Elo;
        OpCountry = data.Country;
        OpAlt = data.Alt;        
        nMinutosPartida = data.MinutosPartida;
        nSegundosPartida = data.SegundosPartida;
        OpWelcomeMenssage = data.WelcomeMenssage;        
        
        $('#sdivChat2').html('');
        if (cWelcomeMenssage!=''){
            $('#sdivChat2').append('<span style="color:red; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                    cUserName + ': ' + '</span>' + 
                    '<span style="color:green; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                    cWelcomeMenssage + '</span><br>');
            $('#sdivChat2').animate({scrollTop:$('#sdivChat2').prop('scrollHeight')},500);
        }        
        if (OpWelcomeMenssage!=''){
            $('#sdivChat2').append('<span style="color:red; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">'+ 
                    OpName + ': ' + '</span>' + 
                    '<span style="color:green; font-size:16px; font-family:Arial,Helvetica,sans-serif; font-weight:bold">' +
                    OpWelcomeMenssage + '</span><br>');
            $('#sdivChat2').animate({scrollTop:$('#sdivChat2').prop('scrollHeight')},500);
        }
        
        $('#ContenedorRetos').hide();
        $('#ContenedorBoard').show();
        $('#NewGame').hide();
        $('#Cancel').hide();
        $('#Abort').show();
        $(document).attr('title','Playing Game!');
        $('#tabs').tabs('option','active',4); //jQuery 1.9+
                        
        cColorSide = data.ColorSide;
        DrawPos();
        
        if (cColorSide=='White'){
            StartTimer('Abajo');
        }else{
            StartTimer('Arriba');
        }
        
        VaciarRetos();
        
        VerCoords();
        
        AltaPartida('full'); //Graba datos
        
        if ( lSound=='1') {
            ion.sound.play('comienzopartida');           
        }
        
        nNumberOfCalls = 4;        
        
    }
            
}

function AltaPartida(full) {
    
    var cNameWhitePlayer;
    var cNameBlackPlayer;
    var nEloWhitePlayer;
    var nEloBlackPlayer;
    var cIdWhitePlayer;
    var cIdBlackPlayer;    
        
    if (cColorSide=='White') {
        cNameWhitePlayer = cUserName;
        cNameBlackPlayer =  OpName;
        nEloWhitePlayer = MyElo;
        nEloBlackPlayer = OpElo;
        cIdWhitePlayer = MyId;
        cIdBlackPlayer = OpId;        
    }else{
        cNameBlackPlayer = cUserName;
        cNameWhitePlayer = OpName;
        nEloBlackPlayer = MyElo;
        nEloWhitePlayer = OpElo;
        cIdBlackPlayer = MyId;
        cIdWhitePlayer = OpId;        
    }
    
    //name room for private
    cWhiteIdPrivate = cIdWhitePlayer;
    
    //Join to room
    socket.emit('subscribe',{WhiteIdPrivate:cWhiteIdPrivate});
    
    $('#DatosArribaPlayer').html(
                                            '<label style="color:red; margin-left:0px; margin-top:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+OpName+'</label>' +
                                            '<label style="color:green; margin-left:8px; margin-top:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">('+OpElo+')</label>' +
                                            '<img src="res/img/flags/16/' + OpCountry + '.png"  title="'+OpAlt+'" style="border:0px black solid;margin-left:8px; margin-top:6px; float:left;"></a>'  
                                         );    
       
    $('#DatosAbajoPlayer').html(
                                            '<label style="color:red; margin-left:0px; margin-top:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">'+cUserName+'</label>' +
                                            '<label style="color:green; margin-left:8px; margin-top:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">('+MyElo+')</label>' +
                                            '<img src="res/img/flags/16/' + MyCountry + '.png" title="'+MyAlt+'" style="border:0px black solid;margin-left:8px; margin-top:6px; float:left;"></a>'  
                                         );
    
    $('#status').html(
                            '<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">Timing: </label>' +
                            '<label style="color:green; margin-left:2px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">('+nMinutosPartida+'/'+nSegundosPartida+')</label>' +
                            '<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">Game: </label>' +                           
                            '<label style="color:green; margin-left:2px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">('+SelectRat+')</label>' +
                            '<label style="color:red; margin-left:10px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px">Last: </label>' +
                            '<label id="LastMove" style="color:green; margin-left:2px; margin-top:10px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px"></label>'                            
                           )                
 
    //Grabar partida en BBDD
    if (full=='full') {
        var date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        var nTiming = nMinutosPartida + '/' + nSegundosPartida;
        socket.emit('RegisterGame',{when:date,status:'playing',show:'Y',whitename:cNameWhitePlayer,blackname:cNameBlackPlayer,whiteelo:nEloWhitePlayer,blackelo:nEloBlackPlayer,whiteid:cIdWhitePlayer,blackid:cIdBlackPlayer,timing:nTiming});
    }
    
    TiempoPartida =  nMinutosPartida * 60000;
    TiempoRestanteArriba = TiempoPartida;
    TiempoRestanteAbajo = TiempoPartida;
    
    aPos[72] = TiempoPartida;
    aPos[73] = TiempoPartida;
    
    $('#RelojArribaLabel').text(FormatearMilisegundos(TiempoRestanteArriba));
    $('#RelojAbajoLabel').text(FormatearMilisegundos(TiempoRestanteAbajo));
    
    LoadLegalMovesForWhite();
    
}

function AcceptRematch(){
    
    // for change room
    socket.emit('unsubscribe',{WhiteIdPrivate:cWhiteIdPrivate});
    
    Reset();   
        
    if (cColorSide=='White'){
        cColorSide = 'Black';
    }else{
        cColorSide = 'White';
    }
    aPos[70]=cColorSide; 
    
    $('#NewGame').hide();
    $('#OfferingRematch').hide();
    $('#Abort').show();
    $(document).attr('title','Playing Game!');      
    
    // Mi color es cColorSide
    DrawPos();    
    
    AltaPartida('');
    
    if (cColorSide=='White'){
        StartTimer('Abajo');
    }else{
        StartTimer('Arriba'); 
    }  
                        
    Playing = true;
                        
    if ( lSound=='1') {
        ion.sound.play('comienzopartida');                
    }
                        
    nNumberOfCalls = 4;
    
    socket.emit('AcceptRematch',{WhiteIdPrivate:cWhiteIdPrivate,OpId:OpId});
    
}

function AcceptRematchBack(data){
            
    // for change room
    socket.emit('unsubscribe',{WhiteIdPrivate:cWhiteIdPrivate});
    
    Reset();   
        
    if (cColorSide=='White'){
        cColorSide = 'Black';
    }else{
        cColorSide = 'White';
    }
    aPos[70]=cColorSide; 
    
    $('#NewGame').hide();
    $('#OfferingRematch').hide();
    $('#Abort').show();
    $(document).attr('title','Playing Game!');
    
     // Mi color es cColorSide
    DrawPos();     
    
    AltaPartida('full');
    
    if (cColorSide=='White'){
        StartTimer('Abajo');
    }else{
        StartTimer('Arriba'); 
    }    
                        
    Playing = true;
                        
    if ( lSound=='1') {
        ion.sound.play('comienzopartida');                
    }
                        
    nNumberOfCalls = 4;    
        
}