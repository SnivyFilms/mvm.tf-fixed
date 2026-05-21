/*
class id are 0:scout, 1:soldier, 2:pyro, 3:demoman, 4:heavy, 5:medic, 6:sniper, 7:spy, 8:engineer
slot id are 0:primary, 1:secondary, 2:melee, 3:hat, 4+:misc
*/
var SLOT_MAX = 4;
var SLOT_COSMETIC = 3;
var SLOT_CHARACTER = SLOT_MAX+1;

function Item(name, image, itemName, classId, slotId)
{
	this.name = name;
	this.image = image;
	this.itemName = itemName;
	this.classId = classId;
	this.slotId = slotId;
	return this;
}

function Items()
{
	var itemList = new Array();
	var itemListByClass = new Array();
	for (var i=0; i<10; i++) {
		itemList[i] = new Array();
		itemListByClass[i] = new Array();
		for (var j=0; j<=SLOT_MAX; j++) {
			itemList[i][j] = new Array();
		}
	}

////////
    if (typeof Items.initialized == "undefined")
	{
	    // addItem
        Items.prototype.addItem = function(classId, slotId, name, image, itemName)
		{
			var nameLower = name.toLowerCase();
		    var c = itemList[classId];
		    var d = itemListByClass[classId];
		    if (c&&d)
		    {
		        var w = new Item(nameLower, image, itemName, classId, slotId);
		        c[slotId].push(w);
				d[nameLower] = w;
		    }
        };
	    // getItems
	    // @itemclass # of class
        Items.prototype.getItems = function(itemclass, slot)
		{
			if (slot>SLOT_COSMETIC) slot=SLOT_COSMETIC;
		    var items = new Array();
		    var c = itemList[itemclass];
		    if (c)
		    {
		        var s = c[slot];
		        if (s)
		        {
					for (var i in s) {
						items.push(s[i]);
					}
		        }
		    }
		    return items;
        };
	    // getItem
	    // @itemclass # of class
        Items.prototype.getItem = function(itemclass, slot, weaponid)
		{
			if (slot>4) slot=4;
		    var item = null;
		    var c = itemList[itemclass];
		    if (c)
		    {
		        var s = c[slot];
		        if (s)
		        {
			        var w = s[weaponid];
			        if (w)
			        {
	                    return w;
			        }
		        }
		    }
		    return null;
        };
	    // getItemByClass
	    // @itemclass # of class
        Items.prototype.getItemByClass = function(classId, itemName)
		{
			if (!itemName) return null;
			var nameLower = itemName.toLowerCase();
			if (classId>9) return false;
		    var item = null;
		    var c = itemListByClass[classId];
		    if (c)
		    {
				item = c[nameLower];
				if (item==undefined){
				    console.log(itemName);
				}
		        return  item;
		    }
		    return null;
        };
	    // getItemsCount
	    // @itemclass # of class
        Items.prototype.getItemsCount = function(itemclass, slot)
		{
			if (slot>4) slot=4;
		    var items = new Array();
		    var c = itemList[itemclass];
		    if (c)
		    {
		        var s = c[slot];
		        if (s)
		        {
		            return s.length;
		        }
		    }
		    return 0;
        };
	    // getStockWeapon
        Items.prototype.getStockWeapon = function(weaponclass, slot)
		{
		    var weapon = null;
		    var c = itemList[weaponclass];
		    if (c)
		    {
		        var s = c[slot];
		        if (s)
		        {
		            weapon = s[0]
		        }
		    }
		    return weapon;
        };

        Items.initialized = true;
    }
////////
	
	return this;
}

Items.prototype.list = new Items();