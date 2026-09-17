// components/Pagination.tsx
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    // Helper to construct URL string for a target page
    const createPageURL = (pageNumber: number | string) => {
        // reads key-value pairs in browser's address bar, searchParams holds the query and an editable copy is created
        const params = new URLSearchParams(searchParams);
        // inserts or updates the 'page' key inside the copy of the parameters
        params.set('page', pageNumber.toString());
        // combines folder route with newly formatted search string, returns the full url string
        return `${pathname}?${params.toString()}`;
    };

    if (totalPages <= 1) return null;

    return (
        <nav className="flex justify-center items-center gap-4 mt-8">
            <Link
                href={createPageURL(currentPage - 1)}
                className={`px-4 py-2 border rounded-md dark:border-gray-700 ${currentPage <= 1 ? 'pointer-events-none opacity-50' : ''
                    }`}
            >
                Previous
            </Link>

            <span className="text-sm">
                Page {currentPage} of {totalPages}
            </span>

            <Link
                // if you are on page 1 with search "react", currentPage + 1 becomes 2.
                // createPageURL(2) builds "/projects?query=react&page=2"
                // clicking Next updates the URL bar without reloading the whole page.
                // Next.js catches the URL update and re-runs app/projects/page.tsx on the server with page=2.
                href={createPageURL(currentPage + 1)}
                className={`px-4 py-2 border rounded-md dark:border-gray-700 ${currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''
                    }`}
            >
                Next
            </Link>
        </nav>
    );
}