var rooms;//room layout

const numberOfRooms = 10;

const tiles = document.querySelectorAll("#tiles div");
const noPassObstacles = ["wall", "gooberRight", "gooberLeft", "gooberUp", "gooberDown"]; //obstacles that player (usually) can't move through
const enemyNoPass = ["wall", "gooberRight", "gooberLeft", "gooberUp", "gooberDown", "pit", "ladder"]; //obstacles that enemies can't move through
const enemies = ["gooberRight", "gooberLeft", "gooberUp", "gooberDown"];

var currentRoom;

var pause;//freezes controls when it's not the player's turn

var hP;//health points

//x and y coordinates of player
var yCoordinate = 2;
var xCoordinate = 2;

//x and y coordinates for enemies
var yE = [1, -1];
var xE = [1, -1];



//resets room layout (so the enemies aren't all moved around when you restart) 
//(this isn't activated when you fall down a pit or go up a ladder because you're aren't restarting)

function resetRooms() {
rooms = [

	//room 0
		[["", "", "", "", ""], 
		["wall", "wall", "wall", "wall", ""],
		["", "", "", "", ""],
		["", "", "wall", "wall", "wall"],
		["", "", "", "", "ladder"]],
	
	//room 1

		[["wall", "", "wall", "", ""], 
		["", "", "pit", "", ""],
		["", "", "wall", "wall", ""],
		["ladder", "", "wall", "wall", ""],
		["gooberRight", "", "", "", ""]],


	//room 2

		[["", "ladder", "wall", "", "gooberLeft"], 
		["", "", "", "", ""],
		["wall", "wall", "wall", "", ""],
		["", "wall", "wall", "", ""],
		["", "", "", "gooberRight", ""]],

	//room 3

		[["wall", "", "wall", "wall", "ladder"], 
		["wall", "gooberDown", "", "", ""],
		["wall", "", "wall", "gooberUp", "wall"],
		["wall", "", "gooberRight", "", "wall"],
		["wall", "wall", "wall", "wall", "wall"]],

	//room 4
		[["ladder", "", "wall", "", ""], 
		["", "", "wall", "", ""],
		["", "", "wall", "", ""],
		["", "", "wall", "", ""],
		["", "", "wall", "", "ladder"]],

	//room 5
		[["", "", "ladder", "", ""], 
		["", "pit", "", "pit", ""],
		["wall", "wall", "wall", "wall", "wall"],
		["", "pit", "", "pit", ""],
		["", "", "", "", ""]],

	//room 6
		[["gooberRight", "", "", "", "gooberLeft"], 
		["", "", "", "", ""],
		["gooberUp", "wall", "wall", "wall", "wall"],
		["", "", "", "wall", ""],
		["ladder", "", "wall", "", "ladder"]],

	//room 7
		[["", "pit", "", "pit", "ladder"], 
		["", "pit", "", "pit", ""],
		["", "pit", "", "pit", ""],
		["", "wall", "", "wall", ""],
		["", "pit", "ladder", "pit", ""]],

	//room 8
		[["", "", "wall", "", ""], 
		["", "", "wall", "", "pit"],
		["gooberRight", "", "", "", ""],
		["pit", "pit", "pit", "pit", "pit"],
		["ladder", "", "", "", ""]],

	//room 9
		[["", "pit", "ladder", "pit", "wall"], 
		["wall", "gooberDown", "gooberDown", "gooberDown", ""],
		["", "", "", "", "wall"],
		["wall", "", "", "", ""],
		["", "", "", "", "wall"]],

		//room 10
		[["", "", "", "", "pit"], 
		["", "pit", "pit", "pit", "pit"],
		["", "pit", "ladder", "", ""],
		["", "pit", "pit", "pit", ""],
		["", "", "", "", ""]]

]; //end of rooms

}//resetRooms



//Starts game and resets variables
function beginGame() {

	document.getElementById("introBox").style.display = "none";
	document.getElementById("gameOverBox").className = "hidden";
	document.getElementById("gameOverBox").style.display = "none";
	document.getElementById("winBox").style.display = "none";
	document.getElementById("hero").className = "heroDown";
	document.getElementById("hud").display = "";
	pause = false;
	hP = 3;
	resetRooms();
	currentRoom = 0;
	yCoordinate = 2;
	xCoordinate = 2;
	loadRoom();
	updatePositions();
}//beginGame



