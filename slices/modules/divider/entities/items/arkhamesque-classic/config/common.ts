export const arkhamesqueClassicCategoryId = "arkhamesque-classic";

export const arkhamesqueClassicDataBaseUrl = import.meta.env
	.VITE_ARKHAMESQUE_URL;

export const arkhamesqueClassicObjects = {
	icon: {
		left: 6.9,
		top: 2.5,
		width: 8.8,
		height: 8.6,
		fontSize: 8,
		right: 0.6,
	},
	bottomIcon: {
		top: 69.2,
		left: 0,
		right: 0,
		height: 5.8,
		fontSize: 5.4,
	},
	title: {
		fontSize: 4,
		height: 6,
		top: 3.8,
		left: 16,
		right: 16,
	},
	scenarioNumber: {
		/** Absolute Y position of the scenario number badge (mm). */
		// top: 4.3,
		// top: 5,
		top: 4.3,
		/** Absolute X position from the right edge (mm). */
		right: 7.8,
		/** Fixed badge width (mm). */
		width: 5.9,
		/** Fixed badge height (mm). */
		height: 5.5,
		/** Inner fit container width (mm). */
		innerWidth: 4,
		/** Base font size (mm) used as FitText baseline. */
		fontSize: 4.8,
	},
	xp: {
		/** Absolute Y position of the XP badge (mm). */
		top: 4.3,
		/** Absolute X position from the right edge (mm). */
		right: 8.1,
		/** Fixed XP badge width (mm). */
		width: 5.4,
		/** Fixed XP badge height (mm). */
		height: 5.2,
		/**
		 * Base font size for XP digits (mm) before applying variant scaling.
		 * Variant scales are applied on top of this value.
		 */
		baseFontSize: 4.8,
		variant: {
			/**
			 * Typography presets per XP rendering mode.
			 *
			 * - `scale`: multiplier for `baseFontSize`
			 * - `top`: container shift in `em` (relative to the computed font size)
			 * - `letterSpacing`: additional typography tweak in `em` (relative to font size)
			 */
			single: {
				scale: 1,
				/** Container offset in `em` (relative to font size). */
				top: 0,
			},
			plus: {
				scale: 0.95,
				/** Container offset in `em` (relative to font size). */
				top: 0.05,
			},
			range: {
				scale: 0.62,
				/** Container offset in `em` (relative to font size). */
				top: -0.05,
				/** Letter spacing in `em` (relative to font size). */
				letterSpacing: -0.04,
			},
		},
		number: {
			/**
			 * Some digits sit visually higher in the legacy font.
			 * We nudge these values down by `downshiftTop` (in `em`).
			 */
			downshiftValues: [1, 2, 3, 5],
			/** Downshift amount in `em` (relative to digit font size). */
			downshiftTop: 0.03,
		},
		plus: {
			/** Plus sign font size multiplier (relative to variant font size). */
			fontSize: 0.57,
			/** Plus sign vertical offset in `em`. */
			top: -0.17,
			/** Plus sign horizontal tweak per left digit (values in `em`). */
			marginLeftByLevel: {
				0: -0.05,
				1: -0.25,
				2: -0.15,
				3: -0.1,
			},
		},
		minus: {
			/** Minus sign font size multiplier (relative to variant font size). */
			fontSize: 0.8,
			/** Minus sign vertical offset in `em`. */
			top: -0.05,
			/** Minus sign right margin in `em`. */
			marginRight: 0.1,
			/** Minus sign left margin in `em`. */
			marginLeft: 0.05,
		},
	},
};
