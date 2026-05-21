var DEFAULT_MESSAGE_MANAGER = "MessageManager";
/*
Create default message manager
@return	the manager created
*/
createDefaultMessageManager = function() {
	$().registerPlugin(DEFAULT_MESSAGE_MANAGER, new MessageManager);

	$(DEFAULT_MESSAGE_MANAGER)
								.setPosition("bottom", "20%", "5%")
								.setMessageLevel(MessageManager.DEBUG);
	return $(DEFAULT_MESSAGE_MANAGER);
};
/*
Log a message 
@param message	message to log
@param manager	message manager to log in
*/
logMessage = function(message, manager) {
	if (message == undefined) return;
	if (manager == undefined) manager = DEFAULT_MESSAGE_MANAGER;
	
	if ($(manager).addMessage) {
		$(manager).addMessage(message);
	}
};
/*
Log a debug message 
@param text		text of the message
@param manager	message manager to log in
*/
logDebugMessage = function(text, manager) {
	if (text == undefined) return;
	
	var mess = new Message(text, MessageManager.DEBUG);
	logMessage(mess);
};
