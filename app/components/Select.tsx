'use client';

import ReactSelect, { Props } from 'react-select';

import { selectStyles } from '@/lib/constants/variants/select';

interface ReactSelectProps extends Props {
  classes?: string;
}

export const Select = ({ classes = '', ...props }: ReactSelectProps) => {
  return (
    <ReactSelect
      className={`w-full caret-white ${classes}`}
      placeholder=""
      styles={selectStyles}
      {...props}
    />
  );
};
