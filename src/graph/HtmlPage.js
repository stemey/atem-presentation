define([ 'dojo/_base/lang',//
"dojo/_base/declare",//
"dojo/dom-construct",//
'dojox/gfx',//
'graph/dot',//
'dojo/dom',//
"dojo/text!graph/pages/welcome.html",//
"dojo/_base/fx",//
"dojo/text",//
'dojox/gfx/utils' ], //
function(lang, declare, domContruct) {

	declare("graph.HtmlPage", null, {
		constructor : function(/* Object */kwArgs) {
			lang.mixin(this, kwArgs);
		},
		snippet : null,
		display : function(holder,callback) {
			holder.style.opacity = 0;
			this.holder=holder;
			var htmlAsText = dojo.cache("graph.pages", this.snippet);
			holder.innerHTML = htmlAsText;
			callback();
		},
		dispose:function() {
			this.holder.innerHTML="";
			this.holder=null;
		}
	});
});