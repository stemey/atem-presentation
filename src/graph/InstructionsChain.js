define([ //
"dojo/_base/declare",//
"./DisplayChain",//
"dojo/text!graph/pages/pages.json",//
"dojo/_base/fx",//
"dojo/fx",//
'dojo/dom',//
"dojo/_base/lang",//
"dojo/_base/connect",//
"dojo/hash"
 ], //
function(declare, DisplayChain, pagesAsJson, fx, coreFx, dom, lang, connect, hash) {

	declare("graph.InstructionsChain", DisplayChain, {
		constructor : function(/* Object */kwArgs) {
			lang.mixin(this, kwArgs);
			this.navStateId="in";
		},
		start : function(holder) {
			this.displayHashedView();
		},
		onShowView : function() {
			this.swapViews();
		},

	});
	return graph.PageViewer;
});