var cColorSide = 'White';
var aPos;
var aPosiciones;
var ContPosi;
var CasIniSel,CasFinSel;
var Click1;
var CasIni,CasFin
var oPiezaIni;
var Moving;
var aCas = ['a8','b8','c8','d8','e8','f8','g8','h8',
            'a7','b7','c7','d7','e7','f7','g7','h7',
            'a6','b6','c6','d6','e6','f6','g6','h6',
            'a5','b5','c5','d5','e5','f5','g5','h5',
            'a4','b4','c4','d4','e4','f4','g4','h4',
            'a3','b3','c3','d3','e3','f3','g3','h3',
            'a2','b2','c2','d2','e2','f2','g2','h2',
            'a1','b1','c1','d1','e1','f1','g1','h1'
            ];

function Reset(){
    
    aPosiciones = [];
    ContPosi = 0;
    aControlRetos = [];
    
    aPos = ['br1','bn1','bb1','bq' ,'bk' ,'bb2','bn2','br2',
            'bp1','bp2','bp3','bp4','bp5','bp6','bp7','bp8',
            '0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,
            '0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,
            '0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,
            '0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,'0'  ,
            'wp1','wp2','wp3','wp4','wp5','wp6','wp7','wp8',
            'wr1','wn1','wb1','wq' ,'wk' ,'wb2','wn2','wr2',
            '0'  ,'0'  ,'0'  ,''   ,'0'  ,'0'  ,'0'  ,'0'];
    
    //aPos[64] = Casilla buffer si hay captura
    //aPos[65] = CasIni
    //aPos[66] = CasFin
    //aPos[67] = Cadena move
    //aPos[68] = PeonIniCor
    //aPos[69] = DamaFinCor
    
    Click1 = false;
    Moving = false;    
    
    var aBuffer = new Array(72);
    var i;
    for	(i = 0; i < aBuffer.length; i++){
        aBuffer[i] = aPos[i];
    }    
    
    aPosiciones.push(aBuffer);
    ContPosi = aPosiciones.length-1;    
        
}

function ReverseMove(Top,Left,Name){
    
    getItemByName(Name).set({top:442-Top-49+2,left:442-Left-49+2});
    getItemByName(Name).setCoords();
    
}

function LeftTopToCas(xObj,yObj,cColor,oObj){

    var nCol,nFila,nCas;
    
    if (xObj<=49){
        nCol = 0;
        oObj.set({left:27});        
    }else if ((xObj>=49)&&(xObj<=98)){
        nCol = 1;
        oObj.set({left:76});        
    }else if ((xObj>=98)&&(xObj<=147)){
        nCol = 2;
        oObj.set({left:125});        
    }else if ((xObj>=147)&&(xObj<=196)){
        nCol = 3;
        oObj.set({left:174});        
    }else if ((xObj>=196)&&(xObj<=245)){
        nCol = 4;
        oObj.set({left:223});        
    }else if ((xObj>=245)&&(xObj<=294)){
        nCol = 5;
        oObj.set({left:272});        
    }else if ((xObj>=294)&&(xObj<=343)){
        nCol = 6;
        oObj.set({left:321});        
    }else if (xObj>=343){
        nCol = 7;
        oObj.set({left:370});        
    }
    
    if (yObj<=49){
        nFila = 0;
        oObj.set({top:27});        
    }else if ((yObj>=49)&&(yObj<=98)){
        nFila = 1;
        oObj.set({top:76});        
    }else if ((yObj>=98)&&(yObj<=147)){
        nFila = 2;
        oObj.set({top:125});        
    }else if ((yObj>=147)&&(yObj<=196)){
        nFila = 3;
        oObj.set({top:174});        
    }else if ((yObj>=196)&&(yObj<=245)){
        nFila = 4;
        oObj.set({top:223});        
    }else if ((yObj>=245)&&(yObj<=294)){
        nFila = 5;
        oObj.set({top:272});        
    }else if ((yObj>=294)&&(yObj<=343)){
        nFila = 6;
        oObj.set({top:321});        
    }else if (yObj>=343){
        nFila = 7;
        oObj.set({top:370});        
    }
    
    oObj.setCoords();
    canvas.renderAll();
    
    if (cColor=='White') {
        nCas = (nFila*8)+nCol;
    }else{
        nCas = 63-((nFila*8)+nCol);
    }
    return nCas;

}

