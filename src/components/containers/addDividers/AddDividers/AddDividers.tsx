import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
// import S from './AddDividers.module.scss';
import { selectType } from '@/shared/store/features/layout/layout';
import { LayoutType } from '@/shared/types/layouts';
import { AddInvestigatorDividers } from '../AddInvestigatorDividers/AddInvestigatorDividers';
import { AddPlayerDividers } from '../AddPlayerDividers/AddPlayerDividers';
import { AddStoryDividers } from '../story/AddStoryDividers/AddStoryDividers';

export const AddDividers = () => {
  const type = useAppSelector(selectType);
  return (
    <>
      {type === LayoutType.SCENARIO && <AddStoryDividers />}
      {type === LayoutType.PLAYER && <AddPlayerDividers />}
      {type === LayoutType.INVESTIGATOR && <AddInvestigatorDividers />}
    </>
  );
};
