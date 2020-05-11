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

	//hides restart button and removes blocker if still up
	changeVis("controls");
	document.getElementById("blocker").className = "hidden";

}//newGame

//randomly chooses a free box for computer
function computerTakeTurn() {

	let idName = "";//name of square to be selected

	//1 in 2 chance that computer checks if opponent has winning moves and stops them
	if ((parseInt(Math.random()*2)) == 0) {
		idName = stopWinningMove();
	}//if

	//checks if there's any winning moves to be made and assigns them to 
	//idName, otherwise idName stays the same
	let move = winningMove();//name of value to assign to idName

	if (move != "") {
		idName = move;
	}//if
	

	//if no smart moves are made, chooses random boxes until an empty one is found
	if (idName == "") {

		do{
			let rand = (parseInt(Math.random()*9)); // 0-8
			idName =  idNames[rand];

			//check if chosen box is empty
			if(document.getElementById(idName).innerHTML == "") {
				break;
			}//if
		} while(true);
	}//if
	//fills in selected box
	document.getElementById(idName).innerHTML = currentPlayer;

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
			computerTakeTurn();
			changeVis("blocker");
			checkGameStatus();
		}, 500
		);

	}//if

} // playerTurn


//after each turn check for a winner, a tie, or continue playing
function checkGameStatus(){

	turns++; //counts turn

	//check for winner

	if (checkWin()) {
		gameStatus = (currentPlayer == "X"?"X wins! X-ellent!":"O wins! O YEAH!");
	} else {
		//check for tie
		if (turns == 9) {
			gameStatus = "Tic Tac TIE";
		}// if
	}//if


	//switch current player
	currentPlayer = (currentPlayer == "X" ? "O" : "X" );

	//game is over
	if (gameStatus != "") {
		setTimeout(function() {
			showLightBox(gameStatus, "GAME OVER!");
		}, 500
		);
	}//if

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

function winningMove() {
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

	//top row
	if(cb[1] == "O" && cb[2] == "O" && cb[3] == ""){
		return "three";
	}//if
	if(cb[1] == "O" && cb[2] == "" && cb[3] == "O"){
		return "two";
	}//if
	if(cb[1] == "" && cb[2] == "O" && cb[3] == "O"){
		return "one";
	}//if

	//middle row
	if(cb[4] == "O" && cb[5] == "O" && cb[6] == ""){
		return "six";
	}//if
	if(cb[4] == "O" && cb[5] == "" && cb[6] == "O"){
		return "five";
	}//if
	if(cb[4] == "" && cb[5] == "O" && cb[6] == "O"){
		return "four";
	}//if

	//bottom row
	if(cb[7] == "O" && cb[8] == "O" && cb[9] == ""){
		return "nine";
	}//if
	if(cb[7] == "O" && cb[8] == "" && cb[9] == "O"){
		return "eight";
	}//if
	if(cb[7] == "" && cb[8] == "O" && cb[9] == "O"){
		return "seven";
	}//if



	//left column
	if(cb[1] == "O" && cb[4] == "O" && cb[7] == ""){
		return "seven";
	}//if
	if(cb[1] == "O" && cb[4] == "" && cb[7] == "O"){
		return "four";
	}//if
	if(cb[1] == "" && cb[4] == "O" && cb[7] == "O"){
		return "one";
	}//if

	//center column
	if(cb[2] == "O" && cb[5] == "O" && cb[8] == ""){
		return "eight";
	}//if
	if(cb[2] == "O" && cb[5] == "" && cb[8] == "O"){
		return "five";
	}//if
	if(cb[2] == "" && cb[5] == "O" && cb[8] == "O"){
		return "two";
	}//if

	//right column
	if(cb[3] == "O" && cb[6] == "O" && cb[9] == ""){
		return "nine";
	}//if
	if(cb[3] == "O" && cb[6] == "" && cb[9] == "O"){
		return "six";
	}//if
	if(cb[3] == "" && cb[6] == "O" && cb[9] == "O"){
		return "three";
	}//if



	//top left to bottom right
	if(cb[1] == "O" && cb[5] == "O" && cb[9] == ""){
		return "nine";
	}//if
	if(cb[1] == "O" && cb[5] == "" && cb[9] == "O"){
		return "five";
	}//if
	if(cb[1] == "" && cb[5] == "O" && cb[9] == "O"){
		return "one";
	}//if

	//top right to bottom left
	if(cb[3] == "O" && cb[5] == "O" && cb[7] == ""){
		return "seven";
	}//if
	if(cb[3] == "O" && cb[5] == "" && cb[7] == "O"){
		return "five";
	}//if
	if(cb[3] == "" && cb[5] == "O" && cb[7] == "O"){
		return "three";
	}//if


	return "";
}//winningMove

function stopWinningMove() {
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

	//top row
	if(cb[1] == "X" && cb[2] == "X" && cb[3] == ""){
		return "three";
	}//if
	if(cb[1] == "X" && cb[2] == "" && cb[3] == "X"){
		return "two";
	}//if
	if(cb[1] == "" && cb[2] == "X" && cb[3] == "X"){
		return "one";
	}//if

	//middle row
	if(cb[4] == "X" && cb[5] == "X" && cb[6] == ""){
		return "six";
	}//if
	if(cb[4] == "X" && cb[5] == "" && cb[6] == "X"){
		return "five";
	}//if
	if(cb[4] == "" && cb[5] == "X" && cb[6] == "X"){
		return "four";
	}//if

	//bottom row
	if(cb[7] == "X" && cb[8] == "X" && cb[9] == ""){
		return "nine";
	}//if
	if(cb[7] == "X" && cb[8] == "" && cb[9] == "X"){
		return "eight";
	}//if
	if(cb[7] == "" && cb[8] == "X" && cb[9] == "X"){
		return "seven";
	}//if



	//left column
	if(cb[1] == "X" && cb[4] == "X" && cb[7] == ""){
		return "seven";
	}//if
	if(cb[1] == "X" && cb[4] == "" && cb[7] == "X"){
		return "four";
	}//if
	if(cb[1] == "" && cb[4] == "X" && cb[7] == "X"){
		return "one";
	}//if

	//center column
	if(cb[2] == "X" && cb[5] == "X" && cb[8] == ""){
		return "eight";
	}//if
	if(cb[2] == "X" && cb[5] == "" && cb[8] == "X"){
		return "five";
	}//if
	if(cb[2] == "" && cb[5] == "X" && cb[8] == "X"){
		return "two";
	}//if

	//right column
	if(cb[3] == "X" && cb[6] == "X" && cb[9] == ""){
		return "nine";
	}//if
	if(cb[3] == "X" && cb[6] == "" && cb[9] == "X"){
		return "six";
	}//if
	if(cb[3] == "" && cb[6] == "X" && cb[9] == "X"){
		return "three";
	}//if



	//top left to bottom right
	if(cb[1] == "X" && cb[5] == "X" && cb[9] == ""){
		return "nine";
	}//if
	if(cb[1] == "X" && cb[5] == "" && cb[9] == "X"){
		return "five";
	}//if
	if(cb[1] == "" && cb[5] == "X" && cb[9] == "X"){
		return "one";
	}//if

	//top right to bottom left
	if(cb[3] == "X" && cb[5] == "X" && cb[7] == ""){
		return "seven";
	}//if
	if(cb[3] == "X" && cb[5] == "" && cb[7] == "X"){
		return "five";
	}//if
	if(cb[3] == "" && cb[5] == "X" && cb[7] == "X"){
		return "three";
	}//if

	return "";
}//stopWinningMove
