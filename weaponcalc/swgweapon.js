// Code and graphics Copyright &copy; Steven Lang, 2004
// Unauthorized use or distribution strictly forbidden
// Contact Tiaga on SWG Station forum for more details

function TK_Weapon (ap, speed, type, min, max, pb, ideal, distant, h, a, m)
{
	this.ap = ap;
	this.speed = speed;
	this.type = type;
	this.min = min;
	this.max = max;
	this.pointblank = pb;
	this.ideal = ideal;
	this.distant = distant;
	this.health = h;
	this.action = a;
	this.mind = m;
}

function TK_Armor (ar, acid, blast, cold, elec, ener, heat, kin, restraint, stun)
{
	this.ar = ar;
	this.electricity = elec;
	this.kinetic = kin;
	this.blast = blast;
	this.restraint = restraint;
	this.heat = heat;
	this.cold = cold;
	this.acid = acid;
	this.stun = stun;
	this.energy = ener;
}

function TK_Skill (accuracy, speed)
{
	this.accuracy = accuracy;
	this.speed = speed;
}

function TK_WeaponSpeed (weapon, skill, speedmod)
{
	var speed = weapon.speed * (1 - (skill.speed + speedmod) / 100);
	if (speed < 1.0) speed = 1.0;

	return speed;
}

function TK_WeaponDamage (weapon, target)
{
	var dmg = ((weapon.min + weapon.max) / 2) * 1.5;
	if (!target || target[weapon.type] == 'Vulnerable') {
		return dmg;
	}

	if (weapon.ap > target.ar) {
		dmg = dmg * Math.pow (1.25, weapon.ap - target.ar);
	} else {
		dmg = dmg * Math.pow (0.50, target.ar - weapon.ap);
	}

	return dmg;
}

function TK_Accuracy (weaponrating, skill, extraskillmod, targetmod, shootermod)
{
	var accuracy = 66 + (skill.accuracy + weaponrating + extraskillmod - targetmod) / 2 + shootermod;

	if (accuracy < 5) accuracy = 5;
	if (accuracy > 95) accuracy = 95;


	return accuracy;
}

function TK_PBAccuracy (weapon, skill, extraskillmod, targetmod, shootermod)
{
	return TK_Accuracy (weapon.pointblank, skill, extraskillmod, targetmod, shootermod);
}

function TK_IdealAccuracy (weapon, skill, extraskillmod, targetmod, shootermod)
{
	return TK_Accuracy (weapon.ideal, skill, extraskillmod, targetmod, shootermod);
}

function TK_RangeAccuracy (weapon, skill, extraskillmod, targetmod, shootermod)
{
	return TK_Accuracy (weapon.distant, skill, extraskillmod, targetmod, shootermod);
}

function TK_BaseWeaponDPS (weapon, skill, target, speedmod)
{
	return TK_WeaponDamage (weapon, target) / TK_WeaponSpeed (weapon, skill, speedmod);
}

function TK_HAM (health, action, mind)
{
	this.health = health;
	this.action = action;
	this.mind = mind;
}

function TK_HamRating (weapon)
{
	var dmg = TK_WeaponDamage (weapon, 0);
	this.health = dmg / weapon.health;
	this.action = dmg / weapon.action;
	this.mind = dmg / weapon.mind;
}

function TK_DmgAfterResist (dmg, weapon, target)
{
	var resist = target[weapon.type];

	if (resist == 'Vulnerable' || resist < 0) resist = 0;
	if (resist > 100) resist = 100;
	if (!resist) return dmg;

	return dmg * (1 - resist / 100);
}

function TK_DmgWithAccuracy (dmg, accuracy)
{
	return dmg * accuracy / 100;
}
