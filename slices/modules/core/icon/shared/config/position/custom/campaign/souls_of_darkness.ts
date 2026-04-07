import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";
import { prefixIcons } from "../../util";

const icons: IconPositionManifest = {
	astral_perils: {},
	blood_magus: {
		left: percent(-1),
	},
	blood_pact: {
		left: percent(-1),
		top: percent(1),
	},
	cultists_of_uvhash: {
		left: percent(-1),
		scale: percent(90),
	},
	eldritch_feast: {
		left: percent(-1),
	},
	hemophage: {
		left: percent(-1),
	},
	hounds_of_tindalos: {
		left: percent(-1),
		top: percent(5),
	},
	profane_rituals: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(105),
	},
	revelations: {
		left: percent(-1),
		top: percent(-8),
	},
	the_red_mist: {
		left: percent(-4),
		top: percent(-4),
	},
	thralls: {
		left: percent(-1),
		top: percent(-11),
	},
	wrath_of_uvhash: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(105),
	},
	yithians: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(105),
	},
	paid_in_blood: {
		left: percent(-1),
		top: percent(-2),
	},
	feast_of_flesh: {
		left: percent(-1),
		top: percent(-3),
		scale: percent(90),
	},
	astral_dreams: {
		left: percent(-1),
		top: percent(-2),
	},
	unhallowed_oath: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(105),
	},
	jaws_of_the_dragon: {
		left: percent(-4),
		top: percent(-4),
		scale: percent(95),
	},
	crimson_harvest: {
		left: percent(-1),
		top: percent(5),
	},
	temple_of_blood: {
		left: percent(-1),
		top: percent(-6),
		scale: percent(95),
	},
	thirst_eternal: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(105),
	},
};

const prefixedIcons = prefixIcons("souls_of_darkness", icons);

export default {
	souls_of_darkness: {
		left: percent(-1),
		top: percent(-2),
		scale: percent(85),
	},
	...prefixedIcons,
} as IconPositionManifest;
