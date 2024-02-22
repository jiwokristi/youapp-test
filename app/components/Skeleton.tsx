const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-initial-state-medium before:to-transparent';

export const Skeleton = () => {
  return (
    <div
      className={`relative flex flex-col gap-16 overflow-x-hidden rounded-xl bg-initial-state p-16 ${shimmer}`}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="[&>div]:odd flex gap-16">
          <div className="h-24 basis-1/3 rounded-lg bg-initial-state-light"></div>
          <div className="h-24 basis-2/3 rounded-lg bg-initial-state-light"></div>
        </div>
      ))}
    </div>
  );
};
