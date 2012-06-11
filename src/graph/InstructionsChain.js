define([ //
"dojo/_base/declare",//
"./DisplayChain",//
"dojo/text!graph/config/pages.json",//
"dojo/_base/fx",//
"dojo/fx",//
'dojo/dom',//
"dojo/_base/lang",//
"dojo/_base/connect",//
"dojo/hash" ], //
function(declare, DisplayChain, pagesAsJson, fx, coreFx, dom, lang, connect, hash) {

	declare("graph.InstructionsChain", DisplayChain, {
		constructor : function(/* Object */kwArgs) {
			lang.mixin(this, kwArgs);
			this.navStateId = "in";
		},
		start : function(holder) {
			this.displayHashedView();
		},
		showView : function() {
			var viewDef = this.views[this.viewIndex];
			this.oldView = this.currentView;
			try {
				this.currentView = this.createView(viewDef);
			} catch (e) {
				console.log("   " + this.views);
			}

			if (this.oldView != null) {
				this.oldView.dispose();
			}
			this.currentView.display(this.nextHolder, dojo.hitch(this, "onShowView"));
			var tmpHolder = this.currentHolder;
			this.currentHolder = this.nextHolder;
			this.nextHolder = tmpHolder;

		},
		onShowView : function() {

		}

	});
	return graph.PageViewer;
});