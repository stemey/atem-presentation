//>>built
define("graph/dot", ["dojo/_base/kernel","dojo/_base/lang","dojo/_base/html","dojo/_base/array", "dojo/_base/window", "dojo/_base/json", 
	"dojo/_base/Deferred", "dojo/_base/sniff", "require","dojo/_base/config"], 
  function(kernel, lang,  html, arr, win, jsonLib, Deferred, has, require, config){
	graph = {};
var gu = graph.dot={};
	/*===== g= dojox.gfx; gu = dojox.gfx.utils; =====*/

	lang.mixin(gu, {
		forEach: function(
			/*dojox.gfx.Surface|dojox.gfx.Shape*/ object,
			/*Function|String|Array*/ f, /*Object?*/ o
		){
			// summary:
			//		Takes a shape or a surface and applies a function "f" to in the context of "o" 
			//		(or global, if missing). If "shape" was a surface or a group, it applies the same 
			//		function to all children recursively effectively visiting all shapes of the underlying scene graph.
			// object : The gfx container to iterate.
			// f : The function to apply.
			// o : The scope.
			o = o || win.global;
			f.call(o, object);
			if(object instanceof g.Surface || object instanceof g.Group){
				arr.forEach(object.children, function(shape){
					gu.forEach(shape, f, o);
				});
			}
		},

	
		deserialize: function(
			/* dojox.gfx.Surface|dojox.gfx.Shape */ parent,
			/* dojox.gfx.Shape|Array */ object
		){
			// summary:
			//		Takes a surface or a shape and populates it with an object produced by serialize().
			if(object instanceof Array){
				return arr.map(object, lang.hitch(null, gu.deserialize, parent));	// Array
			}
			var shape = ("shape" in object) ? parent.createShape(object.shape) : parent.createGroup();
			if("transform" in object){
				shape.setTransform(object.transform);
			}
			if("stroke" in object){
				shape.setStroke(object.stroke);
			}
			if("fill" in object){
				shape.setFill(object.fill);
			}
			if("font" in object){
				shape.setFont(object.font);
			}
			if("children" in object){
				arr.forEach(object.children, lang.hitch(null, gu.deserialize, shape));
			}
			if("name" in object){
				if (!window.shapeNames) {
					window.shapeNames={};
				}
				window.shapeNames[object.name]=shape.getUID();
			}
			return shape;	// dojox.gfx.Shape
		},

		fromJson: function(
			/* dojox.gfx.Surface|dojox.gfx.Shape */ parent,
			/* String */ json){
			// summary:
			//		Works just like deserialize() but takes a JSON representation of the object.
			return gu.deserialize(parent, jsonLib.fromJson(json));	// Array || dojox.gfx.Shape
		}

	});

	return gu;
});
