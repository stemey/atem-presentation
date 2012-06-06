define([ //
"dojo/_base/declare",//
"dojo/text!graph/pages/pages.json",//
"dojo/_base/fx",//
"dojo/fx",//
'dojo/dom',//
"dojo/_base/lang",//
"dojo/_base/connect",//
"dojo/hash",//
"dojo/io-query" ], //
function(declare, pagesAsJson, fx, coreFx, dom, lang, connect, hash, ioQuery) {

	declare("graph.DisplayChain", null, {
		currentHolder : null,
		nextHolder : null,
		views : null,
		currentView : null,
		oldView : null,
		viewIndex : -1,
		navStateId : null,
		constructor : function(/* Object */kwArgs) {
			lang.mixin(this, kwArgs);
		},
		constructor : function() {
			dojo.connect(this.currentHolder, "click", lang.hitch(this, "next"));
			dojo.connect(this.nextHolder, "click", lang.hitch(this, "next"));
			connect.subscribe("/dojo/hashchange", this, dojo.hitch(this, "displayHashedView"));
		},
		displayHashedView : function() {
			var newIndex = this.viewIndex;
			var newHash = hash();
			var navState = ioQuery.queryToObject(hash());
			var newViewIndex = navState[this.navStateId];
			if (newViewIndex == "" || newViewIndex == null) {
				newIndex = 0;
			} else {
				try {
					newIndex = parseInt(newViewIndex);
				} catch (e) {

				}
			}
			if (newIndex != this.viewIndex) {
				this.viewIndex = newIndex;
				this.showView();
			}
		},
		createView : function(viewDef) {
			var type = lang.getObject(viewDef.type);
			return new type(viewDef);
		},
		next : function() {
			// maybe the current view has subviews to display first
			if (this.currentView.next && this.currentView.next()) {
				return true;
			}
			if (this.views.length > this.viewIndex + 1) {
				this.viewIndex++;
				this.showView();
				var navState = ioQuery.queryToObject(hash());
				navState[this.navStateId] = this.viewIndex;
				hash(ioQuery.objectToQuery(navState));
				return true;
			} else {
				var navState = ioQuery.queryToObject(hash());
				delete navState[this.navStateId];
				hash(ioQuery.objectToQuery(navState));
				return false;
			}
		},
		showView : function() {
			var viewDef = this.views[this.viewIndex];
			this.oldView = this.currentView;
			this.currentView = this.createView(viewDef);
			this.currentView.display(this.nextHolder, dojo.hitch(this, "onShowView"));
		},
		onShowView : function() {
			var f1 = fx.fadeIn({
				node : this.nextHolder
			});
			var f2 = fx.fadeOut({
				node : this.currentHolder
			});
			var anim = coreFx.combine([ f1, f2 ]);
			dojo.connect(anim, "onEnd", dojo.hitch(this, "onAnimationEnd"));
			anim.play();
		},
		onAnimationEnd : function() {
			this.swapViews();

		},
		swapViews : function() {
			var tmpHolder = this.currentHolder;
			this.currentHolder = this.nextHolder;
			this.nextHolder = tmpHolder;
			if (this.oldView) {
				this.oldView.dispose();
			}
		}
	});
	return graph.DisplayChain;
});