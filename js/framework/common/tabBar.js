/**
TabBar
**/
function TabBar(id)
{
	this.htmlId = id;
	this.tabList = new Array();
	this.nextId = 0;
	this.create(id);
	this.activeTab = undefined;
	return this;
};
TabBar.prototype = new Panel();

TabBar.EVENT_TAB_ACTIVATED = "OnTabActivated";
TabBar.EVENT_TAB_DEACTIVATED = "OnTabDeactivated";
TabBar.EVENT_TAB_MOVED = "OnTabMoved";

/*
Create HTML stuff
*/
TabBar.prototype.create = function(id) {
	this.createPanel(id);
	var that = this;
//	addEvent(this.htmlElement, "dragover", function(event) {that.dragOver(event);}, false);
	addEvent(this.htmlElement, "dragenter", function(event) {that.dragEnter(event);}, false);
	addEvent(this.htmlElement, "dragover", function(event) {that.dragOver(event);}, false);
	addEvent(this.htmlElement, "drop", function(event) {that.drop(event);}, false);
};

/*
Add tab
*/
TabBar.prototype.addTab = function(tab) {
	tab.setParentBar(this);
	this.tabList.push(tab);
	tab.setId(this.nextId++);
	//this.activate(tab);
	this.updateTabs();
};

/*
Remove tab
*/
TabBar.prototype.removeTab = function(tab, preventTabUpdate) {
	var index = this.tabList.indexOf(tab);
	if (index!=-1)
	{
		this.tabList.splice(index, 1);
		try{
			this.htmlElement.removeChild(tab.htmlElement);
		} catch(error){};
		if (!preventTabUpdate) {
			this.updateTabs();
		}
	}
};

/*
Remove all tabs
*/
TabBar.prototype.removeAllTabs = function() {
	while (this.tabList[0]) {
		this.removeTab(this.tabList[0], true);
	}
	this.activeTab = undefined;
	//this.updateTabs();
};

/*
Move tab
*/
TabBar.prototype.moveTab = function(tabToMove, moveBefore) {

	if (moveBefore==undefined) {
		var tab = this.tabList.splice(tabToMove, 1);
		this.tabList.push(tab[0]);		
	} else {
		if (tabToMove==moveBefore) {
			//logMessage(new Message("Tab not moved.", MessageManager.DEBUG));
			return false;	
		}
		var tab = this.tabList.splice(tabToMove, 1);
		this.tabList.splice(moveBefore, 0, tab[0]);	
	}

	// Notify tab moving
	var eventParam = new Object();
	eventParam.tabToMove = tabToMove;
	eventParam.moveBefore = moveBefore;
	//o.pageNumber = this.currentPage;
	//o.content = this.pages[this.currentPage];
	this.notifyAll(TabBar.EVENT_TAB_MOVED, eventParam);

	this.updateTabs();
};

/*
Notify tab activated
*/
TabBar.prototype.notifyTabActivated = function(tab) {
	var eventParam = new Object();
	eventParam.tabActivated = tab;
	this.notifyAll(TabBar.EVENT_TAB_ACTIVATED, eventParam);
};

/*
Notify tab deactivated
*/
TabBar.prototype.notifyTabDeactivated = function(tab) {
	var eventParam = new Object();
	eventParam.tabActivated = tab;
	this.notifyAll(TabBar.EVENT_TAB_DEACTIVATED, eventParam);
};




/*
Update tabs
*/
TabBar.prototype.updateTabs = function() {
	for (var i in this.tabList) {
		this.htmlElement.appendChild(this.tabList[i].htmlElement);
	}
};

//dragEnter
TabBar.prototype.dragEnter = function(event) {
    /* �viter le comportement par d�faut du navigateur (d�placement
       de s�lection) */
	var TabId = event.dataTransfer.getData("text");
//	$("MessageManager").addMessage(new Message("TabBar dragEnter " + TabId, MessageManager.DEBUG));
	//logMessage(new Message("TabBar dragEnter " + TabId, MessageManager.DEBUG));
    if (event.preventDefault) event.preventDefault();
    return false;
};

//dragOver
TabBar.prototype.dragOver = function(event) {
	var TabId = event.dataTransfer.getData("text");
//	$("MessageManager").addMessage(new Message("TabBar dragOver " + TabId, MessageManager.DEBUG));
	//logMessage(new Message("TabBar dragOver " + TabId, MessageManager.DEBUG));
    if (event.preventDefault) event.preventDefault();
	if (event.stopPropagation) event.stopPropagation();
    return this.OnTabMove(event);
};	

//drop
TabBar.prototype.drop = function(event) {
    if (event.preventDefault) event.preventDefault();
    event.stopPropagation();
    return this.OnTabMove(event);
};

/*
Move tab
*/
TabBar.prototype.OnTabMove = function(event) {
	var tabId = event.dataTransfer.getData("text");		
	$("MessageManager").addMessage(new Message("TabBar drop " + tabId, MessageManager.DEBUG));
	/*if (attributeName.substring(0, 10)=="attribute|")
	{
		this.createCharacterAttribute(attributeName.substring(10, attributeName.length));
	}*/
	
	var sizeX = event.clientX - this.htmlElement.offsetLeft;
	
	// Get tab from id
	var tabToMove = undefined;
	for (var i in this.tabList) {
		if (this.tabList[i].tabId == tabId) {
			tabToMove = i;
			$("MessageManager").addMessage(new Message("Moving tab #" + i, MessageManager.DEBUG));
			break;
		}
	}
	
	if (tabToMove==undefined) {
		$("MessageManager").addMessage(new Message("Cannot find tab to move. Aborting.", MessageManager.WARN));
		return false;
	}			
	
	var moveBefore = this.getMovePosition(sizeX);

	this.moveTab(tabToMove, moveBefore);		    
    return false;
}
/*
Get tab position
*/
TabBar.prototype.getMovePosition = function(sizeX) {
	for (var i in this.tabList) {
		var elemX = this.tabList[i].htmlElement.scrollWidth;
		if (elemX != undefined) {
			if (sizeX < elemX) {
				$("MessageManager").addMessage(new Message("Moving tab before #" + i, MessageManager.DEBUG));
				return i;;
			}
			sizeX-=elemX;
		}
	}
	$("MessageManager").addMessage(new Message("Moving after last tab.", MessageManager.DEBUG));
	return undefined;
};

/*
Activate
*/
TabBar.prototype.activate = function(tab) {
	if (this.activeTab!=undefined) {
		if (tab==this.activeTab) {
			return;
		}
		this.activeTab.desactivate();
		this.notifyTabDeactivated(this.activeTab);
	}
	this.activeTab = tab;
	tab.activate();
	this.notifyTabActivated(tab);
}
$().extend(TabBar, Notifiable);