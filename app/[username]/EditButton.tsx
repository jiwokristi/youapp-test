'use client';

import { useContext } from 'react';
import Link from 'next/link';

import { Pencil } from '@/components/icons';

import { ToastContext } from '@/lib/contexts/toast';

export default function EditButton({
  fieldName,
  username,
}: {
  fieldName: string;
  username?: string;
}) {
  const { onToggleFields, fields } = useContext(ToastContext);

  if (fieldName === 'interest') {
    return (
      <Link href={`/${username}/interest`} className="absolute right-16 top-16">
        <Pencil />
      </Link>
    );
  }

  return (
    <button
      type={fields.includes('about') ? 'button' : 'submit'}
      onClick={() => onToggleFields(fieldName)}
    >
      {fields.includes('about') ? (
        <span className="text-golden absolute right-16 top-16 text-12">
          Save & Update
        </span>
      ) : (
        <Pencil className="absolute right-16 top-16" />
      )}
    </button>
  );
}
