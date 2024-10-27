import { Icon } from '@/components';
import S from './LayoutZoom.module.scss';
import Select from 'react-select';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectZoom, setZoom } from '@/store/features/layout/layout';
import { values } from 'ramda';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import classNames from 'classnames';

export type LayoutZoomProps = {

}

const ZOOM_LEVELS = [
  100,
  125,
  150,
  200,
  250,
  300
]

export const LayoutZoom = ({}: LayoutZoomProps) => {
  const dispatch = useAppDispatch();
  const zoom = useAppSelector(selectZoom);

  const toOption = (value: number) => ({
    label: `${value}%`,
    value,
  })
  const options = ZOOM_LEVELS.map(toOption);

  const value = toOption(zoom);

  const onChange = (zoom: number) => dispatch(
    setZoom(zoom)
  );

  const goToIndex = (diff: number) => {
    const index = ZOOM_LEVELS.indexOf(zoom);
    const value = index + diff;

    if (value >= 0 && value < ZOOM_LEVELS.length) {
      return value;
    }
    if (diff < 0) {
      return 0;
    }
    return ZOOM_LEVELS.length - 1;
  }

  const goToZoom = (diff: number) => ZOOM_LEVELS[goToIndex(diff)];

  const zoomIn = () => onChange(goToZoom(-1));
  const zoomOut = () => onChange(goToZoom(1));

  return (
    <div className={S.container}>
      <div 
        className={classNames(
          S.zoomButton,
          zoom === ZOOM_LEVELS[0] && S.disabled
        )} 
        onClick={zoomIn}
      >
        <Icon icon='zoom-out' />
      </div>
      <Select
        isMulti={false}
        className={S.select}
        options={options}
        value={value}
        onChange={item => item && onChange(item.value)}
      />
      <div 
        className={classNames(
          S.zoomButton,
          zoom === ZOOM_LEVELS[ZOOM_LEVELS.length - 1] && S.disabled
        )} 
        onClick={zoomOut}
      >
        <Icon icon='zoom-in' className={S.zoomButton}/>
      </div>
    </div>
  );
}