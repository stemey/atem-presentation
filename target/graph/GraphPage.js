define([ "dojo/_base/declare",//
'dojo/_base/lang',//
"dojo/_base/array",//
'dojo/query',//
'./Config',//
'dojox/gfx',//
'graph/dot',//
"dojo/_base/fx",//
"dojo/dom-construct",//
"./InstructionsChain",//
"./Instruction",//
"dojo/dom-construct",//
'dojox/gfx/utils' ], //
function(declare, lang, array, query, config) {

	declare("graph.GraphPage", null, {
		graph : null,
		matrix : null,
		subChain : null,
		constructor : function(/* Object */kwArgs) {
			lang.mixin(this, kwArgs);
		},
		next : function() {
			if (this.subChainInstance != null && this.subChainInstance.next()) {
				return true;
			} else {
				return false;
			}
		},
		display : function(holder, cb) {
			this.holder=holder;
			holder.style.opacity = 0;
			var graphAsJson = dojo.cache("graph.pages", this.graph);
			// somehow the scaling affets also the svg canvas size.
			var surface = dojox.gfx.createSurface(holder, 2000,2000);
			var canvas = surface.createGroup();
			var marginTransform = new dojox.gfx.matrix.translate({x:config.margin,y:config.margin});
			var scaleTransform = new dojox.gfx.matrix.scale(config.scale);
			canvas.applyTransform(marginTransform);
			canvas.applyTransform(scaleTransform);
			
			// Write JSON to group
			var group = canvas.createGroup();
			graph.dot.fromJson(group, graphAsJson);
			if (this.matrix != null) {
				var transform = new dojox.gfx.Matrix2D(this.matrix);
				group.applyTransform(transform);
			}
			if (this.subChain != null) {
				var subGroup1= canvas.createGroup();
				var subGroup2= canvas.createGroup();
				this.subChainInstance = new lang.getObject(this.subChain.type)(this.subChain);
				this.subChainInstance.nextHolder=subGroup1;
				this.subChainInstance.currentHolder=subGroup2;
				this.subChainInstance.start();
			}

			cb();
		},
		dispose : function() {
			this.holder.innerHTML="";
			this.holder=null;
		}
	});
});