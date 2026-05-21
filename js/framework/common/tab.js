/**
Tab
**/
function Tab(id, params)
{
	this.create(id);
	this.activated = false;
	this.editable = false;
	this.userData = undefined;
	this.setParams(params);
	return this;
};
Tab.prototype = new Panel();

Tab.EVENT_TAB_RENAMED = "OnTabRenamed";

/*
Create HTML stuff
*/
Tab.prototype.create = function(id) {
//	this.createPanel();
	this.htmlElement = GET_OR_CREATE_ELEMENT(id, "div", null, null);
	this.htmlContent = GET_OR_CREATE_ELEMENT(null, "div", this.htmlElement, null);
	this.htmlEdit = GET_OR_CREATE_ELEMENT(null, "input", this.htmlElement, null);
//	this.htmlElement.innerHTML = "-";
	//this.htmlElement.draggable = true;
	this.htmlContent.unselectable = "on";
	
	var that = this;
	addEvent(this.htmlElement, "dragstart", function(event) {that.startDrag(event);}, false);
	addEvent(this.htmlElement, "dragend", function(event) {that.endDrag(event);}, false);
	addEvent(this.htmlElement, "click", function(event) {that.onClick(event);}, false);
	addEvent(this.htmlElement, "dblclick", function(event) {that.onDblClick(event);}, false);
	addEvent(this.htmlEdit, "change", function(event) {that.onEdit(event);}, false);
	addEvent(this.htmlEdit, "blur", function(event) {that.onEdit(event);}, false);
	Hide(this.htmlEdit);
};

/*
Set params
*/
Tab.prototype.setParams = function(params) {
	for (var param in params) {
		var value = params[param];
		switch (param) {
			case "draggable":
				this.htmlElement.draggable = value;
				break;
			case "classname":
				this.htmlElement.className = value;
				break;
			case "editable":
				this.editable = value;
				break;
		}
	}
}

/*
Start drag
*/
Tab.prototype.startDrag = function(event) {
	
	$("MessageManager").addMessage(new Message("Tag start drag", MessageManager.DEBUG));
    event.dataTransfer.effectAllowed = 'move';
	event.dataTransfer.setData("text", ""+this.tabId);
	addClassName(this.htmlElement, "movedTab");
}
/*
End drag
*/
Tab.prototype.endDrag = function(event) {
	if (event.preventDefault) event.preventDefault();
	removeClassName(this.htmlElement, "movedTab");
	return false;
}
/*
Click event handler
*/
Tab.prototype.onClick = function(event) {
	this.activate();
}
/*
Doule click event handler
*/
Tab.prototype.onDblClick = function(event) {
	if (this.editable) {
		this.htmlEdit.value = this.htmlContent.innerText || this.htmlContent.textContent;
		Hide(this.htmlContent);
		Show(this.htmlEdit);
		this.htmlEdit.focus();

	}
}
/*
Change event handler
*/
Tab.prototype.onEdit = function(event) {
	Hide(this.htmlEdit);
	Show(this.htmlContent);

	var eventParam = new Object();
	eventParam.tab = this;
	eventParam.newName = this.htmlEdit.value;
	this.notifyAll(Tab.EVENT_TAB_RENAMED, eventParam);
}
/*
Activate
*/
Tab.prototype.activate = function() {

//	$("MessageManager").addMessage(new Message("Activating tab #" + this.tabId, MessageManager.DEBUG));
	//logMessage(new Message("Activating tab #" + this.tabId, MessageManager.DEBUG));
	if (this.parentBar) {
		this.parentBar.activate(this);
	}
	if (this.container!=undefined) {
		Show(this.container);
	}
	this.activated = true;
	addClassName(this.htmlElement, "activatedTab");
		
	//$("MessageManager").setMessageLevel(MessageManager.DEBUG);
}
/*
Desactivate
*/
Tab.prototype.desactivate = function() {
//	$("MessageManager").addMessage(new Message("Desctivating tab #" + this.tabId, MessageManager.DEBUG));
	//logMessage(new Message("Desctivating tab #" + this.tabId, MessageManager.DEBUG));
	if (this.container!=undefined) {
		Hide(this.container);
	}
	this.activated = false;
	removeClassName(this.htmlElement, "activatedTab");
}
/*
Set html
*/
Tab.prototype.setHTML = function(html) {
	this.htmlContent.innerHTML = html;
}
/*
Set id
*/
Tab.prototype.setId = function(id) {
	this.tabId=id;
}
/*
Set parent bar
*/
Tab.prototype.setParentBar = function(parentBar) {
	this.parentBar=parentBar;
	return this;
}
/*
Set container
*/
Tab.prototype.setContainer = function(container) {
	this.container=container;

	if (this.activated) {
		Show(this.container);
	} else {
		Hide(this.container);
	}
}
/*
Remove
*/
Tab.prototype.remove = function() {
	if (this.parentBar) {
		this.parentBar.removeTab(this);
	}
}
/*
set user data
*/
Tab.prototype.setUserData = function(userData) {
	this.userData = userData
}
/*
get user data
*/
Tab.prototype.getUserData = function() {
	return this.userData;
}

$().extend(Tab, Notifiable);