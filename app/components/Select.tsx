'use client';

import ReactSelect, { Props } from 'react-select';

interface ReactSelectProps extends Props {
  classes?: string;
}

export const Select = ({ classes = '', ...props }: ReactSelectProps) => {
  return (
    <ReactSelect
      className={`w-full caret-white ${classes}`}
      placeholder=""
      styles={{
        control: (baseStyles, { isFocused, isDisabled }) => ({
          ...baseStyles,
          minHeight: '4.6rem',
          padding: '0.8rem',
          backgroundColor: 'rgba(217, 217, 217, 0.06)',
          border: 'none',
          borderRadius: '1rem',
          transition: 'all 0.15s',
          opacity: isDisabled ? '0.3' : '1',
          boxShadow: isFocused
            ? '0 0 0 0.3rem rgba(76, 104, 108, 0.75)'
            : 'none',
          '& > div:last-child > div > svg': {
            transition: 'all 0.15s ease-in-out',
            transform: isFocused ? 'rotate(180deg)' : 'rotate(0deg)',
            color: 'rgba(255, 255, 255, 0.1)',
          },
        }),
        singleValue: baseStyles => ({
          ...baseStyles,
          padding: '0.4rem 0',
          fontSize: '1.2rem',
          fontWeight: 600,
          color: '#FFF',
        }),
        multiValue: baseStyles => ({
          ...baseStyles,
          display: 'flex',
          alignItems: 'center',
          padding: '0.8rem 0.4rem',
          borderRadius: '0.6rem',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          transition: 'all 0.15s',
          ':hover': {
            backgroundColor: 'rgba(217, 217, 217, 0.06)',
          },
        }),
        multiValueLabel: baseStyles => ({
          ...baseStyles,
          fontSize: '1.2rem',
          fontWeight: 600,
          color: '#FFF',
        }),
        multiValueRemove: () => ({
          color: '#FFF',
          '& > svg': {
            width: '2rem',
            height: '2rem',
          },
        }),
        input: baseStyles => ({
          ...baseStyles,
          '& > input': {
            color: '#FFF !important',
            // ! This is to override focus style from globals.css
            boxShadow: 'none !important',
          },
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        indicatorsContainer: (_, { isMulti }) => ({
          display: isMulti ? 'none' : 'block',
        }),
        menu: baseStyles => ({
          ...baseStyles,
          padding: '0.4rem 0',
          border: 'none',
          backgroundColor: 'rgba(217, 217, 217, 0.06)',
          boxShadow: '0 2.4rem 4.8rem rgba(0, 0, 0, 0.075)',
        }),
        option: (_, { isFocused }) => ({
          padding: '1.6rem',
          fontSize: '1.2rem',
          color: isFocused ? '#FFF' : 'rgba(255, 255, 255, 0.5)',
          transition: 'all 0.15s',
          backgroundColor: isFocused
            ? 'rgba(217, 217, 217, 0.06)'
            : 'transparent',
        }),
        noOptionsMessage: () => ({
          padding: '1.6rem',
          fontSize: '1.2rem',
          textAlign: 'center',
          opacity: '50%',
        }),
      }}
      {...props}
    />
  );
};
