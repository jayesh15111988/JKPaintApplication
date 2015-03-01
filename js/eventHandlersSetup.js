function setEventHandlers(typeDrawing) {
	whichFunction = typeDrawing;
	//Just to rest shape so that we won't end up drawing undesirable shape on the scene
	if (whichFunction == 'reset') {
		whichFunction = "";
	}

	if (whichFunction == 'polygon' || whichFunction == 'spline' || whichFunction == 'blob') {
		alert("Please click, draw and move the mouse to select desired points. Once done with all points, please press key 's' to draw desired shape");
	}

	if (whichFunction == 'ranline') {
		drawRandomLineOnScene();
	}

	if (isNumber(typeDrawing)) {
		wedgeAngle = typeDrawing;
		whichFunction = "wedge";
	}

	if (whichFunction == 'text') {
		var person = prompt("Please draw a rectangle After clicking Ok button on this menu \n Please enter your name", "Harry Potter");
		if (person != null) {
			textMessage = person;
		}
	} else if (whichFunction == 'imageobject') {

		var imagename = prompt("Please Enter image name along with extension", "rf.jpg");

		if (person != null) {
			imageName = imagename;
		}

		var imageObj = new Image();
		imageObj.src = imageName;
		imageObj.onload = function () {
			var yoda = new Kinetic.Image({
				x: 10,
				y: 10,
				image: imageObj,
				opacity: opacityVal,
				id: idShapes++,
				draggable: true
			});
			yoda.setFillLinearGradientEndPoint(20, 40);
			yoda.on('click', function (evt) {
					yoda.setDraggable(false);
					setEventsForObject(yoda, layer, stage);
				})
				// add the shape to the layer
			layer.add(yoda);
			layer.draw();
			// add the layer to the stage

		};
	}
}

