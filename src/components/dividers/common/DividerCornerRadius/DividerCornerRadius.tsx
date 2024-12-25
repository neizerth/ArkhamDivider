import { useAppSelector } from "@/hooks/useAppSelector";
import { selectLayout } from "@/store/features/layout/layout";
import { PropsWithClassName } from "@/types/util";
import { Container } from "./components";

export const DividerCornerRadius = ({ className }: PropsWithClassName) => {
  const layout = useAppSelector(selectLayout);
  return (
    <Container
      className={className}
      $layout={layout}
    />
  )
}