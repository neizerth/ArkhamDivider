
import { layouts } from '@/data/layouts';
import { LayoutType } from '@/types/dividers';

export const getLayoutById = (layoutId: string) => layouts.find(({ id }) => layoutId === id);

export const getLayoutsByType = (layoutType: LayoutType) => layouts.filter(({ type }) => type === layoutType);