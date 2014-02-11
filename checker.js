function Checker(x,y,color,currentSquare){
	this.x = x;
	this.y = y;
	this.color = color;
	this.king = false;
	this.currentSquare = {};
	this.selected = false;
	this.justJumped = false;
	this.force = false;
    this.kingImage = new Image();
    
    
	this.draw = function(){
		ctx.beginPath();
		ctx.fillStyle= this.color;
		ctx.arc(this.x,this.y,40,0,2*Math.PI);
		ctx.fill();
		
        if(this.king == true){
            if(this.kingImage.src == ""){
                //set the color of the crown to load
                var oppositeColor = "";
                if(this.color == "red"){
                    oppositeColor = "black";
                }else{
                    oppositeColor = "red";
                }
                this.kingImage.src="Images/"+oppositeColor+"_crown.gif";
                var imageObj = this.kingImage;
                var xPass = this.x - 25;
                var yPass = this.y - 24;
                imageObj.onload = function() {
                    ctx.drawImage(imageObj,xPass, yPass);
              };
            }else{
                ctx.drawImage(this.kingImage, this.x-25, this.y-24);   
            }
            
			ctx.strokeStyle = "purple";
			ctx.lineWidth=4;
	      	ctx.stroke();
            
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

	this.findSquare = function(){
		var square = {};
		for(var i=0; i < playableSquares.length; i++){
			square = playableSquares[i];
			if (!( this.x > square.getX() && this.x < square.getX() + square.getW() 
				&& this.y > square.getY() && this.y < square.getY() + square.getH() )){
				square = {};
			}else{
				break;
			}
		}
		return square;
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
		this.justJumped = null;
		this.force = null;
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
		var currentSquareNum = this.currentSquare;
		var newSquareNum = gameSquare.getSquareNumber();
		var newSquare = playableSquares[newSquareNum];

		if(Math.floor(currentSquareNum / 4) == 1 || Math.floor(currentSquareNum / 4) ==  3 || Math.floor(currentSquareNum / 4) == 5 || Math.floor(currentSquareNum / 4) == 7){
			moveValid = this.checkMove(3,4, currentSquareNum, newSquareNum, newSquare);
		}else{
			moveValid = this.checkMove(4,5, currentSquareNum, newSquareNum, newSquare);
		}

		if(moveValid){
			//if the move is valid
			this.x = gameSquare.getX()+45;
			this.y = gameSquare.getY()+45;
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
			else if(((newSquareNum == (currentSquareNum + 7) && !playableSquares[currentSquareNum+a].isEmpty()) 
				|| (newSquareNum == (currentSquareNum + 9) && !playableSquares[currentSquareNum+b].isEmpty())) && newSquare.isEmpty()){
					moveValid = true;
				this.currentSquare = newSquareNum;

				var checkerJumped = {};
				//remove jumped checker from square
				if(newSquareNum == currentSquareNum+7){
					checkerJumped = getCheckerBySquareNum(currentSquareNum+a);
					checkerJumped.jumped();
					this.setJustJumped(true);
					playableSquares[currentSquareNum+a].checker = {};
				}else{
					checkerJumped = getCheckerBySquareNum(currentSquareNum+b);
					checkerJumped.jumped();
					this.setJustJumped(true);
					playableSquares[currentSquareNum+b].checker = {};
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
				if(newSquareNum > -1 && newSquareNum < 4){
					//[28-31] equals kings for black
					this.king = true;
					blackKings++;
				}	
			}
			//black, not kinged can move to [spot +7,9] if black on [spot +4,5]
			else if(((newSquareNum == (currentSquareNum - 7) && !playableSquares[currentSquareNum-a].isEmpty()) 
				|| (newSquareNum == (currentSquareNum - 9) && !playableSquares[currentSquareNum-b].isEmpty())) && newSquare.isEmpty()){
					moveValid = true;
				this.currentSquare = newSquareNum;

				var checkerJumped = {};
				//remove jumped checker from square
				if(newSquareNum == currentSquareNum-7){
					checkerJumped = getCheckerBySquareNum(currentSquareNum-a);
					checkerJumped.jumped();
					this.setJustJumped(true);
					playableSquares[currentSquareNum-a].checker = {};
				}else{
					checkerJumped = getCheckerBySquareNum(currentSquareNum-b);
					checkerJumped.jumped();
					this.setJustJumped(true);
					playableSquares[currentSquareNum-b].checker = {};
				}

				if(newSquareNum >= -1 && newSquareNum < 4){
					//[28-31] equals kings for black
					this.king = true;
					blackKings++;
				}	
			}
		}

		else if( this.king == true){
            
            //need to determine direction
			a = this.rowCheck(this.currentSquare, newSquareNum);
            b = this.getB(a);
            //console.log(a + " " + b + " " + currentSquareNum + " " + newSquareNum);
            
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
			else if(((newSquareNum == (currentSquareNum + 7) && !playableSquares[currentSquareNum+a].isEmpty()) 
				|| (newSquareNum == (currentSquareNum + 9) && !playableSquares[currentSquareNum+b].isEmpty())) && newSquare.isEmpty()){
				
				moveValid = true;
				this.currentSquare = newSquareNum;
                
                //console.log(a + " " + b + " " + currentSquareNum + " " + newSquareNum);
				
                var checkerJumped = {};
				//remove jumped checker from square
				if(newSquareNum == currentSquareNum+7){
					checkerJumped = getCheckerBySquareNum(currentSquareNum+a);
					checkerJumped.jumped();
					this.setJustJumped(true);
					playableSquares[currentSquareNum+a].checker = {};
				}else{
					checkerJumped = getCheckerBySquareNum(currentSquareNum+b);
					checkerJumped.jumped();
					this.setJustJumped(true);
					playableSquares[currentSquareNum+b].checker = {};
				}
			}
			else if(((newSquareNum == (currentSquareNum - 7) && !playableSquares[currentSquareNum-a].isEmpty()) 
				|| (newSquareNum == (currentSquareNum - 9) && !playableSquares[currentSquareNum-b].isEmpty())) && newSquare.isEmpty()){
				
				moveValid = true;
				this.currentSquare = newSquareNum;
                
                //console.log(a + " " + b + " " + currentSquareNum + " " + newSquareNum);
                
				var checkerJumped = {};
				//remove jumped checker from square
				if(newSquareNum == currentSquareNum-7){
					checkerJumped = getCheckerBySquareNum(currentSquareNum-a);
					checkerJumped.jumped();
					this.setJustJumped(true);
					playableSquares[currentSquareNum-a].checker = {};
				}else{
					checkerJumped = getCheckerBySquareNum(currentSquareNum-b);
					checkerJumped.jumped();
					this.setJustJumped(true);
					playableSquares[currentSquareNum-b].checker = {};
				}	
			}
		}
		return moveValid;
	}

	this.rowCheck = function(currentSquareNum, newSquareNum){
		if(Math.floor(currentSquareNum / 4) == 1 || Math.floor(currentSquareNum / 4) ==  3 
			|| Math.floor(currentSquareNum / 4) == 5 || Math.floor(currentSquareNum / 4) == 7){

            if(currentSquareNum > newSquareNum){
                a = 4;
            }else{
                a = 3;
            }		
		}else{
            if(currentSquareNum < newSquareNum){
                a = 4;
            }else{
                a = 3;
            }
        }
		return a;
	}
        
    this.getB = function(a){
        if (a==3){
            return 4;
        }else{
            return 5;
        }
    }


	//check if there is opportunity for a double jump
	//if there is, do not end turn until jump occurs
	this.checkDouble = function(){
		
		var doubleJump = false,
            currentSquareNum= this.currentSquare;
		//determine which row the piece is currently on
		a = this.rowCheck(currentSquareNum);
        b = this.getB(a);
        
		//handle red pieces jumping
		if (this.color == "red" && this.king == false){
			var newSquareNum = 0;
			var newSquare = {};
			var jumpSquare = {};
			if((currentSquareNum+7 < 32)){
				newSquareNum = currentSquareNum+7;
				newSquare = playableSquares[newSquareNum];
				jumpSquare = playableSquares[currentSquareNum+a];
				if((!jumpSquare.isEmpty()) && jumpSquare.checker.color == "black" && newSquare.isEmpty()){
					doubleJump = true;
				}
			}
			if((currentSquareNum+9 < 32)){
				newSquareNum = currentSquareNum+9;
				newSquare = playableSquares[newSquareNum];
				jumpSquare = playableSquares[currentSquareNum+b];
				if((!jumpSquare.isEmpty()) && jumpSquare.checker.color == "black" && newSquare.isEmpty()){
					doubleJump = true;
				}
			}
		}
		//handle black pieces jumping
		else if(this.color == "black" && this.king == false){
			//direction based swap due to black coming the other direction
			if(a == 4 && b == 5){
				a = 3;
				b = 4;
			}else{
				a = 4;
				b = 5;
			}

			var newSquareNum = 0;
			var newSquare = {};
			var jumpSquare = {};
			if((currentSquareNum-7 > -1)){
				newSquareNum = currentSquareNum-7;
				newSquare = playableSquares[newSquareNum];
				jumpSquare = playableSquares[currentSquareNum-a];
				if((!jumpSquare.isEmpty()) && jumpSquare.checker.color == "red" && newSquare.isEmpty()){
					doubleJump = true;
				}
			}
			if(currentSquareNum-9 > -1){
				newSquareNum = currentSquareNum-9;
				newSquare = playableSquares[newSquareNum];
				jumpSquare = playableSquares[currentSquareNum-b];
				if((!jumpSquare.isEmpty()) && jumpSquare.checker.color == "red" && newSquare.isEmpty()){
					doubleJump = true;
				}
			}	
		}
		//handle kings double jumps -- HEADACHES ALL AROUND
		else if(this.king == true){

			var newSquareNum = 0,
                newSquare = {},
                jumpSquare = {},
                opposite = "";

			//set opposite colors based on current color
			if (this.color == "red"){
				opposite = "black";
			}else{
				opposite = "red";
			}

			if((currentSquareNum-7 > -1)){
				newSquareNum = currentSquareNum-7;
                a = this.rowCheck(currentSquareNum, newSquareNum);
                b = this.getB(a);
				newSquare = playableSquares[newSquareNum];
				jumpSquare = playableSquares[currentSquareNum-a];

				if((!jumpSquare.isEmpty()) && jumpSquare.checker.color == opposite && newSquare.isEmpty()){
					doubleJump = true;
					//console.log(a + " " + b + " " + currentSquareNum + " " + newSquareNum);
				}
			}

			if((currentSquareNum-9 > -1)){
				newSquareNum = currentSquareNum-9;
                a = this.rowCheck(currentSquareNum, newSquareNum);
				b = this.getB(a);
                newSquare = playableSquares[newSquareNum];
				jumpSquare = playableSquares[currentSquareNum-b];

				if((!jumpSquare.isEmpty()) && jumpSquare.checker.color == opposite && newSquare.isEmpty()){
					doubleJump = true;
					//console.log(a + " " + b + " " + currentSquareNum + " " + newSquareNum);
				}
			}

			if((currentSquareNum+7 < 32)){
				newSquareNum = currentSquareNum+7;
                a = this.rowCheck(currentSquareNum, newSquareNum);
                b = this.getB(a);
				newSquare = playableSquares[newSquareNum];
				jumpSquare = playableSquares[currentSquareNum+a];

				if((!jumpSquare.isEmpty()) && jumpSquare.checker.color == opposite && newSquare.isEmpty()){
					doubleJump = true;
					//console.log(a + " " + b + " " + currentSquareNum + " " + newSquareNum);
				}
			}

			if((currentSquareNum+9 < 32)){
				newSquareNum = currentSquareNum+9;
                a = this.rowCheck(currentSquareNum, newSquareNum);
                b = this.getB(a);
				newSquare = playableSquares[newSquareNum];
				jumpSquare = playableSquares[currentSquareNum+b];

				if((!jumpSquare.isEmpty()) && jumpSquare.checker.color == opposite && newSquare.isEmpty()){
					doubleJump = true;
					//console.log(a + " " + b + " " + currentSquareNum + " " + newSquareNum);
				}
			}
		}
		return doubleJump;
	}



}
