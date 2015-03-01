/* Source : http://www.phpied.com/files/rgbcolor/rgbcolor.html */


function isThatColor() {

	var color = new RGBColor($('#selColorValue').value);
	if (color.ok) {
		$('#result1').style.backgroundColor = 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')';
		$('#result-text').innerHTML = 'Red: ' + color.r + '<br />Green: ' + color.g + '<br />Blue: ' + color.b + '<br />RGB: ' + color.toRGB() + '<br />Hex: ' + color.toHex();
	} else {
		$('#result-text').innerHTML = 'Never heard of such color :(';
		$('#result').style.backgroundColor = 'rgb(255, 255, 255)';
	}
}