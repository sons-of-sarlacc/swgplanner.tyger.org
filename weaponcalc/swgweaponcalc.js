// Code and graphics Copyright &copy; Steven Lang, 2004
// Unauthorized use or distribution strictly forbidden
// Contact Tiaga on SWG Station forum for more details

function TK_ValidateNumber (elem, forcesign)
{
	var num = elem.value;
	if (!num) return true;

	num = parseFloat (num);

	if (num.toString() == 'NaN') {
		if (elem.oldValue) {
			elem.value = elem.oldValue;
		} else {
			elem.value = elem.defaultValue;
		}
		return false;
	}

	if (num >= 0 && forcesign) {
		elem.value = elem.oldValue = '+' + num;
		return true;
	}

	elem.value = elem.oldValue = num;
	return true;
}

function TK_Table (contents)
{
	return ("<table cellpadding=0 cellspacing=0 border=0>\n" + contents + "</table>\n");
}

function TK_TableRow (contents)
{
	return ("\t<tr>\n" + contents + "\t</tr>\n");
}

function TK_TableCell (contents)
{
	return ("\t\t<td>" + contents + "</td>\n");
}

function TK_TextInput (name, value, taborder)
{
	return ("<input class=text name='" + name + "' value='" + value + "' tabindex=" + taborder + ">");
}

function TK_NumberInput (name, value, taborder, forcesign, disabled)
{
	var cssclass = disabled? "disablenuminput": "numinput";
	disabled = disabled? " disabled=true": "";
	forcesign = forcesign? 1: 0;
	
	return ("<input class=" + cssclass + " type=text name='" + name + "' value='" + value + "' onchange='return TK_ValidateNumber(this, " + forcesign + ");' tabindex=" + taborder + disabled + ">");
}

function TK_Select (name, options, taborder)
{
	return ("<select class=select name='" + name + "' tabindex=" + taborder + ">" + options + "</select>");
}

function TK_Option (label, value)
{
	return ("<option value='" + value + "'>" + label + "</option>");
}

function TK_Button (label, action)
{
	return ("<input class=button type=button value='" + label + "' onclick='" + action + "'></input>");
}

function TK_Label (text)
{
	return "<span class=label>" + text + "</span>";
}

function TK_CheckedChange (source, form, target, defaultval)
{
	target = document[form][target];
	if (source.checked) {
		if (!target.oldValue)
			target.oldValue = defaultval;

		target.value = target.oldValue;
		target.disabled = false;
	} else {
		target.value = source.value;
		target.disabled = true;
	}
}

function TK_CheckBoxToggle (form, target, value, defaultval, taborder)
{
	var onclick = 'TK_CheckedChange (this, "' + form + '", "' + target + '", "' + defaultval + '");';
	return ("<input class=checkbox name='" + target + "check' type=checkbox value='" + value +
		"' onclick='" + onclick + "' tabindex=" + taborder + ">");
}

function TK_MakeWeaponNames (count)
{
	var str = TK_TableCell (TK_Label ("Weapon"));

	for (var loop = 1; loop <= count; loop++)
	{
		str += TK_TableCell (TK_TextInput ("name" + loop, "Weapon " + loop, 1 + loop * 100));
	}

	return TK_TableRow (str);
}

function TK_MakeWeaponAP (count)
{
	var str = TK_TableCell (TK_Label ("Armor Piercing"));

	for (var loop = 1; loop <= count; loop++)
	{
		str += TK_TableCell (TK_Select ("ap" + loop, TK_Option ("None", 0) +
			TK_Option ("Light", 1) + TK_Option ("Medium", 2) +
			TK_Option ("Heavy", 3), 3 + loop * 100));
	}

	return TK_TableRow (str);
}

function TK_MakeTargetAR ()
{
	var str = TK_TableCell (TK_Label ("Armor Rating"));

	str += TK_TableCell (TK_Select ("ar", TK_Option ("None", 0) +
		TK_Option ("Light", 1) + TK_Option ("Medium", 2) +
		TK_Option ("Heavy", 3), 1 + 10000));

	return TK_TableRow (str);
}

