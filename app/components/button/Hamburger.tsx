import clsx from 'clsx';

interface HamburgerProps extends React.ComponentProps<'button'> {
  open: boolean;
  classes?: string;
}

export const Hamburger = ({ open, classes = '', ...props }: HamburgerProps) => {
  return (
    <button
      type="button"
      className={clsx(
        `relative h-32 w-32 rounded transition-all ease-in hover:bg-white-shade-1 active:bg-white-shade-1 ${classes}`,
        {
          'rotate-90': open,
        },
      )}
      {...props}
    >
      <span
        className={clsx(
          'absolute inset-x-0 top-[0.6rem] h-[0.3rem] bg-primary transition-all ease-in',
          {
            'translate-y-[0.8rem] rotate-45': open,
          },
        )}
      >
        &nbsp;
      </span>
      <span
        className={clsx(
          'absolute inset-x-0 top-[1.4rem] h-[0.3rem] bg-primary transition-all ease-in',
          {
            'opacity-0': open,
          },
        )}
      >
        &nbsp;
      </span>
      <span
        className={clsx(
          'absolute inset-x-0 top-[2.2rem] h-[0.3rem] bg-primary transition-all ease-in',
          {
            '-translate-y-[0.8rem] -rotate-45': open,
          },
        )}
      >
        &nbsp;
      </span>
    </button>
  );
};
