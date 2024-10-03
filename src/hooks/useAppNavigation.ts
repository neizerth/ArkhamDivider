import { useAppDispatch } from "./useAppDispatch";
import { loadAppData } from "@/store/features/app/app";
import { useEffect } from "react";
import { useLanguageNavigation } from "./navigation/useLanguageNavigation";
import { useLayoutNavigation } from "./navigation/useLayoutNavigation";
import { useTypeNavigation } from "./navigation/useTypeNavigation";
import { useCategoryNavigation } from "./navigation/useCategoryNavigation";
import { useStoryNavigation } from "./navigation/useStoryNavigation";

export const useAppNavigation = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAppData());
  }, [dispatch]);

  useLanguageNavigation();
  useLayoutNavigation();
  useTypeNavigation();
  useCategoryNavigation();
  useStoryNavigation();
}