function setEventsForObject(objectValue, layer, stage) {
	var endx, endy;
	var text;
	var toClear = false;

	layer.add(objectValue);
	if (objectValue.getId() == 101) {
		objectValue.on('mousedown', function (evt) {
			whichFunction = "";
			console.log("down=" + evt.pageX + "yydown=" + evt.pageY);
			isMouseDownResize = true;
			var smallRect = layer.find('#101')[0];
			smallRect.setPosition(evt.pageX - 10, evt.pageY - 10);
		});
	}
	objectValue.on('mousemove', function (evt) {
		//console.log("move=" + evt.pageX + "yymove=" + evt.pageY);
		if (isMouseDownResize) {
			canvasHeight = evt.pageY;
			canvasWidth = evt.pageX;
			var smallRect = layer.find('#101')[0];
			smallRect.setPosition(evt.pageX - 10, evt.pageY - 10);
			var mainRect = layer.find('#100')[0];
			mainRect.setSize(evt.pageX, evt.pageY);
		}
	});

	if (objectValue.getId() == 101) {
		objectValue.on('mouseup', function (evt) {
			//console.log("up=" + evt.pageX + "yyup=" + evt.pageY);
			var mainRect = layer.find('#100')[0];
			mainRect.setSize(evt.pageX, evt.pageY);
			isMouseDownResize = false;
		});
	}



	var circle1;
	objectValue.on('mousemove', function (evt) {
		//console.log("Mouse if moved now");
		var mousePos = stage.getPointerPosition();
		var x = mousePos.x;
		var y = mousePos.y;
		$("#positionindicatorsx").innerHTML = "X Value -> " + x;
		$("#positionindicatorsy").innerHTML = "Y Value -> " + y;

		if (isMouseDown && whichFunction == 'ranline') {
			//console.log("drawing");
			circle1 = new Kinetic.Circle({
				x: x,
				y: y,
				radius: 0.1,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: 1,
				opacity: opacityVal,
				name: 'ranline',
				id: 200
			});


			setEventsForObject(circle1, layer, stage);

			layer.add(circle1);
			layer.draw();
		}

		//For eraser function
		if (isMouseDown && whichFunction == 'eraser') {
			//console.log("erasing" + backgroundColor1);
			var eraserRectangle = new Kinetic.Rect({
				x: x,
				y: y,
				width: eraserSize,
				height: eraserSize,
				fill: backgroundColor1,
				stroke: backgroundColor1,
				strokeWidth: 1,
				name: 'eraser',
				draggable: false,
				id: 200
			});
			setEventsForObject(eraserRectangle, layer, stage);
			layer.add(eraserRectangle);
		}
		layer.draw();
	});


	document.body.onmouseup = function (evt) {
		isMouseDown = false;
	}


	document.body.onmousedown = function (evt) {
		isMouseDown = true;

		if (evt.pageX <= canvasWidth && evt.pageY <= canvasHeight && whichFunction == "") {
			alert("Please select the paint function from right hand side menu first");
		}
		//console.log(evt.pageX + "lolx");
		//console.log(evt.pageY + "loly");




	}

	objectValue.on('mouseout', function () {
		var mousePos = stage.getPointerPosition();
		var x = mousePos.x;
		var y = mousePos.y;


	});



	$('#container canvas').mousemove(function (e) {


	});


	objectValue.on('mouseup', function () {
		isMouseDown = false;
		//console.log(isMouseDown);

		if (toClear) {

			toClear = false;
		}
		var mousePos = stage.getPointerPosition();
		var x = mousePos.x;
		var y = mousePos.y;


		var drawObject;

		if (whichFunction == 'polygon') {
			polygonPoints.push(x, y);
		}
		if (whichFunction == 'spline' || splinePoints == 'blob' || whichFunction == 'star') {
			splinePoints.push(x, y);

			if (whichFunction == 'star') {

				var starRadius = Math.sqrt(Math.pow((startx - x), 2) + Math.pow((starty - y), 2));
				drawObject = new Kinetic.Star({
					x: startx,
					y: starty,
					numPoints: 6,
					innerRadius: starRadius / 2,
					outerRadius: starRadius,
					fill: fillColor,
					stroke: strokeColor,
					strokeWidth: lineWidth,
					opacity: opacityVal,
					id: idShapes++,
					draggable: true

				});
			}
		}



		var textrect;
		if (whichFunction == 'drawline') {

			if (lineStyleDraw == 'simple') {
				drawObject = new Kinetic.Line({
					points: [startx, starty, x, y],
					stroke: strokeColor,
					strokeWidth: lineWidth,
					lineCap: lineCapStyle,
					lineJoin: lineCapStyle,
					opacity: opacityVal,
					draggable: true,
					id: idShapes++
				});
			} else if (lineStyleDraw == 'dotline') {
				drawObject = new Kinetic.Line({
					points: [startx, starty, x, y],
					stroke: strokeColor,
					strokeWidth: lineWidth,
					lineCap: lineCapStyle,
					lineJoin: lineCapStyle,
					opacity: opacityVal,
					dashArray: [33, 10],
					draggable: true,
					id: idShapes++
				});
			} else if (lineStyleDraw == 'centerline') {
				drawObject = new Kinetic.Line({
					points: [startx, starty, x, y],
					stroke: strokeColor,
					strokeWidth: lineWidth,
					lineCap: lineCapStyle,
					lineJoin: lineCapStyle,
					opacity: opacityVal,
					dashArray: [29, 20, 0.001, 20],
					draggable: true,
					id: idShapes++
				});
			}

		} else if (whichFunction == 'drawrect' || whichFunction == 'seldel') {
			console.log(whichFunction);
			var tempSelDelColor, tempSelDelBorderWidth;
			if (whichFunction == 'seldel') {
				tempSelDelColor = 'red';
				tempSelDelBorderWidth = 2;
				seldelFinalx = x;
				seldelFinaly = y;
			} else {
				tempSelDelColor = strokeColor;
				tempSelDelBorderWidth = borderWidth;
			}
			drawObject = new Kinetic.Rect({
				x: startx,
				y: starty,
				width: x - startx,
				height: y - starty,
				fill: fillColor,
				stroke: tempSelDelColor,
				strokeWidth: tempSelDelBorderWidth,
				cornerRadius: cornerradius,
				opacity: opacityVal,
				draggable: true,
				id: idShapes++
			});
		} else if (whichFunction == 'text') {
			textrect = new Kinetic.Text({
				x: startx,
				y: starty,
				text: textMessage,
				fontSize: textFontSize,
				fontFamily: textFontFamily,
				fill: fillColor,
				stroke: strokeColor,
				opacity: opacityVal,
				width: (x - startx) * 2,
				padding: 10,
				draggable: true,
				id: idShapes++
			});

			drawObject = new Kinetic.Rect({
				x: startx,
				y: starty,
				stroke: strokeColor,
				strokeWidth: borderWidth,
				fill: fillColor,
				width: (x - startx) * 2,
				height: (y - starty) * 2,
				shadowColor: 'black',
				shadowBlur: 5,
				opacity: opacityVal,
				shadowOffset: [2, 2],
				shadowOpacity: 0.3,
				cornerRadius: cornerradius,
				draggable: true,
				id: 200
			});




		} else if (whichFunction == 'drawcircle') {

			var radiusCircle = Math.sqrt(Math.pow((startx - x), 2) + Math.pow((starty - y), 2));
			drawObject = new Kinetic.Circle({
				x: startx,
				y: starty,
				radius: radiusCircle,
				fill: fillColor,
				stroke: strokeColor,
				opacity: opacityVal,
				strokeWidth: borderWidth,
				draggable: true,
				id: idShapes++
			});
		} else if (whichFunction == 'ellipse') {

			drawObject = new Kinetic.Ellipse({
				x: (x + startx) / 2,
				y: (y + starty) / 2,
				radius: {
					x: Math.abs(x - startx) / 2,
					y: Math.abs(y - starty) / 2
				},
				stroke: strokeColor,
				strokeWidth: lineWidth,
				fill: fillColor,
				draggable: true,
				id: idShapes++
			});


		} else if (whichFunction == 'wedge') {
			var radiusCircle = Math.sqrt(Math.pow((startx - x), 2) + Math.pow((starty - y), 2));
			drawObject = new Kinetic.Wedge({
				x: startx,
				y: starty,
				radius: radiusCircle,
				angleDeg: 180,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: lineWidth,
				rotationDeg: wedgeAngle,
				draggable: true,
				id: idShapes++
			});





		} else if (whichFunction == 'drawtriangle') {
			var radiusTriangle = Math.sqrt(Math.pow((startx - x), 2) + Math.pow((starty - y), 2));
			drawObject = new Kinetic.RegularPolygon({
				x: startx,
				y: starty,
				sides: trianglesides,
				radius: radiusTriangle,
				fill: fillColor,
				stroke: strokeColor,
				opacity: opacityVal,
				strokeWidth: borderWidth,
				draggable: true,
				id: idShapes++
			});
		}
		if (drawObject) {

			drawObject.on('click', function (evt) {
				if (whichFunction == 'wholefill') {
					drawObject.setFill(fillColor);
					drawObject.draw();
					console.log("wholefill");
				}


				drawObject.setDraggable(false);
				setEventsForObject(drawObject, layer, stage);
			})
			console.log("adding object to layer now");
			layer.add(drawObject);
			layer.draw();

		}


		if (whichFunction == 'text') {
			textrect.on('click', function (evt) {
				//textrect.setDraggable(false);
				setEventsForObject(textrect, layer, stage);
			})

			textrect.on('mouseup', function (evt) {
				if (textrect.isDraggable())
					textrect.setDraggable(true);
				else
					textrect.setDraggable(false);

			})
			console.log("added");
			layer.add(textrect);
			whichFunction = "textfinish";
		}
	});




	objectValue.on('mousedown', function (event) {

		if (whichFunction != 'wholefill') {
			fillColor = backgroundColor1;
		}
		//console.log("mousedown....");
		isMouseDown = true;
		var mousePos = stage.getPointerPosition();
		startx = mousePos.x;
		starty = mousePos.y;

		console.log(document.getElementsByTagName('canvas'));
		var node = stage.get('#100')[0].getId();


		//console.log(node + " this is it");
		var pixelData = document.getElementsByTagName('canvas')[0].getContext('2d').getImageData(startx, starty, 1, 1).data;
		var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
		$('#selColorValue').value = hex;

		if (whichFunction == 'polygon' || whichFunction == 'multiline') {

			polygonPoints.push(startx, starty);
		}
		if (whichFunction == 'spline' || whichFunction == 'blob' || whichFunction == 'star') {
			splinePoints.push(startx, starty);
		}


		keypress.combo("enter", function () {
			console.log("You pressed enter1");
			if (polygonPoints.length > 0) {
				var redLine = new Kinetic.Line({
					points: polygonPoints,
					stroke: strokeColor,
					strokeWidth: borderWidth,
					lineCap: 'round',
					opacity: opacityVal,
					lineJoin: 'round',
					id: idShapes++,
					draggable: true
				});
				layer.add(redLine);
				layer.draw();
				polygonPoints.length = 0;
			}
		});


		keypress.combo("delete", function () {
			if (whichFunction == 'seldel') {
				var seldelFromCanvas = new Kinetic.Rect({
					x: startx - 1,
					y: starty - 1,
					width: seldelFinalx - startx + 1,
					height: seldelFinaly - starty + 1,
					fill: backgroundColor1,
					stroke: backgroundColor1,
					strokeWidth: 2,
					opacity: opacityVal,
					draggable: false,
					id: idShapes++
				});

				setEventsForObject(seldelFromCanvas, layer, stage);
				layer.add(seldelFromCanvas);
				layer.draw();

			}


		})


		keypress.combo("s", function () {

				if (polygonPoints.length > 0) {
					if (whichFunction == 'polygon') {
						console.log(polygonPoints);



						var poly = new Kinetic.Polygon({
							points: polygonPoints,
							fill: fillColor,
							stroke: strokeColor,
							strokeWidth: lineWidth,
							id: idShapes++,
							draggable: true
						});

						polygonPoints = new Array();
						layer.add(poly);
						layer.draw();
						//layer.draw();
						poly.on('click', function (evt) {
								poly.setDraggable(false);
								setEventsForObject(poly, layer, stage);

								if (whichFunction == 'wholefill') {
									poly.setFill(fillColor);
									layer.draw();
									console.log("wholefill");
								}


							})
							//return;
					}
				}

				if (whichFunction == 'imageobject') {}


				//console.log(" sp ressed" + splinePoints);
				if (splinePoints.length > 0) {
					console.log("drawing" + whichFunction);
					var randomShape;
					if (whichFunction == 'spline') {
						randomShape = new Kinetic.Spline({
							points: splinePoints,
							stroke: strokeColor,
							strokeWidth: borderWidth,
							lineCap: 'round',
							opacity: opacityVal,
							tension: 0.5,
							id: idShapes++,
							draggable: true
						});
					} else if (whichFunction == 'imageobject') {} else if (whichFunction == 'blob') {
						console.log("blob");
						randomShape = new Kinetic.Blob({
							points: splinePoints,
							stroke: strokeColor,
							strokeWidth: borderWidth,
							fill: fillColor,
							opacity: opacityVal,
							id: idShapes++,
							draggable: true,
							tension: 0.8
						});
						randomShape.setFillG = "green";
					}
					console.log("inside spline");
					console.log(splinePoints + "  " + splinePoints[1] + "all spline");
					randomShape.on('click', function (evt) {
						randomShape.setDraggable(false);
						setEventsForObject(randomShape, layer, stage);
					})


					layer.add(randomShape);
					layer.draw();
					splinePoints = [];

				}
			}

		)


		var circle;

		if (whichFunction == 'ranline') {
			circle = new Kinetic.Circle({
				x: startx,
				y: starty,
				radius: 1,
				fill: fillColor,
				stroke: strokeColor,
				strokeWidth: borderWidth,

				name: 'ranline'
			});


			setEventsForObject(circle, layer, stage);

			layer.add(circle);


		}

	});
	layer.add(objectValue);
	layer.draw();
}