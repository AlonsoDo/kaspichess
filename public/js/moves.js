var AllMoves = new Array(500);
var LegalMoves = new Array(500);
var AllMovesIndex = 0;
var LegalMovesIndex = 0;
var nRegla50Moves = 0;

function CasillaBlancasAmenazada(nCasilla){
	
	var EstaAmenazada = false;
	var nContCas = nCasilla;
	
	// Torre y Dama Negras
	while (true){
		
		nContCas = nContCas + 1;
		
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){			
			continue;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}else if ((aPosicion[nContCas]=='r') || (aPosicion[nContCas]=='q')) {
			EstaAmenazada = true;
			return EstaAmenazada;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}
		
	}
	
	nContCas = nCasilla;
	
	while (true){
		
		nContCas = nContCas - 1;
		
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){			
			continue;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}else if ((aPosicion[nContCas]=='r') || (aPosicion[nContCas]=='q')) {
			EstaAmenazada = true;
			return EstaAmenazada;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}
		
	}
	
	nContCas = nCasilla;
	
	while (true){
		
		nContCas = nContCas - 12;
		
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){			
			continue;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}else if ((aPosicion[nContCas]=='r') || (aPosicion[nContCas]=='q')) {
			EstaAmenazada = true;
			return EstaAmenazada;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}
		
	}
	
	nContCas = nCasilla;
	
	while (true){
		
		nContCas = nContCas + 12;
		
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){			
			continue;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}else if ((aPosicion[nContCas]=='r') || (aPosicion[nContCas]=='q')) {
			EstaAmenazada = true;
			return EstaAmenazada;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}
		
	}
	
	nContCas = nCasilla;
	
	// Alfi y Dama Negras
	while (true){
		
		nContCas = nContCas + 11;
		
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){			
			continue;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}else if ((aPosicion[nContCas]=='b') || (aPosicion[nContCas]=='q')) {
			EstaAmenazada = true;
			return EstaAmenazada;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}
		
	}
	
	nContCas = nCasilla;
	
	while (true){
		
		nContCas = nContCas - 11;
		
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){			
			continue;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}else if ((aPosicion[nContCas]=='b') || (aPosicion[nContCas]=='q')) {
			EstaAmenazada = true;
			return EstaAmenazada;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}
		
	}
	
	nContCas = nCasilla;
	
	while (true){
		
		nContCas = nContCas - 13;
		
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){			
			continue;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}else if ((aPosicion[nContCas]=='b') || (aPosicion[nContCas]=='q')) {
			EstaAmenazada = true;
			return EstaAmenazada;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}
		
	}
	
	nContCas = nCasilla;
	
	while (true){
		
		nContCas = nContCas + 13;
		
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){			
			continue;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}else if ((aPosicion[nContCas]=='b') || (aPosicion[nContCas]=='q')) {
			EstaAmenazada = true;
			return EstaAmenazada;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}
		
	}
	
	// Rey
	nContCas = nCasilla;
	nContCas = nContCas - 12;
	if (aPosicion[nContCas]=='k') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas - 13;
	if (aPosicion[nContCas]=='k') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas - 11;
	if (aPosicion[nContCas]=='k') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas + 1;
	if (aPosicion[nContCas]=='k') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas - 1;
	if (aPosicion[nContCas]=='k') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas + 12;
	if (aPosicion[nContCas]=='k') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas + 11;
	if (aPosicion[nContCas]=='k') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas + 13;
	if (aPosicion[nContCas]=='k') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	// Caballo
	nContCas = nCasilla;
	nContCas = nContCas - 25;
	if (aPosicion[nContCas]=='n') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas - 23;
	if (aPosicion[nContCas]=='n') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas - 14;
	if (aPosicion[nContCas]=='n') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas + 10;
	if (aPosicion[nContCas]=='n') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas + 23;
	if (aPosicion[nContCas]=='n') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas + 25;
	if (aPosicion[nContCas]=='n') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas + 14;
	if (aPosicion[nContCas]=='n') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas - 10;
	if (aPosicion[nContCas]=='n') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	// Peon
	nContCas = nCasilla;
	nContCas = nContCas - 13;
	if (aPosicion[nContCas]=='p') {
		EstaAmenazada = true;		
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas - 11;
	if (aPosicion[nContCas]=='p') {
		EstaAmenazada = true;		
		return EstaAmenazada;			
	}	
	
	return EstaAmenazada;
	
}

