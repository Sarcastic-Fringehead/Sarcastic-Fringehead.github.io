// changes the visibility of divID
function changeVis(divID) {
	var element = document.getElementById(divID);

	//if element exists, toggle its class
	//between hidden and unhidden
	if (element) {
		element.className = (element.className == 'hidden')? 'unhidden' : 'hidden';
	}//if
}	//changeVis

// display light box with bigImage in it
function displayLightBox(imageFile, alt) {

	var image = new Image() ;
	var bigImage = document.getElementById("bigImage")

	image.src = "images/" + imageFile;
	image.alt = alt;

	//forces big image to reload 
	//so we can have access to 
	//its width so it will be centered
	//anonymous function
	image.onload = function () {
		var width = image.width
		document.getElementById("boundaryBigImage").style.width = width + "px" ;
	} ;

	bigImage.src = image.src;
	bigImage.alt = image.alt


	changeVis('lightbox');
	changeVis('boundaryBigImage');

} //displayLightBox