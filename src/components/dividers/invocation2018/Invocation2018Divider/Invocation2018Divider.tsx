import S from './Invocation2018Divider.module.scss';
import { IDivider } from '@/types/dividers';
import { PropsWithClassName } from '@/types/util';
import { backgrounds } from './backgrounds';
import { omit, propEq } from 'ramda';
import { ClassicDivider } from '@/components';

export type Invocation2018DividerProps = PropsWithClassName & IDivider;

export const Invocation2018Divider = (props: Invocation2018DividerProps) => {
	const { faction } = props;

  const background = backgrounds.find(propEq(faction, 'faction'));

	const dividerProps = omit(['previewIcon', 'icon'], props);
  return (
    <ClassicDivider 
			{...dividerProps}
			titleStroke={false}
			background={background?.src}
		/>
  );
}