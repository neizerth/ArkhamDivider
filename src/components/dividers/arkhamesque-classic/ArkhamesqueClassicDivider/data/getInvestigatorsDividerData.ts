import { propEq } from "ramda";
import { GetDividerDataOptions } from "./getDividerData";
import { getDividerImage } from "./getDividerImage";

export const getInvestigatorsDividerData = ({
  data,
  divider
}: GetDividerDataOptions) => {
  const { investigator } = divider;

  if (!investigator) {
    return;
  }

  const investigators = data.investigators.map(
    category => category.data.map(item => ({
      prefix: category.prefix,
      ...item
    }))
  ).flat();

  const item = investigators.find(
    propEq(investigator.code, 'code')
  );

  if (!item) {
    return;
  }

  return {
    image: getDividerImage([
      data.prefix,
      item.prefix,
      item.name
    ]),
    icon: false
  }
  // const 
}