function Checker(x,y,color,currentSquare){
	this.x = x;
	this.y = y;
	this.color = color;
	this.king = false;
	this.currentSquare = "";
	this.selected = false;
	this.justJumped = false;
	this.force = false;

	this.draw = function(){
		ctx.beginPath();
		ctx.fillStyle= this.color;
		ctx.arc(this.x,this.y,40,0,2*Math.PI);
		ctx.fill();
		if(this.king == true){
			if(color == "black"){
				ctx.lineWidth=4;
				ctx.strokeStyle = "red";
	      		ctx.stroke();
			}
		}else{
			if(color == "black"){
			ctx.lineWidth=2;
			ctx.strokeStyle = "red";
      		ctx.stroke();
			}
		}		
	}

	this.getForce = function(){
		return this.force;
	}

	this.setForce = function(parameter){
		this.force = parameter;
	}

	this.getJustJumped = function(){
		return this.justJumped;
	}

	this.setJustJumped = function(parameter){
		this.justJumped = parameter;
	}

	this.checkDouble = function(){
		//check if there is opportunity for a double jump
		var doubleJump = false;
		var currentSquareNum= this.currentSquare;
		if(Math.floor(currentSquareNum / 4) == 1 || Math.floor(currentSquareNum / 4) ==  3 || Math.floor(currentSquareNum / 4) == 5 || Math.floor(currentSquareNum / 4) == 7){
			a = 3;
			b = 4;
		}else{
			a = 4;
			b = 5;
		}

		if (this.color == "red" && this.king == false){
			var newSquareNum = 0;
			var newSquare = "";

			if((currentSquareNum+7 < 32)){
				newSquareNum = currentSquareNum+7;
				newSquare = playableSquares[newSquareNum];
				if((!playableSquares[currentSquareNum+a].isEmpty()) && playableSquares[currentSquareNum+a].checker.color == "black" && newSquare.isEmpty()){
					doubleJump = true;
				}
			}


			if((currentSquareNum+9 < 32)){
				newSquareNum = currentSquareNum+9;
				newSquare = playableSquares[newSquareNum];
				if((!playableSquares[currentSquareNum+b].isEmpty()) && playableSquares[currentSquareNum+b].checker.color == "black" && newSquare.isEmpty()){
					doubleJump = true;
				}
			}

		}else if(this.color == "black" && this.king == false){
			
			if(a == 4 && b == 5){
				a = 3;
				b = 4;
			}else{
				a = 4;
				b = 5;
			}

			var newSquareNum = 0;
			var newSquare = "";

			if((currentSquareNum-7 > -1)){
				newSquareNum = currentSquareNum-7;
				newSquare = playableSquares[newSquareNum];
				if((!playableSquares[currentSquareNum-a].isEmpty()) && playableSquares[currentSquareNum-a].checker.color == "red" && newSquare.isEmpty()){
					doubleJump = true;
				}
			}



			if(currentSquareNum-9 > -1){
				newSquareNum = currentSquareNum-9;
				newSquare = playableSquares[newSquareNum];
				if((!playableSquares[currentSquareNum-b].isEmpty()) && playableSquares[currentSquareNum-b].checker.color == "red" && newSquare.isEmpty()){
					doubleJump = true;
				}
			}	


		}else if(this.king == true){

			var newSquareNum = 0;
			var newSquare = "";
			var opposite = "";

			if (this.color == "red"){
				opposite = "black";
			}else{
				opposite = "red";
			}

			if((currentSquareNum-7 > -1)){
				newSquareNum = currentSquareNum-7;
				newSquare = playableSquares[newSquareNum];
				if(currentSquareNum > newSquareNum){
					a = 4;
					b = 5;
				}else{
					a = 3;
					b = 4;
				}
				if((!playableSquares[currentSquareNum-a].isEmpty()) && playableSquares[currentSquareNum-a].checker.color == opposite && newSquare.isEmpty()){
					doubleJump = true;
					console.log(a + " " + currentSquareNum + " " + newSquareNum);
				}
			}

			if((currentSquareNum-9 > -1)){
				newSquareNum = currentSquareNum-9;
				newSquare = playableSquares[newSquareNum];
				if(currentSquareNum > newSquareNum){
					a = 4;
					b = 5;
				}else{
					a = 3;
					b = 4;
				}
				if((!playableSquares[currentSquareNum-b].isEmpty()) && playableSquares[currentSquareNum-b].checker.color == opposite && newSquare.isEmpty()){
					doubleJump = true;
					console.log(b + " " + currentSquareNum + " " + newSquareNum);
				}
			}

			if((currentSquareNum+7 < 32)){
				newSquareNum = currentSquareNum+7;
				newSquare = playableSquares[newSquareNum];
				if(currentSquareNum > newSquareNum){
					a = 4;
					b = 5;
				}else{
					a = 3;
					b = 4;
				}
				if((!playableSquares[currentSquareNum+a].isEmpty()) && playableSquares[currentSquareNum+a].checker.color == opposite && newSquare.isEmpty()){
					doubleJump = true;
					console.log(a + " " + currentSquareNum + " " + newSquareNum);
				}
			}

			if((currentSquareNum+9 < 32)){
				newSquareNum = currentSquareNum+9;
				newSquare = playableSquares[newSquareNum];
				if(currentSquareNum > newSquareNum){
					a = 4;
					b = 5;
				}else{
					a = 3;
					b = 4;
				}
				if((!playableSquares[currentSquareNum+b].isEmpty()) && playableSquares[currentSquareNum+b].checker.color == opposite && newSquare.isEmpty()){
					doubleJump = true;
					console.log(b + " " + currentSquareNum + " " + newSquareNum);
				}
			}
		}
		return doubleJump;
	}

	this.jumped = function(){
		if(this.color == "red"){
			redRemaining--;
		}else{
			blackRemaining--;
		}
		ctx.beginPath();
		ctx.fillStyle= "black";
		ctx.arc(this.x,this.y,45,0,2*Math.PI);
		ctx.fill();


		//null out all references to the checker
		this.x = null;
		this.y = null;
		this.color = null;
		this.king = null;
		this.currentSquare = null;
		this.selected = null;
	}

	this.select = function(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,40,0,2*Math.PI);
		ctx.strokeStyle = "yellow";
		ctx.lineWidth=1;
      	ctx.stroke();
      	this.selected = true;
	}

	this.isSelected = function(){
		return this.selected;
	}

	this.setCurrentSquare = function(currentSquare){
		this.currentSquare = currentSquare;
	}

	this.unselect = function(){
		ctx.beginPath();
		ctx.arc(this.x,this.y,40,0,2*Math.PI);
		ctx.strokeStyle = "red";
		ctx.lineWidth=2;
	    ctx.stroke();
		this.selected = false;
	}

	this.move = function(gameBoard, gameSquare){
		var moveValid = false;
		if(this.checkSpot(gameBoard, gameSquare)){
			//if the move is valid
			this.x = gameSquare.getX()+45;
			this.y = gameSquare.getY()+45;
			moveValid = true;
		}
		return moveValid;
	}

	//check whether or not the piece can move to the specified playable square
	this.checkSpot = function(gameBoard, gameSquare){
		var moveValid = false;

		var currentSquareNum = this.currentSquare;
		var newSquareNum = gameSquare.getSquareNumber();
		var newSquare = playableSquares[newSquareNum];
		
		//[int(spot / 4) == 1,3,5,7]
		//or [int(spot / 4) == 0,2,4,6]
		if(Math.floor(currentSquareNum / 4) == 1 || Math.floor(currentSquareNum / 4) ==  3 || Math.floor(currentSquareNum / 4) == 5 || Math.floor(currentSquareNum / 4) == 7){
			moveValid = this.checkMove(3,4, currentSquareNum, newSquareNum, newSquare);
		}else{
			moveValid = this.checkMove(4,5, currentSquareNum, newSquareNum, newSquare);
		}

		return moveValid;
	}

	this.checkMove = function(a,b, currentSquareNum, newSquareNum, newSquare){
		var moveValid = false;

		if(this.color == "red" && this.king ==false){
			//red, not kinged can move to [spot +4,5] if adjacent and empty
			if((newSquareNum == (currentSquareNum + a) || newSquareNum == (currentSquareNum + b)) && newSquare.isEmpty()){
				moveValid = true;
				this.currentSquare = newSquareNum;
				if(newSquareNum > 27 && newSquareNum < 32){
					//[28-31] equals kings for red
					this.king = true;
					redKings++;
				}	
			}
			//red, not kinged can move to [spot +7,9] if black on [spot +4,5]
			else if(((newSquareNum == (currentSquareNum + 7) && !playableSquares[currentSquareNum+a].isEmpty()) || (newSquareNum == (currentSquareNum + 9) && !playableSquares[currentSquareNum+b].isEmpty())) && newSquare.isEmpty()){
					moveValid = true;
					this.currentSquare = newSquareNum;

					var checkerJumped = "";
					//remove jumped checker from square
					if(newSquareNum == currentSquareNum+7){
						checkerJumped = getCheckerBySquareNum(currentSquareNum+a);
						checkerJumped.jumped();
						this.setJustJumped(true);
						playableSquares[currentSquareNum+a].checker = "";
					}else{
						checkerJumped = getCheckerBySquareNum(currentSquareNum+b);
						checkerJumped.jumped();
						this.setJustJumped(true);
						playableSquares[currentSquareNum+b].checker = "";
					}
					
					if(newSquareNum > 27 && newSquareNum < 32){
						//[28-31] equals kings for red
						this.king = true;
						redKings++;
					}
			}

		}else if(this.color == "black" && this.king == false){
			//black, not kinged can move to  [spot -4,5] if adjacent and empty
			//black, not kinged can move to [spot -7,9] if red on [spot -4,5]
			
			//swap the inputs for going the opposite direction
			if(a == 4 && b == 5){
				a = 3;
				b = 4;
			}else{
				a = 4;
				b = 5;
			}
			if((newSquareNum == (currentSquareNum - a) || newSquareNum == (currentSquareNum - b)) && newSquare.isEmpty()){
				moveValid = true;
				this.currentSquare = newSquareNum;
				if(newSquareNum > 0 && newSquareNum < 4){
					//[28-31] equals kings for black
					this.king = true;
					blackKings++;
				}	
			}
			//black, not kinged can move to [spot +7,9] if black on [spot +4,5]
			else if(((newSquareNum == (currentSquareNum - 7) && !playableSquares[currentSquareNum-a].isEmpty()) || (newSquareNum == (currentSquareNum - 9) && !playableSquares[currentSquareNum-b].isEmpty())) && newSquare.isEmpty()){
					moveValid = true;
					this.currentSquare = newSquareNum;

					var checkerJumped = "";
					//remove jumped checker from square
					if(newSquareNum == currentSquareNum-7){
						checkerJumped = getCheckerBySquareNum(currentSquareNum-a);
						checkerJumped.jumped();
						this.setJustJumped(true);
						playableSquares[currentSquareNum-a].checker = "";
					}else{
						checkerJumped = getCheckerBySquareNum(currentSquareNum-b);
						checkerJumped.jumped();
						this.setJustJumped(true);
						playableSquares[currentSquareNum-b].checker = "";
					}


					if(newSquareNum >= 0 && newSquareNum < 4){
						//[28-31] equals kings for black
						this.king = true;
						blackKings++;
					}	
			}
		}

		else if( this.king == true){
			//need to determine direction
			if(newSquareNum<this.currentSquare){
				if(a == 4 && b == 5){
					a = 3;
					b = 4;
				}else{
					a = 4;
					b = 5;
				}

			}

			//kinged can move to [spot +4,5] if adjacent and empty
			if((newSquareNum == (currentSquareNum + a) || newSquareNum == (currentSquareNum + b)) && newSquare.isEmpty()){
				moveValid = true;
				this.currentSquare = newSquareNum;	
			}
			else if((newSquareNum == (currentSquareNum - a) || newSquareNum == (currentSquareNum - b)) && newSquare.isEmpty()){
				moveValid = true;
				this.currentSquare = newSquareNum;
			}
			//kinged can move to [spot +7,9] if black on [spot +4,5]
			else if(((newSquareNum == (currentSquareNum + 7) && !playableSquares[currentSquareNum+a].isEmpty()) || (newSquareNum == (currentSquareNum + 9) && !playableSquares[currentSquareNum+b].isEmpty())) && newSquare.isEmpty()){
				moveValid = true;
				this.currentSquare = newSquareNum;

				var checkerJumped = "";
				//remove jumped checker from square
				if(newSquareNum == currentSquareNum+7){
					checkerJumped = getCheckerBySquareNum(currentSquareNum+a);
					checkerJumped.jumped();
					this.setJustJumped(true);
					playableSquares[currentSquareNum+a].checker = "";
				}else{
					checkerJumped = getCheckerBySquareNum(currentSquareNum+b);
					checkerJumped.jumped();
					this.setJustJumped(true);
					playableSquares[currentSquareNum+b].checker = "";
				}

			}
			else if(((newSquareNum == (currentSquareNum - 7) && !playableSquares[currentSquareNum-a].isEmpty()) || (newSquareNum == (currentSquareNum - 9) && !playableSquares[currentSquareNum-b].isEmpty())) && newSquare.isEmpty()){
				moveValid = true;
				this.currentSquare = newSquareNum;

				var checkerJumped = "";
				//remove jumped checker from square
				if(newSquareNum == currentSquareNum-7){
					checkerJumped = getCheckerBySquareNum(currentSquareNum-a);
					checkerJumped.jumped();
					this.setJustJumped(true);
					playableSquares[currentSquareNum-a].checker = "";
				}else{
					checkerJumped = getCheckerBySquareNum(currentSquareNum-b);
					checkerJumped.jumped();
					this.setJustJumped(true);
					playableSquares[currentSquareNum-b].checker = "";
				}	

			}
		}

		//-----RULES OF MOVEMENT-----=
		// 	0  1  2  3 
		// 4  5  6  7
		// 	8  9  10 11
		// 12 13 14 15 
		// 	16 17 18 19
		// 20 21 22 23
		// 	24 25 26 27
		// 28 29 30 31

		//can only move one spot
		//3,4,11,12,19,20,27,28
		return moveValid;
	}


	this.findSquare = function(){
		var square = "";
		for(var i=0; i < playableSquares.length; i++){
			square = playableSquares[i];
			if (!( this.x > square.getX() && this.x < square.getX() + square.getW() 
				&& this.y > square.getY() && this.y < square.getY() + square.getH() )){
				square = "";
			}else{
				break;
			}
		}
		return square;
	}

	this.setKing = function(){
		this.king = true;
	}

	this.isKing = function(){
		return this.king;
	}

	this.getX = function(){
		return this.x;
	}

	this.getY = function(){
		return this.y;
	}
}