// components/ProjectSearch.tsx
'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function ProjectSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // Wrap the URL update logic in a 300ms debounce timer
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        // reset to page 1 on every new search
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        // update the browser URL after user stops typing for 300ms
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <input
            type="search"
            placeholder="Search projects..."
            defaultValue={searchParams.get('query')?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
    );
}