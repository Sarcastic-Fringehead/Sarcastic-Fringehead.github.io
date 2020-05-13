//paddle1

//global variables
var speedOfPaddle1 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;

//move paddles
document.addEventListener('keydown', function(e) {
	
	if (e.keyCode == 87 || e.which == 87){ //w
		speedOfPaddle1 = -10;
	}//if
	show();

	if (e.keyCode == 83 || e.which == 83){ //s
		speedOfPaddle1 = 10;
	}//if
	show();

}) ;

//stop paddles
document.addEventListener('keyup', function(e) {

	if (e.keyCode == 87 || e.which == 87 || e.keyCode == 83 || e.which == 83){ // w or s
		speedOfPaddle1 = 0;
	}//if
	show();

}) ;//paddle 1




//paddle2

//global variables
var speedOfPaddle2 = 0;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;

//move paddles
document.addEventListener('keydown', function(e) {
	
	if (e.keyCode == 38 || e.which == 38){ //up
		speedOfPaddle2 = -10;
	}//if
	show();

	if (e.keyCode == 40 || e.which == 40){ //down
		speedOfPaddle2 = 10;
	}//if
	show();

}) ;

//stop paddles
document.addEventListener('keyup', function(e) {

	if (e.keyCode == 38 || e.which == 38 || e.keyCode == 40 || e.which == 40){ // up or down
		speedOfPaddle2 = 0;
	}//if
	show();

}) ;//paddle 2




//updates locations of paddles and ball
function show() {

	let paddle1Height = document.getElementById("paddle1").offsetHeight;
	let paddle2Height = document.getElementById("paddle2").offsetHeight;
	let gameBoardHeight = document.getElementById("gameBoard").offsetHeight;

positionOfPaddle1 += speedOfPaddle1;
document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";

positionOfPaddle2 += speedOfPaddle2;
document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";

//prevents paddle 1 from leaving top of the gameboard
if (positionOfPaddle1 <= 0) {
	positionOfPaddle1 = 0;
}//if

//prevents paddle 1 from leaving bottom of the gameboard
if (positionOfPaddle1 >= gameBoardHeight - paddle1Height) {
	positionOfPaddle1 = gameBoardHeight - paddle1Height
}//if

//prevents paddle 2 from leaving top of the gameboard
if (positionOfPaddle2 <= 0) {
	positionOfPaddle2 = 0;
}//if

//prevents paddle 2 from leaving bottom of the gameboard
if (positionOfPaddle2 >= gameBoardHeight - paddle2Height) {
	positionOfPaddle2 = gameBoardHeight - paddle2Height
}//if

}//show