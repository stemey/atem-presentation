define([ //
"dojo/_base/declare",//
"dojo/hash",//
"dojo/_base/connect",//
"dojo/io-query"], //
function(declare, hash, connect, ioQuery) {

	declare("graph.Navigation", null, {
		query : null,
		constructor : function() {
			connect.subscribe("/dojo/hashchange", this, dojo.hitch(this, "onHashChange"));
		},
		getNav : function(key) {
			return this.getQuery()[key];
		},
		setNav : function(key,value) {
			return this.getQuery()[key]=value;
		},
		removeNav : function(key) {
			delete this.getQuery()[key];
		},
		navigate: function() {
			hash(ioQuery.objectToQuery(this.query));
		},
		getQuery: function() {
			if (this.query==null) {
				this.query=ioQuery.queryToObject(hash());
			}
			return this.query;
		},
		onHashChange: function() {
				this.query=ioQuery.queryToObject(hash());
				dojo.publish("graph/navigation");
		}
	});
	return new graph.Navigation();
});
