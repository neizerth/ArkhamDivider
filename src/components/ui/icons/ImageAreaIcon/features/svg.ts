import { isNotEmpty } from "ramda";
import { SVGPathData } from "svg-pathdata";

export const getSVGPaths = (svg: string) => {
  const contents = svg.replace(/(<svg[^>]+>)/, '').replace(/<\/svg>/, '');

  const paths = contents.matchAll(/<path[^>]+d="([^"]+)"/g);

  return [...paths]
    .map(match => match[1])
    .filter(isNotEmpty);
}

export const parseSVG = ({
  contents,
  top,
  left,
  scale
}: {
  contents: string
  top: number
  left: number
  scale: number
}) => {
  const paths = getSVGPaths(contents);
  const dX = left * scale;
  const dY = top * scale;

  return paths.map((path: string) => {
    const pathData = new SVGPathData(path);
    pathData.translate(dX, dY);

    return pathData.encode();
  })
}