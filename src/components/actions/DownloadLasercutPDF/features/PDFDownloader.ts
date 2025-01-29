import { EventEmitter } from "@/shared/lib/features/events/EventEmitter";
import { DividerNodeRenderer } from "@/shared/lib/features/render/DividerNodeRenderer";
import type { ColorScheme, ImageFormat } from "@/shared/model/types/image";
import type { ILayoutBleed } from "@/shared/model/types/layouts";
import type { OnRenderEventData } from "@/shared/model/types/render";

export class PDFDownloader extends EventEmitter {
	protected _renderer: DividerNodeRenderer;
	protected items: Uint8Array[] = [];

	constructor(
		protected options: {
			name: string;
			imageFormat: ImageFormat;
			bleed: ILayoutBleed;
			colorScheme?: ColorScheme;
		},
	) {
		super();
		this._renderer = this.getRenderer();
	}
	get renderer() {
		return this._renderer;
	}
	protected getRenderer() {
		const renderer = new DividerNodeRenderer(this.options);

		renderer
			.on("start", () => {
				this.items = [];
			})
			.on("render", ({ data }: OnRenderEventData) => {
				this.items.push(data.contents);
			})
			.on("done", () => {
				this.emit("render", this.items);
			});

		return renderer;
	}
}
