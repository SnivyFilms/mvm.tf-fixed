function Notifiable()
{
//	this.notifyList = new Object();
	return this;
};
/*
Call all notifications matching the event
@param event		event to broadcast
@param params 		params to pass to callback
@return				this
*/
Notifiable.prototype.notifyAll = function(event, params) {
	this._checkProp();
	for (var i in this.notifyList) {
		var n = this.notifyList[i];
		if (n.event == event) {
//			n.element[n.callback](params);		
			n.callback(params);
		}
	}
	return this;
};
/*
Add notification. Element will be notified
@param element	element to notify
@return				this
*/
Notifiable.prototype.addNotification = function(/*element, */event, callback) {
	this._checkProp();
	var n = new Object();
	//n.element = element;
	n.event = event;
	n.callback = callback;
	this.notifyList.push(n);
	return this;
};
/*
Remove notification
@param element	element to remove
@return			this
*/
Notifiable.prototype.removeNotification = function(element) {
	this._checkProp();
//TODO
	return this;
};
/*
Check if notify list is present. Creates it if necessary
*/
Notifiable.prototype._checkProp = function() {
	if (this.notifyList == undefined) {
		this.notifyList = new Array();
	}
};

