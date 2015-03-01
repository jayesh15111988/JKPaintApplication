/* All for javascript pendical function */
var canvasHeight = window.innerHeight - 100;
var canvasWidth = window.innerWidth - 175 - 40;

var seldelFinalx, seldelFinaly;
var canvas, ctx; // canvas and context objects
var vPointer; // draw pointer pbject
var aShapes = []; // shapes array
var iLMx = iLMy = 0; // last pointer positions
var vActShape; // active shape object
var drawpencileInterval;

var previousSelectedColor = '#ffffff';
var whichFunction = 'drawline';
var objectarray = [];
var marginHorizontal = 175;
var marginVertical = 100;
var backgroundColor1 = '#ffffff';
var isMouseDown = false;
var startx, starty;
var polygonPoints = new Array();
var splinePoints = [];
var isDrawingPolygon = false;
var textMessage;
var isDraggindDone = false;
var lineWidth = 1;
var borderWidth = 1;
var eraserSize = 3;
var trianglesides = 3;
var colorType = "stroke";
var strokeColor = '#000000';
var fillColor = "#ffffff";
var cornerradius = 1;
var textFontSize = 18;
var textFontFamily = 'Calibri';
var stage;
var layer;
var isMouseDownResize = false;
var lineStyleDraw = 'simple';
var lineCapStyle = 'round';
var imageName = 'rf.jpg';
var opacityVal = 1;
var wedgeAngle = 0;
var idShapes = 200;
var testval = 204;