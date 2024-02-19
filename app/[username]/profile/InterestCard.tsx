import EditButton from './EditButton';

export default function InterestCard() {
  return (
    <div className="relative min-h-[12rem] w-full rounded-2xl bg-initial-state-medium p-24 pl-32">
      <EditButton fieldName="interest" />
      <span className="mb-32 inline-block text-14 font-bold">Interest</span>
      {/* ----- Fallback ----- */}
      <p className="text-14 leading-medium opacity-50">
        Add in your interest to find a better match
      </p>
    </div>
  );
}
