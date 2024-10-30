export const PRINT_DPI = 300;

export const INCH = 25.4;

export const toPrintSize = (mm: number) => {

  return mm * PRINT_DPI / INCH;
}

export const getBrowserDPI = () => {
  const mm = 100;
  const node = document.createElement('div');
  node.style.width = `${mm}mm`;
  document.body.append(node);

  const { width } = node.getBoundingClientRect();

  node.remove();

  return width * INCH / mm;
}