function CasillaNegrasAmenazada(nCasilla){
	
	var EstaAmenazada = false;
	var nContCas = nCasilla;
	
	// Torre y Dama Negras
	while (true){
		
		nContCas = nContCas + 1;
		
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){			
			continue;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}else if ((aPosicion[nContCas]=='R') || (aPosicion[nContCas]=='Q')) {
			EstaAmenazada = true;
			return EstaAmenazada;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}
		
	}
	
	nContCas = nCasilla;
	
	while (true){
		
		nContCas = nContCas - 1;
		
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){			
			continue;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}else if ((aPosicion[nContCas]=='R') || (aPosicion[nContCas]=='Q')) {
			EstaAmenazada = true;
			return EstaAmenazada;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}
		
	}
	
	nContCas = nCasilla;
	
	while (true){
		
		nContCas = nContCas - 12;
		
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){			
			continue;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}else if ((aPosicion[nContCas]=='R') || (aPosicion[nContCas]=='Q')) {
			EstaAmenazada = true;
			return EstaAmenazada;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}
		
	}
	
	nContCas = nCasilla;
	
	while (true){
		
		nContCas = nContCas + 12;
		
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){			
			continue;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}else if ((aPosicion[nContCas]=='R') || (aPosicion[nContCas]=='Q')) {
			EstaAmenazada = true;
			return EstaAmenazada;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}
		
	}
	
	nContCas = nCasilla;
	
	// Alfi y Dama Negras
	while (true){
		
		nContCas = nContCas + 11;
		
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){			
			continue;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}else if ((aPosicion[nContCas]=='B') || (aPosicion[nContCas]=='Q')) {
			EstaAmenazada = true;
			return EstaAmenazada;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}
		
	}
	
	nContCas = nCasilla;
	
	while (true){
		
		nContCas = nContCas - 11;
		
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){			
			continue;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}else if ((aPosicion[nContCas]=='B') || (aPosicion[nContCas]=='Q')) {
			EstaAmenazada = true;
			return EstaAmenazada;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}
		
	}
	
	nContCas = nCasilla;
	
	while (true){
		
		nContCas = nContCas - 13;
		
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){			
			continue;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}else if ((aPosicion[nContCas]=='B') || (aPosicion[nContCas]=='Q')) {
			EstaAmenazada = true;
			return EstaAmenazada;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}
		
	}
	
	nContCas = nCasilla;
	
	while (true){
		
		nContCas = nContCas + 13;
		
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){			
			continue;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}else if ((aPosicion[nContCas]=='B') || (aPosicion[nContCas]=='Q')) {
			EstaAmenazada = true;
			return EstaAmenazada;			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}
		
	}
	
	// Rey
	nContCas = nCasilla;
	nContCas = nContCas - 12;
	if (aPosicion[nContCas]=='K') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas - 13;
	if (aPosicion[nContCas]=='K') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas - 11;
	if (aPosicion[nContCas]=='K') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas + 1;
	if (aPosicion[nContCas]=='K') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas - 1;
	if (aPosicion[nContCas]=='K') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas + 12;
	if (aPosicion[nContCas]=='K') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas + 11;
	if (aPosicion[nContCas]=='K') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas + 13;
	if (aPosicion[nContCas]=='K') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	// Caballo
	nContCas = nCasilla;
	nContCas = nContCas - 25;
	if (aPosicion[nContCas]=='N') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas - 23;
	if (aPosicion[nContCas]=='N') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas - 14;
	if (aPosicion[nContCas]=='N') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas + 10;
	if (aPosicion[nContCas]=='N') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas + 23;
	if (aPosicion[nContCas]=='N') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas + 25;
	if (aPosicion[nContCas]=='N') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas + 14;
	if (aPosicion[nContCas]=='N') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas - 10;
	if (aPosicion[nContCas]=='N') {
		EstaAmenazada = true;
		return EstaAmenazada;			
	}
	
	// Peon
	nContCas = nCasilla;
	nContCas = nContCas + 13;
	if (aPosicion[nContCas]=='P') {
		EstaAmenazada = true;		
		return EstaAmenazada;			
	}
	
	nContCas = nCasilla;
	nContCas = nContCas + 11;
	if (aPosicion[nContCas]=='P') {
		EstaAmenazada = true;		
		return EstaAmenazada;			
	}	
	
	return EstaAmenazada;
	
}

function WRMove(nCasilla){
	
	var nContCas = nCasilla;
	
	//Derecha
	while (true){
		
		nContCas = nContCas + 1;
				
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
			break;
		}		
	}
	
	nContCas = nCasilla;
	//Izquierda
    while (true){
		
		nContCas = nContCas - 1;
				
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
			break;
		}		
	}
    
    nContCas = nCasilla;
	//Arriba
    while (true){
		
		nContCas = nContCas - 12;
				
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
			break;
		}		
	}
	
    nContCas = nCasilla;
	//Abajo
    while (true){
		
		nContCas = nContCas + 12;
				
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
			break;
		}		
	}
}

function BRMove(nCasilla){
	
	var nContCas = nCasilla;
	
	//Derecha
	while (true){
		
		nContCas = nContCas + 1;
				
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
			break;
		}		
	}
	
	nContCas = nCasilla;
	//Izquierda
    while (true){
		
		nContCas = nContCas - 1;
				
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
			break;
		}		
	}
    
    nContCas = nCasilla;
	//Arriba
    while (true){
		
		nContCas = nContCas - 12;
				
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
			break;
		}		
	}
	
    nContCas = nCasilla;
	//Abajo
    while (true){
		
		nContCas = nContCas + 12;
				
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
			break;
		}		
	}	
}

function WBMove(nCasilla){
	
	var nContCas = nCasilla;
	
	//Derecha Arriba
	while (true){
		
		nContCas = nContCas - 11;
				
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
			break;
		}		
	}
	
	nContCas = nCasilla;
	//Izquierda Arriba
    while (true){
		
		nContCas = nContCas - 13;
				
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
			break;
		}		
	}
    
    nContCas = nCasilla;
	//Derecha abajo
    while (true){
		
		nContCas = nContCas + 13;
				
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
			break;
		}		
	}
	
    nContCas = nCasilla;
	//Izquierda Abajo
    while (true){
		
		nContCas = nContCas + 11;
				
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			break;
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
			break;
		}		
	}	
}

