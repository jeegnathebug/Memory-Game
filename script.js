var g = {};

window.onload = init;

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
    loadImages();

    // Start game
    start();

    // Add events
    var top = document.getElementById("top");
    addEvent(top, "click", onClick);

    var body = document.getElementById("body");
    addEvent(body, "keypress", onKeyPress);

    var buttons = getElementsByClass("button");
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

function backImage() {
    var bottom = document.getElementById("bottomImage");
    bottom.src = g.wallpapers[g.backCtr];
}

function end() {
    flipAll();
}

function flip(target) {
    removeCover(target);
    if (g.clickCtr == 2) {
        // TODO Get img under g.clickPiece[0] and g.clickPiece[1]
        var image1 = document.getElementById("piece" + g.clickPieces[0].id.substring(5));
        var image2 = document.getElementById("piece" + g.clickPieces[1].id.substring(5));
        if(match(image1, image2)) {
            image1.style.visibility = "hidden";
            image2.style.visibility = "hidden";
        }
    }    
}

function flipAll() {
    // Get covers
    var covers = getElementsByClass("cover");
    // Get pieces
    var pieces = getElementsByClass("piece");

    for (var i = 0; i < 16; i++) {
        pieces[i].style.visibility = "hidden";
        covers[i].style.visibility = "hidden";
    }
}

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

function onButtonHover(e) {
    // Get event
    var evt = e || windows.event;
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


function onClick(e) {
    // Get event
    var evt = e || windows.event;
    // Get element that triggered event
    var target = evt.target || evt.srcElement;

    // if clicked on same piece twice, do nothing
    if (target.id == "top") {
        target = null;
    }

    flip(target);
}

function onHeaderHover() {
    var header1 = getElementsByClass("header1");
    var header2 = getElementsByClass("header2");

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

function onKeyPress(e) {
    // Get event
    var evt = e || windows.event;

    var key; 
    if(window.event) {
        key = e.keyCode;
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
                var covers = getElementsByClass("cover");
                for (var i = 0; i < covers.length; i++) {
                    covers[i].style.backgroundColor = "rgba(125,215,255,0.75)";
                }
                g.dev = "";
            } else if (g.dev.includes("12345")) {
                var covers = getElementsByClass("cover");
                for (var i = 0; i < covers.length; i++) {
                    covers[i].style.backgroundColor = "rgb(125,215,255)";
                }
                g.dev = "";
            }
    } else {
        flip(target);
    }
}

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

function setImages() {

    // Get covers
    var covers = getElementsByClass("cover");
    // Get pieces
    var pieces = getElementsByClass("piece");

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

function start() {
    backImage();
    setImages();

    if (g.backCtr == 4) {
        g.backCtr = 0;
    } else {
        g.backCtr++;        
    }
}
