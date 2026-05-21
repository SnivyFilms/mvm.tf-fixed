(function(){
var $ = function (param)
{
	return new f(param);
};

var f = function (param) {
	if (param == undefined) return this;
	
	if (param!=undefined) {
		// Handle plugins
		if (this.plugins[param]!=undefined) {
			return this.plugins[param];
		}
	}
	return undefined;
};
/*
Initialization of the class
*/
f.prototype.initialize = function() {
	if (typeof $.initialized == "undefined")
	{
		this.plugins = new Object();
		
		$.initialized = true;
	}
};
f.prototype.initialize();
/*
Register a plugin
*/
f.prototype.registerPlugin = function(name, className) {
	if (this.plugins[name]==undefined) {
		this.plugins[name] = className;
	}
	else {
		alert("Plugin " + name + " already registered");
	}
};
/*
Insure if a plugin is present
@pluginName		Name of the plugin to check
@return 		True if the plugin is present, false otherwise
*/
f.prototype.insurePresent = function(pluginName) {
	if (this.plugins[name]==undefined) {
		return false;
	}
	return true;
};

/*
Inherit a class from another
Add prototype list of parentClass in prototype list of className
@param className	name of the child class
@param parentClass	name of the class to inherit from
@param override		whether or not overwrite existing prototypes in child class. 
					default is false
*/
f.prototype.inherit = function(className, parentClass, override) {
	if (className == undefined) return;
	if (parentClass == undefined) return;
	if (className.prototype == undefined) return;
	if (parentClass.prototype == undefined) return;
	if (override == undefined) override = false;
	
	
	for (var i in parentClass.prototype) {
		if (override || className[i] == undefined) {
			className.prototype[i] = parentClass.prototype[i];
		}
	}
	
	for (var i in parentClass) {
		if (override || className[i] == undefined) {
			className[i] = parentClass[i];
		}
	}
	className.prototype.constructor1 = className.constructor;
	className.prototype.constructor = function() {
		parentClass.prototype.constructor();
		className.prototype.constructor1();
	}
	
	
};
f.prototype.extend = function(subClass) {
	var supersList = [];
	var single = function(sub, superClass){
		var thinF = function(){};
		thinF.prototype = superClass.prototype;
		sub.prototype = new thinF();
		sub.prototype.constructor = sub;
		sub.superClass = superClass.prototype;
		if( superClass.prototype.constructor == Object.prototype.constructor ){
			superClass.prototype.constructor = superClass;
		}
	}

	var multi = function(sub, superClass){
		sub.prototype.constructor.extended = {};
		var proto = superClass.prototype;
		for( var f in proto ){
			if( f != "constructor" && typeof proto[f] == "function" ){
				if( sub.prototype[f] == undefined ){
					var a = function(l) {
						sub.prototype[l] = function(){
							//logMessage(new Message("Call subclass fn " + l, MessageManager.DEBUG));
							return proto[l].apply(this,arguments);
						}
						sub.prototype.constructor.extended[l] = function(){
							//logMessage(new Message("Call constructor " + l, MessageManager.DEBUG));
							return proto.constructor.apply(this,arguments);
						}
					}
					a(f);
				}
			}
		}
	}

	if( arguments.length < 2 ) return;
	//single(subClass,arguments[1]);
//	supersList.push(arguments[1]);
	for( var i=1; i<arguments.length;i++){
		multi(subClass,arguments[i]);
		supersList.push(arguments[i]);
	}
	
	subClass.prototype._constructor = subClass.prototype.constructor;
	subClass.prototype.constructor = function(){
	
		return subClass._constructor.apply(this,arguments);
		
	}
	
	subClass.prototype.callSuper = function(fnc){
		var len = supersList.length;
		for( var i=0;i<len;i++){
			var superClass = supersList[i];
			if( (fnc in  superClass.prototype) && (typeof superClass.prototype[fnc] == "function") ){
				return superClass.prototype[fnc].apply(this,[].splice.call(arguments,1));
			}
		}
		return null;
	}
	
	
};
	window.$ = $;
})();
