
//global variables


var speedOfPaddle1 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;

var speedOfPaddle2 = 0;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;

var paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameBoardHeight = document.getElementById("gameBoard").offsetHeight;
const gameBoardWidth = document.getElementById("gameBoard").offsetWidth;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var ballHeight = document.getElementById("ball").offsetHeight;

var topPositionOfBall = startTopPositionOfBall; //position in y axis
var leftPositionOfBall = startLeftPositionOfBall; //position in x axis
var topSpeedOfBall = 0; //speed in y axis
var leftSpeedOfBall = 0; //speed in x axis

var comboNum = 0; //number of times in a roww ball has hit paddles

var reverse = 1; //reverses controls of paddles if negative
var gravity = 0; // horizontal acceleration
var speed = 1; // a togglable speed multiplier
var acc = 0; //horizontal acceleration

const MaxHP = 50; //Intial health points

var HP1;//player 1's Health Points
var HP2;//player 2's Health Points

const w = 83; //ASCII for w key
const s = 87; //ASCII for s key
const up = 38; //ASCII for up key
const down = 40; //ASCII for down key


//https://www.w3schools.com/graphics/game_sound.asp
//music created with GarageBand

var lose = new sound("Loss.m4a");
var beep = new sound("Beep.m4a");
var boop = new sound("Boop.m4a");
var music = new sound("Pong Song.m4a");
var change = new sound("change.m4a");

//used to control game start/stop
var controlPlay;




//starts ball and resets background colour when window loads
/*window.addEventListener('load', function() {
	document.getElementById("gameBoard").style.backgroundColor = "black";
	startBall();
	startMusic();
} );*/

//move paddles
document.addEventListener('keydown', function(e) {

	if (e.keyCode == w || e.which == w){ //w
		speedOfPaddle1 = 10 * reverse * speed;
	}//if

	if (e.keyCode == s || e.which == s){ //s
		speedOfPaddle1 = -10 * reverse * speed
	}//if

	if (e.keyCode == up || e.which == up){ //up
		speedOfPaddle2 = -10 * reverse * speed;
	}//if

	if (e.keyCode == down || e.which == down){ //down
		speedOfPaddle2 = 10 * reverse * speed;
	}//if

}) ;//move paddles

//stop paddles
document.addEventListener('keyup', function(e) {

	if (e.keyCode == w || e.which == w ){//w
		speedOfPaddle1 = 0;
	}//if

	if (e.keyCode == s || e.which == s ){//s
		speedOfPaddle1 = 0;
	}//if

	if (e.keyCode == up || e.which == up ){//up
		speedOfPaddle2 = 0;
	}//if

	if (e.keyCode == down || e.which == down ){//down
		speedOfPaddle2 = 0;
	}//if

}) ;//stop paddles

//object constructor to play sounds
//https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}//sound

//resets speed, position and acceleration of ball
function startBall() {

	gravity = 0;
	acc = 0;

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
function show() {

	startMusic();

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

	topSpeedOfBall += gravity;
	leftSpeedOfBall += acc;

	//ball on left edge of gameboard

	if (leftPositionOfBall <= paddleWidth + 5) {
		
		// if ball hits left paddle, change direction and increase combo
		if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight){


			leftSpeedOfBall *= -1;
			topSpeedOfBall += (speedOfPaddle1 / 10); //gives some of the paddles' vertical movement to the ball
			addToCombo();

			if(comboNum % 4 == 0) {
				changeItUp();
			}//if

			//plays either beep or boop depending on how many times the ball has bounced
			if(comboNum % 4 != 0){
				if (comboNum % 2 == 0){
					beep.play();
				} else {
					boop.play();
				}//if
			}//if

		} else {
			lose.play();
			HP1 -= comboNum + 1;
			loseHP("HP1", "left", HP1);
			resetCombo("2");
			startBall();

		}//else

		pulse();

	}//if

	//ball on right edge of gameboard

	if (leftPositionOfBall >= gameBoardWidth - paddleWidth - ballHeight - 5) {
		
		// if ball hits right paddle, change direction and increase combo
		if (topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight){

			leftSpeedOfBall *= -1;
			topSpeedOfBall += (speedOfPaddle2 / 10); //gives some of the paddles' vertical movement to the ball
			addToCombo();

			if(comboNum % 4 == 0) {
				changeItUp();
			}//if

			//plays either beep or boop depending on how many times the ball has bounced
			if(comboNum % 2 ==0){
				beep.play();
			} else {
				boop.play();
			}//if


		} else {

			lose.play();
			HP2 -= comboNum + 1;
			loseHP("HP2", "right", HP2);
			resetCombo("1");
			startBall();

		}//else
		pulse();

	}//if

	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";
} //show

