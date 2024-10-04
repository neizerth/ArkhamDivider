import { useParams } from "react-router-dom";
import { useAppSelector } from "../useAppSelector";
import { selectLayout, setLayoutById } from "@/store/features/layout/layout";
import { useEffect } from "react";
import { useAppDispatch } from "../useAppDispatch";

export const useLayoutNavigation = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const currentLayout = useAppSelector(selectLayout);

  useEffect(() => {
    const { layoutId } = params;

    if (currentLayout.id === layoutId) {
      return;
    }

    if (!layoutId) {
      return;
    }

    dispatch(setLayoutById(layoutId));

  }, [params.layoutId])
}