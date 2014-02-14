function AI(){
	
	this.playableSquares = {};
	this.redCheckers = {};
	this.blackCheckers = {};

	//do a full copy of all variables that are passed in
	this.playGame = function(playableSquares, redCheckers, blackCheckers){
		//create a deep copy of the objects so that you do not modify the original game
		this.playableSquares = jQuery.extend(true, {}, playableSquares);
		this.redCheckers = jQuery.extend(true, {}, redCheckers);
		this.blackCheckers = new jQuery.extend(true, {}, blackCheckers);
	}






}