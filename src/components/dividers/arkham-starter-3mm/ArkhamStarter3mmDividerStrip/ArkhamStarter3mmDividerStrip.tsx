import classNames from "classnames";
import S from "./ArkhamStarter3mmDividerStrip.module.scss";
import stripBorder from "./images/stripBorder.png";
import stripInner from "./images/stripInner.png";
import { DividerText } from "../../common/DividerText/DividerText";
import { TextFit } from "@/components/ui/behavior/TextFit/TextFit";

export type ArkhamStarter3mmDividerStripProps = {
	color: string;
	secondaryColor?: string;
	horizontal?: boolean;
	reverse?: boolean;
	editable?: boolean;
	text?: string;
	onChange?: (value: string) => void;
	onClear?: () => void;
};

export const ArkhamStarter3mmDividerStrip = ({
	color,
	secondaryColor,
	horizontal,
	reverse,
	text,
	editable,
	onChange,
	onClear,
}: ArkhamStarter3mmDividerStripProps) => {
	return (
		<div
			className={classNames(
				S.container,
				horizontal ? S.horizontal : S.vertical,
				reverse && S.reverse,
			)}
		>
			{text && (
				<div className={S.contentWrapper}>
					<div className={S.content}>
						{editable && (
							<DividerText
								defaultValue={text}
								fixedFontSize={false}
								fullHeight={false}
								onChange={onChange}
								onClear={onClear}
								inputClassName={S.text}
								strokeClassName={S.textStroke}
								// stroke
							/>
						)}
						{!editable && (
							<TextFit
								text={text}
								key={text}
								className={S.text}
								strokeClassName={S.textStroke}
								// stroke
							/>
						)}
					</div>
				</div>
			)}

			<div className={classNames(S.wrapper)}>
				<div className={S.inner}>
					<div className={S.color} style={{ backgroundColor: color }} />
					<div
						className={S.secondaryColor}
						style={{ backgroundColor: secondaryColor }}
					/>
					<img className={classNames(S.stripInner)} src={stripInner} />
				</div>

				<img className={classNames(S.stripBorder)} src={stripBorder} />
			</div>
		</div>
	);
};
