import { useAppDispatch } from '@/hooks/useAppDispatch';
import S from './CampaignSelect.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCampaigns } from '@/store/features/campaigns/campaigns';
import { ReactEventHandler } from 'react';
import { changeCampaign, refreshDividers, selectIncludeCoreSet, setIncludeCoreSet } from '@/store/features/dividers/dividers';

export type CampaignSelectProps = {

}

export const CampaignSelect = ({ }: CampaignSelectProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const campaigns = useAppSelector(selectCampaigns);
  const includeCoreSet = useAppSelector(selectIncludeCoreSet);

  const updateCampaign: ReactEventHandler = (e) => {
      const target = e.target as HTMLSelectElement;
      dispatch(changeCampaign(target.value));
  }

  const toggleCoreSet: ReactEventHandler = (e) => {
    const target = e.target as HTMLInputElement;
    const { checked } = target;
    dispatch(setIncludeCoreSet(checked));
    dispatch(refreshDividers());
  }
  
  return (
    <div className={S.container}>
      <label className={S.select}>
        <span className={S.label}>{t('Campaign')}</span>
        <select onChange={updateCampaign}>
          <option hidden>---</option>
          {campaigns.map(({ campaign }) => (
              <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
          ))}
        </select>
      </label>
      <label className={S.core}>
        <input type="checkbox" checked={includeCoreSet} onChange={toggleCoreSet}/>
        {t('Core Set')}
      </label>
    </div>
  );
}