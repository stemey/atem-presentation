define([ //
"dojo/_base/declare",//
"./DisplayChain",//
"dojo/text!graph/config/pages.json",//
"dojo/_base/fx",//
"dojo/fx",//
'dojo/dom',//
"dojo/_base/lang",//
"dojo/_base/connect",//
"dojo/hash",//
'./SourcePage', //
'./AgendaPage', //
'./GraphPage', //
'./HtmlPage' ], //
function(declare, DisplayChain, pagesAsJson, fx, coreFx, dom, lang, connect, hash) {

	declare("graph.PageViewer", DisplayChain, {
		constructor : function(/* Object */kwArgs) {
			lang.mixin(this, kwArgs);
			this.displayInitially=true;
		},
		start : function(holder) {
			this.views = dojo.fromJson(pagesAsJson);
			this.displayHashedView();
			dojo.connect(this.currentHolder, "click", lang.hitch(this, "next"));
			dojo.connect(this.nextHolder, "click", lang.hitch(this, "next"));
			dojo.connect(document, "keydown", lang.hitch(this, "onArrow"));
		},
		onArrow : function(event) {
			event.stopPropagation();
			event.preventDefault;
			console.log("event "+event.keyCode);	
			if (event.keyCode == dojo.keys.LEFT_ARROW) {
				this.previous();
			} else if (event.keyCode == dojo.keys.RIGHT_ARROW) {
				this.next();
			}
			return null;
		}
	});
	return graph.PageViewer;
});