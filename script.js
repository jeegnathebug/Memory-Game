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
    var top = document.getElementById("top");
    addEvent(top, "click", onClick);

    var body = document.getElementById("body");
    addEvent(body, "keypress", onKeyPress);

    var buttons = document.getElementsByClassName("button");
    addEvent(buttons[0], "click", start);
    addEvent(buttons[1], "click", end);

    // Other events
    g.headerHover = true;
    var header = document.getElementById("home");
    addEvent(header, "mouseover", onHeaderHover);
    addEvent(header, "mouseout", onHeaderHover);

    g.buttonHover = true;
    var button = document.getElementById("buttons");
    addEvent(button, "mouseover", onButtonHover);
    addEvent(button, "mouseout", onButtonHover);
}

/**
 * Sets the back image of the game
 */
function backImage() {
    var bottom = document.getElementById("bottomImage");
    bottom.src = g.wallpapers[g.backCtr];
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
        var image1 = document.getElementById("piece" + g.clickPieces[0].id.substring(5));
        var image2 = document.getElementById("piece" + g.clickPieces[1].id.substring(5));
        if(match(image1, image2)) {
            image1.style.visibility = "hidden";
            image2.style.visibility = "hidden";
        }
    }    
}

/**
 * Flips over all covers
 */
function flipAll() {
    // Get covers
    var covers = document.getElementsByClassName("cover");
    // Get pieces
    var pieces = document.getElementsByClassName("piece");

    for (var i = 0; i < 16; i++) {
        pieces[i].style.visibility = "hidden";
        covers[i].style.visibility = "hidden";
    }
}

/**
 * Checks the source of image1 and image2 and returns true if they are the same, false otherwise.
 * @param image1 The first image
 * @param image2 The second image
 * @returns {Boolean} True if the two images are the same, false otherwise
 */
function match(image1, image2) {
    if (image1.src == image2.src) {
        // Reset clicked pieces
        g.clickPieces = [];
        g.clickCtr = 0;
        return true;
    } else {
        return false;
    }
}

/**
 * Event that occurs when the mouse hovers over a button
 * @param e The event
 */
function onButtonHover(e) {
    // Get event
    var evt = e || window.event;
    // Get element that triggered event
    var target = evt.target || evt.srcElement;

    // Only act if hovering over buttons and not div itself
    if (target.id != "buttons") {
        if(g.buttonHover) {
            target.style.color = "rgb(255,155,0)";
            target.style.backgroundColor = "rgb(0,125,255)";

            target.style.minWidth = "95%";
            g.buttonHover = false;
        } else {
            target.style.color = "rgb(0,125,255)";
            target.style.backgroundColor = "rgb(125,215,255)";

            target.style.minWidth = "75%";
            g.buttonHover = true;
        }
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

    // only act if clicked on different pieces
    if (target.id != "top") {
        flip(target);
    }
}

/**
 * Event that occurs when the mouse hovers over the header text
 */
function onHeaderHover() {
    var header1 = document.getElementsByClassName("header1");
    var header2 = document.getElementsByClassName("header2");

    // Mouse over
    if (g.headerHover) {
        header1[0].style.color = "rgb(255,155,0)";
        header1[1].style.color = "rgb(255,155,0)";

        header2[0].style.color = "rgb(255,255,255)";

        g.headerHover = false;
    } else {
        // Mouse out
        header1[0].style.color = "rgb(255,255,255)";
        header1[1].style.color = "rgb(255,255,255)";

        header2[0].style.color = "rgb(255,155,0)";

        g.headerHover = true;
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

    var target = null;

    // Get respective cover
    target = document.getElementById("cover" + (key - 96));


    // "developer options"
    if(target == null) {
        g.dev += (String.fromCharCode(key));
        if (g.dev.includes("420423")) {
            var covers = document.getElementsByClassName("cover");
            for (var i = 0; i < covers.length; i++) {
                covers[i].style.backgroundColor = "rgba(125,215,255,0.75)";
            }
            g.dev = "";
        } else if (g.dev.includes("12345")) {
            var covers = document.getElementsByClassName("cover");
            for (var i = 0; i < covers.length; i++) {
                covers[i].style.backgroundColor = "rgb(125,215,255)";
            }
            g.dev = "";
        }
    } else if (target.style.visibility != "hidden") {
        flip(target);
    }
}

/**
 * Removes the cover of the given piece
 * @param target The piece whose cover is to be removed
 */
function removeCover(target) {

    // only act if clicked piece is not already flipped
    if (target != null) {
    // remove cover for clicked piece
        if (g.clickCtr <= 1) {
            target.style.visibility = "hidden";

            // Add piece to flipped pieces array
            g.clickPieces.push(target);

            // Increase counter
            g.clickCtr++;
        } else {
            g.clickPieces[0].style.visibility = "visible";
            g.clickPieces[1].style.visibility = "visible";

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