//starts up game for the first time
function beginGame() {
	document.getElementById("begin").className = "hidden";
	document.getElementById("restart").className = "controls";
	document.getElementById("pause").className = "controls";
	restartGame();
}//begin

//if game is paused, resume, and vice versa
function togglePauseGame() {
	if (!controlPlay){
		resumeGame();
		document.getElementById("pause").innerHTML = "Pause"
	} else {
		pauseGame();
		document.getElementById("pause").innerHTML = "Resume"
	}//if
}//togglePause

// resumes gameplay
function resumeGame() {
	controlPlay = window.setInterval(show, 1000/60);
	
	//unpauses shake effect if it was paused
	if (document.getElementById("body").className == "paused") {
		document.getElementById("body").className = "shake";
	}//if


}// resumeGame

//pauses gameplay
function pauseGame() {
	window.clearInterval(controlPlay);
	if (document.getElementById("body").className == "shake") {
		document.getElementById("body").className = "paused";//pauses shake effect but does not stop it
	}//if
	controlPlay = false;
}//pausegame

//starts gameplay and resets some variables
function restartGame() {
	
	//resets HP and combo
	HP1 = MaxHP;
	HP2 = MaxHP;
	document.getElementById("HP1").innerHTML = MaxHP;
	document.getElementById("HP2").innerHTML = MaxHP;
	document.getElementById("right").className = "still";
	document.getElementById("left").className = "still";
	comboNum = 0;
	document.getElementById("combo").style.color = "transparent"
	document.getElementById("combo").className = "still"

	//resets weird little extra effects
	reverse = 1;
	speed = 1;

	//resets paddles
	paddleHeight = 150;
	document.getElementById("paddle1").style.height = paddleHeight + "px"
	document.getElementById("paddle2").style.height = paddleHeight + "px"
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;

	//resets ball
	ballHeight = 20;
	document.getElementById("ball").style.height = "20px";
	document.getElementById("ball").style.width = "20px";
	document.getElementById("ball").className = "normal";
	document.getElementById("body").className = "still";



	document.getElementById("combo").innerHTML = "Start!";
	document.getElementById("gameBoard").style.backgroundColor = "black";
	startBall();	
	startMusic();
	pulse();
	
	if (!controlPlay){
		resumeGame();
		document.getElementById("pause").innerHTML = "Pause"
	}//if
}//restartGame


//stops gameplay
function endGame(){
	pauseGame();

	changeVis("blocker");

	//show lightbox with HP
	let message1 = "TIE!"
	let message2 = "Close to continue"

	if (HP2 > HP1){
	
		message1 = "PLAYER 2 WINS WITH " + HP2 + " HP LEFT!";
		message2 = "CLICK TO START NEW GAME";

	} else if (HP2 < HP1){

		message1 = "PLAYER 1 WINS WITH " + HP1 + " HP LEFT!";
		message2 = "CLICK TO START NEW GAME";
	}//if

	showLightBox(message1, message2);

}//endGame


/**** LightBox Code ****/

// changes the visibility of divID
function changeVis(divID) {
	var element = document.getElementById(divID);

	//if element exists, toggle its class
	//between hidden and unhidden
	if (element) {
		element.className = (element.className == 'hidden')? 'unhidden' : 'hidden';
	}//if
}	//changeVis

//display message in lightbox
function showLightBox(message, message2) {

	//set messages
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;

	//show lightbox
	changeVis("lightbox");
	changeVis("boundaryMessage");
}

//close light box
function continueGame() {

	changeVis("lightbox");
	changeVis("boundaryMessage");
	changeVis("blocker");
	restartGame();
	}//continueGame;

/**** End of LightBox Code ****/

/**** Crazy extra stuff ****/

//pulses combo number
function pulse() {
	document.getElementById("combo").className = (document.getElementById("combo").className == "pulseAnimationOne"?"pulseAnimationTwo":"pulseAnimationOne");
}//pulse


//returns a messages for winner
function message(p) {

	switch (parseInt (Math.random() * 10)) {
		case 0:
			return "Booyah!";
		case 1:
			return "GG!";
		case 2:
			return "Go Player " + p + "!";
		case 3:
			return "Oof!";
		case 4:
			return "Take that!";
		case 5:
			return "Get Rekd!";
		case 6:
			return "Chicken dinner!";
		case 7:
			return "Ouch!";
		case 8:
			return "Oh yeah!";
		case 9:
			return "Too slow!";
	}//switch
	
}//message

