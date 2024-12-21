import { IEqualLayoutBleed, ILayoutBleed } from "@/types/layouts";
import { getWebToPrintScale } from "@/util/units";
import { getSimilarBleed } from "./getSimilarBleed";
import { getDividerImage } from "./getDividerImage";

type RenderResponse = Awaited<ReturnType<typeof getDividerImage>>;

type OnRenderEventData = {
  data: RenderResponse
  total: number
  done: number
  bleed: IEqualLayoutBleed
}

type OnCancelEventData = {
  total: number
  done: number
}

type OnDoneEventData = {
  total: number
  bleed: IEqualLayoutBleed
}

type DividerNodeRendererOptions = {
  bleed: ILayoutBleed
  onRender?: (event: OnRenderEventData) => void
  onCancel?: (event: OnCancelEventData) => void
  onDone?: (event: OnDoneEventData) => void
}

export class DividerNodeRenderer {
  protected nodes: Element[] = []
  readonly current = 0
  readonly scale = getWebToPrintScale()
  protected cancelled = false
  protected bleed: IEqualLayoutBleed;
  protected status: 'running' | 'idle' = 'idle';
  constructor (
    protected options: DividerNodeRendererOptions
  ) {
    this.bleed = getSimilarBleed(options.bleed);
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
      this.onCancel();
      return;
    }

    const response = await this.render();
    this.onRender(response);

    if (this.current === this.nodes.length - 1) {
      this.onDone();
      return;
    }

    this.current++;
    await this.next();
  }

  render() {
    const { bleed, scale } = this;
    const key = this.current;
    const node = this.nodes[key];
    const name = key > 9 ? key.toString() : '0' + key;

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
  }

  onRender(data: RenderResponse) {
    if (!this.options.onRender) {
      return;
    }
    this.options.onRender({
      total: this.nodes.length,
      done: this.current + 1,
      data,
      bleed: this.bleed
    });
  }

  onDone() {
    if (!this.options.onDone) {
      return;
    }
    this.options.onDone({
      total: this.nodes.length,
      bleed: this.bleed
    });
  }

  onCancel() {
    if (!this.options.onCancel) {
      return;
    }
    this.options.onCancel({
      total: this.nodes.length,
      done: this.current + 1
    });
  }
}