// load the room and positions enemies
function loadRoom(){

	//reloads enemies and tiles (to avoid glitches)
	deleteEnemies();
	clearRoom();

	let tileMap = rooms[currentRoom];//selects tiles
	let eCounter = 1;

	//load board

	for (y = 0; y <= 4; y++) {
		for (x = 0; x <= 4; x++) {
			if(enemies.includes(tileMap[y][x])) {
				yE[eCounter] = y;
				xE[eCounter] = x;
				document.getElementById("e" + eCounter).className = (tileMap[y][x]);
				document.getElementById("e" + eCounter).style.display = "block";
				eCounter++;
			} else {
				tiles[(y * 5) + x].className = rooms[currentRoom][y][x];
			}//if
		}//for
	}// for

	updatePositions();

	//if current position is a pit move back a room
	if (rooms[currentRoom][yCoordinate][xCoordinate] == "pit") {
		fall();
		return;
	}//if

} // loadRoom



// clears the room for the next level
function clearRoom(){

	for (y = 0; y <= 4; y++) {
		for (x = 0; x <= 4; x++) {
		tiles[(y * 5) + x].className = "";
		}//for
	}// for
	updatePositions();

} // loadRoom



//identifies enemy by name and activates their movement (this would have a purpose if there were more than one kind of enemy)
function enemySelector(y, x, eCounter) {
	if ((rooms[currentRoom][y][x]).includes("goober")){
		goober(eCounter);
	}//if
}//enemySelector

//Deletes the enemies to avoid glitches
function deleteEnemies() {
	for (i = 1 ; i <= 4 ; i++) {
		yE[i] = NaN;
		xE[i] = NaN;
		document.getElementById("e" + i).className = "";
		document.getElementById("e" + i).style.display = "none";
	}//for
}//deleteEnemies



//applies the position of the player and up to four enemies to css
function updatePositions() {

	document.getElementById("hud").innerHTML = "HP: " + hP;

	document.getElementById("hero").style.left = (250 + (128 * xCoordinate) + "px");
	document.getElementById("hero").style.top = (250 + (128 * yCoordinate) + "px");
	document.getElementById("e1").style.left = (250 + (128 * xE[1]) + "px");
	document.getElementById("e1").style.top = (250 + (128 * yE[1]) + "px");

	document.getElementById("e2").style.left = (250 + (128 * xE[2]) + "px");
	document.getElementById("e2").style.top = (250 + (128 * yE[2]) + "px");

	document.getElementById("e3").style.left = (250 + (128 * xE[3]) + "px");
	document.getElementById("e3").style.top = (250 + (128 * yE[3]) + "px");

	document.getElementById("e4").style.left = (250 + (128 * xE[4]) + "px");
	document.getElementById("e4").style.top = (250 + (128 * yE[4]) + "px");

}//updatePositions



//moveshero
document.addEventListener('keydown', function(e) {

	if(!pause){

		switch (e.keyCode) {

			case 37: 
				document.getElementById("hero").className = "heroLeft";
				pause = true;
				if(xCoordinate > 0) {
					tryToMove("Left");
				}//if
				break;//Left arrow

			case 38:
				document.getElementById("hero").className = "heroUp";
				pause = true;
				if(yCoordinate > 0) {
					tryToMove("Up");
				}//if
				break; //Up arrow

			case 39: 
				document.getElementById("hero").className = "heroRight";
				pause = true;
				if(xCoordinate < 4) {
					tryToMove("Right");
				}//if
				break;//Right arrow

			case 40: 
				document.getElementById("hero").className = "heroDown";
				pause = true;
				if(yCoordinate < 4) {
					tryToMove("Down");
				}//if
				break;//Down arrow

		}//switch
		updatePositions();

		if(rooms[currentRoom][yCoordinate][xCoordinate] == "ladder"){
			setTimeout(function() {
				levelUp();
				return;
			}, 250);
		}//if

		if (hP <= 0){
			gameOver();	
			return;
		}//if

		setTimeout (function() {
			enemyTurn();
		}, 500);

	}//if
}) ;// move hero



