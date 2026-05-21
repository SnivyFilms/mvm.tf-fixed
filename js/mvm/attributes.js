function Attributes()
{
	this.attributesList = new Array();

////////
    if (typeof Attributes.initialized == "undefined")
	{
	    //createElement
		Attributes.prototype.createElement = CREATE_ELEMENT;
		
	    // addAttribute
		Attributes.prototype.addAttribute = function(attribute) {
  			this.htmlAttributesHandler.appendChild(attribute.htmlElement);
			this.attributesList.push(attribute);
			return true;
		}
		// filter
		Attributes.prototype.filter = function(filter) {
			for (var i=0; i<this.attributesList.length; i++) {
				var attribute = this.attributesList[i];
				if (attribute.name.indexOf(filter)!=-1)
					attribute.show();
				else
					attribute.hide();
			}
		}

	    // create
		Attributes.prototype.create = function() {
			this.htmlElement = this.createElement("div", null, "attributes", null, "help_attributes");
			this.htmlHeader = this.createElement("div", this.htmlElement, "attributesHeader");
			this.htmlHeader2 = this.createElement("div", this.htmlElement, "attributesHeader2");

			this.htmlHeader2.innerHTML = ATTRIBUTES_FILTER;
			this.htmlFilter = this.createElement("input", this.htmlHeader2, "mvmInput");
			addEvent(this.htmlFilter, "change", function(event) {this.ownerObject.filter(this.value);}, false);
			addEvent(this.htmlFilter, "keyup", function(event) {this.ownerObject.filter(this.value);}, false);
			

			this.htmlHeader.innerHTML = ATTRIBUTES;

			this.htmlAttributesHandler = this.createElement("div", this.htmlElement, "attributesHandler");
			this.htmlFooter = this.createElement("div", this.htmlElement, "attributesFooter");

		}

	    // scroll
		Attributes.prototype.scroll = function(event) {


		}
		
        Attributes.initialized = true;
    }
////////

	this.create();
	return this;
}