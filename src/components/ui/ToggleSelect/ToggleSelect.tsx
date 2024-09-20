import { Children, PropsWithChildren, useState } from 'react';
import S from './ToggleSelect.module.scss';
import { append, without } from 'ramda';
import { inArray } from '@/util/criteria';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';

export type ToggleSelectItemProps = PropsWithChildren & PropsWithClassName & {
  selectedClassName?: string
  isSelected?: boolean
  onToggle: () => void
}

export const ToggleSelectItem = ({
  className,
  selectedClassName,
  onToggle,
  isSelected,
  children
}: ToggleSelectItemProps) => {
  const classList = classNames(
    S.item,
    className,
    isSelected && [
      selectedClassName,
      S.selected
    ]
  )
  return (
    <div 
      className={classList}
      onClick={onToggle}
    >
      {children}
    </div>
  )
}

export type ToggleSelectProps = PropsWithChildren & PropsWithClassName & {
  selectedItemClassName?: string
  itemClassName?: string
  defaultValue?: number[],
  onSelect: (selected: number[]) => void 
}

export const ToggleSelect = ({ 
  className,
  defaultValue,
  selectedItemClassName,
  itemClassName,
  onSelect,
  children 
}: ToggleSelectProps) => {
  const [data, setData] = useState<number[]>(defaultValue || []);
  
  const getIsSelected = inArray(data);

  const toggleFaction = (id: number) => {
    const isSelected = getIsSelected(id);
    
    const selected = isSelected ? 
      without([id], data) : 
      append(id, data);
    
    setData(selected);
    onSelect(selected);
  }

  return (
    <div className={classNames(S.container, className)}>
      {Children.map(children, (Child, index) => (
        <ToggleSelectItem 
          key={index}
          className={itemClassName}
          selectedClassName={selectedItemClassName}
          isSelected={getIsSelected(index)}
          onToggle={() => toggleFaction(index)}
        >
          {Child}
        </ToggleSelectItem>
      ))}
    </div>
  );
}