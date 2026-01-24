import { DividerContainer } from "@/modules/divider/entities/ui";
import { DividerContent } from "@/modules/divider/entities/ui/DividerContent";
import { selectLayout } from "@/modules/divider/shared/lib";
import type { Divider, DividerLayout } from "@/modules/divider/shared/model";
import { absoluteFill } from "@/shared/config";
import { useAppSelector } from "@/shared/lib";

type ClassicDividerProps = Divider;

type ClassicLayoutParams = {
	background: string;
};

export function ClassicDivider(_props: ClassicDividerProps) {
	const layout = useAppSelector(selectLayout) as DividerLayout;
	const { background } = layout.params as ClassicLayoutParams;

	return (
		<DividerContainer>
			<img
				style={{
					...absoluteFill,
					zIndex: 1,
				}}
				src={background}
				alt={layout.name}
			/>
			<DividerContent zIndex={2}>classic</DividerContent>
		</DividerContainer>
	);
}
