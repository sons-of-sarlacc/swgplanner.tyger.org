<!doctype html public "-//w3c//dtd html 4.0 transitional//en">
<html><head>

<!-- Code and graphics Copyright &copy; Steven Lang, 2004 -->
<!-- Unauthorized use or distribution strictly forbidden -->
<!-- Contact Tiaga on SWG Station forum for more details -->

<meta http-equiv="Content-Script-Type" content="JavaScript">
<title>SWG City Map Viewer</title>
<style type="text/css">
IMG {
	border-width: 0px;
}
IMG.structure {
	padding: 6px;
	position: absolute;
}
BODY {
	margin: 0px;
	padding: 6px;
	border: 0px;
}
</style>
<script language="JavaScript">
<!--

function TK_CaptureMouseMove (handler)
{
	if (document.captureEvents) {
		if (Event.MOUSEMOVE) {
			document.captureEvents (Event.MOUSEMOVE);
		}
	}
}

function TK_ReleaseMouseMove ()
{
	if (document.releaseEvents) {
		if (Event.MOUSEMOVE) {
			document.releaseEvents (Event.MOUSEMOVE);
		}
	}
}

function TK_Num (num)
{
	if (typeof (num) == 'string')
		return parseInt (num);
	return (num);
}

function TK_Coords(e) {
	this.x = 0;
	this.y = 0;

	if (!e) {
		if (window.event) {
			e = window.event;
		} else {
			return;
		}
	}

	if (typeof (e.pageX) == 'number') {
		this.x = e.pageX;
		this.y = e.pageY;
	} else {
		if (typeof (e.clientX) == 'number') {
			this.x = e.clientX;
			this.y = e.clientY;

			if (!((window.navigator.userAgent.indexOf('Opera') + 1) || (window.ScriptEngine && ScriptEngine().indexOf('InScript') + 1) || window.navigator.vendor == 'KDE')) {
				if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
					this.x += document.body.scrollLeft;
					this.y += document.body.scrollTop;
				} else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
					this.x += document.documentElement.scrollLeft;
					this.y += document.documentElement.scrollTop;
				}
			}
		}
	}

	if (window.centerx && window.centery)
	{
		var xloc = Math.round ((this.x - 12 * ((window.mapwidth - 1) >> 1) - 6) * 8 / 12);
		var yloc = - Math.round ((this.y - 12 * ((window.mapheight - 1) >> 1) - 6) * 8 / 12);

		if (!TK_poslabel) return;
		TK_poslabel.removeChild (TK_poslabel.TK_text);
		dist = Math.round (Math.sqrt (xloc * xloc + yloc * yloc));
		xloc += centerx;
		yloc += centery;
		TK_poslabel.TK_text = TK_poslabel.ownerDocument.createTextNode (xloc + ' ' + yloc + '   (' + dist + 'm)');
		TK_poslabel.appendChild (TK_poslabel.TK_text);
	}
}

function TK_ConvertOldList(value) {
	var list = value.split ('+');

	if (list.length == 1) {
		list = value.split ('-');
		list = list.join ('+');
		list = list.split ('++');
		list = list.join ('+-');
		list = list.split ('+');
	}

	if (list.length % 4 == 0) {
		var loop;
		var newlist = new Array;

		for (loop = 0; loop < list.length; loop += 4) {
			list[loop + 1] = Number (list[loop + 1]) - 57;
			list[loop + 2] = Number (list[loop + 2]) - 56;
			newlist = newlist.concat (list[loop] + '.' + list[loop + 1] + '.' + list[loop + 2] + '.' + list[loop + 3]);
		}
		list = newlist;
	} else {
		list = new Array;
	}

	return list;
}

function TK_StructureSC(type, dir) {
	this.x = 0;
	this.y = 0;
}

function TK_GenerateFromList() {
	var loop = 0;

	if (!window.mapwidth) {
		window.mapwidth = 113;
	}
	if (!window.mapheight) {
		window.mapheight = 113;
	}

	if (!window.mapdata) window.mapdata = '';
	if (window.mapwidth < 10) window.mapwidth = 10;
	if (window.mapwidth > 150) window.mapwidth = 150;
	if (window.mapheight < 10) window.mapheight = 10;
	if (window.mapheight > 150) window.mapheight = 150;
	if (!window.mapbgimage)
		window.mapbgimage = "graphics/CityGrid.png";

	document.write ("<div style='width: " +
		window.mapwidth * 12 + "px; height: " + window.mapheight * 12 +
		"px; overflow: hidden;'>");
	document.write ("<img src='" + window.mapbgimage +
		"' style='position: relative; left: " +
		(-((150 - window.mapwidth) >> 1) * 12) + "px; top: " +
		(-((150 - window.mapheight) >> 1) * 12) + "px;'>");
	
	var list = unescape (window.mapdata).toLowerCase ();

	list = list.split(' ').join('+');

	while (list.indexOf ('++') >= 0) {
		list = list.split('++').join('+');
	}

	while (list.indexOf ('<') >= 0 && list.indexOf ('>') > list.indexOf ('<')) {
		list = list.split(/<[^>]*>/).join('');
		break;
	}

	if (list == 0) {
		list = new Array;
	} else {
		list = list.split ('/');
	}

	if (list.length == 1 && (window.mapdata.indexOf ('.') < 0)) {
		list = TK_ConvertOldList (window.mapdata);
	}

	for (loop = 0; loop < list.length; loop ++)
	{
		var newstruct = list[loop].split ('.');

		if (newstruct.length < 4) {
			continue;
		}

		newstruct[1] = Number (newstruct[1]);
		newstruct[2] = Number (newstruct[2]);
		newstruct[3] = Number (newstruct[3]);
		if (newstruct[1] > -85 && newstruct[1] <= 76 &&
			newstruct[2] > -85 && newstruct[2] <= 76 &&
			newstruct[3] >= 0 && newstruct[3] <= 3)
		{
			var SC = new TK_StructureSC (newstruct[0], newstruct[3]);
			var xloc = (newstruct[1] + SC.x + ((window.mapwidth - 1) >> 1)) * 12;
			var yloc = (newstruct[2] + SC.y + ((window.mapheight - 1) >> 1)) * 12;

			document.write ("\n<img class=structure style='left: " +
				xloc + "px; top: " + yloc + "px;' src='structures/" +
				newstruct[0] + "-" + newstruct[3] + ".png'>");
		}
	}
	document.write ('\n</div>');
}

-->
</script>
</head>
<body bgcolor="#FFFFFF">
<script language="JavaScript"><!--
TK_GenerateFromList();
--></script>
<noscript>A JavaScript compatible browser is required to view this page.</noscript>
</body>
</html>
