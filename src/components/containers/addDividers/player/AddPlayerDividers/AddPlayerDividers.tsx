import { Button, Col, Container, FactionSelect, Icon, Row } from '@/components';
import S from './AddPlayerDividers.module.scss';
import { CostSelect } from '@/components';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export type AddPlayerDividersProps = {

}

export const AddPlayerDividers = ({}: AddPlayerDividersProps) => {
  const { t } = useTranslation();
  const setFactions = () => {

  };

  const setCosts = () => {

  }

  return (
    <div className={S.container}>
      <Container>
        <Col className={S.content}>
          <div>
            <FactionSelect onSelect={setFactions}/>
          </div>
          <Row className={classNames(S.cost)}>
            <div>{t('Cost')}</div>
            <CostSelect onSelect={setCosts}/>
          </Row>
          <div>
            <Button>
              <Icon icon='check-thin'/>
              {t('Generate')}
            </Button>
          </div>
        </Col>
      </Container>
    </div>
  );
}