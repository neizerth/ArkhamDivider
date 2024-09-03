import { ILayout } from '@/types/layouts';
import S from './LayoutInfo.module.scss';

export type LayoutInfoProps = {
  layout: ILayout
}

export const LayoutInfo = ({ layout }: LayoutInfoProps) => {
  const { width, height } = layout;
  return (
    <div className={S.container}>
      <div>Size: {width}x{height}mm</div>
    </div>
  );
}