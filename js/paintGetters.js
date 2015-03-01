function getColorSelected(colorName) {
	if (colorType == "stroke") {
		strokeColor = colorName;
	} else if (colorType == "fill") {
		fillColor = colorName;
	} else if (colorType == "back") {
		backgroundColor1 = colorName;
		var mainRect = layer.find('#100')[0];
		mainRect.setFill(backgroundColor1);
		layer.draw();

	}
}