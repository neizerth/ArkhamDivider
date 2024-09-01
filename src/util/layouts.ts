
import layouts from '@/data/layouts.json';

export const getLayoutById = (layoutId: string) => layouts.find(({ id }) => layoutId === id);