function BBMove(nCasilla){
	
	var nContCas = nCasilla;
	
	//Derecha Arriba
	while (true){
		
		nContCas = nContCas - 11;
				
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
			break;
		}		
	}
	
	nContCas = nCasilla;
	//Izquierda Arriba
    while (true){
		
		nContCas = nContCas - 13;
				
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
			break;
		}		
	}
    
    nContCas = nCasilla;
	//Derecha abajo
    while (true){
		
		nContCas = nContCas + 13;
				
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
			break;
		}		
	}
	
    nContCas = nCasilla;
	//Izquierda Abajo
    while (true){
		
		nContCas = nContCas + 11;
				
		if (aPosicion[nContCas]=='='){
			break;
		}else if (aPosicion[nContCas]=='0'){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			break;
		}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
			break;
		}		
	}	
}

function WQMove(nCasilla){
	
	WRMove(nCasilla);
	WBMove(nCasilla);	
	
}

function BQMove(nCasilla){
	
	BRMove(nCasilla);
	BBMove(nCasilla);	
	
}

function WKMove(nCasilla){

	var nContCas = nCasilla;	
	
	nContCas = nContCas - 12;
				
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;			
	
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}
		
	}	
	
	nContCas = nCasilla;
	
	nContCas = nContCas - 11;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}
		
	}	
	
	nContCas = nCasilla;
	
	nContCas = nContCas - 13;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}
		
	}	
	
	nContCas = nCasilla;
	
	nContCas = nContCas - 1;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}
		
	}	
	
	nContCas = nCasilla;
	
	nContCas = nContCas + 1;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}
		
	}
	
	nContCas = nCasilla;
	
	nContCas = nContCas + 12;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;	
			
		}
		
	}
	
	nContCas = nCasilla;
	
	nContCas = nContCas + 13;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;	
			
		}
		
	}
	
    nContCas = nCasilla;
	
	nContCas = nContCas + 11;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
		}
		
	}
	
	// Enroque Corto
	// Flag
	if (aPosicion[144]=='1'){
		//Casillas vacias
		if ((aPosicion[115]=='0') && (aPosicion[116]=='0')){
			//Casillas no atacadas
			if ((CasillaBlancasAmenazada(114)==false) && (CasillaBlancasAmenazada(115)==false) && (CasillaBlancasAmenazada(116)==false)){
			
				LegalMoves[LegalMovesIndex][0] = 114;
				LegalMoves[LegalMovesIndex][1] = 116;
								
				LegalMovesIndex = LegalMovesIndex + 1;
			
			}		
		}	
	}	
	
	// Enroque Largo
	// Flag
	if (aPosicion[145]=='1'){
		//Casillas vacias
		if ((aPosicion[113]=='0') && (aPosicion[112]=='0') && (aPosicion[111]=='0')){
			//Casillas no atacadas
			if ((CasillaBlancasAmenazada(114)==false) && (CasillaBlancasAmenazada(113)==false) && (CasillaBlancasAmenazada(112)==false)){
			
				LegalMoves[LegalMovesIndex][0] = 114;
				LegalMoves[LegalMovesIndex][1] = 112;
								
				LegalMovesIndex = LegalMovesIndex + 1;
			
			}		
		}	
	}
}

function BKMove(nCasilla){

	var nContCas = nCasilla;
	
	nContCas = nContCas - 12;
				
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;			
	
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
		
		}
		
	}	
	
	nContCas = nCasilla;
	
	nContCas = nContCas - 11;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
		
		}
				
	}	
	
	nContCas = nCasilla;
	
	nContCas = nContCas - 13;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
							
			AllMovesIndex = AllMovesIndex + 1;
			
		}
				
	}	
	
	nContCas = nCasilla;
	
	nContCas = nContCas - 1;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
							
			AllMovesIndex = AllMovesIndex + 1;
			
		}
				
	}	
	
	nContCas = nCasilla;
	
	nContCas = nContCas + 1;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
							
			AllMovesIndex = AllMovesIndex + 1;
			
		}
				
	}
	
	nContCas = nCasilla;
	
	nContCas = nContCas + 12;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
							
			AllMovesIndex = AllMovesIndex + 1;
			
		}
				
	}
	
	nContCas = nCasilla;
	
	nContCas = nContCas + 13;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
							
			AllMovesIndex = AllMovesIndex + 1;
			
		}
				
	}
	
    nContCas = nCasilla;
	
	nContCas = nContCas + 11;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
							
			AllMovesIndex = AllMovesIndex + 1;
			
		}
				
	}
	
	// Enroque Corto
	// Flag
	if (aPosicion[146]=='1'){
		//Casillas vacias
		if ((aPosicion[31]=='0') && (aPosicion[32]=='0')){
			//Casillas no atacadas
			if ((CasillaNegrasAmenazada(30)==false) && (CasillaNegrasAmenazada(31)==false) && (CasillaNegrasAmenazada(32)==false)){
			
				LegalMoves[LegalMovesIndex][0] = 30;
				LegalMoves[LegalMovesIndex][1] = 32;
								
				LegalMovesIndex = LegalMovesIndex + 1;
			
			}		
		}	
	}	
	
	// Enroque Largo
	// Flag
	if (aPosicion[147]=='1'){
		//Casillas vacias
		if ((aPosicion[29]=='0') && (aPosicion[28]=='0') && (aPosicion[27]=='0')){
			//Casillas no atacadas
			if ((CasillaNegrasAmenazada(30)==false) && (CasillaNegrasAmenazada(29)==false) && (CasillaNegrasAmenazada(28)==false)){
			
				LegalMoves[LegalMovesIndex][0] = 30;
				LegalMoves[LegalMovesIndex][1] = 28;
								
				LegalMovesIndex = LegalMovesIndex + 1;
			
			}		
		}	
	}	

}

