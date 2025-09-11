import classNames from 'classnames';
import S from './Input.module.scss';

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  id: string;
  label: string;
};

export const Input = ({ className, label, id, ...props }: InputProps) => {
  const classes = classNames(S.input, className);

  return (
    <div className={S.container}>
      <input {...props} className={classes} id={id} />
      <label htmlFor={id} className={S.label}>
        {label}
      </label>
    </div>
  );
};
