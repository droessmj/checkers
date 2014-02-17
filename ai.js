function AI(){
	this.color = "";
	this.playableSquares = [];
	this.redCheckers = [];
	this.blackCheckers = [];
	this.bestGameBoard = {};
	this.MAX_DEPTH = 5;

	this.setColor = function(color){
		this.color = color;
	}

	//do a full copy of all variables that are passed in
	this.playGame = function(playableSquares, redCheckers, blackCheckers){
		//create a deep copy of the objects so that you do not modify the original game
		this.playableSquares = jQuery.extend(true, [], playableSquares);
		this.redCheckers = jQuery.extend(true, [], redCheckers);
		this.blackCheckers = jQuery.extend(true, [], blackCheckers);

		//create multiple threads to go off and play the potential games
		this.bestGameBoard = this.calculateBestMove(0, this.playableSquares, this.redCheckers, this.blackCheckers);

		//return the gameboard that optimizes play for the CPU
		return this.bestGameBoard;
	}

	//return the number of moves available to the game 
	this.calculateBestMove = function(level, playableSquares, redCheckers, blackCheckers){

		if(level > this.MAX_DEPTH){
			return playableSquares;
		}else{
			//set a variable that is the highest scoring game board
			var bestBoard = {};

			var squares = jQuery.extend(true, {}, playableSquares);

			//calculate which checkers can be moved to which spots
			var movableCheckerArray = [];

			//track whose turn it is by the level of depth -- 0 will always be red
			var turn = "black";
			if(level % 2 == 0){
				var turn = "red";
			}

			//---define the root checkers to be moved (level 0)
			for (var i = 0; i < redCheckers.length; i++){
				var movableChecker = {};
				if(turn == "red"){
					movableChecker = redCheckers[i];
				}else{
					movableChecker = blackCheckers[i];
				}
					if(movableChecker.x != null){
					var checker = jQuery.extend(true, {}, movableChecker);
					if(movableChecker.hasMoveAvailable(checker, squares, turn)){
						movableCheckerArray.push(movableChecker);
					}
				}
			}

			//for each movable checker, make each available move
			movableCheckerArray.forEach(function(checker){
				var allNewBoards = checker.makeAllMoves(squares);
				allNewBoards.forEach(function(board){
					//after move is made, evaluate each gameboard
					board.forEach(function(square){
						if(square.getChecker().getColor() == turn){
							board.incrementPoints(5);
						}else{
							board.decrementPoints(5);
						}
					});
					//recursive call to self to evaluate to 5 levels
					this.calculateBestMove(level+1, board, redCheckers, blackCheckers);
				});				
			});


		}
	}







}