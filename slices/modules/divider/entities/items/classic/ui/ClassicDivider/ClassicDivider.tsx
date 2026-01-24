import {
	DividerBackground as Background,
	DividerContainer as Container,
	DividerContent as Content,
} from "@/modules/divider/entities/ui";
import { selectLayout } from "@/modules/divider/shared/lib";
import type { Divider, DividerLayout } from "@/modules/divider/shared/model";
import { useAppSelector } from "@/shared/lib";

type ClassicDividerProps = Divider;

type ClassicLayoutParams = {
	background: string;
};

export function ClassicDivider(_props: ClassicDividerProps) {
	const layout = useAppSelector(selectLayout) as DividerLayout;
	const { background } = layout.params as ClassicLayoutParams;

	return (
		<Container>
			<Background src={background} alt={layout.name} />
			<Content>classic</Content>
		</Container>
	);
}
