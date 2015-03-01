function isNumber(o) {
	return typeof o == "number" || (typeof o == "object" && o.constructor === Number);
}

function rgbToHex(r, g, b) {
	if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
	return ((r << 16) | (g << 8) | b).toString(16);
}

function findPos(obj) {
	console.log("right");
	var curleft = 0,
		curtop = 0;
	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
		return {
			x: curleft,
			y: curtop
		};
	}
	return undefined;
}

$("#flat").spectrum({
	flat: true,
	showInput: true
});
$("#flatClearable").spectrum({
	flat: true,
	showInput: true,
	allowEmpty: true
});