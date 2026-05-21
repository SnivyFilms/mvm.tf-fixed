	var iconsdiv = document.getElementById("allclassesicons")
	//for (var i=0; i<ClassIcons.length-1; i++) {
	for (var i in ClassIcons) {
		var newdiv = document.createElement("div");
		iconsdiv.appendChild(newdiv);
		newdiv.className = ClassIcons[i] + " TFClassIcon";
		newdiv.classId = i;
	}

function SteamLogin(returnTo)
{
	window.location.href  = "/openid/steamlogin.php?r=" + returnTo;
}

function SteamLogout(returnTo)
{
	window.location.href  = "/openid/steamlogout.php?r=" + returnTo;
}
	
/*
function addEvent(objet, typeEvent, nomFunction, typePropagation){
  if (objet.addEventListener) {
    objet.addEventListener(typeEvent, nomFunction, typePropagation);
  } else if (objet.attachEvent) {
  objet.attachEvent('on' + typeEvent, nomFunction);
  }
}*/