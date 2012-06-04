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
			
			cb();
		}
	});
});