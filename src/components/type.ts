export enum ElementTypes {
  input = 1,
  textarea,
  number,
  radio,
  checkbox,
  select,
  date,
  time,
  rate,
  slider,
  switch,
  tree,
  cascader,
  editor,
  divider,
  grid,
  tab,
  custom,
  repeat,
}

export enum ElementGroup {
  basic = 'basic',
  advance = 'advance',
  layout = 'layout',
}

export interface PageOptions {
  size?: 'small' | 'medium' | 'large';
  position?: 'left' | 'top';
  align: 'left' | 'right';
  labelWidth?: string | 'auto';
}

/**
 * 布局
 */
export interface ElementColumn {
  span?: number;
  name?: string;
  list?: ElementItem[];
}

export interface OptionItem {
  value: number | string;
  label: string;
}

export interface ElementItemOption {
  width?: string;
  defaultValue: any;
  column: number;
  required?: boolean;
  placeholder: string;
  disabled?: boolean;
  remote?: boolean;
  clearable?: boolean;
  options?: OptionItem[];
  min?: number;
  max?: number;
  step?: number;
}

export interface ElementItem {
  type: ElementTypes;
  hide: boolean;
  comp_type: ElementGroup;
  key: string;
  label: string;
  icon: string;
  columns?: ElementColumn[];
  options: ElementItemOption;
}
