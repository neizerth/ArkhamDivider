import S from './AppSettings.module.scss';
import { CampaignSelect, DividerTypeFilter, LanguageSelect, PrintSettings, Row } from '@/components';

export type AppSettingsProps = {

}

export const AppSettings = ({}: AppSettingsProps) => {
    
    return (
        <div className={S.container}>
            <Row wrap className={S.row}>
                <div className={S.languageSelect}>
                    <LanguageSelect/>
                </div>

                <div className={S.dividerFilter}>
                    <DividerTypeFilter/>
                </div>

                <div className={S.campaignFilter}>
                    <CampaignSelect/>
                </div>

                <div className={S.printSettings}>
                    <PrintSettings/>
                </div>
                
            </Row>
        </div>
    );
}