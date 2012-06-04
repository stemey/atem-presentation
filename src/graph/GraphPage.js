define([ "dojo/_base/declare",//
'dojo/_base/lang',//
"dojo/_base/array",//
'dojo/query',//
'dojox/gfx',//
'graph/dot',//
"dojo/_base/fx",//
"dojo/dom-construct",//
'dojox/gfx/utils' ], //
function(declare, lang, array, query) {

	declare("graph.GraphPage", null, {
		graph : null,
		matrix : null,
		x:10,
		y:400,
		height:100,
		instructions : null,
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
			if (this.instructions != null) {
				var instruction = this.instructions[0];
				var dialog = surface.createGroup();
				var transform = dojox.gfx.matrix.translate(this.x,this.y);
				dialog.applyTransform(transform);
				var rect = dialog.createRect({
					width : 1000-this.x,
					height : this.height
				}).setStroke("red");
				var text = dialog.createText({
					x : 0,
					y : this.height,
					text : instruction.text
				});
				text.setStroke({
					color : "red",
					fill:"solid"
				});
				text.setFont({size:30});

				if (instruction.ref != null) {
					var id = window.shapeNames[instruction.ref];
					var node = dojox.gfx.shape.byId(id);
					if (node != null) {
						var bb = node.children[0].getTransformedBoundingBox();
						var line = dialog.createLine({
							x1 : 0,
							y1 : 0,
							x2 : bb[0].x - this.x,
							y2 : bb[0].y - this.y
						});
						line.setStroke({
							color : "red",
							style : "solid",
							width : 3
						});
						if (instruction.refAttributes != null) {
							var index=0;
							var arrayIndex=0;
							array.forEach(node.children, function(e) {
								if (e.shape.type=="text") {
									if (index==instruction.refAttributes[arrayIndex]) {
										e.setStroke({color:"red"});
										arrayIndex++;
									}
									index++;
								}
							})
						}
					}
				}
			}
			cb();
		}
	});
});