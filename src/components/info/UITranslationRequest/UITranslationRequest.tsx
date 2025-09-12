import { Panel } from '@/components/ui/Panel/Panel';
import { REQUESTED_UI_LANGUAGES } from '@/shared/data/ui';
// import S from './UITranslationRequest.module.scss';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectLanguage } from '@/shared/store/features/language/language';

export const UITranslationRequest = () => {
  const language = useAppSelector(selectLanguage);
  const showPanel = REQUESTED_UI_LANGUAGES.includes(language);

  return (
    <>
      {showPanel && (
        <Panel type='warning'>
          <p>
            Please, help me with UI translation to your language <br />
            Contact me using one of the links at the bottom of the page
          </p>
        </Panel>
      )}
    </>
  );
};
