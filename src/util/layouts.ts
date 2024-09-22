
import { layouts } from '@/data/layouts';
import { LayoutOrientation } from "@/types/layouts";

export const getLayoutById = (layoutId: string) => layouts.find(({ id }) => layoutId === id);

export const getLayoutsByType = (layoutType: LayoutOrientation) => layouts.filter(({ orientation }) => orientation === layoutType);