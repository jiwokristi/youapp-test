'use client';

import { useState, useContext, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import dayjs from 'dayjs';

import { Popover, PopoverProps } from '@/components/Popover';
import { Input, InputProps } from '@/components/input';

import { ToastContext } from '@/lib/contexts/toast';

import { DatePickerFooter } from './DatePickerFooter';

interface DatePickerProps {
  popoverProps: Omit<PopoverProps, 'toggleComponent'>;
  inputProps: InputProps;
  datePickerProps: {
    setter: (date: Date) => void;
    initialValue?: Date;
  };
}

export const DatePicker = ({
  popoverProps,
  inputProps,
  datePickerProps: { setter, initialValue },
}: DatePickerProps) => {
  const { onToggleFields } = useContext(ToastContext);

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (initialValue && !isMounted) {
      setSelectedDate(initialValue);
      setIsMounted(true);
    }
  }, [initialValue, isMounted]);

  return (
    <Popover
      {...popoverProps}
      toggleComponent={
        <Input
          variant={inputProps.variant || 'outlined'}
          color={inputProps.color || 'white'}
          size={inputProps.size || 'sm'}
          align={inputProps.align || 'right'}
          inputClasses={`${inputProps.inputClasses} ${selectedDate ? 'placeholder:text-white' : ''}`}
          placeholder={
            selectedDate
              ? dayjs(selectedDate).format('DD MM YYYY')
              : inputProps.placeholder
          }
        />
      }
    >
      <DayPicker
        mode="single"
        captionLayout="dropdown-buttons"
        initialFocus
        fixedWeeks
        showOutsideDays
        fromYear={1900}
        toYear={new Date().getFullYear()}
        selected={selectedDate}
        onSelect={date => {
          setSelectedDate(date);
          setter(date as Date);
          if (date) {
            onToggleFields(popoverProps.name);
          }
        }}
        footer={<DatePickerFooter />}
        classNames={{
          months: 'flex flex-col rounded-lg bg-primary-shade-3 px-16 py-32',

          nav: 'gap-8 flex items-center',
          nav_button:
            'p-8 rounded-lg transition-all ease-in [&:not(:disabled):hover]:!bg-primary-shade-1 [&:not(:disabled):active]:!bg-primary-shade-1',
          nav_button_previous: 'absolute left-0',
          nav_button_next: 'absolute right-0',

          day: 'w-32 h-32 rounded-xl transition-all ease-in hover:!bg-primary-shade-1',
          day_today:
            'bg-white text-primary hover:!bg-white/90 active:!bg-white/90 rounded-xl',
          day_outside: '!text-white/30',
          day_selected: 'bg-gradient-blue text-white',
          day_disabled:
            '!text-white/30 hover:!bg-primary-shade-3 cursor-not-allowed',

          caption: 'relative flex items-center justify-center mb-24',
          caption_label: 'text-16 font-bold tracking-0.1 flex items-center',
          caption_dropdowns: 'relative flex items-center gap-16',

          dropdown:
            'absolute left-0 opacity-0 [&>*]:opacity-100 [&>*]:bg-primary-shade-3',
          dropdown_month: '',
        }}
      />
    </Popover>
  );
};
