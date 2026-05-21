function Panel()
{
	return this;
};

/*
Create panel
*/
Panel.prototype.createPanel = function(id, className) {
	className = className || "panel";
	this.parent = null;
	this.subPanels = new Array();
	
	
	this.htmlElement = GET_OR_CREATE_ELEMENT(id, "div", null, className);

	/*var element = document.getElementById(id);
	if (element) {
		this.htmlElement = element;
	}
	else {
		this.htmlElement = CREATE_ELEMENT("div", null, "panel");
	}*/
};
/*
Set parent panel
*/
Panel.prototype.setParent = function(parent) {
	this.parent = parent;
	if (parent != undefined && parent.appendChild != undefined) {
		parent.appendChild(this.htmlElement);
	}
	return this;
};
/*
Set position
*/
Panel.prototype.setPosition = function(position, size, offset) {
	removeClassName(this.htmlElement, "panelTop");
	removeClassName(this.htmlElement, "panelBottom");
	removeClassName(this.htmlElement, "panelLeft");
	removeClassName(this.htmlElement, "panelRight");
	this.htmlElement.style.width = "";
	this.htmlElement.style.height = "";
	
	var className = "";
	switch (position){
		case "top":
			className = "panelTop";
			this.htmlElement.style.height = size;
			this.htmlElement.style.width = "99.9%";
			if (offset!=undefined) {
				this.htmlElement.style.top = offset;	
			}
			break;
		case "bottom":
			className = "panelBottom";
			this.htmlElement.style.height = size;
			this.htmlElement.style.width = "99.9%";
			if (offset!=undefined) {
				this.htmlElement.style.bottom = offset;	
			}
			break;
		case "left":
			className = "panelLeft";
			this.htmlElement.style.width = size;
			this.htmlElement.style.height = "99.9%";
			if (offset!=undefined) {
				this.htmlElement.style.left = offset;	
			}
			break;
		case "right":
			className = "panelRight";
			this.htmlElement.style.width = size;
			this.htmlElement.style.height = "99.9%";
			if (offset!=undefined) {
				this.htmlElement.style.right = offset;	
			}
			break;
	}
		
	addClassName(this.htmlElement, className);
	return this;
};
/*
Set class name
*/
Panel.prototype.setClassName = function(className) {
	addClassName(this.htmlElement, className);
	return this;
};