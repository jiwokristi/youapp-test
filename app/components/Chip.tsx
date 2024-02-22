interface ChipProps extends React.ComponentProps<'div'> {
  classes?: string;
}

export const Chip = ({ classes = '', children, ...props }: ChipProps) => {
  return (
    <div
      className="rounded-full bg-white/5 px-16 py-8 text-14 font-semibold"
      {...props}
    >
      {children}
    </div>
  );
};
