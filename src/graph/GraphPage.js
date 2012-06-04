define([ "dojo/_base/declare",//
'dojo/_base/lang',//
'dojox/gfx',//
'graph/dot',//
'dojo/dom',//
"dojo/_base/fx",//
"dojo/dom-construct",//
'dojox/gfx/utils' ], //
function(declare, lang) {

	declare("graph.GraphPage", null, {
		graph : null,
		matrix : null,
		constructor : function(/* Object */kwArgs) {
			lang.mixin(this, kwArgs);
		},
		display : function(holder, cb) {
			var graphAsJson = dojo.cache("graph.pages", this.graph);
			var surface = dojox.gfx.createSurface(holder, 1000, 1000);
			// Write JSON to group
			var group = surface.createGroup();
			graph.dot.fromJson(group, graphAsJson);
			if (this.matrix != null) {
				var transform = new dojox.gfx.Matrix2D(this.matrix);
				group.applyTransform(transform);
			}
			var dialog = surface.createGroup();
			var transform = dojox.gfx.matrix.translate(10, 400);
			dialog.applyTransform(transform);
			var rect = dialog.createRect({
				width : 600,
				height : 100
			}).setStroke("red");
			var text = dialog.createText({
				x : 0,
				y : 0,
				text : "Hallo df sdf sdf sd f"
			});
			text.setStroke({
				color : "red"

			});

			var id = window.shapeNames.Pet;
			var node = dojox.gfx.shape.byId(id);
			var bb = node.children[0].getTransformedBoundingBox();
			var line = dialog.createLine({
				x1 : 0,
				y1 : 0,
				x2 : bb[0].x - 10,
				y2 : bb[0].y - 400
			});
			line.setStroke({
				color : "red",
				style : "solid",
				width : 3
			});
			cb();
		}
	});
});