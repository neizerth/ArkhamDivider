import JSZip from "jszip";
import { saveAs } from "file-saver";
import { DividerNodeRenderer } from "../render/DividerNodeRenderer";
import { ILayoutBleed } from "@/shared/types/layouts";
import { ColorScheme, ImageFormat } from "@/shared/types/image";
import { OnRenderEventData } from "@/shared/types/render";

export type RenderOptions = {
  name: string;
  bleed: ILayoutBleed;
  imageFormat: ImageFormat;
  colorScheme?: ColorScheme;
};

export type CreateDividerZipOptions = RenderOptions & {
  name: string;
};

export const createZipRenderer = ({
  bleed,
  name,
  imageFormat,
  colorScheme,
}: CreateDividerZipOptions) => {
  let zip: typeof JSZip | null = null;

  const renderer = new DividerNodeRenderer({
    bleed,
    imageFormat,
    colorScheme,
  });

  renderer
    .on("start", () => {
      zip = new JSZip();
    })
    .on("render", (event: OnRenderEventData) => {
      const { filename, contents } = event.data;

      zip?.file(filename, contents, {
        binary: true,
      });
    })
    .on("done", async () => {
      if (!zip) {
        return;
      }
      const content = await zip.generateAsync({
        type: "blob",
      });
      zip = null;

      const zipName = `${name}.zip`;
      saveAs(content, zipName);
    });

  return renderer;
};
