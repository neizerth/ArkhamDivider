import { useAppDispatch } from '@/hooks/useAppDispatch';
import S from './CampaignSelect.module.scss';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCampaigns } from '@/store/features/campaigns/campaigns';
import { ReactEventHandler } from 'react';
import { changeCampaign } from '@/store/features/dividers/dividers';

export type CampaignSelectProps = {

}

export const CampaignSelect = ({ }: CampaignSelectProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const campaigns = useAppSelector(selectCampaigns);

  const updateCampaign: ReactEventHandler<HTMLSelectElement> = (e) => {
      const target = e.target as HTMLSelectElement;
      dispatch(changeCampaign(target.value));
  }
  
  return (
    <label className={S.container}>
      <span className={S.label}>{t('Campaign')}</span>
      <select onChange={updateCampaign}>
        <option hidden>---</option>
        {campaigns.map(({ campaign }) => (
            <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
        ))}
      </select>
    </label>
  );
}