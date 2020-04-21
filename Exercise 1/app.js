// Write your JS in here
var pics = [
	"imgs/kitty_sink.jpg",
	"imgs/kitty_wall.jpg",
	"imgs/kitty_bed.jpg",
	"imgs/kitty_basket.jpg", 
	"imgs/kitty_laptop.jpg",
	"imgs/kitty_door.jpg"
]

var btn = document.querySelector("button");
var img = document.querySelector("img");
var i = 1 //counter

btn.addEventListener("click", function(){
	img.src = pics[(i % 6)];
	i++
});



