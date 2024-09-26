import { ILayout } from "@/types/layouts";

import { classicLayouts } from "./classic";
import { invocationLayouts } from "./invocation2018";
import { sarnetskyLayouts } from "./sarnetsky";

export const layouts: ILayout[] = [
  ...classicLayouts,
  ...invocationLayouts,
  ...sarnetskyLayouts
]