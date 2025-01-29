import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { Area, Container } from "./components";

export type ZoomViewProps = PropsWithChildren & {
	zoom: number;
};

export const ZoomView = ({ zoom, children }: ZoomViewProps) => {
	const areaRef = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState<number>();

	useEffect(() => {
		if (!areaRef.current) {
			return;
		}

		const rect = areaRef.current.getBoundingClientRect();
		setHeight(rect.height);
	}, [areaRef, zoom]);

	return (
		<Container $height={height}>
			<Area $zoom={zoom} ref={areaRef}>
				{children}
			</Area>
		</Container>
	);
};
