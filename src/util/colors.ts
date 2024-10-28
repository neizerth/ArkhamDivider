export const rgba256 = (color: {
  r: number,
  g: number,
  b: number,
  a?: number
}) => {
  const { a = 1 } = color;
  const to256 = (x: number) => x * 255;

  const r = to256(color.r);
  const g = to256(color.g);
  const b = to256(color.b);

  return `rgba(${r}, ${g}, ${b}, ${a})`;
}