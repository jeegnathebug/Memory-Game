function addEvent(obj, type, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
    } else if (obj.attachEvent) {
        obj.attachEvent("on" + type, fn);
    }
}

function getElementsByClass(cn) {
    var allElements = document.getElementsByTagName("*");
    var classArray = [];

    for (var i = 0; i < allElements.length; i++) {
        if (allElements[i].className == cn) {
            classArray.push(allElements[i]);
        }
    }

    return classArray;
}

function removeEvent(obj, type, fn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(type, fn, false);
	} else if (obj.detachEvent) {
		obj.detachEvent("on" + type, fn);
	}
}
