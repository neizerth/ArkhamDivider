import { useTranslation } from 'react-i18next';
import S from './AppSettings.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCampaigns } from '@/store/features/campaigns/campaigns';
import { ReactEventHandler, useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { changeCampaign } from '@/store/features/dividers/dividers';

export type AppSettingsProps = {

}

export const AppSettings = ({}: AppSettingsProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const campaigns = useAppSelector(selectCampaigns);

    const updateCampaign: ReactEventHandler<HTMLSelectElement> = (e) => {
        const target = e.target as HTMLSelectElement;
        dispatch(changeCampaign(target.value));
    }
    return (
        <div>
            {t('Campaign')}
            <select onChange={updateCampaign}>
                <option hidden>---</option>
                {campaigns.map(({ campaign }) => (
                    <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                ))}
            </select>
        </div>
    );
}