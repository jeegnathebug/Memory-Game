var g = {};

window.onload = init;

/**
 * On load event
 */
function init() {
	g.dev = "";

	g.images = ["resources/glaceon.gif", "resources/jolteon.gif", "resources/lefeon.gif", "resources/mewtwo.gif" ,"resources/pikachu.gif", "resources/snorlax.gif", "resources/totodile.gif", "resources/vaporeon.gif"];
	g.wallpapers = ["resources/w1.jpg", "resources/w2.jpg", "resources/w3.jpg", "resources/w4.jpg" ,"resources/w5.jpg"];

	// Flipped pieces
	g.clickPieces = [];
	// Tracks number of clicks (flipped pieces) (0 = none flipped, 1 = 1 flipped, 2 = 2 flipped. Should never go to 3)
	g.clickCtr = 0;
	// Tracks rounds for back image
	g.backCtr = 0;

	//load images
	loadImages(g.images.concat(g.wallpapers));

	// Start game
	start();

	// Add events
	$("#top").on('click', onClick);
	$("#body").on('keypress', onKeyPress);
	$("#buttonStart").on('click', start);
	$("#buttonEnd").on('click', end);

	// Add year
	$('#year').html(new Date().getFullYear());
}

/**
 * Sets the back image of the game
 */
function backImage() {
	$('#bottomImage').attr('src', g.wallpapers[g.backCtr]);
}

/**
 * When the End Game button is clicked
 */
function end() {
	flipAll();
}

/**
 * Flips over the cover
 * @param target The cover to be flipped
 */
function flip(target) {
	removeCover(target);
	if (g.clickCtr == 2) {
		var image1 = $('#piece' + g.clickPieces[0].attr('data-id'));
		var image2 = $('#piece' + g.clickPieces[1].attr('data-id'));
		if(match(image1, image2)) {
			image1.css('visibility', 'hidden');
			image2.css('visibility', 'hidden');
		}
	}    
}

/**
 * Flips over all covers
 */
function flipAll() {
	$('.cover').css('visibility', 'hidden');
	$('.piece').css('visibility', 'hidden');
}

/**
 * Checks the source of image1 and image2 and returns true if they are the same, false otherwise.
 * @param image1 The first image
 * @param image2 The second image
 * @returns {Boolean} True if the two images are the same, false otherwise
 */
function match(image1, image2) {
	if (image1.attr('src') == image2.attr('src')) {
		// Reset clicked pieces
		g.clickPieces = [];
		g.clickCtr = 0;
		return true;
	} else {
		return false;
	}
}

/**
 * Event that occurs when a piece is clicked
 * @param e The event
 */
function onClick(e) {
	// Get event
	var evt = e || window.event;
	// Get element that triggered event
	var target = evt.target || evt.srcElement;

	// Only act if clicked on different pieces
	if (target.id != "top") {
		flip($(target));
	}
}

/**
 * Event that occurs when a keyboard key is pressed
 * @param e The event
 */
function onKeyPress(e) {

	var key;

	if(window.event) {
		key = window.event.keyCode;
	} else if(e.which) {
		key = e.which;
	}

	// Get respective cover
	var target = $('#cover' + (key - 96));

	// "developer options"
	if(target.length === 0) {
		var covers = $('.cover');
		g.dev += (String.fromCharCode(key));

		if (g.dev.includes("420423")) {
			covers.css('backgroundColor', 'rgba(125,215,255,0.75)');
			g.dev = "";
		} else if (g.dev.includes("12345")) {
			covers.css('backgroundColor', 'rgb(125,215,255)');
			g.dev = "";
		}
	} else if (target[0].style.visibility != "hidden") {
		flip(target);
	}
}

/**
 * Removes the cover of the given piece
 * @param target The piece whose cover is to be removed
 */
function removeCover(target) {

	// Only act if clicked piece is not already flipped
	if (target != null) {
	// Remove cover for clicked piece
		if (g.clickCtr <= 1) {
			target.css('visibility', 'hidden');

			// Add piece to flipped pieces array
			g.clickPieces.push(target);

			// Increase counter
			g.clickCtr++;
		} else {
			g.clickPieces[0].css('visibility', 'visible');
			g.clickPieces[1].css('visibility', 'visible');

			// Reset flipped pieces
			g.clickPieces = [];
			// Reset counter
			g.clickCtr = 0;
		}
	}
}

/**
 * Sets the images of the pieces in a randomized order
 */
function setImages() {

	// Get covers
	var covers = document.getElementsByClassName("cover");
	// Get pieces
	var pieces = document.getElementsByClassName("piece");

	// Cover all pieces
	for (var i = 0; i < covers.length; i++) {
		covers[i].style.visibility = "visible";
		pieces[i].style.visibility = "visible";
	}

	// Randomize images
	var images = g.images.concat(g.images);
	shuffle(images);
	
	// Set images
	for (var i = 0; i < (images.length); i++) {
		if (images[i] != undefined) {
			pieces[i].src = images[i];
		}
	}
}

/**
 * Randomizes an array
 * @param array The array to be randomized
 * @returns The randomized array
 */
function shuffle(array) {
	var random, placeholder, i;
	for (i = 0; i < array.length; i++) {

		// Get random number
		random = Math.floor(Math.random() * i);

		// Switch places
		placeholder = array[i];
		array[i] = array[random];
		array[random] = placeholder;
	}
	return array;
}

/**
 * The sequence of functions that need to be executed upon the beginning of a game
 */
function start() {
	backImage();
	setImages();

	if (g.backCtr == 4) {
		g.backCtr = 0;
	} else {
		g.backCtr++;        
	}
}

/**
 * Load images into cache
 * @param images The image array to be loaded
 */
function loadImages(images) {
    var image = new Image();

    for(i = 0; i < images.length; i++) {
        image.src = images[i];
    }
}
