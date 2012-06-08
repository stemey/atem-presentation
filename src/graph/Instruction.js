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
			this.drawLines(rect,dialog);
			text.moveToFront();

			cb();

		},
		getShortestLine: function(bb1,bb2) {
			var minDist;
			var line={};
			for (var i=0;i<4;i++) {
				for (var j=0;j<4;j++) {
					var dist=(bb1[i].x-bb2[j].x)*(bb1[i].x-bb2[j].x)+(bb1[i].y-bb2[j].y)*(bb1[i].y-bb2[j].y);
					if (minDist==null || dist<minDist) {
						minDist=dist;
						line.start=bb1[i];
						line.end=bb2[j];
					}
				}				
			}	
			return line;
		},	
		getCorners: function(bb1) {
			var points1=[{},{},{},{}];
			points1[0].x=(bb1[0].x+bb1[1].x)/2;
			points1[0].y=bb1[0].y;
			points1[1].x=bb1[1].x;
			points1[1].y=(bb1[1].y+bb1[2].y)/2;
			points1[2].x=(bb1[2].x+bb1[3].x)/2;
			points1[2].y=bb1[3].y;
			points1[3].x=bb1[0].x;
			points1[3].y=(bb1[3].y+bb1[0].y)/2;
			return points1;
		},	
		isValid : function(cornerIndex,dx,dy) {
			if (cornerIndex==0 && dy>0) {
				return false;
			}	
			if (cornerIndex==1 && dx<0) {
				return false;
			}	
			if (cornerIndex==2 && dy<0) {
				return false;
			}	
			if (cornerIndex==3 && dx>0) {
				return false;
			}	
			return true;
		},
		getShortestLine2: function(bb1,bb2) {
			var minDist;
			var line={};
			var corners1=this.getCorners(bb1);
			var corners2=this.getCorners(bb2);
			for (var i=0;i<4;i++) {
				for (var j=0;j<4;j++) {
					var dx=corners1[i].x-corners2[j].x;
					var dy=corners1[i].y-corners2[j].y;
					var dist=(dx)*(dx)+(dy)*(dy);
					if (minDist==null || dist<minDist) {
						if (!this.isValid(i,-dx,-dy)) {
							continue;	
						}
						if (!this.isValid(j,dx,dy)) {
							continue;	
						}
						minDist=dist;
						line.start=corners1[i];
						line.end=corners2[j];
					}
				}				
			}	
			return line;
		},	
		drawLines : function(rect,dialog) {
			if (this.ref != null) {
				var id = window.shapeNames[this.ref];
				var node = dojox.gfx.shape.byId(id);
				if (node != null) {
					var bb = node.children[0].getTransformedBoundingBox();
					
					var lineDef=this.getShortestLine2(bb,rect.getTransformedBoundingBox());
					

					var line = dialog.createLine({
						x1 : lineDef.start.x - rect.getTransformedBoundingBox()[0].x,
						y1 : lineDef.start.y - rect.getTransformedBoundingBox()[0].y,
						x2 : lineDef.end.x - rect.getTransformedBoundingBox()[0].x,
						y2 : lineDef.end.y - rect.getTransformedBoundingBox()[0].y
					});
					line.setStroke({
						color : "red",
						style : "solid",
						width : 3
					});
					line.rawNode.classList.add("instruction");
					//does not seem to work
					line.moveToBack();
					line.moveToBack();
					line.moveToBack();
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