function MakeMove(oObjIni,oObjFin){
    
    var cMove = '';
    var ColorPiezaIni = aPos[CasIni].substring(0,1);
    var ColorPiezaFin = aPos[CasFin].substring(0,1);
    var PiezaIni = aPos[CasIni];    
    var cPiezaMove = aPos[CasIni].substring(1,2);    
    cPiezaMove = cPiezaMove.toUpperCase();    
    
    aPos[65] = CasIni;
    aPos[66] = CasFin;
    
    aPos[68] = '0';
    aPos[69] = '0';
    
    // Casilla final vacia    
    if (aPos[CasFin]=='0'){  
        
        aPos[64] = '0';
                
        aPos[CasIni] = '0';
        aPos[CasFin] = PiezaIni;
        
        cMove = cPiezaMove;        
        cMove = cMove + aCas[CasIni] + '-' + aCas[CasFin];
        aPos[67] = cMove;
        
        if (cPiezaMove=='P'){
            
            cMove = aCas[CasIni] + '-' + aCas[CasFin];
            aPos[67] = cMove;
                
            //Coronacion blancas
            if ((CasIni>7)&&(CasIni<16)&&(CasFin>-1)&&(CasFin<8)){
                
                aPos[CasFin] = 'wq'+PiezaIni;                
                aPos[68] = PiezaIni;
                aPos[69] = 'wq'+PiezaIni;
                cMove = aCas[CasIni] + '-' + aCas[CasFin] + '=D';
                aPos[67] = cMove;
                
                if (!QueenExist('wq'+PiezaIni)){
                    var object = fabric.util.object.clone(getItemByName('wq'));
                    object.name = 'wq'+PiezaIni;
                    canvas.add(object);                    
                }
                
            }
            
            //Coronacion negras
            if ((CasIni>47)&&(CasIni<56)&&(CasFin>55)&&(CasFin<64)){
                
                aPos[CasFin] = 'bq'+PiezaIni;                
                aPos[68] = PiezaIni;
                aPos[69] = 'bq'+PiezaIni;                                
                cMove = aCas[CasIni] + '-' + aCas[CasFin] + '=D';
                aPos[67] = cMove;
                
                if (!QueenExist('bq'+PiezaIni)){
                    var object = fabric.util.object.clone(getItemByName('bq'));
                    object.name = 'bq'+PiezaIni;
                    canvas.add(object);                    
                }
                
            }
                        
        }        
        
        //Enroques
        if (cPiezaMove=='K'){
            
            if ((CasIni==60)&&(CasFin==62)){
                aPos[63] = '0';
                aPos[61] = 'wr2';
                cMove = 'O-O';
                aPos[67] = cMove;
            }else if ((CasIni==60)&&(CasFin==58)){
                aPos[56] = '0';
                aPos[59] = 'wr1';
                cMove = 'O-O-O';
                aPos[67] = cMove;
            }else if ((CasIni==4)&&(CasFin==6)){
                aPos[7] = '0';
                aPos[5] = 'br2';
                cMove = 'O-O';
                aPos[67] = cMove;
            }else if ((CasIni==4)&&(CasFin==2)){
                aPos[0] = '0';
                aPos[3] = 'br1';
                cMove = 'O-O-O';
                aPos[67] = cMove;
            }
        }        
        
    // Captura
    }else if (((ColorPiezaIni=='w')&&(ColorPiezaFin=='b')) || ((ColorPiezaIni=='b')&&(ColorPiezaFin=='w'))){
                
        cMove = '';
        aPos[64] = aPos[CasFin];         
        
        aPos[CasIni] = '0';
        aPos[CasFin] = PiezaIni;
        
        cMove =  cPiezaMove + aCas[CasIni] + 'x' + aCas[CasFin];
        aPos[67] = cMove;
        
        if (cPiezaMove=='P'){            
            
            cMove = aCas[CasIni] + 'x' + aCas[CasFin];
            aPos[67] = cMove;
            
            //Coronacion blancas
            if ((CasIni>7)&&(CasIni<16)&&(CasFin>-1)&&(CasFin<8)){
                
                aPos[CasFin] = 'wq'+PiezaIni;                
                aPos[68] = PiezaIni;
                aPos[69] = 'wq'+PiezaIni;
                cMove = aCas[CasIni] + 'x' + aCas[CasFin] + '=D';
                aPos[67] = cMove;
                
                if (!QueenExist('wq'+PiezaIni)){
                    var object = fabric.util.object.clone(getItemByName('wq'));
                    object.name = 'wq'+PiezaIni;
                    canvas.add(object);                    
                }
                
            }
            
            //Coronacion negras
            if ((CasIni>47)&&(CasIni<56)&&(CasFin>55)&&(CasFin<64)){
                
                aPos[CasFin] = 'bq'+PiezaIni;                
                aPos[68] = PiezaIni;
                aPos[69] = 'bq'+PiezaIni;                                
                cMove = aCas[CasIni] + 'x' + aCas[CasFin] + '=D';
                aPos[67] = cMove;
                
                if (!QueenExist('bq'+PiezaIni)){
                    var object = fabric.util.object.clone(getItemByName('bq'));
                    object.name = 'bq'+PiezaIni;
                    canvas.add(object);                    
                }
                
            }            
            
        }        
                
    }
        
    CasFinSel.visible = true;
    Click1 = false;
    DrawPos();
            
    var aBuffer = new Array(72);
    var i;
    for	(i = 0; i < aBuffer.length; i++){
        aBuffer[i] = aPos[i];
    }    
    
    aPosiciones.push(aBuffer);
    ContPosi = aPosiciones.length-1;        
        
};

