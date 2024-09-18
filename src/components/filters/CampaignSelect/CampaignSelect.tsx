import { ReactEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select'
import S from './CampaignSelect.module.scss';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectCampaigns, setStories } from '@/store/features/stories/stories';

import { refreshDividers, selectIncludeExtraSets, showAllSets, toggleIncludeExtraSets } from '@/store/features/dividers/dividers';
import { Checkbox, Row } from '@/components';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';

export type CampaignSelectProps = PropsWithClassName & {

}

export const CampaignSelect = ({ className }: CampaignSelectProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const campaigns = useAppSelector(selectCampaigns);
  const includeExtraSets = useAppSelector(selectIncludeExtraSets);
  const currentCampaigns = useAppSelector(selectCampaigns);

  const showCheckbox = currentCampaigns.some(({ extra_encounter_sets }) => extra_encounter_sets.length > 0);

  const toggleExtraSets = () => {
    dispatch(toggleIncludeExtraSets());
    dispatch(refreshDividers());
  }

  const options = campaigns.map(({ name, id }) => ({
    label: name,
    value: id
  }))
  .sort((a, b) => a.label > b.label ? 1 : -1)

  const labels = campaigns.reduce((target, { name, id }) => {
    target[id] = name;
    return target
  }, {} as { [index: string]: string});
  
  const updateCampaign = (id: string | null) => {
    const campaign = campaigns.find(campaign => campaign.id === id);
    const currentCampaigns = campaign ? [campaign] : []

    dispatch(showAllSets());
    dispatch(setStories(currentCampaigns));
    dispatch(refreshDividers());
  }

  return (
    <Row className={classNames(S.container, className)}>
      <Select 
          className={S.select}
          // onChange={item => updateCampaign(item?.values))} 
          options={options}
          isMulti={true}
          placeholder={t('Select Campaign')}
          getOptionLabel={({ value }) => labels[value]}
        />
      {showCheckbox && (
        <Checkbox checked={includeExtraSets} onChange={toggleExtraSets}>
          <span className={S.core}>{t('Extra')}</span>
        </Checkbox>
      )}
    </Row>
  );
}