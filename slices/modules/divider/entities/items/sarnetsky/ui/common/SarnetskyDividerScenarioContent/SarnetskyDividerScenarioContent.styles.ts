import type { SarnetskyDividerSxCallback } from "../../../model";

/**
 * Height of the background box, published by `SarnetskyDividerScenarioContent` from a
 * `ResizeObserver`. `getBackgroundIconSx` explains why it travels as a custom property.
 */
export const backgroundIconSizeVar = "--sarnetsky-background-icon-size";

export const getBackgroundIconSx: SarnetskyDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	mixBlendMode: "multiply",
	/**
	 * The icon fills the height of its box, which shrinks below the
	 * `O.background.fontSize`mm cap whenever the encounter rows underneath need the room.
	 *
	 * That used to be `100cqh` against a `container-type: size` parent, but Chrome drops
	 * the *entire* print output — every sheet comes out blank, page count intact — when a
	 * size container is laid out for printing, so no container query may appear inside a
	 * divider. The box is measured instead and republished through a custom property.
	 *
	 * Keeping it a `var()` rather than a plain px value is deliberate: `IconCorrection`
	 * parses a numeric `fontSize` out of `sx` and applies the per-icon manifest correction
	 * to it, which `100cqh` never triggered. A `var()` is just as unparsable, so the icons
	 * keep the size they have always had.
	 */
	fontSize: `var(${backgroundIconSizeVar}, ${mm(O.background.fontSize)})`,
	opacity: O.background.opacity,
	color: "#000",
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: O.background.opacity * 0.5,
		},
	},
});

export const getBackgroundSx: SarnetskyDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	display: "flex",
	/**
	 * The icon fills this box and the box fills whatever the encounter rows leave, so on a
	 * scenario with many rows it used to run straight into them. The second term keeps a
	 * strip of air below; `min()` only bites when the free space is the smaller of the two,
	 * so a divider that already has room keeps the exact size and position it had.
	 */
	maxHeight: `min(${mm(O.background.fontSize)}, calc(100% - ${mm(
		O.background.gap,
	)}))`,
	/**
	 * `container-type: size` used to carry size containment with it, which kept the icon
	 * from contributing anything to the height of this box or of its flex ancestors. Both
	 * levels now need their automatic minimum size cleared, or the glyph props the box open
	 * at the full cap and squeezes the encounter rows underneath instead of shrinking.
	 */
	minHeight: 0,
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
});

export const getBackgroundContainerSx: SarnetskyDividerSxCallback = ({
	orientation,
}) => ({
	flex: 1,
	minHeight: 0,
	justifyContent: orientation === "horizontal" ? "flex-start" : "center",
});

export const getFrameColorPickerSx: SarnetskyDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	bottom: mm(1.5),
	right: 0,
	zIndex: 3,
	width: mm(4),
	height: mm(4),
});

export const getOverlayColorPickerSx: SarnetskyDividerSxCallback = ({
	mm,
}) => ({
	position: "absolute",
	bottom: mm(8),
	right: 0,
	zIndex: 3,
	width: mm(4),
	height: mm(4),
});