function TK_MakeWeaponSpeed (count)
{
	var str = TK_TableCell (TK_Label ("Speed"));

	for (var loop = 1; loop <= count; loop++)
	{
		str += TK_TableCell (TK_NumberInput ("speed" + loop, "2.0", 5 + loop * 100));
	}

	return TK_TableRow (str);
}

function TK_MakeWeaponDamage (count)
{
	var str1 = TK_TableCell (TK_Label ("Damage Type"));
	var str2 = TK_TableCell (TK_Label ("Damage Min"));
	var str3 = TK_TableCell (TK_Label ("Damage Max"));

	var options = "";
	options += TK_Option ("Acid", "acid");
	options += TK_Option ("Blast", "blast");
	options += TK_Option ("Cold", "cold");
	options += TK_Option ("Electricity", "electricity");
	options += TK_Option ("Energy", "energy");
	options += TK_Option ("Heat", "heat");
	options += TK_Option ("Kinetic", "kinetic");
	options += TK_Option ("Restraint", "restraint");
	options += TK_Option ("Stun", "stun");

	for (var loop = 1; loop <= count; loop++)
	{
		str1 += TK_TableCell (TK_Select ("type" + loop, options, 7 + loop * 100));
		str2 += TK_TableCell (TK_NumberInput ("min" + loop, "17", 9 + loop * 100));
		str3 += TK_TableCell (TK_NumberInput ("max" + loop, "35", 11 + loop * 100));
	}

	return TK_TableRow (str1) + TK_TableRow (str2) + TK_TableRow (str3);
}

function TK_MakeWeaponRanges (count)
{
	var str1 = TK_TableCell (TK_Label ("Point Blank"));
	var str2 = TK_TableCell (TK_Label ("Ideal Range"));
	var str3 = TK_TableCell (TK_Label ("Max Range"));

	for (var loop = 1; loop <= count; loop++)
	{
		str1 += TK_TableCell (TK_NumberInput ("pb" + loop, "-20", 13 + loop * 100, 1));
		str2 += TK_TableCell (TK_NumberInput ("ideal" + loop, "+26", 15 + loop * 100, 1));
		str3 += TK_TableCell (TK_NumberInput ("distant" + loop, "-60", 17 + loop * 100, 1));
	}

	return TK_TableRow (str1) + TK_TableRow (str2) + TK_TableRow (str3);
}

function TK_MakeWeaponHAM (count)
{
	var str1 = TK_TableCell (TK_Label ("Health Cost"));
	var str2 = TK_TableCell (TK_Label ("Action Cost"));
	var str3 = TK_TableCell (TK_Label ("Mind Cost"));

	for (var loop = 1; loop <= count; loop++)
	{
		str1 += TK_TableCell (TK_NumberInput ("health" + loop, "12", 19 + loop * 100));
		str2 += TK_TableCell (TK_NumberInput ("action" + loop, "36", 21 + loop * 100));
		str3 += TK_TableCell (TK_NumberInput ("mind" + loop, "12", 23 + loop * 100));
	}

	return TK_TableRow (str1) + TK_TableRow (str2) + TK_TableRow (str3);
}

function TK_MakeWeaponSkill (count)
{
	var str1 = TK_TableCell (TK_Label ("Skill Accuracy"));
	var str2 = TK_TableCell (TK_Label ("Skill Speed"));

	for (var loop = 1; loop <= count; loop++)
	{
		str1 += TK_TableCell (TK_NumberInput ("skillaccuracy" + loop, "10", 25 + loop * 100));
		str2 += TK_TableCell (TK_NumberInput ("skillspeed" + loop, "5", 27 + loop * 100));
	}

	return TK_TableRow (str1) + TK_TableRow (str2);
}

