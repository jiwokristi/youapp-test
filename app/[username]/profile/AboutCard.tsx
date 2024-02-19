import { aboutFormFields } from '@/lib/constants/form-fields';

import EditButton from './EditButton';
import AboutForm from './AboutForm';

export default function AboutCard() {
  return (
    <div className="relative mb-16 min-h-[12rem] w-full rounded-2xl bg-initial-state-medium p-24 pl-32">
      <EditButton fieldName="about" />
      <span className="mb-32 inline-block text-14 font-bold">About</span>
      {/* ----- Fallback ----- */}
      <p className="text-14 leading-medium opacity-50">
        Add in your your to help others know you better
      </p>
      {/* ----- Filled ----- */}
      {/* <div className="flex flex-col gap-16 transition-all ease-in">
        {aboutFormFields.map(field => (
          <div key={field.id} className="flex items-center gap-8 text-[1.3rem]">
            <span className="opacity-30">{field.label}</span>
            <span>Value</span>
          </div>
        ))}
      </div> */}
      <AboutForm />
    </div>
  );
}
