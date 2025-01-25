import { PropsWithClassName } from "@/shared/types/util";
import S from "./ArkhamesqueClassicDividerCanvas.module.scss";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectLayout } from "@/app/store/features/layout/layout";
import { Stage, Layer, Image } from "react-konva";
import { getBleedCanvasSize } from "./features/size";
import classNames from "classnames";
import { ArkhamesqueClassicDividerCanvasIcon as Icon } from "./ArkhamesqueClassicDividerCanvasIcon";
import { memo, useEffect, useRef, useState } from "react";
import useImage from "use-image";
import Konva from "konva";
import { ARKHAMESQUE_RENDER_DEBUG } from "@/shared/config/app";
import { selectIcons } from "@/app/store/features/icons/icons";
import { propEq } from "ramda";

export type ArkhamesqueClassicDividerCanvasProps = PropsWithClassName & {
	previewIcon?: string | false;
	specialIcon?: string | false;
	image: string;
	onRender: () => void;
};

export const ArkhamesqueClassicDividerCanvas = ({
	className,
	specialIcon,
	previewIcon,
	...props
}: ArkhamesqueClassicDividerCanvasProps) => {
	const { bleed } = useAppSelector(selectLayout);

	const [url, setUrl] = useState<string | null>(null);

	const icons = useAppSelector(selectIcons);

	const preview = previewIcon && icons.find(propEq(previewIcon, "icon"));
	const special = specialIcon && icons.find(propEq(specialIcon, "icon"));

	const [image, status] = useImage(props.image, "anonymous");
	const [isRendered, setIsRendered] = useState(false);

	const ref = useRef<Konva.Stage>(null);

	const canvasSize = getBleedCanvasSize(bleed);

	const isLoaded = status === "loaded";

	const renderImage = async (stage: Konva.Stage) => {
		const blob = (await stage.toBlob()) as Blob | null;

		if (!blob) {
			console.error("blob not rendered");
			return;
		}

		const blobURL = URL.createObjectURL(blob);
		setUrl(blobURL);
	};

	useEffect(() => {
		setUrl(null);
		setIsRendered(false);
	}, [preview, previewIcon, specialIcon]);

	useEffect(() => {
		if (!isLoaded) {
			return;
		}

		if (!ref.current) {
			return;
		}

		renderImage(ref.current);

		return () => {
			if (!url) {
				return;
			}
			URL.revokeObjectURL(url);
			image?.remove();
		};
	}, [ref, previewIcon, specialIcon, image, isLoaded]);

	const onImageLoad = async () => {
		if (!url) {
			return;
		}
		// URL.revokeObjectURL(url);
		setIsRendered(true);
		props.onRender();
	};

	// const devMode = IS_DEVELOPMENT;
	const devMode = ARKHAMESQUE_RENDER_DEBUG;
	const showCanvas = (isLoaded && !url && !isRendered) || devMode;

	return (
		<>
			{url && (
				<img
					src={url}
					onLoad={onImageLoad}
					className={classNames(className, S.image, isRendered && S.rendered)}
				/>
			)}
			{showCanvas && (
				<Stage
					className={classNames(
						S.container,
						devMode && S.development,
						className,
					)}
					width={canvasSize.width}
					height={canvasSize.height}
					preventDefault={false}
					ref={ref}
				>
					<Layer>
						<Image image={image} width={canvasSize.width} />
						{special && (
							<Icon
								icon={special}
								type="special"
								height={60}
								container={{
									x: 531,
									y: 854,
									width: 62,
									height: 62,
								}}
							/>
						)}
						{preview && (
							<Icon
								icon={preview}
								height={92}
								container={{
									x: 116,
									y: 64,
									width: 104,
									height: 104,
								}}
							/>
						)}
					</Layer>
				</Stage>
			)}
		</>
	);
};

export const ArkhamesqueClassicDividerCanvasMemo = memo(
	ArkhamesqueClassicDividerCanvas,
);
