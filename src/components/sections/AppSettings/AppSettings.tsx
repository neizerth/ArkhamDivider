import { useTranslation } from 'react-i18next';
import S from './AppSettings.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCampaigns } from '@/store/features/campaigns/campaigns';

export type AppSettingsProps = {

}

export const AppSettings = ({}: AppSettingsProps) => {
    const { t } = useTranslation();
    const campaigns = useAppSelector(selectCampaigns);

    return (
        <div>
            {t('Campaign')}
            <select>
                {campaigns.map(({ campaign }) => (
                    <option key={campaign.id}>t(campaign.name)</option>
                ))}
            </select>
        </div>
    );
}