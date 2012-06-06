
YUI.namespace("SIM");

YUI({filter:"DEBUG"}).use('anim', function(Y) {


YUI.SIM.installBehaviors = function(Y) {
     Y.Anim.behaviors.translate = {
         set :function(anim, att, from, to, elapsed, duration, fn, unit) {
                var froms = from.split(",");
                var tos = to.split(",");
				var node = anim._node,
					 valx = fn(elapsed, parseInt(froms[0]), parseInt(tos[0]) - parseInt(froms[0]), duration),
					 valy = fn(elapsed, parseInt(froms[1]), parseInt(tos[1]) - parseInt(froms[1]), duration);

				var transform = node.getAttribute("transform");
				var t = transform.replace(/translate([^)]*)/,"translate("+valx+","+valy);
				node.setAttribute("transform", t);
		    },
			get : function(anim, att) {
				var node = anim._node,
					val = '';

				return 10;//node.getAttribute("transform");
			}
		}
     Y.Anim.behaviors.scale = {
         set :function(anim, att, from, to, elapsed, duration, fn, unit) {
               var node = anim._node,
					 val = fn(elapsed, parseFloat(from), parseFloat(to) - parseFloat(from), duration);

				var transform = node.getAttribute("transform");
				var t = transform.replace(/scale([^)]*)/, "scale("+val);
				node.setAttribute("transform", t);
		    },
			get : function(anim, att) {
				var node = anim._node,
					val = '';

				return 10;
			}
		}

}
 
 



	YUI.SIM.setDisplayInverse = function(group,value) {
	    var children= Y.one("#viewport").get("childNodes");
	    children.each(function(e) {
	       if (e._node.id!="genericDefs" && e._node.nodeType==1 && e._node.getAttribute("class")!=group) {
		e.setStyle("display",value);

	       }

	    });
	}
	YUI.SIM.setDisplay = function(group,value) {
	    var children= Y.one("#viewport").get("childNodes");
	    children.each(function(e) {
	       if (e._node.id!="genericDefs" && e._node.nodeType==1 && e._node.getAttribute("class")==group) {
		e.setStyle("display",value);

	       }

	    });
	}
	
	YUI.SIM.showAll = function() {
	Y.one("#viewport").setStyle("display","block");
	}
	YUI.SIM.hideAll = function() {
	Y.one("#viewport").setStyle("display","none");
	}


	YUI.SIM.AnimationChain = function(config)
	{
		this.index=0;
		this.animations=config.animations;

	}

	YUI.SIM.AnimationChain.prototype.run = function() {
		if (!this.isFinished()) {
		   this.animations[this.index]();
		   this.index++;
		   }
		}

	YUI.SIM.AnimationChain.prototype.isFinished = function() {

		   this.animations.length<this.index;
		}
		
	YUI.SIM.navigate = function(page) {return function(){
				var path = document.location.href.substring(0,document.location.href.lastIndexOf("/")+1);
				document.location.href = path+page;	
				}};

});
