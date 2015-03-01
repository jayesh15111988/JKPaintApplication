function gosetwidth(linewidth) {
	lineWidth = linewidth;
	borderWidth = lineWidth;
}

function gosetopacity(opacityval) {
	opacityVal = opacityval;
}

function gosettrianglesides(trianglesidesval) {
	trianglesides = trianglesidesval;
}

function goseterasersize(erasersize) {
	eraserSize = erasersize;
}

function gosetcolortype(colortype) {
	colorType = colortype;
	if (colortype == 'stroke') {
		strokeColor = previousSelectedColor;
	} else if (colortype == 'fill') {
		fillColor = previousSelectedColor;
	} else if (colortype == 'back') {
		backgroundColor1 = previousSelectedColor;
	}
}

function gosetfontsize(fontsize) {
	textFontSize = fontsize;
}

function gosetfontfamily(fontfamily) {
	textFontFamily = fontfamily;
}

function gosetlinestyle(lineStyleName) {
	lineStyleDraw = lineStyleName;
}

function gosetcornerradius(cornerradiusval) {
	cornerradius = cornerradiusval;
}

function gosetlinecapstyle(capStyle) {
	lineCapStyle = capStyle;
}