
//global variables

var speedOfPaddle1 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;

var speedOfPaddle2 = 0;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;

const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameBoardHeight = document.getElementById("gameBoard").offsetHeight;
const gameBoardWidth = document.getElementById("gameBoard").offsetWidth;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

const ballHeight = document.getElementById("ball").offsetHeight;

var topPositionOfBall = startTopPositionOfBall; //position in y axis
var leftPositionOfBall = startLeftPositionOfBall; //position in x axis
var topSpeedOfBall = 0; //speed in y axis
var leftSpeedOfBall = 0; //speed in x axis

//starts ball when window loads
window.addEventListener('load', function() {
	startBall();
} );

//move paddles
document.addEventListener('keydown', function(e) {
	if (e.keyCode == 87 || e.which == 87){ //w
		speedOfPaddle1 = -10;
	}//if

	if (e.keyCode == 83 || e.which == 83){ //s
		speedOfPaddle1 = 10;
	}//if

	if (e.keyCode == 38 || e.which == 38){ //up
		speedOfPaddle2 = -10;
	}//if

	if (e.keyCode == 40 || e.which == 40){ //down
		speedOfPaddle2 = 10;
	}//if

}) ;//move paddles

//stop paddles
document.addEventListener('keyup', function(e) {

	if (e.keyCode == 87 || e.which == 87 ){//w
		speedOfPaddle1 = 0;
	}//if

	if (e.keyCode == 83 || e.which == 83 ){//s
		speedOfPaddle1 = 0;
	}//if

	if (e.keyCode == 38 || e.which == 38 ){//up
		speedOfPaddle2 = 0;
	}//if

	if (e.keyCode == 40 || e.which == 40 ){//down
		speedOfPaddle2 = 0;
	}//if

}) ;//stop paddles

function startBall() {

	let topDirection = 1;
	let leftDirection = 1;
	topPositionOfBall = startTopPositionOfBall; 
	leftPositionOfBall = startLeftPositionOfBall; 

	//50% chance of starting in either right or left

	if (Math.random() < 0.5) {
		topDirection = 1;
	} else {
		topDirection = -1;
	}//if 

	if (Math.random() < 0.5) {
		leftDirection = 1;
	} else {
		leftDirection = -1;
	}//if 

	topSpeedOfBall = topDirection * (Math.random() * 2 + 3) // 3-4.999999
	leftSpeedOfBall = leftDirection * (Math.random() * 2 + 3) // 3-4.999999


} // startBall


//updates locations of paddles and ball
window.setInterval (function show() {

positionOfPaddle1 += speedOfPaddle1;
positionOfPaddle2 += speedOfPaddle2;
topPositionOfBall += topSpeedOfBall;
leftPositionOfBall += leftSpeedOfBall;


//prevents paddle 1 from leaving top of the gameboard
if (positionOfPaddle1 <= 0) {
	positionOfPaddle1 = 0;
}//if

//prevents paddle 1 from leaving bottom of the gameboard
if (positionOfPaddle1 >= gameBoardHeight - paddleHeight) {
	positionOfPaddle1 = gameBoardHeight - paddleHeight
}//if

//prevents paddle 2 from leaving top of the gameboard
if (positionOfPaddle2 <= 0) {
	positionOfPaddle2 = 0;
}//if

//prevents paddle 2 from leaving bottom of the gameboard
if (positionOfPaddle2 >= gameBoardHeight - paddleHeight) {
	positionOfPaddle2 = gameBoardHeight - paddleHeight
}//if

//if ball hits top, or bottom, of gameboard, changes its vertical direction

if (topPositionOfBall <= 0 || topPositionOfBall >= gameBoardHeight - ballHeight) {
	topSpeedOfBall *= -1;
}//if


//ball on left edge of gameboard

if (leftPositionOfBall <= paddleWidth) {
	
	// if ball hits left paddle, change direction, increase combo  (and slightly increase speed)
	if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight){
		
		leftSpeedOfBall *= -1.001;
		topSpeedOfBall += (speedOfPaddle1 / 10); //gives some of the paddles' vertical movement to the ball
		combo();

	} else {
		document.getElementById("score2").innerHTML ++;
		document.getElementById("combo").innerHTML = 0;//resets combo
		startBall()


	}//else
}//if

//ball on right edge of gameboard

if (leftPositionOfBall >= gameBoardWidth - paddleWidth - ballHeight) {
	
	// if ball hits right paddle, change direction, increase combo (and slightly increase speed)
	if (topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight){
		
		leftSpeedOfBall *= -1.001;
		topSpeedOfBall += (speedOfPaddle2 / 10); //gives some of the paddles' vertical movement to the ball
		combo();


	} else {
		document.getElementById("score1").innerHTML ++;
		document.getElementById("combo").innerHTML = 0;//resets combo
		startBall()

	}//else
}//if


document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
document.getElementById("ball").style.top = topPositionOfBall + "px";
document.getElementById("ball").style.left = leftPositionOfBall + "px";
}, 1000/60 )//show


//adds to the combo and temporary shows combo
function combo() {
	document.getElementById("combo").innerHTML++;//increases combo
	document.getElementById("combo").className = "on";
	document.getElementById("combo").className = "off";
	





}//combo
