export const DatePickerFooter = () => {
  return (
    <div className="mt-16 flex items-center justify-center gap-24">
      <div className="flex items-center gap-8">
        <div className="h-12 w-12 rounded-md bg-white">&nbsp;</div>
        <span className="text-14 text-white">Today</span>
      </div>
      <div className="flex items-center gap-8">
        <div className="bg-gradient-blue h-12 w-12 rounded-md">&nbsp;</div>
        <span className="text-14 text-white">Selected</span>
      </div>
    </div>
  );
};
