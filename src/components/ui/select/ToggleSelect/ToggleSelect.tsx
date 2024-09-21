import React, { Children, PropsWithChildren, useState } from 'react';
import S from './ToggleSelect.module.scss';
import { append, without } from 'ramda';
import { inArray } from '@/util/criteria';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';

export type ToggleSelectItemProps<T> = PropsWithClassName & PropsWithChildren &{
  selectedClassName?: string
  isSelected?: boolean
  onToggle: () => void
  value: T
  index: number
}

export function ToggleSelectItem <T>({
  className,
  selectedClassName,
  onToggle,
  isSelected,
  children
}: ToggleSelectItemProps<T>) {
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

export type ToggleSelectProps<T> = PropsWithClassName & {
  selectedItemClassName?: string
  itemClassName?: string
  value?: T[],
  defaultSelectedIndexes?: number[],
  onChange: (selected: T[]) => void
  components?: {
    Item: React.FC<ToggleSelectItemProps<T>>
  }
}

export function ToggleSelect <T>({ 
  className,
  value = [],
  defaultSelectedIndexes = [],
  selectedItemClassName,
  itemClassName,
  onChange,
  components = {
    Item: ToggleSelectItem
  }
}: ToggleSelectProps<T>) {
  const { Item } = components;
  const [selected, setSelected] = useState<number[]>(defaultSelectedIndexes);
  
  const getIsSelected = inArray(selected);

  const toggleFaction = (id: number) => {
    const isSelected = getIsSelected(id);
    
    const data = isSelected ? 
      without([id], selected) : 
      append(id, selected);
    
    setSelected(data);
    onChange(
      data.map(index => value[index])
    );
  }

  return (
    <div className={classNames(S.container, className)}>
      {value.map((item, index) => (
        <Item 
          key={index}
          className={itemClassName}
          selectedClassName={selectedItemClassName}
          isSelected={getIsSelected(index)}
          onToggle={() => toggleFaction(index)}
          value={item}
          index={index}
        >
          {index}
        </Item>
      ))}
    </div>
  );
}