//adds to the combo
function addToCombo() {
	comboNum++;//increases combo
	document.getElementById("combo").innerHTML = comboNum; //updates html with new combo

	if ((HP1 <= (comboNum + 1) && HP2 <= (comboNum + 1))) {
		document.getElementById("combo").innerHTML = "Sudden death!";
	}//if
}//addToCombo

//resets combo and displays message
function resetCombo(p) {
	comboNum = 0;
	document.getElementById("combo").innerHTML = (message(p));
}//resetCombo

//triggers a random change to the game!
function changeItUp() {

	change.play();
	
	colourChange();

	let rand = (parseInt(Math.random()* 30)); // 0-29

	switch(rand){
//gotta change names
		case 0:
			speedUp();
			document.getElementById("combo").innerHTML = "Faster!";
			break;
		case 1:
			speedUp();
			document.getElementById("combo").innerHTML = "Speed it up!";
			break;
		case 2:
			speedUp();
			document.getElementById("combo").innerHTML = "Accelerate!";
			break;
		case 3:
			speedUp();
			document.getElementById("combo").innerHTML = "Zoom!";
			break;
		case 4:
			speedUp();
			document.getElementById("combo").innerHTML = "Too fast for you!";
			break;
		case 26:
			speedUp();
			document.getElementById("combo").innerHTML = "Nnneeoooow!";
			break;
		case 27:
			speedUp();
			document.getElementById("combo").innerHTML = "Less haste, more speed!";
			break;
		case 28:
			speedUp();
			document.getElementById("combo").innerHTML = "Life in the fast lane!";
			break;
		case 29:
			speedUp();
			document.getElementById("combo").innerHTML = "0 to 60!";
			break;
		case 5:
		case 6:
		case 7:
			if (ballHeight < 50) {
				grow();
				document.getElementById("combo").innerHTML = "Grow!";
				break;

			} else {
				revertSize();
				document.getElementById("combo").innerHTML = "Normal size!";
				break;
			}//if

		case 8:
			if (ballHeight > 10) {
				shrink();
				document.getElementById("combo").innerHTML = "Try and hit this!";
				break;

			} else {
				revertSize();
				document.getElementById("combo").innerHTML = "Normal size!";
				break;
			}//if

		case 9:
			if (document.getElementById("ball").className == "normal") {

				//makes ball fade in and out
				document.getElementById("ball").className = "ghost";
				document.getElementById("combo").innerHTML = "Invisiball!";
				break;
			} else {
				revertColour();
				break;
			}//if

		case 10:
			if (document.getElementById("ball").className == "normal") {

				//makes ball change colours
				document.getElementById("ball").className = "rainbow";
				document.getElementById("combo").innerHTML = "Time for some colour!";
				break;
			} else {
				revertColour();
				break;
			}//if
		case 11:
		case 12:
			reverse *= -1;
			document.getElementById("combo").innerHTML = "Reverse controls!";
			break;
		case 13:
			if (gravity == 0) {
				gravity = 0.1;
				document.getElementById("combo").innerHTML = "Gravity on!";
				break;
			} else {
				gravity = 0;
				document.getElementById("combo").innerHTML = "0 G!";
				break;
			}//if
		case 14:
			if (gravity == 0) {
				gravity = -0.1;
				document.getElementById("combo").innerHTML = "Antigravity!";
				break;
			} else {
				gravity = 0;
				document.getElementById("combo").innerHTML = "0 G!";
				break;
			}//if
		case 15:
		case 16:
			if (paddleHeight > 75) {
				shrinkPaddles();
				break;
			} else {
				growPaddles();
				break;
			}//if
		case 17:
		case 18:
			if (paddleHeight < 225) {
				growPaddles();
				break;
			} else {
				shrinkPaddles();
				break;
			}//if
		case 19:
		case 20:
			if (speed <= 1) {
				speed = 2
				document.getElementById("combo").innerHTML = "Quick paddles!";
				break;
			} else {
				speed = 1
				document.getElementById("combo").innerHTML = "Slow down, paddles!";
				break;
			}
		case 21:
		case 22:
			if (speed >= 1) {
				speed = 0.5
				document.getElementById("combo").innerHTML = "Utter Molassification!";
				break;
			} else {
				speed = 1
				document.getElementById("combo").innerHTML = "Demolassified!";
				break;
			}
		case 23:
			if (acc == 0) {
				acc = 0.1;
				document.getElementById("combo").innerHTML = "Watch out P2!";
				break;
			} else {
				acc = 0;
				document.getElementById("combo").innerHTML = "Back to sanity!";
				break;
			}

		case 24:
			if (acc == 0) {
				acc = -0.1;
				document.getElementById("combo").innerHTML = "Watch out P1!";
				break;
			} else {
				acc = 0;
				document.getElementById("combo").innerHTML = "Back to sanity!";
				break;
			}
		case 25:
			if (document.getElementById("body").className == "still") {
				document.getElementById("body").className = "shake";
				document.getElementById("combo").innerHTML = "Sh-sh-shake it up!";
				break;
			} else {
				document.getElementById("body").className = "still";
				document.getElementById("combo").innerHTML = "Calm down!";
				break;
			}//if
	}//switch

}//changeItUp

