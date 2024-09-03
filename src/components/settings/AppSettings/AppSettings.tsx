import S from './AppSettings.module.scss';
import { CampaignSelect, DividerTypeFilter, LanguageSelect, PrintSettings, Row } from '@/components';

export type AppSettingsProps = {

}

export const AppSettings = ({}: AppSettingsProps) => {
    
    return (
        <div className={S.container}>
            <Row>
                <LanguageSelect/>
                <CampaignSelect/>
            </Row>
           <Row>
                <DividerTypeFilter/>
                <PrintSettings/>
           </Row>
        </div>
    );
}