import { ReactEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import Select, { SingleValue } from 'react-select'
import S from './CampaignSelect.module.scss';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCampaigns } from '@/store/features/campaigns/campaigns';


import { changeCampaign, refreshDividers, selectIncludeCoreSet, setIncludeCoreSet } from '@/store/features/dividers/dividers';
import { selectLanguage } from '@/store/features/language/language';

export type CampaignSelectProps = {

}

export const CampaignSelect = ({ }: CampaignSelectProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const campaigns = useAppSelector(selectCampaigns);
  const includeCoreSet = useAppSelector(selectIncludeCoreSet);
  const language = useAppSelector(selectLanguage);

  const toggleCoreSet: ReactEventHandler = (e) => {
    const target = e.target as HTMLInputElement;
    const { checked } = target;
    dispatch(setIncludeCoreSet(checked));
    dispatch(refreshDividers());
  }

  const options = campaigns.map(({ campaign }) => ({
    label: campaign.name,
    value: campaign.id
  }));

  const labels = campaigns.reduce((target, { campaign }) => {
    target[campaign.id] = campaign.name;
    return target
  }, {} as { [index: string]: string});
  
  const updateCampaign = (id: string | null) => {
    dispatch(changeCampaign(id));
  }

  return (
    <div className={S.container}>
      <label className={S.selectContainer}>
        <span className={S.label}>{t('Campaign')}</span>
        <Select 
          className={S.select}
          onChange={item => updateCampaign(item?.value || null)} 
          options={options}
          placeholder={t('Campaign')}
          getOptionLabel={({ value }) => labels[value]}
        />
      </label>
      <label className={S.core}>
        <input type="checkbox" checked={includeCoreSet} onChange={toggleCoreSet}/>
        {t('Core Set')}
      </label>
    </div>
  );
}