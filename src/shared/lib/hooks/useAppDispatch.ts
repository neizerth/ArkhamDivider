import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/shared/lib/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
