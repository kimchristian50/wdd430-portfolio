'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
    const pathname = usePathname();

    // Define your navigation links in an array
    const links = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Projects', href: '/projects' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className="flex space-x-4 p-4 text-white" aria-label="Primary">
            {links.map((link) => {
                const isActive = pathname === link.href;

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={`px-3 py-2 rounded-md font-medium transition-colors ${isActive
                            ? 'bg-indigo-500 text-white' // Active link style
                            : 'text-gray-300 hover:bg-gray-800' // Inactive link style
                            }`}
                    >
                        {link.name}
                    </Link>
                );
            })}
        </nav>
    );
}