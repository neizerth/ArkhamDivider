import { ILayoutBleed } from "@/types/layouts";
import { getWebToPrintScale } from "@/util/units";
import { getDividerImage } from "./getDividerImage";

type RenderResponse = Awaited<ReturnType<typeof getDividerImage>>;

export type DividerNodeRendererRenderEventData = {
  data: RenderResponse
  total: number
  done: number
}

export type DividerNodeRendererCancelEventData = {
  total: number
  done: number
}

export type DividerNodeRendererDoneEventData = {
  total: number
}

export type DividerNodeRendererOptions = {
  bleed: ILayoutBleed
  onStart?: () => void
  onRender?: (event: DividerNodeRendererRenderEventData) => void
  onCancel?: (event: DividerNodeRendererCancelEventData) => void
  onDone?: (event: DividerNodeRendererDoneEventData) => void
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

    this.onDone();
  }
  
  async next() {
    if (this.cancelled) {
      return;
    }

    const response = await this.render();
    this.onRender(response);

    if (this.current === this.nodes.length - 1 && !this.cancelled) {
      this.onDone();
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
    const { bleed } = this.options;

    const options = {
      name,
      node,
      scale,
      bleed
    };

    return getDividerImage(options);
  }

  cancel() {
    this.cancelled = true;
    this.onCancel();
  }
  onStart() {
    this.status = 'running';
    if (!this.options.onStart) {
      return;
    }
    this.options.onStart()
  }

  onRender(data: RenderResponse) {
    if (!this.options.onRender) {
      return;
    }
    this.options.onRender({
      total: this.nodes.length,
      done: this.current + 1,
      data
    });
  }

  onDone() {
    this.status = 'done';
    if (!this.options.onDone) {
      return;
    }
    this.options.onDone({
      total: this.nodes.length
    });
  }

  onCancel() {
    this.status = 'cancelled';
    if (!this.options.onCancel) {
      return;
    }
    this.options.onCancel({
      total: this.nodes.length,
      done: this.current + 1
    });
  }
}