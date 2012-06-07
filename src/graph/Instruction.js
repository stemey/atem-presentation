define([ 'dojo/_base/lang',//
"dojo/_base/declare",//
"dojo/_base/array",//
"graph/Config",//
"dojo/dom-construct",//
'dojox/gfx',//
'graph/dot',//
'dojo/dom',//
"dojo/text!graph/pages/welcome.html",//
"dojo/_base/fx",//
"dojo/text",//
'dojox/gfx/utils' ], //
function(lang, declare, array, config) {

	declare("graph.Instruction", null, {
		styleClass : "instruction",
		margin : 50,
		x : 50,
		y : 50,
		height : 100,
		width : 500,
		fontSize : 25,
		attributes : [],
		font : null,
		constructor : function(/* Object */kwArgs) {
			lang.mixin(this, kwArgs);
		},
		dispose : function() {
			this.holder.clear();
			dojo.forEach(this.attributes, function(e) {
				this.dehighlightAttribute(e);
			}, this);
			this.attributes = null;
		},
		highlightAttribute : function(attribute) {
			attribute.node.rawNode.classList.add("highlightAttribute");
		},
		dehighlightAttribute : function(attribute) {
			attribute.node.rawNode.classList.remove("highlightAttribute");
		},
		display : function(holder, cb) {
			this.holder = holder;
			var dialog = holder.createGroup();
			var transform = dojox.gfx.matrix.translate(this.x, this.y);
			dialog.applyTransform(transform);
			dialog.rawNode.classList.add(this.styleClass);

			this.drawLines(dialog);
			
			var rect = dialog.createRect({
				width : this.width,
				height : this.height
			});
			rect.setStroke({
				color : "black"
			});
			rect.setFill({
				color : "white"
			});
			var text = dialog.createText({
				x : this.margin,
				y : this.height - this.margin,
				text : this.text
			});
			text.setStroke({
				color : "black",
			});
			text.setFill("black");
			text.setFont({
				size : this.fontSize
			});

			cb();

		},
		drawLines : function(dialog) {
			if (this.ref != null) {
				var id = window.shapeNames[this.ref];
				var node = dojox.gfx.shape.byId(id);
				if (node != null) {
					var bb = node.children[0].getTransformedBoundingBox();
					var matrix = this.holder.parentMatrix;

					var line = dialog.createLine({
						x1 : this.width / 2,
						y1 : this.height / 2,
						x2 : (bb[0].x + bb[3].x) / 2 - this.x - matrix.dx,
						y2 : (bb[0].y + bb[3].y) / 2 - this.y - matrix.dy
					});
					line.setStroke({
						color : "red",
						style : "solid",
						width : 3
					});
					this.edges = [];
					if (this.refAttributes != null) {
						var index = 0;
						var arrayIndex = 0;
						array.forEach(node.children, function(e) {
							if (e.shape.type == "text") {
								if (index == this.refAttributes[arrayIndex]) {
									var attribute = {
										node : e
									};
									this.attributes.push(attribute);
									this.highlightAttribute(attribute);
									arrayIndex++;
								}
								index++;
							}
						}, this)

					}
				}
			}
		}
	});
});
