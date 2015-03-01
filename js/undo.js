function undo() {
	console.log("before");
	if (whichFunction != 'ranline') {
		var shapes = [];
		shapes = layer.getChildren();
		console.log("after");
		var shapes1 = layer.find('.ranline');
		var shapesEraser = layer.find('.eraser');

		console.log(shapes1.length + "lengthddd");
		console.log("shapes length " + shapes.length);


		console.log("first");
		for (var i = 0; i < shapes.length; i++) {

			if (shapes[i]) {
				console.log(shapes[i].getId());
				console.log(idShapes + " final");

				if (shapes[i].getId() != 100 && shapes[i].getId() != 101 && shapes[i].getId() == idShapes - 1)
				//console.log("this is id "+shapes[i].getId());
					shapes[i].hide();
				//testval-=1;

				//shapes[i].setId(1000);

				layer.draw();
				//idShapes-=1;
			}

		}
		idShapes = idShapes - 1;
	}
}