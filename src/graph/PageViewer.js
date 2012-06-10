define([ //
"dojo/_base/declare",//
"./DisplayChain",//
"dojo/text!graph/pages/pages.json",//
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
			dojo.connect(this.currentHolder,"click",lang.hitch(this,"next"));
			dojo.connect(this.nextHolder,"click",lang.hitch(this,"next"));
		}
	});
	return graph.PageViewer;
});