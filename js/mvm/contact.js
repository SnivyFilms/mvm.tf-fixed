function Contact()
{
	this.htmlElement = null;
	
////////
    if (typeof Contact.initialized == "undefined")
	{
		Contact.prototype.createElement = CREATE_ELEMENT;

		//create
		Contact.prototype.create = function() {
			this.contactPanel = this.createElement("div", document.body, "contactPanel");
			this.htmlHelpTitle = this.createElement("div", this.contactPanel, "contactTitle");
			this.htmlHelpTitle.appendChild(document.createTextNode(CONTACT));

			{
				var div = this.createElement("div", this.contactPanel);
				var div2 = this.createElement("div", div, "contactText");
				div2.appendChild(document.createTextNode(CONTACT_EMAIL));
				this.htmlEmail = this.createElement("input", div, "contactInput");
			}

			{
				var div = this.createElement("div", this.contactPanel);
				var div2 = this.createElement("div", div, "contactText");
				div2.appendChild(document.createTextNode(CONTACT_SUBJECT));
				this.htmlSubject = this.createElement("input", div, "contactInput");
			}

			{
				var div = this.createElement("div", this.contactPanel);
				var div2 = this.createElement("div", div, "contactText");
				div2.appendChild(document.createTextNode(CONTACT_MESSAGE));
				this.htmlMessage = this.createElement("textarea", div, "contactInput");
				//this.htmlSubmit.type = "t";
			}

			{
				var div = this.createElement("div", this.contactPanel);
				//div.appendChild(document.createTextNode(CONTACT_MESSAGE));
				this.htmlSubmit = this.createElement("input", div);
				this.htmlSubmit.type = "submit";
				addEvent(this.htmlSubmit, "click", function(event) {this.ownerObject.submit();}, false);
			}


			var removeButton = this.createElement("div", this.contactPanel, "removebutton contactRemove");
			removeButton.appendChild(document.createTextNode("x"));
			addEvent(removeButton, "click", function() {this.ownerObject.hide();}, false);
		};
		//show
		Contact.prototype.show = function() {
			this.contactPanel.style.display = "";
		};
		//hide
		Contact.prototype.hide = function() {
			this.contactPanel.style.display = "none";
		};
		//submit
		Contact.prototype.submit = function() {
			var url  = "./contact.php";
			var sentOk = PostRequestAjax(url,  {'email':this.htmlEmail.value, 'subject':this.htmlSubject.value, 'message':this.htmlMessage.value });
			if (sentOk)
			{
				AddAlert(CONTACT_MESSAGE_SENT, "#00FF00");
				this.hide();
			}
			else
				AddAlert(CONTACT_MESSAGE_UNSENT, "#00FF00");
		};

        Contact.initialized = true;
    }
////////
	this.create();
	this.hide();

	return this;
}