define([ 'dojo/_base/lang',//
"dojo/_base/declare",//
"dojo/query",//
"dojo/dom-class",//
'dojox/gfx',//
'graph/dot',//
'dojo/dom',//
"dojo/text!graph/pages/welcome.html",//
"dojo/_base/fx",//
"dojo/text",//
'dojox/gfx/utils' ], //
function(lang, declare, query, domClass) {

	declare("graph.AgendaPage", null, {
		constructor : function(/* Object */kwArgs) {
			lang.mixin(this, kwArgs);
		},
		index : 0,
		snippet : null,
		display : function(holder, callback) {
			holder.style.opacity = 0;
			this.holder = holder;
			var htmlAsText = dojo.cache("graph.pages", this.snippet);
			holder.innerHTML = htmlAsText;
			if (this.index > 0) {
				domClass.add(query(".agendaPoints h1")[this.index - 1],
						"currentAgendaPoint");
			}
			callback();
		},
		dispose : function() {
			this.holder.innerHTML = "";
			this.holder = null;
		}
	});
});