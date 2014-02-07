function PlayableSquare(x,y,w,h, number){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.checker = {};
	this.squareNumber = number;

	this.isEmpty = function(){
		//return the opposite of "does this object have a color property set?"
	    return !this.checker.hasOwnProperty('color');
	}

	this.placeChecker = function(checker){
		this.checker = checker;
	}

	this.removeChecker = function(){
		this.checker = {};
		ctx.fillStyle = "black";
		ctx.fillRect(this.x, this.y, this.w, this.h);
	}

	this.isClicked = function(x,y){
		var clicked = false;
		if(x>this.x && x < this.x+w && y > this.y && y < this.y + this.h){
			clicked = true;
		}
		return clicked;
	}

	this.getX = function(){
		return this.x;
	}

	this.getY = function(){
		return this.y;
	}

	this.getW = function(){
		return this.w;
	}

	this.getH = function(){
		return this.h;
	}

	this.getSquareNumber = function(){
		return this.squareNumber;
	}
}
