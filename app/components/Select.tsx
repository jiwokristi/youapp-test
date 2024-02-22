'use client';

import ReactSelect, { GroupBase, Props } from 'react-select';

import { selectStyles } from '@/lib/constants/variants/select';

interface ReactSelectProps<Option, IsMulti, Group> extends Props {
  classes?: string;
}

export interface Option {
  label: string;
  value: string;
}

export interface GroupOption {
  label: string;
  options: Option[];
}

export type OptionMulti = readonly Option[];

function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ classes = '', ...props }: ReactSelectProps<Option, IsMulti, Group>) {
  return (
    <ReactSelect
      className={`w-full caret-white ${classes}`}
      placeholder=""
      styles={selectStyles}
      {...props}
    />
  );
}

export { Select };
