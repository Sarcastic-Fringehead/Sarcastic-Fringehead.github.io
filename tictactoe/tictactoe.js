let currentPlayer = "X";
let gameStatus = ""; // "" = continue, "Tie", "X Wins", "O Wins"
let turns = 0;
let idNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

//resets board and all variables
function newGame() {

	//resets board
	for (var i = 0; i < idNames.length; i++) {
		document.getElementById(idNames[i]).innerHTML = "";
	}//for
	
	//resets variables
	turns = 0;
	currentPlayer = "X";
	gameStatus = "";

	//hides restart button and removes blocker
	changeVis("controls");
	changeVis("blocker");

}//newGame

//randomly chooses a free box for computer
function computerTakeTurn() {

	let idName = "";

	//choose random boxes til an empty one is found
	do{
		let rand = (parseInt(Math.random()*9)); // 1-9
		idName =  idNames[rand];

		//check if chosen box is empty
		if(document.getElementById(idName).innerHTML == "") {
			document.getElementById(idName).innerHTML = currentPlayer;
			break;
		}//if
	} while(true);

}//computerTakeTurn


// take player turn
function playerTurn(e) {

	//fills out square or tells player that square is taken
	if(e.innerHTML == "") {
		e.innerHTML = currentPlayer;
		changeVis("blocker");
		checkGameStatus();

	} else {
		showLightBox("This box has already been selected!", "No cheating!");
		return;
	}// else

	// if game is not over, computer goes
	if (gameStatus == "") {

		setTimeout(function() {
			changeVis("blocker");
			computerTakeTurn();
			checkGameStatus();
		}, 500
		);
	}//if

	//game is over
	if (gameStatus != ""){
		setTimeout(function() {
			showLightBox(gameStatus, "GAME OVER!");
		}, 500
		);
	}//if

} // playerTurn


//after each turn check for a winner, a tie, or continue playing
function checkGameStatus(){

	turns++; //counts turn

	//check for winner

	if (checkWin()) {
		gameStatus = (currentPlayer == "X" ? "X wins! X-ellent!" : "O wins! O YEAH!");
		return gameStatus;
	}//if


	//check for tie
	if (turns == 9) {
		gameStatus = "Tic Tac TIE";
		return gameStatus;
	}// if

	//switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X" );

} // checkGameStatus

//check for a Win. there are 8 winning lines 123 456 789 147 258 369 159 357
function checkWin() {
	let cb = []; //current board
	cb[0] = ""; // not going to use
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;

	if(cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]){
		return true;
	}//top row
	
	if(cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]){
		return true;
	}//middle row

	if(cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]){
		return true;
	}//bottom row

	if(cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]){
		return true;
	}//left column

	if(cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]){
		return true;
	}//center column

	if(cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]){
		return true;
	}//right column

	if(cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]){
		return true;
	}//top left to bottom right

	if(cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]){
		return true;
	}//top right to bottom left

	return false;
}//checkWin

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

	//if the game is over, show controls
	if (gameStatus != "") {
		changeVis("controls");
	}//if

}//continueGame
