import { delay, pxToNumber } from "@/util/common";
import { useEffect, useRef, useState } from "react"

export const DEFAULT_LINE_HEIGHT = 1.14;

type GetLineStylesStyles = {
  fontSize: number
  lineHeight: number
}

const getLines = ({ 
  node, 
  styles
}: {
  node: Element
  styles: GetLineStylesStyles
}) => {
  const {
    fontSize,
  } = styles;

  const { height } = node.getBoundingClientRect();
  
  const lines = Math.floor(height / fontSize);

  console.log({
    node,
    fontSize,
    height,
    lines,
  })
  
  return lines;
}

enum DiffType {
  GREATER = 'greater',
  LOWER = 'lower',
  ANY = 'any'
}

const isUpdateAllowed = ({
  diffType,
  value,
  prevValue
}: {
  diffType: DiffType
  value: number
  prevValue: number
}) => {

  console.log({
    value,
    prevValue,
    diffType
  });
  if (diffType === DiffType.ANY) {
    return true;
  }
  if (diffType === DiffType.GREATER && value > prevValue) {
    return true;
  }
  if (diffType === DiffType.LOWER && value < prevValue) {
    return true;
  }
  return false;
}

const getStyles = (styles: CSSStyleDeclaration) => {
  const lineHeight = styles.lineHeight === 'normal' ? 
    DEFAULT_LINE_HEIGHT : 
    pxToNumber(styles.lineHeight);

  const fontSize = pxToNumber(styles.fontSize);

  return {
    lineHeight,
    fontSize
  }
}

export const useLinesCount = <T extends Element>()=> {

  const ref = useRef<T>(null);
  const [lines, setLines] = useState(1);
  const [size, setSize] = useState(0);
  const [styles, setStyles] = useState<GetLineStylesStyles>();

  useEffect(() => {
    if (!ref.current) {
      return
    }
    const css = getComputedStyle(ref.current);

    setStyles(
      getStyles(css)
    );
  }, [ref])

  const onSizeChange = async (nextSize: number) => {
    if (!ref.current || !styles) {
      return;
    }
    const diffType = nextSize === size ? 
      DiffType.ANY :
      nextSize > size ? 
        DiffType.GREATER : 
        DiffType.LOWER;

    await delay(100);
    const nextLines = getLines({
      node: ref.current, 
      styles
    });
    const options = {
      value: nextLines,
      prevValue: lines,
      diffType 
    }
    if (!isUpdateAllowed(options)) {
      return;
    }
    setSize(nextSize);
    setLines(nextLines);
  }

  return {
    ref, 
    lines,
    styles,
    size,
    onSizeChange
  };
}