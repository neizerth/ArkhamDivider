import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import type { DividerWithRelations } from "@/modules/divider/shared/model";
import { usePrintSx } from "@/modules/print/shared/lib";
import type { ClassicDividerCallbackProps } from "../../model";
import * as S from "./ClassicDividerCampaignName.styles";

type ClassicDividerCampaignNameProps = {
	divider: DividerWithRelations;
	sxOptions: ClassicDividerCallbackProps;
};

export function ClassicDividerCampaignName({
	divider,
	sxOptions,
}: ClassicDividerCampaignNameProps) {
	const getLocaleSx = useLocaleSx(sxOptions);
	const getPrintSx = usePrintSx(sxOptions);

	const sx = getLocaleSx(S.getSx);
	const outlineSx = getPrintSx(S.getOutlineSx);
	const clearSx = getPrintSx(S.getClearSx);

	const { value, translatedValue, onChange, onBlur, onFontSizeChange } =
		useDividerText({
			divider,
			param: "customCampaignName",
			fontSizeScaleParam: "campaignNameFontSizeScale",
			custom: true,
			defaultValue: divider.story?.name,
		});

	return (
		<DividerText
			dividerId={divider.id}
			sx={sx}
			value={value}
			defaultValue={translatedValue}
			fitTextOptions={{
				minFontSize: 8,
				onFontSizeChange,
			}}
			onValueChange={onChange}
			onBlur={onBlur}
			clearProps={{ sx: clearSx }}
			outlineSx={outlineSx}
		/>
	);
}
