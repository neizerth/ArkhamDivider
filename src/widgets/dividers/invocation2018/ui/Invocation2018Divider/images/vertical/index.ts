import guardian from "./guardian.png";
import multiclass from "./multiclass.png";
import mystic from "./mystic.png";
import neutral from "./neutral.png";
import rogue from "./rogue.png";
import seeker from "./seeker.png";
import survivor from "./survivor.png";

import { LayoutOrientation } from "@/shared/model/types/layouts";
import guardianXP from "./guardian_xp.png";
import multiclassXP from "./multiclass_xp.png";
import mysticXP from "./mystic_xp.png";
import neutralXP from "./neutral_xp.png";
import rogueXP from "./rogue_xp.png";
import seekerXP from "./seeker_xp.png";
import survivorXP from "./survivor_xp.png";

export const baseBackgrounds = [
	{
		faction: "mystic",
		src: mystic,
		xp: false,
	},
	{
		faction: "neutral",
		src: neutral,
		xp: false,
	},
	{
		faction: "guardian",
		src: guardian,
		xp: false,
	},
	{
		faction: "rogue",
		src: rogue,
		xp: false,
	},
	{
		faction: "survivor",
		src: survivor,
		xp: false,
	},
	{
		faction: "seeker",
		src: seeker,
		xp: false,
	},
	{
		faction: "multiclass",
		src: multiclass,
		xp: false,
	},
];

export const xpBackgrounds = [
	{
		faction: "mystic",
		src: mysticXP,
		xp: true,
	},
	{
		faction: "neutral",
		src: neutralXP,
		xp: true,
	},
	{
		faction: "guardian",
		src: guardianXP,
		xp: true,
	},
	{
		faction: "rogue",
		src: rogueXP,
		xp: true,
	},
	{
		faction: "survivor",
		src: survivorXP,
		xp: true,
	},
	{
		faction: "seeker",
		src: seekerXP,
		xp: true,
	},
	{
		faction: "multiclass",
		src: multiclassXP,
		xp: true,
	},
];

export const verticalBackgrounds = [...baseBackgrounds, ...xpBackgrounds].map(
	(item) => ({
		...item,
		orientation: LayoutOrientation.VERTICAL,
	}),
);

// export const experienceBackgrounds =
