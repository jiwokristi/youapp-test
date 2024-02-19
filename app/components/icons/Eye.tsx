import React from 'react';

export const Eye = () => {
  return (
    <svg
      id="Eye"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-eye"
    >
      <defs>
        <linearGradient
          id="paint0_linear_11_3054"
          x1="-3.5"
          y1="14"
          x2="24.6814"
          y2="4.54055"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0237305" stopColor="#94783E" />
          <stop offset="0.216904" stopColor="#F3EDA6" />
          <stop offset="0.329505" stopColor="#F8FAE5" />
          <stop offset="0.486109" stopColor="#FFE2BE" />
          <stop offset="0.723574" stopColor="#D5BE88" />
          <stop offset="0.809185" stopColor="#F8FAE5" />
          <stop offset="0.902849" stopColor="#D5BE88" />
        </linearGradient>
      </defs>
      <path
        d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
        stroke="url(#paint0_linear_11_3054)"
      />
      <circle cx="12" cy="12" r="3" stroke="url(#paint0_linear_11_3054)" />
    </svg>
  );
};
