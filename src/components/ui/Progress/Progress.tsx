import S from './Progress.module.scss';

export type ProgressProps = {
  value: number;
  max?: number;
};

export const Progress = ({ value, max = 100 }: ProgressProps) => {
  const styles = {
    width: `${(value / max) * 100}%`,
  };
  return (
    <div className={S.container}>
      <div className={S.value} style={styles} />
    </div>
  );
};
