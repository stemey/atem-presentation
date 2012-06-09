define([ 'dojo/_base/lang',//
"dojo/_base/declare",//
"dojo/query",//
"dojo/NodeList-dom",//
'graph/dot'//
], //
function(lang, declare, query) {

	declare("graph.SourcePage", null, {
		constructor : function(/* Object */kwArgs) {
			lang.mixin(this, kwArgs);
		},
		lineCount:0,
		currentLineNumber:0,
		title:"none",
		snippet : null,
		display : function(holder,callback) {
			holder.style.opacity = 0;
			this.holder=holder;
			var code = dojo.cache("graph.code", this.snippet);
			//holder.innerHTML = "<pre class='brush :java'>"+code+"</pre>";
			holder.innerHTML = "<div class='source'><h1>"+this.title+"</h1><script type='syntaxhighlighter' class='brush: java'><![CDATA["+code+"]]></script></div>";
			SyntaxHighlighter.highlight({toolbar:false,"class-name":"source"},holder);
			this.lineCount=query("td.code .line",holder).length;
			callback();
		},
		next: function() {
			if (this.currentLineNumber<this.lineCount) {
				if (this.currentLineNumber>0) {
					query(".number"+this.currentLineNumber,this.holder).removeClass("highlighted");
				}
				this.currentLineNumber++;
				query(".number"+this.currentLineNumber,this.holder).addClass("highlighted");
				return true;
			}else{
				return false;
			}
		},
		dispose:function() {
			this.holder.innerHTML="";
			this.holder=null;
		}
	});
});