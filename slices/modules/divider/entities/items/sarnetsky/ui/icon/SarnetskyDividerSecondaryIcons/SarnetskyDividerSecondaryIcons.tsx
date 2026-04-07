import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import { usePrintUnitCallback } from "@/modules/print/shared/lib";
import { useSarnetskyDividerIcons } from "../../../lib";
import { useSarnetskyDividerContext } from "../../SarnetskyDividerContext";

export function SarnetskyDividerSecondaryIcons() {
	const { sxOptions, divider } = useSarnetskyDividerContext();
	const { objects } = sxOptions;

	const icons = useSarnetskyDividerIcons({ divider, objects });

	const mm = usePrintUnitCallback();

	return (
		<>
			{icons.map(({ icon, setIcon, config }) => (
				<Icon
					key={config.id}
					dividerId={divider.id}
					icon={icon}
					onClick={setIcon}
					{...config.params}
					sx={{
						position: "absolute",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 3,
						top: mm(config.top),
						right: mm(config.right),
						fontSize: mm(config.fontSize),
						width: mm(config.width),
						height: mm(config.height),
						color: config.light ? "#fff" : "#000",
						cursor: "pointer",
						"&:hover": {
							opacity: 0.5,
						},
					}}
				/>
			))}
		</>
	);
}