function DrawPos() {

var x,y;
var Cont;
var objects = canvas.getObjects();

    for (x=0; x < objects.length; x++){
        if (canvas.item(x).get('type')=='image') {
            canvas.item(x).set({top:27,left:390});
            canvas.item(x).setCoords();            
        }        
    }
    canvas.renderAll();    
        
    if (cColorSide=='White'){        
        Cont = 0;        
        for (y=0; y < 8; y++){            
            for (x=0; x < 8; x++){
                if (aPos[Cont]!='0'){                
                    getItemByName(aPos[Cont]).set({top:(y*49)+27,left:(x*49)+27});
                    getItemByName(aPos[Cont]).setCoords();                    
                }                
                // Primer click
                if (Click1){
                    CasFinSel.visible = false;
                    if (CasIni==Cont){
                        CasIniSel.set({top:(y*49)+25,left:(x*49)+25});                        
                    }
                }else{                    
                    //Casillas ultimo movimiento
                    if ((CasIniSel.visible)&&(aPos[65]==Cont)){
                        CasIniSel.set({top:(y*49)+25,left:(x*49)+25});                    
                    }
                    if ((CasFinSel.visible)&&(aPos[66]==Cont)){
                        CasFinSel.set({top:(y*49)+25,left:(x*49)+25});                        
                    }                    
                }                
                Cont++;
            }            
        }
    }else{ //Black
        Cont = 63;        
        for (y=0; y < 8; y++){            
            for (x=0; x < 8; x++){
                if (aPos[Cont]!='0'){                
                    getItemByName(aPos[Cont]).set({top:(y*49)+27,left:(x*49)+27});
                    getItemByName(aPos[Cont]).setCoords();                    
                }
                // Primer click
                if (Click1){
                    CasFinSel.visible = false;
                    if (CasIni==Cont){
                        CasIniSel.set({top:(y*49)+25,left:(x*49)+25});                        
                    }
                }else{                    
                    //Casillas ultimo movimiento
                    if ((CasIniSel.visible)&&(aPos[65]==Cont)){
                        CasIniSel.set({top:(y*49)+25,left:(x*49)+25});                    
                    }
                    if ((CasFinSel.visible)&&(aPos[66]==Cont)){
                        CasFinSel.set({top:(y*49)+25,left:(x*49)+25});
                    }                    
                }
                Cont--;
            }            
        }
    }
    
    CasFinSel.setCoords();
    CasIniSel.setCoords();
    canvas.renderAll();
    
    //$('#BtnMove').val(aPos[67]);
    
}

