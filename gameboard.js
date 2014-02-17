function GameBoard(playableSquares){
	this.points = 0;
	this.playableSquares = playableSquares;

	this.incrementPoints = function(value){
		this.points += value;
	}

	this.decrementPoints = function(value){
		this.points -= value;
	}

	this.setPlayableSquares = function(squares){
		this.playableSquares = squares;
	}

	this.getPlayableSquares = function(){
		return playableSquares;
	}

	this.getPoints = function(){
		return this.points;
	}

}