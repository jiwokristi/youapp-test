import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    //? ----- WHITESPACE SYSTEM -----
    spacing: {
      0: '0',
      1: '0.1rem',
      2: '0.2rem',
      4: '0.4rem',
      8: '0.8rem',
      12: '1.2rem',
      16: '1.6rem',
      24: '2.4rem',
      32: '3.2rem',
      48: '4.8rem',
      64: '6.4rem',
      80: '8rem',
      96: '9.6rem',
      128: '12.8rem',
    },

    //? ----- TYPOGRAPHY SYSTEM -----
    fontSize: {
      10: '1rem',
      12: '1.2rem',
      14: '1.4rem',
      16: '1.6rem',
      18: '1.8rem',
      20: '2rem',
      24: '2.4rem',
      30: '3rem',
      36: '3.6rem',
      44: '4.4rem',
      52: '5.2rem',
      62: '6.2rem',
      74: '7.4rem',
      86: '8.6rem',
      98: '9.8rem',
    },
    lineHeight: {
      DEFAULT: '1',
      medium: '1.2',
      paragraph: '1.5',
    },
    letterSpacing: {
      0.1: '0.1px',
      0.25: '0.25px',
      1.25: '1.25px',
    },
    screens: {
      phones: { min: '34em' },
      'smaller-tablets': { min: '44em' },
      tablets: { min: '59em' },
      'landscape-tablets': { min: '75em' },
      'smaller-desktops': { min: '84em' },
    },
    extend: {
      // ? ----- COLOR SYSTEM -----
      colors: {
        primary: {
          DEFAULT: '#1095DD',
          'shade-1': '#0485CB',
          'shade-2': '#045C8C',
        },
        'white-shade-1': '#f8f9fa',
        red: { DEFAULT: '#780000' },
      },

      // ? ----- SHADOW SYSTEM -----
      boxShadow: {
        'active-primary': '0 0 0 0.3rem rgba(16, 149, 221, 0.5)',
        navigation: '0 0.4rem 4.8rem rgba(0, 0, 0, 0.075)',
        soft: '0 2.4rem 4.8rem rgba(0, 0, 0, 0.075)',
        softer: '0 3.2rem 6.4rem rgba(0, 0, 0, 0.06)',
      },

      backgroundImage: {
        'sign-in': 'url("assets/img/Milli.jpg")',
      },
    },
  },
  plugins: [],
};
export default config;
