import { ILayoutBleed } from "@/types/layouts";
import { getWebToPrintScale } from "@/util/units";
import { getDividerImage } from "./getDividerImage";
import { ColorScheme, ImageFormat } from "@/types/image";
import { RenderResponse } from "@/types/render";
import { EventEmitter } from "@/features/events/EventEmitter";

export type DividerNodeRendererOptions = {
  bleed: ILayoutBleed
  imageFormat: ImageFormat
  colorScheme?: ColorScheme
}

export type DividerNodeRendererStatus = 'running' | 'initial' | 'done' | 'cancelled';

export class DividerNodeRenderer extends EventEmitter {
  protected nodes: Element[] = []
  protected current = 0
  readonly scale = getWebToPrintScale()
  protected cancelled = false
  protected status: DividerNodeRendererStatus = 'initial';
  constructor (
    protected options: DividerNodeRendererOptions
  ) {
    super();
  }

  getStatus() {
    return this.status;
  }

  async run() {
    await this.onStart();
    
    this.current = 0;
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
    const { bleed, imageFormat, colorScheme } = this.options;

    const options = {
      name,
      node,
      scale,
      bleed,
      imageFormat,
      colorScheme
    };

    return getDividerImage(options);
  }

  async cancel() {
    this.cancelled = true;
    await this.onCancel();
  }
  async onStart() {
    this.status = 'running';
    this.emit('start');
  }

  async onRender(data: RenderResponse) {
    
    const event = {
      total: this.nodes.length,
      done: this.current + 1,
      data
    };
    this.emit('render', event);
  }

  async onDone() {
    this.status = 'done';
    const event = {
      total: this.nodes.length
    }
    this.emit('done', event);
  }

  async onCancel() {
    this.status = 'cancelled';
    const event = {
      total: this.nodes.length,
      done: this.current + 1
    };
    this.emit('cancel', event);
  }
}