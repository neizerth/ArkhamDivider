
import { layouts } from '@/data/layouts';
import { IDividerType } from '@/types/dividers';

export const getLayoutById = (layoutId: string) => layouts.find(({ id }) => layoutId === id);

export const getLayoutsByType = (layoutType: IDividerType) => layouts.filter(({ type }) => type === layoutType);