var canvas,canvas2;
var rect;
var ColorPiezaIni;
var ColorPiezaFin;

function CargarRecursos(){
    
    canvas = new fabric.Canvas('BoardCanvas',{
            hoverCursor: 'pointer'            
    });
    
    canvas.backgroundColor = '#800080';  
    canvas.selection = false;    
    
    canvas.on({
                
        'object:moving':function(e){            
            
            Moving = true;            
            
            CasIniSel.visible = true;                
            canvas.renderAll();            
                               
        },
    
        'mouse:down':function(e){
            
            // Primer click
            if (Click1==false){
                
                if (e.target.get('type')=='image'){                    
                    
                    canvas.bringToFront(e.target);
                    CasIni = LeftTopToCas(e.target.left,e.target.top,cColorSide,e.target);                    
                    
                    ColorPiezaIni = aPos[CasIni].substring(0,1);                    
                    
                    CasIniSel.set({top:e.target.top-2,left:e.target.left-2});
                    CasIniSelCas = CasIni;
                    CasIniSel.visible = true;
                    CasFinSel.visible = false;
                    oPiezaIni = e.target;                   
                    Click1 = true;                                      
                    
                }
                
            }else{ //Segundo click
                
                if (Moving==false){                    
                                    
                    CasFin = LeftTopToCas(e.target.left,e.target.top,cColorSide,e.target);                    
                    ColorPiezaFin = aPos[CasFin].substring(0,1);                    
                    
                    if (ColorPiezaIni!=ColorPiezaFin){                        
                        
                        //Prevent desplazar casilla
                        e.target.set({top:e.target.top-2,left:e.target.left-2});
                        
                        var ObjFin = e.target;                        
                        MakeMove(oPiezaIni,ObjFin);                        
                    
                    }else if (CasIni==CasFin){                        
                        
                        CasIni = LeftTopToCas(e.target.left,e.target.top,cColorSide,e.target);
                                                
                        if (CasIniSel.visible){
                            CasIniSel.visible = false;
                            //Desactivar objeto
                            Click1 = false;
                        }else{
                            CasIniSel.visible = true;
                        }
                        
                    }else if (ColorPiezaIni==ColorPiezaFin){
                                                
                        oPiezaIni = e.target;
                        CasIni = LeftTopToCas(e.target.left,e.target.top,cColorSide,e.target);
                        CasIniSel.set({top:e.target.top-2,left:e.target.left-2});
                        CasIniSel.visible = true;
                        CasFinSel.visible = false;
                        
                    }                    
                    
                }
            }
            
            CasIniSel.setCoords();
            canvas.renderAll();
                        
        },
        
        'mouse:up':function(e){            
                
            if (Moving){
                
                CasFin = LeftTopToCas(e.target.left,e.target.top,cColorSide,e.target);
                
                //Misma Casilla
                if (CasIni==CasFin){
                    
                    CasIni = LeftTopToCas(e.target.left,e.target.top,cColorSide,e.target);    
                    oPiezaIni = e.target;
                    
                    Moving = false;
                    
                }else{ 
                    
                    var NameObjFin = aPos[CasFin];
                    if (NameObjFin=='0'){
                        NameObjFin = aPos[CasIni];
                    }else{
                        NameObjFin = aPos[CasFin];
                    }
                    var ObjFin = getItemByName(NameObjFin);                    
                                       
                    //Send Pos and Status
                    MakeMove(oPiezaIni,ObjFin);                    
                    
                    Moving = false;                   
                    
                }                                                  
            
            }            
            
        }
    
    });
    
    var cColorCas = 'rgba(240,217,181,1)';
        
    //Casilla inicial seleccionada
    CasIniSel = new fabric.Rect({
        left: 25,
        top: 25,
        fill: '',
        width: 48,
        height: 48,
        selectable: false
    });
    CasIniSel.set({strokeWidth:2,stroke:'rgba(100,200,200,1)'});
    canvas.add(CasIniSel);
    canvas.item(0).hasControls = canvas.item(0).hasBorders = false;
    
    //Casilla Final seleccionada
    CasFinSel = new fabric.Rect({
        left: 25+49,
        top: 25+49,
        fill: '',
        width: 48,
        height: 48,
        selectable: false
    });
    CasFinSel.set({strokeWidth:2,stroke:'rgba(100,200,200,1)'});
    canvas.add(CasFinSel);
    canvas.item(1).hasControls = canvas.item(1).hasBorders = false;
    
    CasIniSel.visible = false;
    CasFinSel.visible = false;
    
    //Borde del tablero
    rect = new fabric.Rect({
        left: 24,
        top: 24,
        fill: cColorCas,
        width: 394,
        height: 394,
        selectable: false
    });
    
    canvas.add(rect);
    canvas.item(2).hasControls = canvas.item(2).hasBorders = false;
    
    var nConCas = 1;
    // Casillas
    for (y=0; y < 8; y++){		
	
        for (x=0; x < 8; x++){	    
            
            rect = new fabric.Rect({
                left: (x*49)+25,
                top: (y*49)+25,
                fill: cColorCas,
                width: 49,
                height: 49,
                selectable: false
            });            
            rect.name = 'cas'+nConCas;
            canvas.add(rect);
            canvas.item(nConCas).hasControls = canvas.item(nConCas).hasBorders = false;
            nConCas = nConCas + 1;            
			
	    if (cColorCas == 'rgba(240,217,181,1)'){
		cColorCas = 'rgba(181,136,99,1)';
	    }else{
		cColorCas = 'rgba(240,217,181,1)';
	    }
            
	}		
	if (cColorCas == 'rgba(240,217,181,1)'){
	    cColorCas = 'rgba(181,136,99,1)';
	}else{
	    cColorCas = 'rgba(240,217,181,1)';
	}
        
    }
    
    // Create Pieces
    fabric.Image.fromURL('res/img/merida45br.png',function(oImg){        
        oImg.set({left:2+25,top:2+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'br1';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45bn.png',function(oImg){        
        oImg.set({left:51+25,top:2+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bn1';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45bb.png',function(oImg){        
        oImg.set({left:100+25,top:2+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bb1';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45bq.png',function(oImg){        
        oImg.set({left:149+25,top:2+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bq';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45bk.png',function(oImg){        
        oImg.set({left:198+25,top:2+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bk';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45bb.png',function(oImg){        
        oImg.set({left:247+25,top:2+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bb2';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45bn.png',function(oImg){        
        oImg.set({left:296+25,top:2+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'bn2';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45br.png',function(oImg){        
        oImg.set({left:345+25,top:2+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'br2';
        canvas.add(oImg);
    });
    
    //Peones negras
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){
        oImg.set({'left':2+(0*49)+25,'top':51+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'bp1';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){
        oImg.set({'left':2+(1*49)+25,'top':51+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'bp2';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){
        oImg.set({'left':2+(2*49)+25,'top':51+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'bp3';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){
        oImg.set({'left':2+(3*49)+25,'top':51+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'bp4';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){
        oImg.set({'left':2+(4*49)+25,'top':51+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'bp5';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){
        oImg.set({'left':2+(5*49)+25,'top':51+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'bp6';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){
        oImg.set({'left':2+(6*49)+25,'top':51+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'bp7';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45bp.png',function(oImg){
        oImg.set({'left':2+(7*49)+25,'top':51+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'bp8';
        canvas.add(oImg);            
    });
    
    //Peones blancas
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){
        oImg.set({'left':2+(0*49)+25,'top':296+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'wp1';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){
        oImg.set({'left':2+(1*49)+25,'top':296+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'wp2';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){
        oImg.set({'left':2+(2*49)+25,'top':296+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'wp3';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){
        oImg.set({'left':2+(3*49)+25,'top':296+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'wp4';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){
        oImg.set({'left':2+(4*49)+25,'top':296+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'wp5';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){
        oImg.set({'left':2+(5*49)+25,'top':296+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'wp6';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){
        oImg.set({'left':2+(6*49)+25,'top':296+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'wp7';
        canvas.add(oImg);            
    });
    fabric.Image.fromURL('res/img/merida45wp.png',function(oImg){
        oImg.set({'left':2+(7*49)+25,'top':296+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'wp8';
        canvas.add(oImg);            
    });    
    
    fabric.Image.fromURL('res/img/merida45wr.png',function(oImg){        
        oImg.set({left:2+25,top:345+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wr1';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45wn.png',function(oImg){        
        oImg.set({left:51+25,top:345+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wn1';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45wb.png',function(oImg){        
        oImg.set({left:100+25,top:345+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wb1';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45wq.png',function(oImg){        
        oImg.set({left:149+25,top:345+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wq';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45wk.png',function(oImg){        
        oImg.set({left:198+25,top:345+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wk';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45wb.png',function(oImg){        
        oImg.set({left:247+25,top:345+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wb2';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45wn.png',function(oImg){        
        oImg.set({left:296+25,top:345+25});
        oImg.hasControls = oImg.hasBorders = false;        
        oImg.name = 'wn2';
        canvas.add(oImg);
    });
    fabric.Image.fromURL('res/img/merida45wr.png',function(oImg){        
        oImg.set({left:345+25,top:345+25});
        oImg.hasControls = oImg.hasBorders = false;
        oImg.name = 'wr2';         
        canvas.add(oImg);
    });    
    
    ColocarCoordenadas('White');
    
    canvas.bringToFront(CasIniSel);
    canvas.bringToFront(CasFinSel);    
    
}

function ColocarCoordenadas(cColor){

    var text;
    
    //Horizontal
    if (cColor=='White'){
        text = new fabric.Text('a',{selectable:false,left:45,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('b',{selectable:false,left:94,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('c',{selectable:false,left:143,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('d',{selectable:false,left:192,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('e',{selectable:false,left:241,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('f',{selectable:false,left:290,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('g',{selectable:false,left:339,top:421,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('h',{selectable:false,left:388,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
    }else{        
        text = new fabric.Text('h',{selectable:false,left:45,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('g',{selectable:false,left:94,top:421,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('f',{selectable:false,left:143,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('e',{selectable:false,left:192,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('d',{selectable:false,left:241,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('c',{selectable:false,left:290,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('b',{selectable:false,left:339,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('a',{selectable:false,left:388,top:423,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
    }
    
    //Vertical
    if (cColor=='White'){
        text = new fabric.Text('8',{selectable:false,left:6,top:45,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('7',{selectable:false,left:6,top:94,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('6',{selectable:false,left:6,top:143,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('5',{selectable:false,left:6,top:192,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('4',{selectable:false,left:6,top:241,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('3',{selectable:false,left:6,top:290,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('2',{selectable:false,left:6,top:339,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('1',{selectable:false,left:6,top:388,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
    }else{
        text = new fabric.Text('1',{selectable:false,left:6,top:45,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('2',{selectable:false,left:6,top:94,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('3',{selectable:false,left:6,top:143,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('4',{selectable:false,left:6,top:192,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('5',{selectable:false,left:6,top:241,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('6',{selectable:false,left:6,top:290,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('7',{selectable:false,left:6,top:339,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
        text = new fabric.Text('8',{selectable:false,left:6,top:388,fontFamily:'Arial',fontSize:16,fontWeight:'bold',fill:'white'});
        canvas.add(text);
    }
}
    
function getItemByName(name){
    
    var object = null,
        objects = canvas.getObjects();    
        
    var x;
    for ( x=0; x<objects.length; x++ ){
        if (objects[x].name == name) {
            object = objects[x];
            break;
        }   
    }
    
    return object;
    
}

function getItemByName2(name){
    
    var object = null,
        objects = canvas2.getObjects();    
        
    var x;
    for ( x=0; x<objects.length; x++ ){
        if (objects[x].name == name) {
            object = objects[x];
            break;
        }   
    }
    
    return object;
    
}

function CheckIfExist(name){
    
    var objects = canvas.getObjects();    
        
    var x;
    for ( x=0; x<objects.length; x++ ){
        if (objects[x].name == name) {
            return true;
        }   
    }
    
    return false;
    
}

