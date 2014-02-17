function AI(){
	this.color = "";
	this.playableSquares = [];
	this.redCheckers = [];
	this.blackCheckers = [];
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

		gameBoard = new GameBoard(this.playableSquares);

		//return the gameboard that optimizes play for the CPU
		return this.calculateBestMove(0, gameBoard, this.redCheckers, this.blackCheckers);;
	}

	//return the number of moves available to the game 
	this.calculateBestMove = function(level, gameBoard, redCheckers, blackCheckers){

		if(level > this.MAX_DEPTH){
			return gameBoard;
		}else{

			var squares = jQuery.extend(true, [], gameBoard.getPlayableSquares());
			var newRedCheckers = jQuery.extend(true, [], redCheckers);
			var newBlackCheckers = jQuery.extend(true, [], blackCheckers);

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
					movableChecker = newRedCheckers[i];
				}else{
					movableChecker = newBlackCheckers[i];
				}
					if(movableChecker.x != null){
					var checker = jQuery.extend(true, {}, movableChecker);
					if(checker.hasMoveAvailable(squares, turn)){
						movableCheckerArray.push(movableChecker);
					}
				}
			}

			var bestChecker = {};
			var bestCheckerPoints = 0;
			//for each movable checker, make each available move
			movableCheckerArray.forEach(function(checker){
				var allNewBoards = checker.makeAllMoves(squares);
				var currentCheckerPoints = 0;
				allNewBoards.forEach(function(board){
					//evaluate each new gameboard
					//console.log(board);
					board.getPlayableSquares().forEach(function(square){
						
						if(square.getChecker().color == turn){
							board.incrementPoints(5);
							currentCheckerPoints += 5;
						}else{
							board.decrementPoints(5);
							currentCheckerPoints -= 5;
						}

					});
					//console.log(board);
					//recursive call to self to evaluate to 5 levels
					//newGameBoard = this.calculateBestMove(level+1, board, redCheckers, blackCheckers);
				});

				if (!bestChecker.hasOwnProperty("color") || (currentCheckerPoints > bestCheckerPoints)){
					bestChecker = checker;
				}

			});

			console.log(bestChecker);
			//once the best checker is found, select the best move and return that gameboard
			var allNewBoards = bestChecker.makeAllMoves(squares);
			var bestBoard = {};
			allNewBoards.forEach(function(board){
				board.getPlayableSquares().forEach(function(square){
					if(square.getChecker().getColor() == turn){
						board.incrementPoints(5);
					}else{
						board.decrementPoints(5);
					}
				});
				if(!bestBoard.hasOwnProperty('points') || board.getPoints() > bestBoard.getPoints()){
					bestBoard = board;
				}
			});
			//console.log(bestBoard);
			return bestBoard;
		}
	}







}
