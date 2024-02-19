'use client';

import { useContext } from 'react';
import Link from 'next/link';

import { Pencil } from '@/components/icons';

import { ToastContext } from '@/lib/contexts/toast';

export default function EditButton({ fieldName }: { fieldName: string }) {
  const { onToggleFields, fields } = useContext(ToastContext);

  return (
    <button
      type="button"
      onClick={() => {
        if (fieldName === 'about') {
          onToggleFields(fieldName);
        } else {
          //...
        }
      }}
    >
      {fields.includes(fieldName) ? (
        <span className="text-golden absolute right-16 top-16 text-12">
          Save & Update
        </span>
      ) : (
        <>
          {fieldName === 'about' && (
            <Pencil className="absolute right-16 top-16" />
          )}
          {fieldName === 'interest' && (
            <Link href="profile/interest" className="absolute right-16 top-16">
              <Pencil />
            </Link>
          )}
        </>
      )}
    </button>
  );
}
