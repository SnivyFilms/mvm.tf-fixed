function I18N()
{
	this.messages = new Object();
	this.currentLang = undefined;
	return this;
};
I18N.EVENT_LANG_CHANGED = "OnLangChange";

/*
Add a message
@param lang 		language of the message
@param messageId 	id of the message
@param messageText 	text of the message
@return				this
*/
I18N.prototype.addMessage = function(lang, messageId, messageText) {
	// First, add language if he dont exists
	if (this.messages[lang] = undefined) {
		this.messages[lang] = new Object();
	}
	
	// Add the message, overwriting if already exists
	this.messages[lang][messageId] = messageText;
	return this;	
};
/*
Get the text of a given lang and messageid.
@param lang 		language of the message
@param messageId 	id of the message
@return				text of the message, or messageId if not found
*/
I18N.prototype.getMessage = function(lang, messageId) {
	// First, add language if he dont exists
	if (this.messages[lang] != undefined) {
		if (this.messages[lang][messageId] != undefined) {
			return this.messages[lang][messageId];
		}
	}
	return "###" + messageId + "###";
};
/*
Get the text of a message for the current selected language.
@param messageId 	id of the message
@return				text of the message, or messageId if not found
*/
I18N.prototype.$ = function(messageId) {
	if (this.currentLang == undefined) {
		return messageId;
	}
	return this.getMessage(this.currentLang, messageId);
};
/*
Set the current lang
@param lang 		language of the message
@return				this
*/
I18N.prototype.setCurrentLang = function(lang) {
	this.currentLang = lang;
	
	/*for (var i in this.notifyList) {
		this.notifyList[i].updateText();
	}*/
	this.notifyAll(I18N.EVENT_LANG_CHANGED);
	return this;
};
/*
Add notification. Element will be notified upon lang change
@param element	element to notify
@return				this
*/
/*I18N.prototype.addNotification = function(element) {
	this.notifyList.push(element);
	return this;
};*/
/*
Remove notification
@param element	element to remove
@return			this
*/
/*I18N.prototype.removeNotification = function(element) {
//TODO
	return this;
};*/

//$().inherit(I18N, Notifiable, true);
$().extend(I18N, Notifiable);