function TK_MakeWeaponStats (count)
{
	var str1 = TK_TableCell (TK_Label ("Actual Speed"));
	var str2 = TK_TableCell (TK_Label ("Base Score"));
	var str3 = TK_TableCell (TK_Label ("Overall Score"));
	var str4 = TK_TableCell (TK_Label ("HAM Score"));
	var str5 = TK_TableCell (TK_Label ("Point Blank DPS"));
	var str6 = TK_TableCell (TK_Label ("Ideal DPS"));
	var str7 = TK_TableCell (TK_Label ("Max Range DPS"));

	for (var loop = 1; loop <= count; loop++)
	{
		str1 += TK_TableCell ("<span class=stat id='realspeed" + loop + "'>&nbsp;</span>");
		str2 += TK_TableCell ("<span class=stat id='bscore" + loop + "'>&nbsp;</span>");
		str3 += TK_TableCell ("<span class=stat id='oscore" + loop + "'>&nbsp;</span>");
		str4 += TK_TableCell ("<span class=stat id='hscore" + loop + "'>&nbsp;</span>");
		str5 += TK_TableCell ("<span class=stat id='pbdps" + loop + "'>&nbsp;</span>");
		str6 += TK_TableCell ("<span class=stat id='idealdps" + loop + "'>&nbsp;</span>");
		str7 += TK_TableCell ("<span class=stat id='maxdps" + loop + "'>&nbsp;</span>");
	}

	return TK_TableRow (str1) + TK_TableRow (str2) + TK_TableRow (str3) +
		TK_TableRow (str4) + TK_TableRow (str5) + TK_TableRow (str6) +
		TK_TableRow (str7);
}

function TK_Controls (count)
{
	var str = TK_TableCell (TK_Button ('Calculate', 'TK_Recalculate ();'));
	str += TK_TableCell (TK_Button ('More weapons', 'TK_RewritePage (' +
		(count + 1) + ');'));
	str += TK_TableCell (TK_Button ('Less weapons', 'TK_RewritePage (' +
		(count - 1) + ');'));

	return (TK_TableRow (str));
}

function TK_MakeWeaponsTable (count)
{
	var str =  ("<form name='weaps'>");
	str += (TK_Table (TK_MakeWeaponNames (count) +
		TK_MakeWeaponAP (count) + TK_MakeWeaponSpeed (count) +
		TK_MakeWeaponDamage (count) + TK_MakeWeaponRanges (count) +
		TK_MakeWeaponHAM (count) + TK_MakeWeaponSkill (count) +
		TK_MakeWeaponStats (count) + TK_Controls (count)));
	str += ("</form>");

	return str;
}

function TK_MakeTargetOneResist (name, id, idx)
{
	return TK_TableRow (TK_TableCell (TK_Label (name)) +
		TK_TableCell (TK_CheckBoxToggle ("targ", id, "Vulnerable", 0, idx * 4 + 10000) +
		TK_NumberInput (id, "Vulnerable", idx * 4 + 10002, false, true)));
}

function TK_MakeTargetResist ()
{
	var str = "";
	str += TK_MakeTargetOneResist ("Acid", "acid", 2);
	str += TK_MakeTargetOneResist ("Blast", "blast", 3);
	str += TK_MakeTargetOneResist ("Cold", "cold", 4);
	str += TK_MakeTargetOneResist ("Electricity", "electricity", 5);
	str += TK_MakeTargetOneResist ("Energy", "energy", 6);
	str += TK_MakeTargetOneResist ("Heat", "heat", 7);
	str += TK_MakeTargetOneResist ("Kinetic", "kinetic", 8);
	str += TK_MakeTargetOneResist ("Restraint", "restraint", 9);
	str += TK_MakeTargetOneResist ("Stun", "stun", 10);

	return str;
}

function TK_MakeTargetTable ()
{
	str =  "<form name='targ'>";

	str += TK_Table (TK_MakeTargetAR () + TK_MakeTargetResist () +
		TK_TableRow (TK_TableCell (TK_Button ('Calculate', 'TK_Recalculate ();'))));
	str += "</form>";

	return str;
}

