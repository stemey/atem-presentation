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
		padding : 50,
		fontSize : 25,
		font : null,
		constructor : function(/* Object */kwArgs) {
			lang.mixin(this, kwArgs);
		},
		dispose : function() {
			this.holder.clear()
		},
		display : function(holder, cb) {
			this.holder = holder;
			var dialog = holder.createGroup();
			var transform = dojox.gfx.matrix.translate(this.x, this.y);
			dialog.applyTransform(transform);
			dialog.rawNode.classList.add(this.styleClass);
			var rect = dialog.createRect({
				width : config.width - this.padding,
				height : this.height
			});
			rect.setStroke({
				color : "black"
			});
			rect.setFill({
				color : "white"
			});
			var text = dialog.createText({
				x : this.margin + this.padding,
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

			if (this.ref != null) {
				var id = window.shapeNames[this.ref];
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
					if (this.refAttributes != null) {
						var index = 0;
						var arrayIndex = 0;
						array.forEach(node.children, function(e) {
							if (e.shape.type == "text") {
								if (index == this.refAttributes[arrayIndex]) {
									e.setStroke({
										color : "red"
									});
									arrayIndex++;
								}
								index++;
							}
						}, this)
					}
				}
			}
			cb();

		}
	});
});