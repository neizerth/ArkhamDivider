import { useTranslation } from 'react-i18next';
import S from './AppSettings.module.scss';
import { DividerTypeFilter, LanguageSelect, PrintSettings, Row, Button, Icon } from '@/components';


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
                        <DividerTypeFilter/>
                    </div>
                </Row>
                <div className={S.print}>
                    <Row wrap className={S.row}>
                        <div className={S.printSettings}>
                            <PrintSettings/>
                        </div>
                        <Button onClick={print}>
                            <Icon icon='printer'/> {t('Print')}
                        </Button>
                    </Row>
                </div>
            </Row>
        </div>
    );
}