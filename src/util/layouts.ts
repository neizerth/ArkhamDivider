
import { layouts } from '@/data/layouts';
import { DividerType } from '@/types/dividers';

export const getLayoutById = (layoutId: string) => layouts.find(({ id }) => layoutId === id);

export const getLayoutsByType = (layoutType: DividerType) => layouts.filter(({ type }) => type === layoutType);