function WNMove(nCasilla){

	var nContCas = nCasilla;
	
	nContCas = nContCas - 25;
				
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;			
	
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}
		
	}	
	
	nContCas = nCasilla;
	
	nContCas = nContCas - 14;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}
		
	}	
	
	nContCas = nCasilla;
	
	nContCas = nContCas + 10;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}
		
	}	
	
	nContCas = nCasilla;
	
	nContCas = nContCas + 23;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}
		
	}	
	
	nContCas = nCasilla;
	
	nContCas = nContCas + 25;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}
		
	}
	
	nContCas = nCasilla;
	
	nContCas = nContCas + 14;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;	
			
		}
		
	}
	
	nContCas = nCasilla;
	
	nContCas = nContCas - 10;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;	
			
		}
		
	}
	
    nContCas = nCasilla;
	
	nContCas = nContCas - 23;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toLowerCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
		}
		
	}	

}

function BNMove(nCasilla){

	var nContCas = nCasilla;
	
	nContCas = nContCas - 25;
				
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;			
	
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}
		
	}	
	
	nContCas = nCasilla;
	
	nContCas = nContCas - 14;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}
		
	}	
	
	nContCas = nCasilla;
	
	nContCas = nContCas + 10;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}
		
	}	
	
	nContCas = nCasilla;
	
	nContCas = nContCas + 23;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}
		
	}	
	
	nContCas = nCasilla;
	
	nContCas = nContCas + 25;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}
		
	}
	
	nContCas = nCasilla;
	
	nContCas = nContCas + 14;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;	
			
		}
		
	}
	
	nContCas = nCasilla;
	
	nContCas = nContCas - 10;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;	
			
		}
		
	}
	
    nContCas = nCasilla;
	
	nContCas = nContCas - 23;
	
	if (aPosicion[nContCas]=='0'){
			
		AllMoves[AllMovesIndex][0] = nCasilla;			
		AllMoves[AllMovesIndex][1] = nContCas;
						
		AllMovesIndex = AllMovesIndex + 1;
			
	}else if (aPosicion[nContCas]==aPosicion[nContCas].toUpperCase()){
			
		if (aPosicion[nContCas]!='='){
		
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
		}
		
	}	
}

function WPMove(nCasilla){
	
    var nContCas;
    	
	nContCas = nCasilla;	
	nContCas = nContCas - 12;
	
	if (aPosicion[nContCas]=='0'){
			
		//Promocion normal
		if ((nContCas > 25) && (nContCas < 34)){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
			AllMoves[AllMovesIndex][2] = 'Promocion';
						
			AllMovesIndex = AllMovesIndex + 1;			
			
		}else{
			// Movimiento un paso
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
		
		}		
			
	}
	
	// Capturas
	nContCas = nCasilla;	
	nContCas = nContCas - 11;
	
	if ((aPosicion[nContCas]=='r') || (aPosicion[nContCas]=='n') || (aPosicion[nContCas]=='b') || (aPosicion[nContCas]=='q') || (aPosicion[nContCas]=='k') || (aPosicion[nContCas]=='p')){
			
		// Captura con promocion
		if ((nContCas > 25) && (nContCas < 34)){
				
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
			AllMoves[AllMovesIndex][2] = 'PromocionCaptura';
							
			AllMovesIndex = AllMovesIndex + 1;
				
		}else{
				
			// Captura normal
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}		
		
	}
	
	nContCas = nCasilla;	
	nContCas = nContCas - 13;
	
	if ((aPosicion[nContCas]=='r') || (aPosicion[nContCas]=='n') || (aPosicion[nContCas]=='b') || (aPosicion[nContCas]=='q') || (aPosicion[nContCas]=='k') || (aPosicion[nContCas]=='p')){
				
		// Captura con promocion
		if ((nContCas > 25) && (nContCas < 34)){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
			AllMoves[AllMovesIndex][2] = 'PromocionCaptura';
							
			AllMovesIndex = AllMovesIndex + 1;
				
		}else{
				
			// Captura normal
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}		
		
	}
	
	//Captura al paso
	//Casilla donde se genera alpaso
	if (aPosicion[148]>0){
		
		if ((aPosicion[aPosicion[148]-1])=='P'){			
			
			AllMoves[AllMovesIndex][0] = aPosicion[148]-1;			
			AllMoves[AllMovesIndex][1] = aPosicion[148]-12;
			AllMoves[AllMovesIndex][2] = 'CapturaAlPaso';
					
			AllMovesIndex = AllMovesIndex + 1;	
		}
	
		if ((aPosicion[aPosicion[148]+1])=='P'){
			
			AllMoves[AllMovesIndex][0] = aPosicion[148]+1;			
			AllMoves[AllMovesIndex][1] = aPosicion[148]-12;
			AllMoves[AllMovesIndex][2] = 'CapturaAlPaso';
					
			AllMovesIndex = AllMovesIndex + 1;	
		}		
				
	}
	
	//Dos pasos inicio
	nContCas = nCasilla;	
		
	if ((nContCas > 97) && (nContCas < 106)){
		
		nContCas = nContCas - 12;
		
		if (aPosicion[nContCas]=='0'){
		
			nContCas = nContCas - 12;
		
			if (aPosicion[nContCas]=='0'){

				AllMoves[AllMovesIndex][0] = nCasilla;			
				AllMoves[AllMovesIndex][1] = nContCas;
				AllMoves[AllMovesIndex][2] = 'PeonDosPasos';
					
				AllMovesIndex = AllMovesIndex + 1;				
			
			}
		
		}
	
	}		
}

