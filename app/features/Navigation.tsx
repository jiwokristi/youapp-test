'use client';

import { useState } from 'react';

import { Button, Hamburger } from '@/components/button';

export const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav
      id="Navigation"
      className="landscape-tablets:flex-row sticky top-0 z-10 flex flex-row-reverse items-center justify-between bg-white px-32 py-16 shadow-navigation"
    >
      <span className="text-24 font-bold text-primary">PAWS & PLAY</span>
      <Button classes="rounded-xl hidden landscape-tablets:block">
        BOOK NOW
      </Button>
      <Hamburger
        open={open}
        onClick={() => setOpen(p => !p)}
        classes="block landscape-tablets:hidden"
      />
    </nav>
  );
};
