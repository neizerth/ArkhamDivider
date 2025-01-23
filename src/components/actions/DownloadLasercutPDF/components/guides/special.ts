import { vintageLayoutCategory } from "@/shared/data/layouts/vintage";
import { ArkhamDecoPDFGuides } from "./layouts/ArkhamDecoPDFGuides";
import { VintagePDFGuides } from "./layouts/VintagePDFGuides";
import { arkhamDecoCategory } from "@/shared/data/layouts/arkham-deco";

export const COMPONENT_MAP = {
  [arkhamDecoCategory.id]: ArkhamDecoPDFGuides,
  [vintageLayoutCategory.id]: VintagePDFGuides
}