function BPMove(nCasilla){
	
    var nContCas;
    	
	nContCas = nCasilla;	
	nContCas = nContCas + 12;
	
	if (aPosicion[nContCas]=='0'){
			
		//Promocion normal
		if ((nContCas > 109) && (nContCas < 118)){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
			AllMoves[AllMovesIndex][2] = 'Promocion';
						
			AllMovesIndex = AllMovesIndex + 1;			
			
		}else{
			// Movimiento un paso
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
		
		}		
			
	}
	
	// Capturas
	nContCas = nCasilla;	
	nContCas = nContCas + 11;
	
	if ((aPosicion[nContCas]=='R') || (aPosicion[nContCas]=='N') || (aPosicion[nContCas]=='B') || (aPosicion[nContCas]=='Q') || (aPosicion[nContCas]=='K') || (aPosicion[nContCas]=='P')){
			
		// Captura con promocion
		if ((nContCas > 109) && (nContCas < 118)){
				
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
			AllMoves[AllMovesIndex][2] = 'PromocionCaptura';
							
			AllMovesIndex = AllMovesIndex + 1;
				
		}else{
				
			// Captura normal
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}		
		
	}
	
	nContCas = nCasilla;	
	nContCas = nContCas + 13;
	
	if ((aPosicion[nContCas]=='R') || (aPosicion[nContCas]=='N') || (aPosicion[nContCas]=='B') || (aPosicion[nContCas]=='Q') || (aPosicion[nContCas]=='K') || (aPosicion[nContCas]=='P')){
						
		// Captura con promocion
		if ((nContCas > 109) && (nContCas < 118)){
			
			AllMoves[AllMovesIndex][0] = nCasilla;			
			AllMoves[AllMovesIndex][1] = nContCas;
			AllMoves[AllMovesIndex][2] = 'PromocionCaptura';
							
			AllMovesIndex = AllMovesIndex + 1;
				
		}else{
				
			// Captura normal
			AllMoves[AllMovesIndex][0] = nCasilla;
			AllMoves[AllMovesIndex][1] = nContCas;
						
			AllMovesIndex = AllMovesIndex + 1;
			
		}		
		
	}
	
	//Captura al paso
	//Casilla donde se genera alpaso
	if (aPosicion[148]>0){
		
		if ((aPosicion[aPosicion[148]-1])=='p'){
			AllMoves[AllMovesIndex][0] = aPosicion[148]-1;			
			AllMoves[AllMovesIndex][1] = aPosicion[148]+12;
			AllMoves[AllMovesIndex][2] = 'CapturaAlPaso';
					
			AllMovesIndex = AllMovesIndex + 1;	
		}
	
		if ((aPosicion[aPosicion[148]+1])=='p'){
			AllMoves[AllMovesIndex][0] = aPosicion[148]+1;			
			AllMoves[AllMovesIndex][1] = aPosicion[148]+12;
			AllMoves[AllMovesIndex][2] = 'CapturaAlPaso';
								
			AllMovesIndex = AllMovesIndex + 1;	
			
		}		
		
	}
	
	//Dos pasos inicio
	nContCas = nCasilla;	
		
	if ((nContCas > 37) && (nContCas < 46)){
		
		nContCas = nContCas + 12;
		
		if (aPosicion[nContCas]=='0'){
		
			nContCas = nContCas + 12;
		
			if (aPosicion[nContCas]=='0'){

				AllMoves[AllMovesIndex][0] = nCasilla;			
				AllMoves[AllMovesIndex][1] = nContCas;
				AllMoves[AllMovesIndex][2] = 'PeonDosPasos';
					
				AllMovesIndex = AllMovesIndex + 1;		
			
			}
		
		}
	
	}			
}

function DondeRey(cColor){
	
	var i;
	
	for(i=26;i<118;i++){
		if (cColor == 'White'){
			if (aPosicion[i] == 'K'){
				return i;
			}
		}else{
			if (aPosicion[i] == 'k'){
				return i;
			}
		}
	}
}