//try to move hero
function tryToMove(direction) {

	//class of location before move
	let oldClassName = rooms[currentRoom][yCoordinate][xCoordinate];

	//location we wish to move to
	let nextY = yCoordinate;
	let nextX = xCoordinate;
	let nextClass = "";////class of tile in location we wish to move to


	switch (direction) {
		case "Left":
			nextX--;
			break;
		case "Up":
			nextY--;
			break;
		case "Right":
			nextX++;
			break;
		case "Down":
			nextY++;
			break;
	}//switch

	nextClass = rooms[currentRoom][nextY][nextX];

	//if the obstacle is an enemy take damage
	if(enemies.includes(nextClass)) {
		enemyDamage(rotate(rotate(direction)));
		return;
	}//if

	// if the obstacle is not passable, don't move
	if(noPassObstacles.includes(nextClass) && oldClassName != "wall") {
		return;
	}//if

	//move 1 space
	xCoordinate = nextX;
	yCoordinate = nextY;

	//animate hero
	document.getElementById("hero").style.animation = "hero" + direction + " 0.25s";

	//if the next position is a pit move back a room
	if (nextClass == "pit") {
		fall();
		return;
	}//if
	
	setTimeout(function() {
		// reset animation
		document.getElementById("hero").style.animation = "";
	}, 250);

}// tryToMove



//falls down one level
function fall() { 

	document.getElementById("hero").style.animation = "fall 0.5s";
	setTimeout(function() {
		currentRoom--;
		loadRoom();
		//resets animation
		document.getElementById("hero").style.animation = "";
		return;
	}, 500);
}//fall



//scans board and makes moves for any non-player characters
function enemyTurn() {

	let moved = [true, true, true, true];

	for (y = 0; y <= 4; y++) {
		for (x = 0; x <= 4; x++) {
			for(i = 1; i <= 4; i++){
				if (yE[i] == y && xE[i] == x && moved[i - 1]) { 
					enemySelector(y, x, (i));
					moved[i - 1] = false;
				}//if
			}//for
		}// for
	}//for
	
	updatePositions();

	if (hP <= 0){
		gameOver();
		return;
	}

	setTimeout (function() {
		pause = false;
	}, 500);

}//enemyTurn



//AI for goober enemy
function goober(eCounter) {

	let y = yE[eCounter];
	let x = xE[eCounter];
	let direction; //direction goober is facing

	if ((rooms[currentRoom][y][x]).includes("Up")) {
		direction = "Up";
	} else if ((rooms[currentRoom][y][x]).includes("Down")) {
		direction = "Down";
	} else if ((rooms[currentRoom][y][x]).includes("Left")) {
		direction = "Left";
	} else if ((rooms[currentRoom][y][x]).includes("Right")) {
		direction = "Right";
	}//if

	//location we wish to move to
	let nextY = y;
	let nextX = x;

	let nextClass= "";////class of location we wish to move to

	let newClass = "";//new class to switch to

	switch (direction) {
		case "Left":
			nextX--;
			break;
		case "Up":
			nextY--;
			break;
		case "Right":
			nextX++;
			break;
		case "Down":
			nextY++;
			break;
	}//switch

	//if goober has reached the edge of the room
	if ((direction == "Left" && (x <= 0)) || (direction == "Up" && (y <= 0)) || (direction == "Right" && (x >= 4)) || (direction == "Down" && (y >= 4))) {
		
		//build name of new class
		newClass = "goober" + rotate(direction);
		//reverts nextY and nextX
		nextY = y;
		nextX = x;

	} else {

		//identifies the tile of planned location	
		nextClass = rooms[currentRoom][nextY][nextX];
	

		if (enemyNoPass.includes(nextClass)) {
			//build name of new class
			newClass = "goober" + rotate(direction);
			//reverts nextY and nextX
			nextY = y;
			nextX = x;

		} else {

			//build name of new class
			newClass = "goober" + direction;
		}//else
	}//else
	
	//if goober moves into player do damage
	if (nextY == yCoordinate && nextX == xCoordinate) {
		enemyDamage(direction);
	}//if

	//empty old location
	rooms[currentRoom][y][x] = "";

	//Updates goober with new class
	rooms[currentRoom][nextY][nextX] = newClass;
	document.getElementById("e" + eCounter).className = newClass;
	document.getElementById("e" + eCounter).style.animation = newClass + " 0.25s";
	yE[eCounter] = nextY;
	xE[eCounter] = nextX;

	//resets animation
	setTimeout(function() {
		document.getElementById("e" + eCounter).style.animation = "";
	}, 250);
}//goober



