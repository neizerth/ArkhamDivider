import S from './AppSettings.module.scss';
import { CampaignSelect, DividerType, DividerTypeFilter, LanguageSelect } from '@/components';

export type AppSettingsProps = {

}

export const AppSettings = ({}: AppSettingsProps) => {
    
    return (
        <div className={S.container}>
            <LanguageSelect/>
            <CampaignSelect/>
            <DividerTypeFilter/>
        </div>
    );
}