define([ //
"dojo/_base/declare",//
"dojo/text!graph/config/pages.json",//
"dojo/_base/fx",//
"dojo/fx",//
'dojo/dom',//
"dojo/_base/lang",//
"dojo/_base/connect",//
"./Navigation",//
"dojo/hash",//
"dojo/io-query" ], //
function(declare, pagesAsJson, fx, coreFx, dom, lang, connect, navigation, hash, ioQuery) {

	declare("graph.DisplayChain", null, {
		currentHolder : null,
		nextHolder : null,
		views : null,
		currentView : null,
		oldView : null,
		viewIndex : -1,
		busy:false,
		navStateId : null,
		displayInitially:false,
		constructor : function(/* Object */kwArgs) {
			lang.mixin(this, kwArgs);
		},
		constructor : function() {
			dojo.connect(this.currentHolder, "click", lang.hitch(this, "next"));
			dojo.connect(this.nextHolder, "click", lang.hitch(this, "next"));
			dojo.subscribe("graph/navigation", this, dojo.hitch(this, "displayHashedView"));
		},
		displayHashedView : function() {
			var newIndex = this.viewIndex;
			var newHash = hash();
			var newViewIndex = navigation.getNav(this.navStateId);
			if (newViewIndex == "" || newViewIndex == null) {
				if (!this.displayInitially) {
					this.oldView=this.currentView;
					this.currentView=null;
					this.onShowView();
					return;
				}
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
			if (this.busy) {
				return;
			}
			// maybe the current view has subviews to display first
			if (this.currentView!=null && this.currentView.next && this.currentView.next()) {
				return true;
			}
			if (this.currentView==null) {
				this.viewIndex=-1;
			}
			if (this.views.length > this.viewIndex + 1) {
				navigation.setNav(this.navStateId,this.viewIndex+1);
				navigation.navigate();
				return true;
			} else {
				navigation.removeNav(this.navStateId);
				return false;
			}
		},		previous : function() {
			// maybe the current view has subviews to display first
			if (this.busy) {
				return;
			}
			if (this.currentView != null && this.currentView.previous && this.currentView.previous()) {
				return true;
			}
			if (this.currentView == null) {
				this.viewIndex = -1;
			}
			if (this.viewIndex - 1 >= 0) {
				navigation.setNav(this.navStateId, this.viewIndex - 1);
				navigation.navigate();
				return true;
			} else {
				console.log("remove nav "+this.navStateId);	
				navigation.removeNav(this.navStateId);
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
			this.busy=true;
			anim.play();
		},
		onAnimationEnd : function() {
			this.swapViews();
			this.busy=false;

		},
		swapViews : function() {
			console.log("old "+this.currentHolder.id+" "+this.currentHolder.innerHTML);
			console.log("new "+this.nextHolder.id+" "+this.nextHolder.innerHTML);
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
