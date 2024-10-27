import { IDivider } from '@/types/dividers';
import S from './ArkhamStarter3mmDivider.module.scss';

import background from './images/background.png';
import { DividerContent, DividerText, TextFit } from '@/components';
import classNames from 'classnames';
import { ArkhamStarter3mmDividerStrip } from '../ArkhamStarter3mmDividerStrip/ArkhamStarter3mmDividerStrip';
import { getSecondaryStripColor, getStripColor } from './colors/stripColor';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export const ArkhamStarter3mmDivider = (props: IDivider) => {
  const { t } = useTranslation();
  const {
    story
  } = props;
  const defaultStoryName = story && t(story.name);
  const [storyName, setStoryName] = useState(defaultStoryName);

  useEffect(() => {
    setStoryName(defaultStoryName);
  }, [defaultStoryName]);

  const stripColor = getStripColor(props);
  const secondaryStripColor = getSecondaryStripColor(props);

  return (
    <div className={S.container}>
      <DividerContent className={S.content}>
        <img className={S.background} src={background}/>
        {story && stripColor && (
          <>
            <div
              className={classNames(
                S.strip,
                S.strip_vertical
              )} 
            >
              <ArkhamStarter3mmDividerStrip 
                color={stripColor}
                secondaryColor={secondaryStripColor}
              >
                {storyName && <TextFit text={storyName} key={storyName}/>}
              </ArkhamStarter3mmDividerStrip>
            </div>
            <div
              className={classNames(
                S.strip,
                S.strip_horizontal
              )} 
            >
              <ArkhamStarter3mmDividerStrip 
                color={stripColor}
                secondaryColor={secondaryStripColor}
                horizontal
              >
                {storyName && (
                  <DividerText
                    defaultValue={storyName}
                    fixedFontSize={false}
                    fullHeight={false}
                    onChange={setStoryName}
                    onClear={() => setStoryName(defaultStoryName)}
                  />
                )}
              </ArkhamStarter3mmDividerStrip>
            </div>
          </>
        )}
      </DividerContent>
    </div>
  );
}