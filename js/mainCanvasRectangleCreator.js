function createMainRectangle(layer, stage) {

	var rectMain = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: window.innerWidth - 175 - 40,
		height: window.innerHeight - 100,
		fill: backgroundColor1,
		stroke: 'black',
		strokeWidth: 2,
		id: 100
	});

	var rectSmall = new Kinetic.Rect({
		x: window.innerWidth - 225,
		y: window.innerHeight - 110,
		width: 10,
		height: 10,
		fill: 'green',
		stroke: 'green',
		strokeWidth: 2,
		id: 101
	});



	setEventsForObject(rectMain, layer, stage);
	rectMain.on('click', function (evt) {

		if (whichFunction == 'wholefill') {
			rectMain.setFill(fillColor);
			console.log("wholefill for rectmain");
		}
	});

	setEventsForObject(rectSmall, layer, stage);
	layer.draw();
}