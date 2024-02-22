import dayjs from 'dayjs';

import { zodiacs } from '@/lib/constants/zodiac';

export const getHoroscope = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  switch (month) {
    case 1:
      return day >= 20 ? 'Aquarius' : 'Capricorn';
    case 2:
      return day <= 18 ? 'Aquarius' : 'Pisces';
    case 3:
      return day <= 20 ? 'Pisces' : 'Aries';
    case 4:
      return day <= 19 ? 'Aries' : 'Taurus';
    case 5:
      return day <= 20 ? 'Taurus' : 'Gemini';
    case 6:
      return day <= 20 ? 'Gemini' : 'Cancer';
    case 7:
      return day <= 22 ? 'Cancer' : 'Leo';
    case 8:
      return day <= 22 ? 'Leo' : 'Virgo';
    case 9:
      return day <= 22 ? 'Virgo' : 'Libra';
    case 10:
      return day <= 22 ? 'Libra' : 'Scorpio';
    case 11:
      return day <= 21 ? 'Scorpio' : 'Sagittarius';
    case 12:
      return day <= 21 ? 'Sagittarius' : 'Capricorn';
    default:
      return 'Invalid date';
  }
};

export const getChineseZodiac = (date: Date) => {
  const year = date.getFullYear();

  // * The Chinese zodiac cycle repeats every 12 years
  const zodiacIndex = (year - 1900) % 12;

  return zodiacs[zodiacIndex];
};

export const getAge = (date: string) => {
  const value = dayjs(date);
  return dayjs().diff(value, 'year');
};
