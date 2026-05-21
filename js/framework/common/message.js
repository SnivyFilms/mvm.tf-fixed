/*
Mapping message level / class css
*/
MessageClassName = 
{
	"0":"messageFatal",
	"1":"messageError",
	"2":"messageWarning",
	"3":"messageInfo",
	"4":"messageDebug"
}

function Message(text, level)
{
		this.text = text;
		this.messageLevel = level;
		this.date = new Date();
		
		this.create();
		return this;
};

/*
Create HTML stuff
*/
Message.prototype.create = function() {
	this.htmlElement = CREATE_ELEMENT("div", null, "message"); //, "help_message_manager");
	this.htmlElement.innerHTML = this.text;
	
	addClassName(this.htmlElement, MessageClassName[this.messageLevel]);
};