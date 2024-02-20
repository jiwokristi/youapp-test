import { genders } from '@/lib/constants/gender';
import { heights } from '@/lib/constants/height';
import { weights } from '@/lib/constants/weight';

export const aboutFormFields = [
  {
    id: 1,
    name: 'name',
    placeholder: 'Enter name',
    label: 'Display name:',
    type: 'text',
  },
  {
    id: 2,
    name: 'gender',
    placeholder: 'Select gender',
    label: 'Gender:',
    type: 'select',
    options: genders,
  },
  {
    id: 3,
    name: 'dob',
    placeholder: 'DD MM YYYY',
    label: 'Birthday:',
    type: 'date',
  },
  {
    id: 4,
    name: 'horoscope',
    label: 'Horoscope:',
    type: 'text',
  },
  {
    id: 5,
    name: 'zodiac',
    label: 'Zodiac:',
    type: 'text',
  },
  {
    id: 6,
    name: 'height',
    placeholder: 'Add height',
    label: 'Height:',
    type: 'select',
    options: heights,
  },
  {
    id: 7,
    name: 'weight',
    placeholder: 'Add weight',
    label: 'Weight:',
    type: 'select',
    options: weights,
  },
];
