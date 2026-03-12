import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	astral_perils: {
		left: percent(3),
	},
	blood_magus: {
		top: percent(-2),
		left: percent(3),
	},
	blood_pact: {
		top: percent(-1),
		left: percent(3),
	},
	cultists_of_uvhash: {
		top: percent(-2),
		left: percent(3),
		scale: percent(90),
	},
	eldritch_feast: {
		top: percent(-2),
		left: percent(3),
	},
	hemophage: {
		top: percent(-2),
		left: percent(3),
	},
	hounds_of_tindalos: {
		top: percent(3),
		left: percent(3),
	},
	profane_rituals: {
		top: percent(-4),
		left: percent(3),
		scale: percent(105),
	},
	revelations: {
		top: percent(-10),
		left: percent(3),
	},
	the_red_mist: {
		top: percent(-6),
	},
	thralls: {
		top: percent(-13),
		left: percent(3),
	},
	wrath_of_uvhash: {
		top: percent(-4),
		left: percent(3),
		scale: percent(105),
	},
	yithians: {
		top: percent(-4),
		left: percent(3),
		scale: percent(105),
	},
	paid_in_blood: {
		top: percent(-4),
		left: percent(3),
	},
	feast_of_flesh: {
		top: percent(-5),
		left: percent(3),
		scale: percent(90),
	},
	astral_dreams: {
		top: percent(-4),
		left: percent(3),
	},
	unhallowed_oath: {
		top: percent(-4),
		left: percent(3),
		scale: percent(105),
	},
	jaws_of_the_dragon: {
		top: percent(-6),
		scale: percent(95),
	},
	crimson_harvest: {
		top: percent(3),
		left: percent(3),
	},
	temple_of_blood: {
		top: percent(-8),
		left: percent(3),
		scale: percent(95),
	},
	thirst_eternal: {
		top: percent(-4),
		left: percent(3),
		scale: percent(105),
	},
};

const prefixedIcons = prefixIcons("souls_of_darkness", icons);

export default {
	souls_of_darkness: {
		top: percent(-4),
		left: percent(3),
		scale: percent(85),
	},
	...prefixedIcons,
} as IconPositionManifest;
