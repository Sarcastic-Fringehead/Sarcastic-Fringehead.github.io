const levels = [

	//level 0
	["goal", "rock", "", "", "",
	"fenceHoriz", "rock", "", "", "jockey",
	"", "treeTwo", "animate", "animate", "animate",
	"", "river", "", "", "",
	"", "fenceVert", "", "horseUp", ""],

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
	"", "", "", "fenceVert", "",
	"jockey", "rock", "", "", "horseUp"]

]; //end of levels

const gridBoxes = document.querySelectorAll("#gameBoard div");
var currentLevel = 0; //starting level
var jockeyOn = false; //is the jockey on the horse?
var currentLocationOfHorse = 0;
var currentAnimation; //allows one animation per level


//start game
window.addEventListener("load", function() {
	loadLevel();
})


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