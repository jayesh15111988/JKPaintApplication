function drawScene() {

	if (whichFunction == 'ranline') {
		if (vPointer.bDown) { // on mouse down
			var iDx = iLMx - vPointer.X;
			var iDy = iLMy - vPointer.Y;
			var dif = Math.sqrt(iDx * iDx + iDy * iDy); // difference between two last points
			if (dif > 5) {
				if (!vActShape) {
					aShapes.push( // prepare a new shape object
						vActShape = new Shape()
					);
					vActShape.color = 'black'; //getRandomColor();
				}
				iLMx = vPointer.X;
				iLMy = vPointer.Y;

				vActShape.addPoint(vPointer.X - canvas.width * 0.5, vPointer.Y - canvas.height * 0.5, 0);

			}
		} else {
			// Once mouse is released - cleanup
			if (vActShape) {
				vActShape = '';
				iLMx = iLMy = 0;
			}

			// Rotate the shapes

		}
	}
	// Draw all shapes
	aShapes.forEach(function (sh) {
		sh.draw();
	});
}

// Point object
CPointer = function (canvas) {
	var self = this;
	this.body = document.body;
	this.html = document.documentElement;
	this.elem = canvas;
	this.X = 0;
	this.Y = 0;
	this.Xi = 0;
	this.Yi = 0;
	this.Xr = 0;
	this.Yr = 0;
	this.startX = 0;
	this.startY = 0;
	this.bDrag = false;
	this.bMoved = false;
	this.bDown = false;
	this.bXi = 0;
	this.bYi = 0;
	this.sX = 0;
	this.sY = 0;
	this.left = canvas.offsetLeft;
	this.top = canvas.offsetTop;

	self.elem.onmousedown = function (e) {
		self.bDrag = false;
		self.bMoved = false;
		self.bDown = true;
		self.Xr = e.clientX;
		self.Yr = e.clientY;

		self.X = self.sX = self.Xr - self.left;
		self.Y = self.sY = self.Yr - self.top + ((self.html && self.html.scrollTop) || self.body.scrollTop);
	}
	self.elem.onmousemove = function (e) {
		self.Xr = (e.clientX !== undefined ? e.clientX : e.touches[0].clientX);
		self.Yr = (e.clientY !== undefined ? e.clientY : e.touches[0].clientY);
		self.X = self.Xr - self.left;
		self.Y = self.Yr - self.top + ((self.html && self.html.scrollTop) || self.body.scrollTop);
		if (self.bDown) {
			self.Xi = self.bXi + (self.X - self.sX);
			self.Yi = self.bYi - (self.Y - self.sY);
		}
		if (whichFunction == 'ranline')
		//drawScene();
			if (Math.abs(self.X - self.sX) > 2 || Math.abs(self.Y - self.sY) > 2) {
				self.bMoved = true;
				if (self.bDown) {
					if (!self.bDrag) {
						self.startX = self.sX;
						self.startY = self.sY;
						self.bDrag = true;
					}
				} else {
					self.sX = self.X;
					self.sY = self.Y;
				}
			}

	}
	self.elem.onmouseup = function () {


		self.bXi = self.Xi;
		self.bYi = self.Yi;
		if (!self.bMoved) {
			self.X = self.sX;
			self.Y = self.sY;
		}
		if (whichFunction == 'ranline')
			drawScene();

		self.bDrag = false;
		self.bDown = false;
		self.bMoved = false;


	}
}

var Point = function (x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.x0 = x;

	this.xp = 0;
	this.yp = 0;
	this.zp = 0;
	this.fov = 2000;
}
Point.prototype.project = function () {
	this.zp = this.fov / (this.fov + this.z);
	this.xp = this.x * this.zp;
	this.yp = this.y * this.zp;
}


// Shape object
var Shape = function () {
		this.angle = 0;
		this.color = strokeColor;
		this.halfheight = canvas.height / 2;
		this.halfwidth = canvas.width / 2;
		this.len = 0;
		this.points = [];
		return this;
	}
	// Add point to shape
Shape.prototype.addPoint = function (x, y, z) {
		this.points.push(
			new Point(Math.round(x), Math.round(y), Math.round(z))
		);
		this.len++;
	}
	// Rotate shape

Shape.prototype.draw = function () {
	// points projection
	for (var i = 0; i < this.len; i++) {
		this.points[i].project();
	}
	// draw a curved line between points
	var p0 = this.points[0];

	ctx.beginPath();
	ctx.moveTo(p0.xp + this.halfwidth, p0.yp + this.halfheight);
	for (var i = 1, pl = this.points.length; i < pl; i++) {
		var apnt = this.points[i];
		var xc = (p0.xp + apnt.xp) / 2;
		var yc = (p0.yp + apnt.yp) / 2;
		ctx.quadraticCurveTo(p0.xp + this.halfwidth, p0.yp + this.halfheight, xc + this.halfwidth, yc + this.halfheight);
		p0 = apnt;
	}

	// stroke properties
	ctx.lineWidth = lineWidth;
	ctx.strokeStyle = strokeColor; //this.color;
	ctx.lineCap = lineCapStyle; // rounded end caps
	ctx.stroke();
}

// Initialization
function sceneInit() {
		canvas = document.getElementsByTagName('canvas')[0];
		ctx = canvas.getContext('2d');
		//canvas.style.width=canvasWidth;
		//canvas.style.height=canvasHeight;
		vPointer = new CPointer(canvas);
		// /drawScene();
	}
	/* End of javscript pen function */

function drawRandomLineOnScene() {
	//Temporary drawing scene
	drawpencileInterval = setInterval(drawScene, 200);
	drawScene();
	//
	drawScene();
}