import { EventEmitter } from '@/shared/lib/features/events/EventEmitter';
import { DividerNodeRenderer } from '@/shared/lib/features/render/DividerNodeRenderer';
import { ColorScheme, ImageFormat } from '@/shared/types/image';
import { ILayoutBleed } from '@/shared/types/layouts';
import { OnRenderEventData } from '@/shared/types/render';

export class PDFDownloader extends EventEmitter {
  protected _renderer: DividerNodeRenderer;
  protected items: Uint8Array[] = [];
  protected eventHandlers: Array<{ event: string; handler: (...args: unknown[]) => void }> = [];

  constructor(
    protected options: {
      name: string;
      imageFormat: ImageFormat;
      bleed: ILayoutBleed;
      colorScheme?: ColorScheme;
    }
  ) {
    super();
    this._renderer = this.getRenderer();
  }

  get renderer() {
    return this._renderer;
  }

  protected getRenderer() {
    const renderer = new DividerNodeRenderer(this.options);

    const startHandler = () => {
      this.items = [];
    };

    const renderHandler = (...args: unknown[]) => {
      const eventData = args[0] as OnRenderEventData;
      this.items.push(eventData.data.contents);
    };

    const doneHandler = () => {
      this.emit('render', this.items);
      this.items = [];
    };

    renderer.on('start', startHandler).on('render', renderHandler).on('done', doneHandler);

    // Store handlers for cleanup
    this.eventHandlers = [
      { event: 'start', handler: startHandler as (...args: unknown[]) => void },
      { event: 'render', handler: renderHandler },
      { event: 'done', handler: doneHandler as (...args: unknown[]) => void },
    ];

    return renderer;
  }

  destroy() {
    // Clean up event listeners
    this.eventHandlers.forEach(({ event, handler }) => {
      this._renderer.off(event, handler);
    });
    this.eventHandlers = [];

    // Clean up renderer
    if (this._renderer.cancel) {
      this._renderer.cancel();
    }

    // Clear items
    this.items = [];
  }
}
