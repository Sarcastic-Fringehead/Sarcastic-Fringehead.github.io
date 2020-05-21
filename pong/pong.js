
//global variables

var speedOfPaddle1 = 0;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;

var speedOfPaddle2 = 0;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;

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

var score1 = 0;//player 1's score
var score2 = 0;//player 2's score

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




//starts ball and resets background colour when window loads
window.addEventListener('load', function() {
	document.getElementById("gameBoard").style.backgroundColor = "black";
	startBall();
	startMusic();
} );

//move paddles
document.addEventListener('keydown', function(e) {
	
	startMusic();

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
window.setInterval (function show() {

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
		
		// if ball hits right paddle, change direction and increase combo
		if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight){


			leftSpeedOfBall *= -1;
			topSpeedOfBall += (speedOfPaddle1 / 10); //gives some of the paddles' vertical movement to the ball
			addToCombo();

			if(comboNum % 4 == 0) {
				changeItUp();
			}//if

			if(comboNum == 4) {
				title();
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
			score2 += comboNum + 1;
			addToScore("score2", "right", score2);
			resetCombo("2");
			startBall();

		}//else

		//pulses combo
		document.getElementById("combo").className = (document.getElementById("combo").className == "on"?"off":"on");

	}//if

	//ball on right edge of gameboard

	if (leftPositionOfBall >= gameBoardWidth - paddleWidth - ballHeight) {
		
		// if ball hits right paddle, change direction and increase combo
		if (topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight){

			leftSpeedOfBall *= -1;
			topSpeedOfBall += (speedOfPaddle2 / 10); //gives some of the paddles' vertical movement to the ball
			addToCombo();

			if(comboNum % 4 == 0) {
				changeItUp();
			}//if

			if(comboNum == 4) {
				title();
			}//if

			//plays either beep or boop depending on how many times the ball has bounced
			if(comboNum % 2 ==0){
				beep.play();
			} else {
				boop.play();
			}//if


		} else {

			lose.play();
			score1 += comboNum + 1;
			addToScore("score1", "left", score1);
			resetCombo("1");
			startBall();

		}//else
		//pulses combo
		document.getElementById("combo").className = (document.getElementById("combo").className == "on"?"off":"on");

	}//if

	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";
}, 1000/60 )//show

//On from here, it's crazy stuff I added

//returns a messages for winner
function message(p) {

	switch (parseInt (Math.random() * 10)) {
		case 0:
			return "Booyah!";
		case 1:
			return "GG!";
		case 2:
			return "Player " + p + " wins!";
		case 3:
			return "Oof!";
		case 4:
			return "Take that!";
		case 5:
			return "Get Rekd!";
		case 6:
			return "Chicken dinner!";
		case 7:
			return "Result!";
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

	let rand = (parseInt(Math.random()*30)); // 0-29

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
		case 27:
			speedUp();
			document.getElementById("combo").innerHTML = "Less haste, more speed!!";
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
			if (document.getElementById("fog").className == "hidden") {
				document.getElementById("fog").className = "unhidden";
				document.getElementById("body").className = "still";
				document.getElementById("combo").innerHTML = "I can't see!";
				break;
			} else {
				document.getElementById("fog").className = "hidden";
				document.getElementById("combo").innerHTML = "The fog clears!";
				break;
			}
		case 26:
			if (document.getElementById("body").className == "still") {
				document.getElementById("fog").className == "hidden";
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

	//randomizes r, b and g of colour
	let r = ((parseInt((Math.random()*57)+1)));
	let g = ((parseInt((Math.random()*57)+1)));
	let b = ((parseInt((Math.random()*57)+1)));

	//randomly chooses 2 of r, b or g to make 77 and 0 (to insure a dark colour)

	let i = parseInt(Math.random()*3)//0-2

	// this needs neatening
	if(i == 0) {
		r = 0;
		g = 77;
	}//if

	if(i == 1){
		r = 0;
		b = 77;	
	}//if

	if(i == 1){
		g = 0;
		b = 77;	
	}//if

	document.getElementById("gameBoard").className = (document.getElementById("gameBoard").className == "yes"?"no":"yes");
	
	document.getElementById("gameBoard").style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";

}//colourChange

//increases horizontal ball speed
function speedUp() {
	leftSpeedOfBall *= 1.5;
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

//adds combo + 1 to player's score and does a neat little shake effect
function addToScore(player, position, points) {

		document.getElementById(player).innerHTML = points;
		document.getElementById(position).className = "shake";
		setTimeout(function(){
			document.getElementById(position).className = "still";
		}, 50 * (comboNum + 1)
		);

}//addToScore

//changes title to TRUE TITLE
function title() {
	document.getElementById("title").innerHTML = "BONKERS PONG";
}//title


//plays background music if it's not already playing
function startMusic() {
	if (music.play() == false){
		music.play();
	}//if
}//music
