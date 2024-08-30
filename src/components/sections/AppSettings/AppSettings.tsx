import { useTranslation } from 'react-i18next';
import S from './AppSettings.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCampaigns } from '@/store/features/campaigns/campaigns';
import { ReactEventHandler, useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { changeCampaign } from '@/store/features/dividers/dividers';
import { CampaignSelect } from '@/components';

export type AppSettingsProps = {

}

export const AppSettings = ({}: AppSettingsProps) => {
    
    return (
        <div className={S.container}>
            {/* <CategoriesMenu/> */}
            <CampaignSelect/>
        </div>
    );
}