define([ //
"dojo/_base/declare",//
"dojo/text!graph/pages/pages.json",//
"dojo/_base/fx",//
"dojo/fx",//
'dojo/dom',//
"dojo/_base/lang",//
"dojo/_base/connect",//
"dojo/hash",//
'./GraphPage', //
'./HtmlPage' ], //
function(declare, pagesAsJson, fx, coreFx, dom, lang, connect, hash) {

	declare("graph.DisplayChain", null, {
		currentHolder : null,
		nextHolder : null,
		views : null,
		viewIndex : -1,
		constructor : function(/* Object */kwArgs) {
			lang.mixin(this, kwArgs);
		},
		start : function(holder) {
			dojo.connect(this.currentHolder, "click", lang.hitch(this,
					"next"));
			dojo
					.connect(this.nextHolder, "click", lang.hitch(this,
							"next"));
			connect.subscribe("/dojo/hashchange", this, dojo.hitch(this,
					"displayHashedPage"));
		},
		displayHashedView : function() {
			var newIndex = this.viewIndex;
			var newHash = hash();
			if (newHash == "") {
				newIndex = 0;
			} else {
				try {
					newIndex = parseInt(hash());
				} catch (e) {

				}
			}
			if (newIndex != this.pageIndex) {
				this.viewIndex = newIndex;
				this.showView();
			}
		},
		createView : function(viewDef) {
			var type = lang.getObject(viewDef.type);
			return new type(viewDef);
		},
		next : function() {
			if (this.pages.index.length > this.pageIndex + 1) {
				this.pageIndex++;
				this.showPage();
				hash("" + this.pageIndex);
			}
		},
		showView : function() {
			var viewDef = this.views.index[this.viewIndex];
			view = this.createView(viewDef);
			this.nextHolder.style.opacity = 0;
			view.display(this.nextHolder, dojo.hitch(this, "onShowView"));
		},
		onShowView : function() {
			var f1 = fx.fadeIn({
				node : this.nextHolder
			});
			var f2 = fx.fadeOut({
				node : this.currentHolder
			});
			coreFx.combine([ f1, f2 ]).play();
			this.swapViews();
		},
		clear: function(holder) {
			this.holder.innerHTML = "";
		},
		swapViews : function() {
			var tmpHolder = this.currentHolder;
			this.currentHolder = this.nextHolder;
			this.nextHolder = tmpHolder;
		}
	});
});