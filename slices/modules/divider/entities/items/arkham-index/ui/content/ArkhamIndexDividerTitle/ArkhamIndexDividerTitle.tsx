import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import {
	Box,
	type BoxProps,
	Button,
	type SxProps,
	Tooltip,
} from "@mui/material";
import { useCallback } from "react";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import {
	setAllDividersParam,
	useDividerParamState,
} from "@/modules/divider/shared/lib";
import { usePrintSx } from "@/modules/print/shared/lib";
import { useStoryTranslation } from "@/modules/story/shared/lib";
import { useAppDispatch } from "@/shared/lib";
import { Row } from "@/shared/ui";
import { getArkhamIndexDefaultDividerTitle } from "../../../lib";
import { useArkhamIndexContext } from "../../ArkhamIndexContext";
import * as S from "./ArkhamIndexDividerTitle.styles";

type ArkhamIndexDividerTitleProps = BoxProps;

export function ArkhamIndexDividerTitle(props: ArkhamIndexDividerTitleProps) {
	const dispatch = useAppDispatch();
	const { divider, sxOptions, tabSize, layout } = useArkhamIndexContext();

	const { showIcon, fontFamily } = sxOptions;

	const { t } = useStoryTranslation(divider.story);

	const [centerTextByTab, setCenterTextByTab] = useDividerParamState<boolean>({
		dividerId: divider.id,
		key: "centerTextByTab",
	});

	const setAllCenterTextByTab = useCallback(
		(value = false) => {
			dispatch(setAllDividersParam({ key: "centerTextByTab", value }));
		},
		[dispatch],
	);

	const getPrintSx = usePrintSx(sxOptions);
	const getLocaleSx = useLocaleSx(sxOptions);
	const titleSx = getLocaleSx(S.getTitleSx);
	const titleClearSx = getPrintSx(S.getTitleClearSx);
	const titleOutlineSx = getPrintSx(S.getTitleOutlineSx);
	const strokeSx = getPrintSx(S.getStrokeSx);
	const textSx = getPrintSx(S.getTextSx);
	const centerTextSx = getPrintSx(S.getCenterTextSx);

	const defaultTitle = getArkhamIndexDefaultDividerTitle({
		divider,
		tabSize,
		showIcon,
	});

	const defaultTranslatedTitle = t(defaultTitle ?? "");

	const isConkordia = fontFamily === "Conkordia";

	const transformedTitle = isConkordia
		? defaultTranslatedTitle.toUpperCase()
		: defaultTranslatedTitle;

	const {
		value: title,
		translatedValue: defaultValue,
		onFontSizeChange,
		onChange,
		onBlur,
	} = useDividerText({
		divider,
		param: "customTitle",
		fontSizeScaleParam: "custonFontSizeScale",
		defaultValue: transformedTitle,
	});

	const sx = {
		...props.sx,
		...titleSx,
	} as SxProps;

	if (!defaultTitle || layout.params?.title === false) {
		return null;
	}

	return (
		<Box {...props} sx={sx}>
			<DividerText
				dividerId={divider.id}
				sx={textSx}
				value={title}
				defaultValue={defaultValue}
				fitTextOptions={{
					minFontSize: 5,
					onFontSizeChange,
				}}
				onValueChange={onChange}
				onBlur={onBlur}
				clearProps={{ sx: titleClearSx }}
				outlineSx={titleOutlineSx}
				strokeSx={strokeSx}
				visible
			/>

			<Row sx={centerTextSx} gap={2} displayPrint="none">
				<Tooltip title={t("divider.arkham-index.setAllCenterTextByTab")} arrow>
					<Button
						variant="outlined"
						onClick={() => setAllCenterTextByTab(centerTextByTab)}
					>
						<AutoAwesomeMotionIcon />
					</Button>
				</Tooltip>
				<Tooltip title={t("divider.arkham-index.centerTextByTab")} arrow>
					<Button
						variant={centerTextByTab ? "contained" : "outlined"}
						onClick={() => setCenterTextByTab(!centerTextByTab)}
					>
						<FormatAlignCenterIcon />
					</Button>
				</Tooltip>
			</Row>
		</Box>
	);
}