function TK_WriteTables (count)
{
	document.TK_WeaponCount = count;
	document.write (TK_MakeWeaponsTable (count));
	document.write (TK_MakeTargetTable ());
	document.loadDone = true;
}

function TK_GetVal (elem)
{
	if (elem.tagName == "SELECT") {
		elem = elem.options[elem.selectedIndex];
	}
	if (elem.value) return elem.value;
	if (elem.defaultValue) return elem.defaultValue;
	return "";
}

function TK_SetVal (elem, value)
{
	if (elem.tagName == "SELECT") {
		for (var loop = 0; loop < elem.options.length; loop++) {
			if (elem[loop].value == value) {
				elem.selectedIndex = elem[loop].index;
				break;
			}
		}
		return;
	}
	elem.value = elem.oldValue = value;
}

function TK_GetNum (elem)
{
	return parseFloat (TK_GetVal (elem));
}

function TK_SetNum (elem, value)
{
	if (value >= 0)
		value = '+' + value;

	elem.value = elem.oldValue = value;
}

function TK_GetWeapVal (name, num)
{
	return TK_GetVal (document.weaps[name + num]);
}

function TK_GetTargVal (name)
{
	return TK_GetVal (document.targ[name]);
}

function TK_SetWeapVal (name, num, value)
{
	TK_SetVal (document.weaps[name + num], value);
}

function TK_SetTargVal (name, value)
{
	TK_SetVal (document.targ[name], value);
}

function TK_SetTargCheckedVal (name, value)
{
	TK_SetVal (document.targ[name], value);

	var check = document.targ[name + 'check'];
	if (value != check.value) {
		check.checked = true;
		document.targ[name].disabled = false;
	} else {
		document.targ[name].oldValue = null;
	}
}

function TK_GetWeapNum (name, num)
{
	return TK_GetNum (document.weaps[name + num]);
}

function TK_GetTargNum (name)
{
	return TK_GetNum (document.targ[name]);
}

function TK_GetTargMaybeNum (name)
{
	var val = TK_GetVal (document.targ[name]);
	var num = parseFloat (val);

	if (num.toString () == 'NaN')
		return val;

	return num;
}

function TK_SetWeapNum (name, num, value)
{
	TK_SetNum (document.weaps[name + num], value);
}

function TK_SetTargNum (name, value)
{
	TK_SetNum (document.targ[name], value);
}

function TK_UpdateWeapons ()
{
	document.weaponNames = new Array ();
	document.weapons = new Array ();
	document.skills = new Array ();
	for (loop = 1; loop <= document.TK_WeaponCount; loop++)
	{
		document.weaponNames[loop] = TK_GetWeapVal ('name', loop);
		document.weapons[loop] = new TK_Weapon (TK_GetWeapNum ('ap', loop),
			TK_GetWeapNum ('speed', loop), TK_GetWeapVal ('type', loop),
			TK_GetWeapNum ('min', loop), TK_GetWeapNum ('max', loop),
			TK_GetWeapNum ('pb', loop), TK_GetWeapNum ('ideal', loop),
			TK_GetWeapNum ('distant', loop), TK_GetWeapNum ('health', loop),
			TK_GetWeapNum ('action', loop), TK_GetWeapNum ('mind', loop));
		document.skills[loop] = new TK_Skill (TK_GetWeapNum ('skillaccuracy', loop),
			TK_GetWeapNum ('skillspeed', loop));
	}
}

function TK_UpdateTarget ()
{
	document.target = new TK_Armor (TK_GetTargNum ('ar'),
		TK_GetTargMaybeNum ('acid'), TK_GetTargMaybeNum ('blast'),
		TK_GetTargMaybeNum ('cold'), TK_GetTargMaybeNum ('electricity'),
		TK_GetTargMaybeNum ('energy'), TK_GetTargMaybeNum ('heat'),
		TK_GetTargMaybeNum ('kinetic'), TK_GetTargMaybeNum ('restraint'),
		TK_GetTargMaybeNum ('stun'));
}

