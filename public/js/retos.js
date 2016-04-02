var aControlRetos = [];
var nMinutosPartida = 5;
var nSegundosPartida = 0;
var Temp;
var OpId,OpName,OpElo,OpCountry;

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
    
    // add a aControlRetos
    var aReto = ['Id','Name','Elo','Country','Minutos','Segundos'];
    aReto[0]=MyId; aReto[1]=cUserName; aReto[2]=MyElo;
    aReto[3]=MyCountry; aReto[4]=nMinutosPartida; aReto[5]=nSegundosPartida;
    aControlRetos.push(aReto);
    
    //Propagar
    socket.emit('MandarReto',{DatosReto:aReto});
    
}

function CancelarReto(PlayerId,Local){
    
    getItemByName2(PlayerId).remove();    
    canvas2.renderAll();
    
    for (var i=0;i<aControlRetos.length;i++) {
      if (aControlRetos[i][0]==PlayerId){
        aControlRetos.splice(i,1);        
      }      
    }
    
    //Propagar
    if (Local){
        socket.emit('CancelarReto',{PlayerId:PlayerId});    
    }
    
}

function CrearRetoRemoto(data){
    
    var nTotalSeg = (data.DatosReto[4]*60)+(data.DatosReto[5]*30);
    var y = EloToPos(data.DatosReto[2])*20;
    var x = TimeToPos(nTotalSeg)*20;
        
    //Dibujar reto remoto
    var rect = new fabric.Rect({
        width:20,height:20,fill:'red',left:x-3+12,top:y-3-24
        });
    rect.name = data.DatosReto[0];    
    canvas2.add(rect);
    getItemByName2(data.DatosReto[0]).hasControls = getItemByName2(data.DatosReto[0]).hasBorders = false;
    canvas2.renderAll();
    
    // add a aControlRetos
    var aReto = ['Id','Name','Elo','Country','Minutos','Segundos'];
    aReto[0]=data.DatosReto[0]; aReto[1]=data.DatosReto[1]; aReto[2]=data.DatosReto[2];
    aReto[3]=data.DatosReto[3]; aReto[4]=data.DatosReto[4]; aReto[5]=data.DatosReto[5];
    aControlRetos.push(aReto);    
    
}

function CargarRecursosRetos(){
    
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
                if (aControlRetos[i][0]==e.target.name){
                    $('#status').html(
                        "<label style=\"color:red; margin-left:8px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px\">Player: </label>" +
			"<label style=\"color:green; margin-left:8px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px\">" + aControlRetos[i][1] + "</label>" +       
                        "<label style=\"color:red; margin-left:8px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px\">Elo: </label>" +
			"<label style=\"color:green; margin-left:8px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px\">" + aControlRetos[i][2] + "</label>" +      
                        "<label style=\"color:red; margin-left:8px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px\">Minutos: </label>" +
			"<label style=\"color:green; margin-left:8px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px\">" + aControlRetos[i][4] + "</label>" +       
                        "<label style=\"color:red; margin-left:8px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px\">Segundos: </label>" +
			"<label style=\"color:green; margin-left:8px; margin-top:10px; margin-right:4px; float:left; font-family:Arial,Helvetica,sans-serif; font-weight:bold; font-size:18px\">" + aControlRetos[i][5] + "</label>"        
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
        }
        
        if (e.target.get('type')=='rect') {
            
            $('#ContenedorRetos').hide();
            $('#ContenedorBoard').show();
            cColorSide = 'Black';
            DrawPos();
                        
            // Cambiar color para el oponente
            if (cColorSide=='White') {
                cColorSide = 'Black';
            }else{
                cColorSide = 'White';
            }
            
            //Buscar datos del reto
            for (var i=0;i<aControlRetos.length;i++) {
                
                if (aControlRetos[i][0]==e.target.name){
                    
                    //Cargar datos Op
                    
                    
                    //Id to send
                    var OpId = aControlRetos[i][0];
                    
                    //Devolver mis datos
                    socket.emit('AceptarReto',{OpId:OpId,ColorSide:cColorSide,Id:MyId,Name:cUserName,Elo:MyElo,Country:MyCountry}); 
                    
                    //Cancelar ambos retos remotos
                    socket.emit('CancelarReto',{PlayerId:OpId});
                    socket.emit('CancelarReto',{PlayerId:MyId});
                }
                
            }
            VaciarRetos();
            
        }
        
    });    
    
}

function LoadBoard(data){
    
    // Ok alert(data.ColorSide+'  '+data.Id+'  '+data.Name+'  '+data.Elo+'  '+data.Country); Datos Oponente
    
    $('#ContenedorRetos').hide();
    $('#ContenedorBoard').show();
            
    cColorSide = data.ColorSide;
    DrawPos();
    
    VaciarRetos();    
    
}

