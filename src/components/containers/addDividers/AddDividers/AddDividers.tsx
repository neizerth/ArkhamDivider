import { useAppSelector } from '@/hooks/useAppSelector';
import S from './AddDividers.module.scss';
import { selectType } from '@/store/features/layout/layout';
import { LayoutType } from '@/types/layouts';
import { AddStoryDividers } from '../story/AddStoryDividers/AddStoryDividers';
import { AddPlayerDividers } from '../player/AddPlayerDividers/AddPlayerDividers';


export type AddDividersProps = {

}


export const AddDividers = ({}: AddDividersProps) => {
  const type = useAppSelector(selectType);
  return (
    <>
      {type === LayoutType.SCENARIO && <AddStoryDividers/>}
      {type === LayoutType.PLAYER && <AddPlayerDividers/>}
    </>
  );
}