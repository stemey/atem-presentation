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

	declare("graph.PageViewer", null, {
		currentPageHolder : null,
		nextPageHolder : null,
		pages : null,
		pageIndex : -1,
		constructor : function(/* Object */kwArgs) {
			lang.mixin(this, kwArgs);
		},
		start : function(holder) {
			this.pages = dojo.fromJson(pagesAsJson);
			this.displayHashedPage();
			page.display(this.nextPageHolder, lang.hitch(this, "onDisplay"));
			dojo.connect(this.currentPageHolder, "click", lang.hitch(this,
					"next"));
			dojo
					.connect(this.nextPageHolder, "click", lang.hitch(this,
							"next"));
			connect.subscribe("/dojo/hashchange", this, dojo.hitch(this,
					"displayHashedPage"));
		},
		displayHashedPage : function() {
			var newIndex = this.pageIndex;
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
				this.pageIndex = newIndex;
				this.showPage();
			}
		},
		createPage : function(pageDef) {
			var type = lang.getObject(pageDef.type);
			return new type(pageDef);
		},
		next : function() {
			if (this.pages.index.length > this.pageIndex + 1) {
				this.pageIndex++;
				this.showPage();
				hash("" + this.pageIndex);
			}
		},
		showPage : function() {
			var pageDef = this.pages.index[this.pageIndex];
			page = this.createPage(pageDef);
			this.nextPageHolder.style.opacity = 0;
			page.display(this.nextPageHolder, dojo.hitch(this, "onDisplay"));
		},
		onDisplay : function() {
			var f1 = fx.fadeIn({
				node : this.nextPageHolder
			});
			var f2 = fx.fadeOut({
				node : this.currentPageHolder
			});
			coreFx.combine([ f1, f2 ]).play();
			this.swapPages();
			this.nextPageHolder.innerHTML = "";
		},
		swapPages : function() {
			var tmpPageHolder = this.currentPageHolder;
			this.currentPageHolder = this.nextPageHolder;
			this.nextPageHolder = tmpPageHolder;
		}
	});
});