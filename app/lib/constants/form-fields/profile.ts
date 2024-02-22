import { genders } from '@/lib/constants/gender';
import { groupedHeights } from '@/lib/constants/height';
import { weights } from '@/lib/constants/weight';

export const aboutFormFields = [
  {
    id: 1,
    name: 'image',
    label: 'Add image',
    type: 'image',
  },
  {
    id: 2,
    name: 'displayName',
    placeholder: 'Enter name',
    label: 'Display name:',
    type: 'text',
  },
  {
    id: 3,
    name: 'gender',
    placeholder: 'Select gender',
    label: 'Gender:',
    type: 'select',
    options: genders,
  },
  {
    id: 4,
    name: 'dob',
    placeholder: 'DD MM YYYY',
    label: 'Birthday:',
    type: 'date',
  },
  {
    id: 5,
    name: 'horoscope',
    label: 'Horoscope:',
    type: 'text',
  },
  {
    id: 6,
    name: 'zodiac',
    label: 'Zodiac:',
    type: 'text',
  },
  {
    id: 7,
    name: 'height',
    placeholder: 'Add height',
    label: 'Height:',
    type: 'select',
    options: groupedHeights,
  },
  {
    id: 8,
    name: 'weight',
    placeholder: 'Add weight',
    label: 'Weight:',
    type: 'select',
    options: weights,
  },
];
