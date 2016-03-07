/**
 * Adds an event to an element
 * @param obj The element to which to add the event
 * @param type  The type of the event
 * @param fn The function to add to the element
 */
function addEvent(obj, type, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(type, fn, false); // everything else
    } else if (obj.attachEvent) {
        obj.attachEvent("on" + type, fn); //IE
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

/**
 * Removes an event from a given element
 * @param obj The element from which to remove the event
 * @param type  The type of the event
 * @param fn The function to remove from the element
 */
function removeEvent(obj, type, fn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(type, fn, false);
	} else if (obj.detachEvent) {
		obj.detachEvent("on" + type, fn);
	}
}
