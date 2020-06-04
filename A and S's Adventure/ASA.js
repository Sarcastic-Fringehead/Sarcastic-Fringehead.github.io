const levels = [

	//level 0
	["goal", "rock", "", "", "",
	"fenceHoriz", "rock", "", "", "jockey",
	"", "treeTwo", "animate", "animate", "animate",
	"", "river", "", "horseUp", "",
	"", "fenceVert", "", "", ""],

	//level 1

	["goal", "riverVert", "", "", "",
	"fenceHoriz", "riverVert", "", "", "jockey",
	"animate", "bridge animate", "animate", "animate", "animate",
	"", "riverVert", "", "", "",
	"", "riverVert", "horseUp", "", ""],

	//level 2
	["treeOne", "treeOne", "goal", "treeTwo", "treeOne",
	"animate", "animate", "animate", "animate", "animate",
	"riverHoriz", "bridge", "riverHoriz", "riverHoriz", "riverHoriz",
	"", "", "", "", "",
	"jockey", "rock", "", "", "horseUp"]

]; //end of levels

const numberOfLevels = 2;

const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["rock", "treeOne", "treeTwo", "river", "riverHoriz", "riverVert", "riverBendLD", "riverBendLU", "riverBendRD", "riverBendRU"];

var currentLevel = 0; //starting level
var jockeyOn = false; //is the jockey on the horse?
var currentLocationOfHorse = 0;
var currentAnimation; //allows one animation per level
var widthOfBoard = 5;

//start game
window.addEventListener("load", function() {
	loadLevel();
});

//move horse
document.addEventListener('keydown', function(e) {

	switch (e.keyCode) {

		case 37: 
			if(currentLocationOfHorse % widthOfBoard !== 0) {
				tryToMove("Left");
			}//if
			break;//left arrow
		case 38:
			if(currentLocationOfHorse - widthOfBoard >= 0) {
				tryToMove("Up");
			}//if
			break; //up arrow
		case 39: 
			if((currentLocationOfHorse + 1) % widthOfBoard !== 0) {
				tryToMove("Right");
			}//if
			break;//right arrow
		case 40: 
			if(currentLocationOfHorse + widthOfBoard < widthOfBoard * widthOfBoard) {
				tryToMove("Down");
			}//if
			break;//down arrow

	}

}) ;// move horse

// load levels 0 - maxLevel
function loadLevel(){
	let levelMap = levels[currentLevel];
	let animateBoxes;	
	jockeyOn = false;

	//load board

	for (i = 0; i < gridBoxes.length; i++) {
		gridBoxes[i].className = levelMap[i];
		if(levelMap[i].includes("horse")){ 
			currentLocationOfHorse = i;
		}//if
	}// for


	animateBoxes = document.querySelectorAll(".animate");

	animateEnemy(animateBoxes, 0, "right");

} // loadLevel

//animate enemy left to right (...) 
// boxes = array of boxes that enemy can be on 
//index = where enemy is
//direction = direction of enemy
function animateEnemy(boxes, index, direction) {

	//exits function if no animation
	if (boxes.length <= 0) {return; }

	//update images
	if (direction == "right") {
		boxes[index].classList.add("enemyRight");
	} else if (direction == "left") {
		boxes[index].classList.add("enemyLeft");
	}//if

	//remove images from other boxes
	for (i = 0; i < boxes.length; i++) {
		if(i != index) {
			boxes[i].classList.remove("enemyLeft");
			boxes[i].classList.remove("enemyRight");
		}//if
	}//for

	//updates position of enemy

	// moving right
	if (direction == "right") {
		//turn around if hit right side
		if (index == boxes.length - 1) {
			index--;
			direction = "left";
		} else {
			index++;
		}//if

	//moving left
	} else if (direction == "left"){
		//turn around if hit left side
		if (index == 0) {
			index++;
			direction = "right";
		} else {
			index--;
		}//if
	}//if

	currentAnimation = setTimeout(function() {
		animateEnemy(boxes, index, direction);
	}, 750);
}// animateEnemy