function LoadLegalMovesForWhite(){

	var aPosBuffer;
	var i;
	var cPieza;
	var nCasIni;
	var nCasFin;
	var nCasRey;
	
	//Reset
	AllMovesIndex = 0;
	LegalMovesIndex = 0;
	
	//Recorrer Posicion
	for(i=26;i<118;i++){
		
		if (aPosicion[i] == 'R'){
			WRMove(i);
		}else if (aPosicion[i] == 'N'){
			WNMove(i);
		}else if (aPosicion[i] == 'B'){
			WBMove(i);
		}else if (aPosicion[i] == 'Q'){
			WQMove(i);
		}else if (aPosicion[i] == 'K'){
			WKMove(i);
		}else if (aPosicion[i] == 'P'){
			WPMove(i);
		}
		
	}
	
	//Guardar Posicion
	aPosBuffer = aPosicion.slice(0);
			
	// Recorrer AllMoves
	for(i=0;i<AllMovesIndex;i++){
		
		//Los enrroque ya estan cargados
		//continue;
		
		//Simular movimiento
		nCasIni = AllMoves[i][0];
		nCasFin = AllMoves[i][1];
		cPieza = aPosicion[nCasIni];
		
		//Comprobar captura al paso
		if (aPosicion[148] > 0){
			
			if (aPosicion[aPosicion[148]-1]=='P'){			
				if (nCasIni==aPosicion[148]-1){
					if (nCasFin==aPosicion[148]-12){
						aPosicion[aPosicion[148]] = 0;
					}
				}				
			}
			
			if (aPosicion[aPosicion[148]+1]=='P'){			
				if (nCasIni==aPosicion[148]+1){
					if (nCasFin==aPosicion[148]-12){
						aPosicion[aPosicion[148]] = 0;
					}
				}				
			}					
			
		}				
				
		aPosicion[nCasIni] = 0;
		aPosicion[nCasFin] = cPieza;			
		
		//Localizar rey blanco
		nCasRey = DondeRey("White");
			
		//Comprobar si amenazado
		if (CasillaBlancasAmenazada(nCasRey) == false){
			
			//Cargar movimiento en LegalMoves
			LegalMoves[LegalMovesIndex][0] = nCasIni;
			//alert(nCasIni);
			LegalMoves[LegalMovesIndex][1] = nCasFin;			
			//alert(nCasFin);
			LegalMovesIndex = LegalMovesIndex + 1;				
			
		}
		
		//Restaurar Posicion
		aPosicion = aPosBuffer.slice(0);		
		
	}
	
	return LegalMovesIndex;	
	
}

function LoadLegalMovesForBlack(){

	var aPosBuffer;
	var i;
	var cPieza;
	var nCasIni;
	var nCasFin;
	var nCasRey;
	
	//Reset
	AllMovesIndex = 0;
	LegalMovesIndex = 0;
	
	//Recorrer Posicion
	for(i=26;i<118;i++){
		
		if (aPosicion[i] == 'r'){
			BRMove(i);
		}else if (aPosicion[i] == 'n'){
			BNMove(i);
		}else if (aPosicion[i] == 'b'){
			BBMove(i);
		}else if (aPosicion[i] == 'q'){
			BQMove(i);
		}else if (aPosicion[i] == 'k'){
			BKMove(i);
		}else if (aPosicion[i] == 'p'){
			BPMove(i);
		}
		
	}
	
	//Guardar Posicion
	aPosBuffer = aPosicion.slice(0);
			
	// Recorrer AllMoves
	for(i=0;i<AllMovesIndex;i++){
		
		//Los enrroque ya estan cargados
		//continue;
		
		//Simular movimiento
		nCasIni = AllMoves[i][0];
		nCasFin = AllMoves[i][1];		
		cPieza = aPosicion[nCasIni];
		
		//Comprobar captura al paso
		if (aPosicion[148] > 0){			
			
			if (aPosicion[aPosicion[148]-1]=='p'){			
				if (nCasIni==aPosicion[148]-1){
					if (nCasFin==aPosicion[148]+12){
						aPosicion[aPosicion[148]] = 0;
					}
				}				
			}
			
			if (aPosicion[aPosicion[148]+1]=='p'){			
				if (nCasIni==aPosicion[148]+1){
					if (nCasFin==aPosicion[148]+12){
						aPosicion[aPosicion[148]] = 0;
					}
				}				
			}	
			
		}
					
		aPosicion[nCasIni] = 0;
		aPosicion[nCasFin] = cPieza;			
		
		//Localizar rey negro
		nCasRey = DondeRey("Black");
			
		//Comprobar si amenazado
		if (CasillaNegrasAmenazada(nCasRey) == false){
			
			//Cargar movimiento en LegalMoves
			LegalMoves[LegalMovesIndex][0] = nCasIni;
			LegalMoves[LegalMovesIndex][1] = nCasFin;			
			
			LegalMovesIndex = LegalMovesIndex + 1;			
			
		}		
		
		//Restaurar Posicion
		aPosicion = aPosBuffer.slice(0);		
		
	}
	
	return LegalMovesIndex;	
	
}

