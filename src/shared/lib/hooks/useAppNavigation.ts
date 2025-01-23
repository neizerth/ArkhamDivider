import { useLanguageNavigation } from "./navigation/useLanguageNavigation";
import { useLayoutNavigation } from "./navigation/useLayoutNavigation";
import { useTypeNavigation } from "./navigation/useTypeNavigation";
import { useCategoryNavigation } from "./navigation/useCategoryNavigation";
import { useStoryNavigation } from "./navigation/useStoryNavigation";

export const useAppNavigation = () => {

  useLanguageNavigation();
  useLayoutNavigation();
  useTypeNavigation();
  useCategoryNavigation();
  useStoryNavigation();
}