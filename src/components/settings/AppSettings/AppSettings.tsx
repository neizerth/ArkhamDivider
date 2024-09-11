import S from './AppSettings.module.scss';
import { DividerTypeFilter, LanguageSelect, PrintSettings, Row, Button } from '@/components';


export const AppSettings = () => {

    const print = () => window.print();
    
    return (
        <div className={S.container}>
            <Row wrap className={S.row}>
                <div className={S.languageSelect}>
                    <LanguageSelect/>
                </div>

                <div className={S.dividerFilter}>
                    <DividerTypeFilter/>
                </div>

                <div className={S.printSettings}>
                    <PrintSettings/>
                </div>
                <div className={S.print}>
                    <Button onClick={print}>Print</Button>
                </div>
            </Row>
        </div>
    );
}