//rotates entity direction 90 degrees counterclockwise
function rotate(direction){

	switch(direction) {
		case "Left":
			return "Down";
		case "Up":
			return "Left";
		case "Right":
			return "Up";
		case "Down":
			return "Right";
	}//switch
}//rotate



//does damage to player
function enemyDamage(direction) {
	
	hP--;

	switch (direction) {
			case "Left": 
				knockback("Left");
				break;
			case "Up":
				knockback("Up");
				break;
			case "Right": 
				knockback("Right");
				break;
			case "Down": 
				knockback("Down");
	
		}//switch
}//enemyDamage



//makes the hero move backwards (if possible) as if recoiling from an attack
function knockback(direction) {

	//location we wish to move to
	let nextY = yCoordinate;
	let nextX = xCoordinate;

	let nextClass = "";//class of tile in location we wish to move to

	let i = 0; //a counter to prevent an infinite loop

	do {
		//reset next location
		nextY = yCoordinate;
		nextX = xCoordinate;
			switch (direction) {
				case "Left":
					if(xCoordinate > 0) {
						nextX--;
						document.getElementById("hero").className = "heroRight";
						document.getElementById("hero").style.animation = "ouchRight 0.25s";
					} else {
						nextX++;
						document.getElementById("hero").className = "heroLeft";
						document.getElementById("hero").style.animation = "ouchLeft 0.25s";
					}//else
					break;
				case "Up":
					if(yCoordinate > 0) {
						nextY--;
						document.getElementById("hero").className = "heroDown";
						document.getElementById("hero").style.animation = "ouchDown 0.25s";
					} else {
						nextY++;
						document.getElementById("hero").className = "heroUp";
						document.getElementById("hero").style.animation = "ouchUp 0.25s";
					}//else
					break;
				case "Right":
					if(xCoordinate < 4) {
						nextX++;
						document.getElementById("hero").className = ("heroLeft");
						document.getElementById("hero").style.animation = "ouchLeft 0.25s";
					} else {
						nextX--;
						document.getElementById("hero").className = ("heroRight");
						document.getElementById("hero").style.animation = "ouchRight 0.25s";
					}//else
					break;
				case "Down":
					if(yCoordinate < 4) {
						nextY++;
						document.getElementById("hero").className = ("heroUp");
						document.getElementById("hero").style.animation = "ouchUp 0.25s";
					} else {
						nextY--;
						document.getElementById("hero").className = ("heroDown");
						document.getElementById("hero").style.animation = "ouchDown 0.25s";
					}//else
					break;
			}//switch

			nextClass = rooms[currentRoom][nextY][nextX];
			i++;


			// if the obstacle is not passable, change direction and try again
			if(noPassObstacles.includes(nextClass) && (i < 5)) {
				direction = rotate(direction);
				continue;
			}//if

			break;
	} while (true);

	//move 1 space
	xCoordinate = nextX;
	yCoordinate = nextY;


	//if current position is a pit move back a room
	if (rooms[currentRoom][yCoordinate][xCoordinate] == "pit") {
		fall();
		return;
	}//if

}//knockback



//moves up to next room
function levelUp() {
	document.getElementById("levelUpBox").style.display = "block";
	document.getElementById("e1").style.display = "none";
	document.getElementById("e2").style.display = "none";
	document.getElementById("e3").style.display = "none";
	document.getElementById("e4").style.display = "none";
	setTimeout(function() {
	document.getElementById("levelUpBox").style.display = "none";
		if (currentRoom < numberOfRooms) {
			currentRoom++;
			loadRoom();
		} else {
			winGame();
			return;
		}//else

	}, 0);
}//levelUp



//starts a little death animation and displays gameOverBox
function gameOver() {
	pause = true;
	document.getElementById("hero").style.animation = "death 0.5s";
	document.getElementById("gameOverBox").style.display = "";
	setTimeout( function() {
		document.getElementById("hero").style.animation = "defeat 1s";
		document.getElementById("hero").style.animationIterationCount = "infinite";
		document.getElementById("hud").innerHTML = "";
		document.getElementById("gameOverBox").className = "gameOver";
	}, 500 );
}//gameOver



//displays winning message
function winGame() {
	pause = true;
	setTimeout( function() {
		document.getElementById("hud").style.display = "none";
		document.getElementById("winBox").style.display = "block";
		document.getElementById("winBox").className = "win";
	}, 500 );
}//winGame