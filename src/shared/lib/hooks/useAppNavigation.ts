import { useCategoryNavigation } from './navigation/useCategoryNavigation';
import { useLanguageNavigation } from './navigation/useLanguageNavigation';
import { useLayoutNavigation } from './navigation/useLayoutNavigation';
import { useStoryNavigation } from './navigation/useStoryNavigation';
import { useTypeNavigation } from './navigation/useTypeNavigation';

export const useAppNavigation = () => {
  useLanguageNavigation();
  useLayoutNavigation();
  useTypeNavigation();
  useCategoryNavigation();
  useStoryNavigation();
};