//try to move horse
function tryToMove(direction) {

	//location before move
	let oldLocation = currentLocationOfHorse;

	//class of location before move
	let oldClassName = gridBoxes[oldLocation].className;

	let nextLocation = 0; //location we wish to move to
	let nextClass = ""; //class of location we wish to move to

	let nextLocation2 = 0;//location to move to if it's a jump
	let nextClass2 = "";//class of location to move to if it's a jump

	let newClass = "";//new class to switch to if move successful

	switch (direction) {
		case "Left":
			nextLocation = currentLocationOfHorse - 1;
			break;
		case "Up":
			nextLocation = currentLocationOfHorse - 5;
			break;
		case "Right":
			nextLocation = currentLocationOfHorse + 1;
			break;
		case "Down":
			nextLocation = currentLocationOfHorse + 5;
			break;
	}//switch

	nextClass = gridBoxes[nextLocation].className;

	//if it is the goal move up a level
	levelUp(nextClass);

	// if the obstacle is not passable, don't move
	if(noPassObstacles.includes(nextClass)) {return;}//if

	//if it's a fence and there is no jockey, don't move
	if(!jockeyOn && nextClass.includes("fence")) {return;}

	//if there's a fence, move two spaces with animation
	if(nextClass.includes("fence")) {

		//jockey must be on to jump
		if (jockeyOn) {
			gridBoxes[currentLocationOfHorse].className = ""; // bridge destroying bug here
			oldClassName = gridBoxes[nextLocation].className;

			//set values according to direction 
			if (direction == "Left") {
				nextClass = "jumpLeft";
				nextClass2 = "jockeyLeft";
				nextLocation2 = nextLocation - 1;
			} else if (direction == "Right") {
				nextClass = "jumpRight";
				nextClass2 = "jockeyRight";
				nextLocation2 = nextLocation + 1;
			} else if (direction == "Up") {
				nextClass = "jumpUp";
				nextClass2 = "jockeyUp";
				nextLocation2 = nextLocation - 5;
			} else if (direction == "Down") {
				nextClass = "jumpDown";
				nextClass2 = "jockeyDown";
				nextLocation2 = nextLocation + 5;
			}//if

			//show horse jumping fence
			gridBoxes[nextLocation].className = nextClass;

			//delays second half of horses' jump

			setTimeout (function() {
				//sets jump back to just a fence
				gridBoxes[nextLocation].className = oldClassName;

				//updates current location of horse to be 2 spaces past where it started the jump
				currentLocationOfHorse = nextLocation2

				//get class of box after jump
				nextClass = gridBoxes[currentLocationOfHorse].className;//bug

				//show horse and rider after landing
				gridBoxes[currentLocationOfHorse].className = nextClass2;

				//if next boc is a goal, level up
				levelUp(nextClass);

			}, 350);
			return;

		}// if jockeyOn

	}//if fence

	//if there is a rider, add rider
	if (nextClass == "jockey") {
		jockeyOn = true;
	}

	//if there is a bridge in the old location keep it, if not make it empty
	if (oldClassName.includes("bridge")) {
		gridBoxes[oldLocation].className = "bridge";
	} else {
		gridBoxes[oldLocation].className = "";
	}//else

	//build name of new class
	newClass = (jockeyOn) ? "jockey" : "horse";
	newClass += direction;

	//if there is a bridge in the next location keep it
	if (gridBoxes[nextLocation].classList.contains("bridge")){
		newClass += " bridge";
	}//if

	//move 1 space
	currentLocationOfHorse = nextLocation;
	gridBoxes[currentLocationOfHorse].className = newClass;

	//if it is an enemy end the game
	if (nextClass.includes("enemy")) {
		lose();
	}//if

	//if it is the goal move up a level
	levelUp(nextClass);

}// tryToMove

//moves up to next level
function levelUp(nextClass) {
	if (nextClass == "goal" && jockeyOn) {
		document.getElementById("levelUp").style.display = "block";
		clearTimeout(currentAnimation);
		setTimeout(function() {
			document.getElementById("levelUp").style.display = "none";
			if (currentLevel < numberOfLevels) {
				currentLevel++;
				loadLevel();
			}//if
		}, 1000);
	}//if
}//levelUp

//restarts level
function lose(){
	document.getElementById("lose").style.display = "block";
	clearTimeout(currentAnimation);
	setTimeout(function() {
		document.getElementById("lose").style.display = "none";
		loadLevel();
	}, 1000);
}//lose
