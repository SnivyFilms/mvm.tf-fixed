function getRandom(min, max)
{
	var s = max - min+1;
	return Math.floor(Math.random()*s) + min
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

String.prototype.strip =   function() {
    return this.replace(/^\s+/, '').replace(/\s+$/, '');
  }

function addEvent(objet, typeEvent, nomFunction, typePropagation){
  if (objet.addEventListener) {
    objet.addEventListener(typeEvent, nomFunction, typePropagation);
  } else if (objet.attachEvent) {
  objet.attachEvent('on' + typeEvent, nomFunction);
  }
}

  var regExpCache = {};
  function getRegExpForClassName(className) {
    if (regExpCache[className]) return regExpCache[className];

    var re = new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    regExpCache[className] = re;
    return re;
  }

  function hasClassName(element, className) {
    //if (!(element = $(element))) return;

    var elementClassName = element.className;

    if (elementClassName.length === 0) return false;
    if (elementClassName === className) return true;

    return getRegExpForClassName(className).test(elementClassName);
  }

  function addClassName(element, className) {
    //if (!(element = $(element))) return;

    if (!hasClassName(element, className))
      element.className += (element.className ? ' ' : '') + className;

    return element;
  }

  function removeClassName(element, className) {
    if (element == undefined) return; //TODO
    //if (!(element = $(element))) return;
	//alert(element.className.replace(getRegExpForClassName(className), ' '));
    element.className = element.className.replace(
     getRegExpForClassName(className), ' ').strip();

    return element;
  }
  

	function PostRequest(url, params, target)
	{
	    var form = document.createElement("form");
	    form.setAttribute("method", "post");
	    form.setAttribute("action", url);
	    form.setAttribute("target", target);

	    for (var i in params) {
	        if (params.hasOwnProperty(i)) {
	            var input = document.createElement('input');
	            input.type = 'hidden';
	            input.name = i;
	            input.value = params[i];
	            form.appendChild(input);
	        }
	    }

	    document.body.appendChild(form);
	    form.submit();
	    document.body.removeChild(form);
	}


	function PostRequestAjax(url, params)
	{
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open("POST", url, false);
		xmlhttp.setRequestHeader('Content-Type', 'text/xml');
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


		var str = "";
	    for (var i in params) {
	        if (params.hasOwnProperty(i)) {
				str += "&" + i + "=" + params[i];
	        }
	    }
		xmlhttp.send(str);

		xmlDoc = xmlhttp.responseXML;
		if (xmlDoc==null) return false;
		var ok = xmlDoc.documentElement;
		if (ok.nodeName == "ok")
			return true
		else
			return false;
	}


	function AddAlert(message, color)
	{
		alert(message);
	}

var DRAG_ENTER = function(event) {
	var data = event.dataTransfer.getData('Text');
	if (data.substring(0, 5)=="help|") {
		if (this.helpId!=undefined)
		{
    		event.dataTransfer.dropEffect = 'copy';
			globalHelp.setHelpId(this.helpId, this.helpAddText);
			event.stopPropagation();
		}
	}
	event.preventDefault();
	return false;
};
	
var DRAG_OVER = function(event) {
	var data = event.dataTransfer.getData('Text');
	if (data.substring(0, 5)=="help|") {
		if (this.helpId!=undefined)
		{
    		event.dataTransfer.dropEffect = 'copy';
			globalHelp.setHelpId(this.helpId, this.helpAddText);
			event.stopPropagation();
		}
	}
    event.preventDefault();
    return false;
};

var DRAG_LEAVE = function(event) {
	var data = event.dataTransfer.getData('Text');
	if (data.substring(0, 5)=="help|") {
    	event.dataTransfer.dropEffect = 'none';
		globalHelp.setHelpId(null);
		event.stopPropagation();
	}
    event.preventDefault();
    return false;
};

var DROP = function(event) {
	globalHelp.setHelpId(null);
	return false;
};

var MOUSE_OVER = function(event) {
	//if (globalHelp.isActive())
	{
		if (this.helpId!=undefined)
		{
			globalHelp.setHelpId(this.helpId, this.helpAddText);
			event.stopPropagation();
		}
	}
    return false;
};

var MOUSE_OUT = function(event) {
	globalHelp.setHelpId(null);
	return false;
};

var SET_TEXT = function() {
	if (this.messageId != undefined) {
		this.innerHTML = $("I18N").$(this.messageId);
	}
}

var GET_OR_CREATE_ELEMENT = function(id, type, parent, className, messageId, helpId) {
	if (id) {
		var element = id;
		if (typeof id == "string") {
			element = document.getElementById(id);
		}
		if (element) {
			if (className != undefined) {
				addClassName(element, className);
			}
			return element;
		}
	}
	return CREATE_ELEMENT(type, parent, className, messageId, helpId, id);
}

var CREATE_ELEMENT  = function(type, parent, className, messageId, helpId, id) {
			var element = document.createElement(type);
			element.helpId = helpId;
			if (element!=null) {
				if (id != undefined) element.id = id;
				if (document.body) document.body.appendChild(element);
				element.messageId = messageId;

			    element.ownerObject = this;
				if ($("I18N").addNotification) {
					if (messageId != undefined) {
						element.updateText = SET_TEXT;
						element.updateText();
						$("I18N").addNotification(/*element, */I18N.EVENT_LANG_CHANGED, element.updateText/*"updateText"*/);
					}
				}
				if (parent!=null)
				    parent.appendChild(element);
				if (className!=null)
				    element.className=className;
			}
			/*element.dragOver = DRAG_OVER;
			element.dragEnter = DRAG_ENTER;
			element.drop = DROP;
			element.dragLeave = DRAG_LEAVE;*/
			element.mouseOver = MOUSE_OVER;
			element.mouseOut = MOUSE_OUT;


			//addEvent(element, "dragenter", function(event) {this.dragEnter(event);}, false);
			//addEvent(element, "dragover", function(event) {this.dragOver(event);}, false);
			//addEvent(element, "drop", function(event) {this.drop(event);}, false);
			//addEvent(element, "dragleave", function(event) {this.dragLeave(event);}, false);
			if (helpId) {
				addEvent(element, "mouseover", function(event) {this.mouseOver(event);}, false);
				addEvent(element, "mouseout", function(event) {this.mouseOut(event);}, false);
			}

			return element;
		};
		
		
		
var SET_NUMERIC_VALUE = function(input) {
		    if (this.currency != currency)
		    {
		        if (isNumber(currency))
		        {
				    this.inputCurrency.id = "";
					this.currency = currency;
					this.inputCurrency.value =  currency;
				}
				else
				    this.inputCurrency.id = "mvmNaNinput";
			}
		};
		
		
/*
	Display html element
*/
function Display(htmlElement, visible)
{
	if (htmlElement==undefined) return;
	
	if (visible) {
		htmlElement.style.display = "";
	} else {
		htmlElement.style.display = "none";
	}
}		
/*
	Show html element
*/
function Show(htmlElement)
{
	Display(htmlElement, true);
}		
/*
	Hide html element
*/
function Hide(htmlElement)
{
	Display(htmlElement, false);
}