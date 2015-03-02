/* Source : http://www.phpied.com/files/rgbcolor/rgbcolor.html */


function isThatColor() {


	var color = new RGBColor($('#selColorValue')[0].value);
	if (color.ok) {
		$('#result1')[0].style.backgroundColor = 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')';
		$('#result-text')[0].innerHTML = 'Red: ' + color.r + '<br />Green: ' + color.g + '<br />Blue: ' + color.b + '<br />RGB: ' + color.toRGB() + '<br />Hex: ' + color.toHex();
	} else {
		$('#result1')[0].style.backgroundColor = 'rgb(255, 255, 255)';
		$('#result-text')[0].innerHTML = 'Never heard of such color :(';
	}
}