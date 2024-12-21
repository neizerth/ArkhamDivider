import { ILayoutBleed } from "@/types/layouts";
import { getWebToPrintScale } from "@/util/units";
import { getDividerImage } from "./getDividerImage";
import { ImageFormat } from "@/types/image";
import { OnRenderCancelEventData, OnRenderDoneEventData, OnRenderEventData, RenderResponse } from "@/types/render";

export type DividerNodeRendererOptions = {
  bleed: ILayoutBleed
  imageFormat: ImageFormat
  onStart?: () => Promise<void>
  onRender?: (event: OnRenderEventData) => Promise<void>
  onCancel?: (event: OnRenderCancelEventData) => Promise<void>
  onDone?: (event: OnRenderDoneEventData) => Promise<void>
}

export type DividerNodeRendererStatus = 'running' | 'initial' | 'done' | 'cancelled';

export class DividerNodeRenderer {
  protected nodes: Element[] = []
  protected current = 0
  readonly scale = getWebToPrintScale()
  protected cancelled = false
  protected status: DividerNodeRendererStatus = 'initial';
  constructor (
    protected options: DividerNodeRendererOptions
  ) {}

  getStatus() {
    return this.status;
  }

  async run() {
    this.cancelled = false;
    this.nodes = [...document.querySelectorAll('.divider')];

    if (this.nodes.length > 0) {
      await this.next();
      return;
    }

    await this.onDone();
  }
  
  async next() {
    if (this.cancelled) {
      return;
    }

    const response = await this.render();
    await this.onRender(response);

    if (this.current === this.nodes.length - 1 && !this.cancelled) {
      await this.onDone();
      return;
    }

    this.current++;
    await this.next();
  }

  render() {
    const { scale } = this;
    const key = this.current;
    const node = this.nodes[key];
    const name = key > 9 ? key.toString() : '0' + key;
    const { bleed, imageFormat } = this.options;

    const options = {
      name,
      node,
      scale,
      bleed,
      imageFormat
    };

    return getDividerImage(options);
  }

  async cancel() {
    this.cancelled = true;
    await this.onCancel();
  }
  async onStart() {
    this.status = 'running';
    if (!this.options.onStart) {
      return;
    }
    await this.options.onStart()
  }

  async onRender(data: RenderResponse) {
    if (!this.options.onRender) {
      return;
    }
    await this.options.onRender({
      total: this.nodes.length,
      done: this.current + 1,
      data
    });
  }

  async onDone() {
    this.status = 'done';
    if (!this.options.onDone) {
      return;
    }
    await this.options.onDone({
      total: this.nodes.length
    });
  }

  async onCancel() {
    this.status = 'cancelled';
    if (!this.options.onCancel) {
      return;
    }
    await this.options.onCancel({
      total: this.nodes.length,
      done: this.current + 1
    });
  }
}