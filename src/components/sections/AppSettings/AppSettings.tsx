import S from './AppSettings.module.scss';
import { CampaignSelect, DividerTypeFilter, LanguageSelect, Row } from '@/components';

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
           </Row>
        </div>
    );
}