function TK_UpdateForm ()
{
	if (document.TK_WeaponCount) for (loop = 1; loop <= document.TK_WeaponCount; loop++)
	{
		if (!document.weapons[loop])
			continue;
		TK_SetWeapVal ('name', loop, document.weaponNames[loop]);
		with (document.weapons[loop]) {
			TK_SetWeapVal ('ap', loop, ap);
			TK_SetWeapVal ('speed', loop, speed);
			TK_SetWeapVal ('type', loop, type);
			TK_SetWeapVal ('min', loop, min);
			TK_SetWeapVal ('max', loop, max);
			TK_SetWeapNum ('pb', loop, pointblank);
			TK_SetWeapNum ('ideal', loop, ideal);
			TK_SetWeapNum ('distant', loop, distant);
			TK_SetWeapVal ('health', loop, health);
			TK_SetWeapVal ('action', loop, action);
			TK_SetWeapVal ('mind', loop, mind);
		}
		with (document.skills[loop]) {
			TK_SetWeapVal ('skillaccuracy', loop, accuracy);
			TK_SetWeapVal ('skillspeed', loop, speed);
		}
	}

	if (document.target) with (document.target) {
		TK_SetTargVal ('ar', ar);
		TK_SetTargCheckedVal ('acid', acid);
		TK_SetTargCheckedVal ('blast', blast);
		TK_SetTargCheckedVal ('cold', cold);
		TK_SetTargCheckedVal ('electricity', electricity);
		TK_SetTargCheckedVal ('energy', energy);
		TK_SetTargCheckedVal ('heat', heat);
		TK_SetTargCheckedVal ('kinetic', kinetic);
		TK_SetTargCheckedVal ('restraint', restraint);
		TK_SetTargCheckedVal ('stun', stun);
	}
	document.loadDone = true;
}

function TK_UpdateStat (id, num, val)
{
	var elem;

	if (document.stats[id + num]) {
		elem = document.stats[id + num];
	} else {
		elem = document.getElementById (id + num);
		document.stats[id + num] = elem;
	}

	if (elem.textfield)
		elem.removeChild (elem.textfield);

	elem.style.color = '';
	elem.textfield = document.createTextNode (val);
	elem.appendChild (elem.textfield);
}

function TK_RoundOff (val, places)
{
	var val = Math.round (val * (Math.pow (10, places))) / Math.pow (10, places);
	val = val.toString ();
	if (val.indexOf ('.') >= 0)
		val = val.substring (0, val.indexOf ('.') + 2);

	return val;
}

function TK_SetColor (id, color)
{
	document.stats[id].style.color = color;
}

var hexCodes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

function TK_RedGreenGradiant (pct)
{
	var redval = 204;
	var greenval = 204;

	if (pct == 100) {
		return '#00a000';
	}
	if (pct > 50)
		redval -= (pct - 50) * 204 / 50;
	if (pct < 50)
		greenval -= (50 - pct) * 204 / 50;

	redval = hexCodes[(redval >> 4) & 15] + hexCodes[redval & 15];
	greenval = hexCodes[(greenval >> 4) & 15] + hexCodes[greenval & 15];

	return '#' + redval + greenval + '00';
}

