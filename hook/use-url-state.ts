'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useUrlState(defaultValue = {}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const urlState: Record<string, string> = { ...defaultValue };

  // populate from current URL
  for (const [key, value] of searchParams.entries()) {
    urlState[key] = value;
  }

  const setUrlState = (partial: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(partial).forEach(([key, value]) => {
      if (value === undefined || value === null) params.delete(key);
      else params.set(key, value);
    });

    router.replace(`${pathname}?${params.toString()}`);
  };

  function deleteUrlState(key: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return { urlState, setUrlState, deleteUrlState } as const;
}