function FindMove(nCasIniPeq,nCasFinPeq){
	
	var nCasIniGra,nCasFinGra;
	var lMoveFound = false;
	var i;
		
	//Traducir numero casilla
	nCasIniGra = aConversion[nCasIniPeq];
	nCasFinGra = aConversion[nCasFinPeq];
	
	//Recorrer array LegalMoves
	for(i=0;i<LegalMovesIndex;i++){
		
		//Buscar Casilla Inicial
		if ( LegalMoves[i][0] == nCasIniGra ){			
		
			//Buscar Casilla Final
			if ( LegalMoves[i][1] == nCasFinGra){
				lMoveFound = true;
				return lMoveFound;
			}			
			
		}	
	
	}
	
	return lMoveFound;
	
}

function ActualizarPosicion(nCasIniPeq,nCasFinPeq,cCodigoPromo){
	
	var cPieza,cPiezaCap;
	var cTipoPieza = '';
	var nCasIniGra,nCasFinGra;	
	
	nRegla50Moves = nRegla50Moves + 1;	
	
	nCasIniGra = aConversion[nCasIniPeq];
	nCasFinGra = aConversion[nCasFinPeq];	
	
	// Captura al paso
	if (aPosicion[148] > 0){
		
		//cTipoPieza = 'Pap';
		
		if ((nCasFinGra==aConversion[16])&&((nCasIniGra-nCasFinGra)!=12)){
                    aPos[24] = '0';			
		    cTipoPieza = 'Pap';
		}else if ((nCasFinGra==aConversion[17])&&((nCasIniGra-nCasFinGra)!=12)){
		    aPos[25] = '0';
		    cTipoPieza = 'Pap';
		}else if ((nCasFinGra==aConversion[18])&&((nCasIniGra-nCasFinGra)!=12)){
                    aPos[26] = '0';
		    cTipoPieza = 'Pap';			
		}else if ((nCasFinGra==aConversion[19])&&((nCasIniGra-nCasFinGra)!=12)){
		    aPos[27] = '0';
		    cTipoPieza = 'Pap';
		}else if ((nCasFinGra==aConversion[20])&&((nCasIniGra-nCasFinGra)!=12)){
		    aPos[28] = '0';
		    cTipoPieza = 'Pap';
		}else if ((nCasFinGra==aConversion[21])&&((nCasIniGra-nCasFinGra)!=12)){
		    aPos[29] = '0';
		    cTipoPieza = 'Pap';
		}else if ((nCasFinGra==aConversion[22])&&((nCasIniGra-nCasFinGra)!=12)){
		    aPos[30] = '0';
		    cTipoPieza = 'Pap';
		}else if ((nCasFinGra==aConversion[23])&&((nCasIniGra-nCasFinGra)!=12)){
		    aPos[31] = '0';
		    cTipoPieza = 'Pap';
		}else if ((nCasFinGra==aConversion[40])&&((nCasIniGra-nCasFinGra)!=(-12))){
		    aPos[32] = '0';
		    cTipoPieza = 'Pap';
		}else if ((nCasFinGra==aConversion[41])&&((nCasIniGra-nCasFinGra)!=(-12))){
		    aPos[33] = '0';
		    cTipoPieza = 'Pap';
		}else if ((nCasFinGra==aConversion[42])&&((nCasIniGra-nCasFinGra)!=(-12))){
		    aPos[34] = '0';
		    cTipoPieza = 'Pap';
		}else if ((nCasFinGra==aConversion[43])&&((nCasIniGra-nCasFinGra)!=(-12))){
		    aPos[35] = '0';
		    cTipoPieza = 'Pap';
		}else if ((nCasFinGra==aConversion[44])&&((nCasIniGra-nCasFinGra)!=(-12))){
		    aPos[36] = '0';
		    cTipoPieza = 'Pap';
		}else if ((nCasFinGra==aConversion[45])&&((nCasIniGra-nCasFinGra)!=(-12))){
		    aPos[37] = '0';
		    cTipoPieza = 'Pap';
		}else if ((nCasFinGra==aConversion[46])&&((nCasIniGra-nCasFinGra)!=(-12))){
		    aPos[38] = '0';
		    cTipoPieza = 'Pap';
		}else if ((nCasFinGra==aConversion[47])&&((nCasIniGra-nCasFinGra)!=(-12))){
		    aPos[39] = '0';
		    cTipoPieza = 'Pap';
		}		
		
		if (aPosicion[aPosicion[148]-1]=='P'){			
			if (nCasIniGra==aPosicion[148]-1){
				if (nCasFinGra==aPosicion[148]-12){					
					aPosicion[aPosicion[148]] = 0;					
				}
			}				
		}
		
		if (aPosicion[aPosicion[148]+1]=='P'){			
			if (nCasIniGra==aPosicion[148]+1){
				if (nCasFinGra==aPosicion[148]-12){					
					aPosicion[aPosicion[148]] = 0;					
				}
			}				
		}
		
		if (aPosicion[aPosicion[148]-1]=='p'){			
			if (nCasIniGra==aPosicion[148]-1){
				if (nCasFinGra==aPosicion[148]+12){					
					aPosicion[aPosicion[148]] = 0;
				}
			}				
		}
		
		if (aPosicion[aPosicion[148]+1]=='p'){			
			if (nCasIniGra==aPosicion[148]+1){
				if (nCasFinGra==aPosicion[148]+12){					
					aPosicion[aPosicion[148]] = 0;					
				}
			}				
		}
		
	}	
	
	//Reset flag peon a.p.
	aPosicion[148] = 0;
	
	cPiezaCap = aPosicion[nCasFinGra];
		
	//Movimiento
	cPieza = aPosicion[nCasIniGra];		
	aPosicion[nCasIniGra] = 0;
	aPosicion[nCasFinGra] = cPieza;	
	
	if (cTipoPieza==''){ //Pieza Normal
		cTipoPieza = cPieza;
	}else{ //Peon al paso
		cTipoPieza = 'Pap';
	}	
	
	//50 moves rule on peon move reset or capture
	if ((cPieza == 'P') || (cPieza == 'p') || (cPiezaCap != '0') ){
		nRegla50Moves = 0;
	}
	
	//Romper opcion enroque
	if ((cPieza == 'R') && (nCasIniGra == 117)){
		aPosicion[144] = 0;
	}else if ((cPieza == 'R') && (nCasIniGra == 110)){
		aPosicion[145] = 0;
	}else if ((cPieza == 'r') && (nCasIniGra == 37)){
		aPosicion[146] = 0;
	}else if ((cPieza == 'r') && (nCasIniGra == 26)){
		aPosicion[147] = 0;
	}else if (cPieza == 'K'){
		aPosicion[144] = 0;
		aPosicion[145] = 0;
	}else if (cPieza == 'k'){
		aPosicion[146] = 0;
		aPosicion[147] = 0;
	}	
	
	//Actualizar enroques
	//Enroque Corto Blancas
	if ((nCasIniGra==114)&&(nCasFinGra==116)&&(cPieza=='K')){
		aPosicion[117] = 0;
		aPosicion[115] = 'R';
	//Enroque Largo Blancas
	}else if ((nCasIniGra==114)&&(nCasFinGra==112)&&(cPieza=='K')){
		aPosicion[110] = 0;
		aPosicion[113] = 'R';
	//Enroque Corto Negras
	}else if ((nCasIniGra==30)&&(nCasFinGra==32)&&(cPieza=='k')){
		aPosicion[33] = 0;
		aPosicion[31] = 'r';
	//Enroque Largo Negras
	}else if ((nCasIniGra==30)&&(nCasFinGra==28)&&(cPieza=='k')){
		aPosicion[26] = 0;
		aPosicion[29] = 'r';
	}	
	
	//Coronacion
	if ((nCasFinGra>25)&&(nCasFinGra<34)&&(cPieza=='P')){
		
		cTipoPieza = 'P';
		
		if (cCodigoPromo=='0'){
			aPosicion[nCasFinGra] = 'Q';
		}else if (cCodigoPromo=='1'){
			aPosicion[nCasFinGra] = 'Q';
		}else if (cCodigoPromo=='2'){
			aPosicion[nCasFinGra] = 'R';
		}else if (cCodigoPromo=='3'){	
			aPosicion[nCasFinGra] = 'N';
		}else if (cCodigoPromo=='4'){	
			aPosicion[nCasFinGra] = 'B';
			//alert(cCodigoPromo);
		}			
		
	}else if ((nCasFinGra>109)&&(nCasFinGra<118)&&(cPieza=='p')){
		
		cTipoPieza = 'p';
		
		if (cCodigoPromo=='0'){
			aPosicion[nCasFinGra] = 'q';
		}else if (cCodigoPromo=='5'){
			aPosicion[nCasFinGra] = 'q';
		}else if (cCodigoPromo=='6'){
			aPosicion[nCasFinGra] = 'r';
		}else if (cCodigoPromo=='7'){	
			aPosicion[nCasFinGra] = 'n';
		}else if (cCodigoPromo=='8'){	
			aPosicion[nCasFinGra] = 'b';
		}
		
	}	
	
	//Activar flag peon al paso cuando peon dos pasos
	if (cPieza == 'P'){
		if ((nCasIniGra - nCasFinGra) == 24){			
			if ((aPosicion[nCasFinGra + 1] == 'p') || (aPosicion[nCasFinGra - 1] == 'p')){
				aPosicion[148] = nCasFinGra;				
			}
		}
	}else if (cPieza == 'p'){
		if ((nCasFinGra - nCasIniGra) == 24){
			if ((aPosicion[nCasFinGra + 1 ]== 'P') || (aPosicion[nCasFinGra - 1] == 'P')){
				aPosicion[148] = nCasFinGra;				
			}
		}
	}
	
	return cTipoPieza;
	
}

function KingAlone(cColor){
	
	var i;
	var lKingAlone = true;
	
	// Recoger posicion
	for(i=0;i<144;i++){
	
		if (cColor == 'White'){
			if ((aPosicion[i]=='P') || (aPosicion[i]=='R') || (aPosicion[i]=='N') || (aPosicion[i]=='B') || (aPosicion[i]=='Q')){
				return false;								
			}
		}else{
			if ((aPosicion[i]=='p') || (aPosicion[i]=='r') || (aPosicion[i]=='n') || (aPosicion[i]=='b') || (aPosicion[i]=='q')){
				return false;								
			}
		}	
	
	}
	
	return lKingAlone;
	
}