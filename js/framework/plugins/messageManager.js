/**
Message level
0: fatal
1: error
2: warn
3: info
4: debug
**/
function MessageManager(position, limit, messageLevel)
{
//		MessageManager.prototype = new Panel();
		if (position == undefined) position = 1;
		if (limit == undefined) limit = 100;
		if (messageLevel == undefined) messageLevel = 2;
		
		this.show = false;
		this.messageLevel = messageLevel;
		this.messages = new Array();
		this.messageLimit = limit;
		this.autoScroll = true;
		
		this.create(position);
		return this;
};
MessageManager.prototype = new Panel();
MessageManager.FATAL = 0;
MessageManager.ERROR = 1;
MessageManager.WARN = 2;
MessageManager.INFO = 3;
MessageManager.DEBUG = 4;

/*
Create HTML stuff
*/
MessageManager.prototype.create = function(position) {
	var positionClass = "";
	if (position==0) positionClass = "messageManagerTop";
	else positionClass = "messageManagerBottom";
	this.createPanel();
	this.htmlMessageContainer = CREATE_ELEMENT("div", this.htmlElement, "scrollMessages");
	
	this.htmlMessageLevel = CREATE_ELEMENT("select", this.htmlElement, "messageManagerMessageLevel");
	this.htmlOptions = new Object();	
	this.htmlOptions[MessageManager.FATAL] = CREATE_ELEMENT("option", this.htmlMessageLevel, 
											"messageManagerMessageLevel", "MessageManagerFatal");
	this.htmlOptions[MessageManager.ERROR] = CREATE_ELEMENT("option", this.htmlMessageLevel, "messageManagerMessageLevel", 
											"MessageManagerError");
	this.htmlOptions[MessageManager.WARN] = CREATE_ELEMENT("option", this.htmlMessageLevel, "messageManagerMessageLevel", 
											"MessageManagerWarn");
	this.htmlOptions[MessageManager.INFO] = CREATE_ELEMENT("option", this.htmlMessageLevel, "messageManagerMessageLevel", 
											"MessageManagerInfo");
	this.htmlOptions[MessageManager.DEBUG] = CREATE_ELEMENT("option", this.htmlMessageLevel, "messageManagerMessageLevel", 
											"MessageManagerDebug");

	var that = this;
	addEvent(this.htmlMessageLevel, "change", function(event) {that.setMessageLevel(that.htmlMessageLevel.selectedIndex);}, false);
/*
0: fatal
1: error
2: warn
3: info
4: debug
*/
};
/*
Add a message
*/
MessageManager.prototype.addMessage = function(message) {
	if (this.messages.length>=this.messageLimit) {
		this.htmlMessageContainer.removeChild(this.messages[0].htmlElement);
		this.messages.splice(0, 1);
	}
	
	this.messages.push(message);
	this.update();
};
/*
Update the manager
*/
MessageManager.prototype.update = function() {
	//this.htmlElement.innerHTML = "";
	for (var i in this.messages) {
		if (this.messages[i].messageLevel <= this.messageLevel) {
			this.htmlMessageContainer.appendChild(this.messages[i].htmlElement);
		} else {
			try {
				this.htmlMessageContainer.removeChild(this.messages[i].htmlElement);
			} catch(error){}
		}
	}
	if (this.autoScroll) {
		this.htmlMessageContainer.scrollTop = this.htmlMessageContainer.scrollHeight;
	}
};
/*
Set message level
*/
MessageManager.prototype.setMessageLevel = function(messageLevel) {
	this.messageLevel = messageLevel;
	this.update();
	
	this.htmlOptions[messageLevel].selected = true;
};