function TK_Recalculate ()
{
	if (!document.stats) document.stats = new Array ();

	TK_UpdateWeapons ();
	TK_UpdateTarget ();

	var maxDPS = 0;
	var minDPS = 65536;

	var vals = new Array ();

	for (loop = 1; loop <= document.TK_WeaponCount; loop++)
	{
		var speed = TK_WeaponSpeed (document.weapons[loop], document.skills[loop], 0);
		var basescore = TK_BaseWeaponDPS (document.weapons[loop], document.skills[loop], 0, 0);
		var dmg = TK_BaseWeaponDPS (document.weapons[loop], document.skills[loop], document.target, 0);
		TK_BaseWeaponDPS (document.weapons[loop], document.skills[loop], 0, 0);
		var score = TK_DmgAfterResist (dmg, document.weapons[loop], document.target);
		var hamscore = TK_RoundOff (score / document.weapons[loop].health, 1) +
			'/' + TK_RoundOff (score / document.weapons[loop].action, 1) +
			'/' + TK_RoundOff (score / document.weapons[loop].mind, 1);

		var pb = TK_PBAccuracy (document.weapons[loop], document.skills[loop], 0, 0, 0);
		var ideal = TK_IdealAccuracy (document.weapons[loop], document.skills[loop], 0, 0, 0);
		var range = TK_RangeAccuracy (document.weapons[loop], document.skills[loop], 0, 0, 0);
		var pbdps = TK_DmgWithAccuracy (score, pb);
		var idealdps = TK_DmgWithAccuracy (score, ideal);
		var rangedps = TK_DmgWithAccuracy (score, range);

		TK_UpdateStat ('bscore', loop, TK_RoundOff (basescore, 1));
		TK_UpdateStat ('oscore', loop, TK_RoundOff (score, 1));
		TK_UpdateStat ('realspeed', loop, TK_RoundOff (speed, 1));
		TK_UpdateStat ('hscore', loop, hamscore);
		TK_UpdateStat ('pbdps', loop, TK_RoundOff (pbdps, 1));
		TK_UpdateStat ('idealdps', loop, TK_RoundOff (idealdps, 1));
		TK_UpdateStat ('maxdps', loop, TK_RoundOff (rangedps, 1));

		vals[(loop - 1) * 3 + 0] = pbdps;
		vals[(loop - 1) * 3 + 1] = idealdps;
		vals[(loop - 1) * 3 + 2] = rangedps;
	}

	for (loop = document.TK_WeaponCount * 3 - 1; loop >= 0; loop--)
	{
		if (vals[loop] > maxDPS)
			maxDPS = vals[loop];
		if (vals[loop] < minDPS)
			minDPS = vals[loop];
	}

	if (maxDPS == minDPS)
		minDPS -= 1;
	maxDPS -= minDPS;

	for (loop = 1; loop <= document.TK_WeaponCount; loop++)
	{
		TK_SetColor ('pbdps' + loop, TK_RedGreenGradiant ((vals[(loop - 1) * 3 + 0] - minDPS) * 100 / maxDPS));
		TK_SetColor ('idealdps' + loop, TK_RedGreenGradiant ((vals[(loop - 1) * 3 + 1] - minDPS) * 100 / maxDPS));
		TK_SetColor ('maxdps' + loop, TK_RedGreenGradiant ((vals[(loop - 1) * 3 + 2] - minDPS) * 100 / maxDPS));
	}
}

function TK_Script (src, text)
{
	if (src) src = ' src = "' + src + '"';
	if (text) text = '<!-' + '-\n' + text + '\n-' + '->';
	return '<script type="text/JavaScript"' + src + '>' + text + '</' + 'script>';
}

function TK_RewritePage(newcount)
{
	if (!document.loadDone) return;
	if (newcount < 1)
		newcount = 1;

	TK_UpdateWeapons ();
	TK_UpdateTarget ();

	var html = '<html>\n<head>\n';

	html += '<link rel="stylesheet" href="weapons.css" type="text/css">';
	html += TK_Script ('swgweapon.js', '');
	html += TK_Script ('swgweaponcalc.js', '');
	html += '</head>\n';

	html += '<body onload="TK_UpdateForm ();">\n';
	html += TK_MakeWeaponsTable (newcount);
	html += TK_MakeTargetTable ();

	html += '</body>\n</html>\n';

	var weapons = document.weapons;
	var weaponNames = document.weaponNames;
	var skills = document.skills;
	var target = document.target;

	document.open ();

	document.loadDone = false;

	document.TK_WeaponCount = newcount;
	document.weapons = weapons;
	document.weaponNames = weaponNames;

	document.skills = skills;

	document.target = target;

	document.stats = new Array ();

	document.write (html);

	document.close ();
}
