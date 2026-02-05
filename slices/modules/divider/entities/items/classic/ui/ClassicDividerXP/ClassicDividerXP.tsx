import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { isNumber } from "ramda-adjunct";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import { getXPLevel } from "@/modules/divider/shared/lib";
import {
	getPlayerCardTypeXPIcons,
	getSubtypeXPIcons,
} from "@/modules/divider/shared/lib/logic/icon";
import type {
	DividerSubtype,
	PlayerCardType,
	XPCost,
} from "@/modules/divider/shared/model";
import { absoluteFill } from "@/shared/config";
import * as C from "./ClassicDividerXP.styles";

// import { classicDividerObjects as O } from "../../config";

type ClassicDividerXPProps = {
	sx: SxProps;
	dividerId: string;
	xpCost?: XPCost | null;
} & (
	| {
			source: "subtype";
			subtype: DividerSubtype;
	  }
	| {
			source: "cardType";
			cardType: PlayerCardType;
	  }
);

export function ClassicDividerXP(props: ClassicDividerXPProps) {
	const { sx: sxProp, xpCost } = props;

	const item =
		props.source === "subtype"
			? getSubtypeXPIcons(props.subtype)
			: getPlayerCardTypeXPIcons(props.cardType);

	if (!item) {
		return null;
	}

	const level = getXPLevel(xpCost);

	const isSkill = props.source === "cardType" && props.cardType === "skill";

	const backgroundIconSx: SxProps = isSkill
		? {
				top: "0.14em",
				fontSize: "0.89em",
			}
		: {};

	const containerSx: SxProps = isSkill
		? {
				top: "-0.19em",
			}
		: {};

	const sx = {
		...sxProp,
		...(isSkill
			? {
					fontSize: "1.5em",
					translate: [0, "-0.01em"],
				}
			: {}),
	};

	return (
		<Box sx={sx}>
			{item.type === "fixed" ? (
				<Box position="relative" width="100%" height="100%">
					<Icon
						sx={{
							...absoluteFill,
							color: "#f8e6c4",
						}}
						icon={item.background}
					/>
					<Icon icon={item.icon} color={"#45413d"} />
				</Box>
			) : (
				<Box position="relative" width="100%" height="1em" sx={containerSx}>
					{isSkill && xpCost?.type === "fixed" && xpCost.value === 0 ? (
						<>
							<C.Level>
								<Icon icon={item.nullBackground} color={"#45413d"} />
							</C.Level>
							<C.Level>
								<Icon icon={"s_frame_background_null"} color={"#fff"} />
							</C.Level>
						</>
					) : (
						<>
							<Box position="relative" sx={backgroundIconSx}>
								<Icon icon={item.background} color={"#45413d"} />
							</Box>
							<C.Level>
								<Icon icon={`${item.levelPrefix}5`} color={"#767676"} />
							</C.Level>
							{xpCost?.type === "range" && (
								<>
									<C.Level zIndex={2}>
										<Icon
											icon={`${item.levelPrefix}${xpCost.max}`}
											color={"#fff"}
										/>
									</C.Level>
									<C.Level zIndex={2}>
										<Icon
											icon={`${item.levelPrefix}${xpCost.min - 1}`}
											color={"#939393"}
										/>
									</C.Level>
									{isSkill && (
										<C.Level
											zIndex={4}
											sx={{
												fontSize: "0.83em",
												transform: "translateY(-0.01em)",
											}}
										>
											<Icon icon={"s_level_0"} color={"#fff"} />
										</C.Level>
									)}
								</>
							)}
							{xpCost?.type === "fixed" && isNumber(level) && (
								<>
									<C.Level zIndex={2}>
										<Icon icon={`${item.levelPrefix}${level}`} color={"#fff"} />
									</C.Level>
									{level > 1 && (
										<C.Level zIndex={3}>
											<Icon
												icon={`${item.levelPrefix}${level - 1}`}
												color={"#939393"}
											/>
										</C.Level>
									)}
									{isSkill && (
										<C.Level zIndex={4} sx={{ fontSize: "0.8em" }}>
											<Icon icon={"s_level_0"} color={"#fff"} />
										</C.Level>
									)}
								</>
							)}
						</>
					)}
				</Box>
			)}
		</Box>
	);
}
