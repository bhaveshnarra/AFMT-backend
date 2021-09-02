var draw2d = require('draw2d');

var canvas = new draw2d.Canvas("gfx_holder");

// Create two standard nodes for "start" and "end" and link
// this figures with a standard Connector
//
var start = new draw2d.shape.node.Start();
var end = new draw2d.shape.node.End();

canvas.addFigure(start, 80, 180);
canvas.addFigure(end, 450, 250);

// Add a connection via API calls between Start and Stop
//
var connection = new draw2d.Connection();
connection.setSource(start.getOutputPort(0));
connection.setTarget(end.getInputPort(0));
canvas.addFigure(connection);