import type { SVGProps } from "react";
import type { LocaleSxCallback } from "@/modules/core/i18n/shared/model";
import type { Icon } from "@/modules/core/icon/shared/model";
import type {
	DividerLayout,
	DividerWithRelations,
} from "@/modules/divider/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { getSarnetskyBandLayoutObjects } from "../lib";

export type SarnetskyBandParams = {
	customTitle?: string;
	icon?: Icon | null;
	color?: string;
};

export type SarnetskyBandProps = DividerWithRelations<SarnetskyBandParams>;

export type SarnetskyBandLayout = DividerLayout;

export type SarnetskyBandObjects = ReturnType<
	typeof getSarnetskyBandLayoutObjects
>;

export type SarnetskyBandType =
	| "scenario"
	| "encounter"
	| "standalone"
	| "concealed";

export type SarnetskyBandSxOptions = {
	objects: SarnetskyBandObjects;
	type: SarnetskyBandType;
};

export type SarnetskyBandSxCallback<T = void> = PrintSxCallback<
	SarnetskyBandSxOptions & T
>;

export type SarnetskyBandLocaleSxCallback<T = void> = LocaleSxCallback<
	SarnetskyBandSxOptions & T
>;

export type SarnetskyBandImage =
	| {
			type: "background";
			src: string;
	  }
	| {
			type: "frame" | "variable" | "line";
			Component: React.ComponentType<SVGProps<SVGSVGElement>>;
	  };
