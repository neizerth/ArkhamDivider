import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectLayout } from "@/app/store/features/layout/layout";
import { PropsWithClassName } from "@/shared/types/util";
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