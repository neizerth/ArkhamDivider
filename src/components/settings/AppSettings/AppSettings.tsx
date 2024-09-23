import { useTranslation } from 'react-i18next';
import S from './AppSettings.module.scss';
import { LayoutSelect, LanguageSelect, PrintSettings, Row, IconButton } from '@/components';


export const AppSettings = () => {
    const { t } = useTranslation();
    const print = () => window.print();
    
    return (
        <div className={S.container}>
            <Row wrap className={S.row}>
                <Row wrap className={S.row}>
                    <div className={S.languageSelect}>
                        <LanguageSelect/>
                    </div>

                    <div className={S.dividerFilter}>
                        <LayoutSelect/>
                    </div>
                </Row>
                <div className={S.print}>
                    <Row wrap className={S.row}>
                        <div className={S.printSettings}>
                            <PrintSettings/>
                        </div>
                        <IconButton 
                            onClick={print} 
                            icon="printer"
                        >
                            {t('Print')}
                        </IconButton>
                    </Row>
                </div>
            </Row>
        </div>
    );
}