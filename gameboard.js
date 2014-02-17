function GameBoard(){
	this.points = 0;
	this.playableSquares = []

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

}