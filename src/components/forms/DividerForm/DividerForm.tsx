import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { IDivider } from '@/types/dividers';
import S from './DividerForm.module.scss';
import { Row } from '@/components/ui/grid/Row/Row';
import { IconSelect } from "../IconSelect/IconSelect";
import IcoMoon from "react-icomoon";
import { IReactIcoMoonExtendedIconSet } from "@/types/icomoon";
import Icon from "@/components/ui/Icon/Icon";

export type DividerFormElements = {
	dividers: IDivider[]
}

export type IDividerConfig = IDivider;

export type DividerFormProps = {
	dividers: IDividerConfig[]
  iconSet?: IReactIcoMoonExtendedIconSet,
	bleeds?: boolean
	radiusGuides?: boolean
	
	onAdd?: () => void
	onChange?: () => void
}

export const DividerForm = ({ dividers, iconSet }: DividerFormProps) => {
  const formConfig = {
		defaultValues: {
			dividers
		}
	};

	const {
		register,
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<DividerFormElements>(formConfig);
	
	const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
		control,
		name: "dividers",
	});
	
	return (
		<form>
		{fields.map((field, index) => (
			<Row key={field.id}>
			<div>
			<input
			{...register(`dividers.${index}.title`)}
			/>
			</div>
			<div>
			  <Icon icon="the_first_day" size={32}/>
			</div>
			</Row>
		))}
		</form>
	);
}