//flashes screen to a new colour
function colourChange(){

	//r, b and g of colour
	let r = 0;
	let g = 0;
	let b = 0;

	//randomly assigns the values of 77, 0 and a number between 1 and 57 to r, b and g to make a dark colour
	switch(parseInt(Math.random()*3)){

	// this needs neatening
	case 0:
		r = 0;
		g = 77;
		b = ((parseInt((Math.random()*57)+1)));
		break;
	case 1:
		r = 0;
		b = 77;
		g = ((parseInt((Math.random()*57)+1)));
		break;
	case 2:
		g = 0;
		r = 77;
		b = ((parseInt((Math.random()*57)+1)));
		break;
	case 3:
		g = 0;
		b = 77;
		r = ((parseInt((Math.random()*57)+1)));
		break;
	case 4:
		b = 0;
		r = 77;
		g = ((parseInt((Math.random()*57)+1)));
		break;
	case 5:
		b = 0;
		g = 77;
		r = ((parseInt((Math.random()*57)+1)));
		break;
	}//switch

	document.getElementById("gameBoard").style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";

	document.getElementById("gameBoard").className = (document.getElementById("gameBoard").className == "colourAnimationTwo"?"colourAnimationOne":"colourAnimationTwo");
	

}//colourChange

//increases horizontal ball speed
function speedUp() {
	console.log(leftSpeedOfBall);
	if (Math.abs(leftSpeedOfBall) < 20){
		leftSpeedOfBall *= 1.5;
	} else if (Math.abs(leftSpeedOfBall) < 25){
		leftSpeedOfBall *= 1.1
	} else {
	}//if
}//speedUp

//increases size of ball
function grow() {

	setTimeout(function() {
		ballHeight += 10;
		document.getElementById("ball").style.height = ballHeight + "px";
		document.getElementById("ball").style.width = ballHeight + "px";
	}, 50
	);
}//grow

//decreases size of ball
function shrink() {

	setTimeout(function() {
		ballHeight = 5;
		document.getElementById("ball").style.height = "5px";
		document.getElementById("ball").style.width = "5px";
	}, 50
	);
}//shrink

//ball reverts to original size
function revertSize() {

	setTimeout(function() {
		ballHeight = 20;
		document.getElementById("ball").style.height = "20px";
		document.getElementById("ball").style.width = "20px";
	}, 50
	);
}//revertSize

//makes ball normal colour
function revertColour() {
	document.getElementById("ball").className = "normal";
	document.getElementById("combo").innerHTML = "Back to boring!";
}//revertColour

//decreases paddle size
function shrinkPaddles() {
	paddleHeight -= 25
	document.getElementById("paddle1").style.height = paddleHeight + "px"
	document.getElementById("paddle2").style.height = paddleHeight + "px"
	document.getElementById("combo").innerHTML = "Shrink or swim!";
}//shrinkPaddles

//increases paddle size
function growPaddles() {
	paddleHeight += 25
	document.getElementById("paddle1").style.height = paddleHeight + "px"
	document.getElementById("paddle2").style.height = paddleHeight + "px"
	document.getElementById("combo").innerHTML = "Grow paddles!";
}//growPaddles

//resets paddle sizes
function revertPaddles() {
	paddleHeight = 150;
	document.getElementById("paddle1").style.height = paddleHeight + "px"
	document.getElementById("paddle2").style.height = paddleHeight + "px"
}//revertPaddles

//adds combo + 1 to player's HP and does a neat little shake effect
function loseHP(player, position, points) {
		if (points <= 0){
			points = 0;
			endGame();
		}//if
		document.getElementById(player).innerHTML = points;
		document.getElementById(position).className = "shake";

		//The shake effect doesn't go away if a player's points are low enough
		if (points > 15){
			setTimeout(function(){
				document.getElementById(position).className = "still";
			}, 100
			);
		}//if 

}//loseHP

//plays background music if it's not already playing
function startMusic() {
	if (music.play() == false){
		music.play();
	}//if
}//music

/**** End of crazy extra stuff ****/
