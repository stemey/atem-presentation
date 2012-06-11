define([ 'dojo/_base/lang',//
"dojo/_base/declare",//
"dojo/text!graph/config/config.json",//
], //
function(lang, declare, configAsJson) {

	declare("graph.Config", null, {
		constructor : function(/* Object */kwArgs) {
			var configObject = dojo.fromJson(configAsJson);
			lang.mixin(this, configObject);
			lang.mixin(this, kwArgs);
		},
	});
	return new graph.Config();
});