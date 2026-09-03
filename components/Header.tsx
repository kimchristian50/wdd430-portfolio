import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-indigo-600 text-white py-4 shadow-md">
            <div id="header-title" className="text-2xl font-bold">Pam Christison</div>
            <nav className="max-w-4xl mx-auto px-4 flex justify-between items-center">
                <ul className="flex gap-6">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                </ul>
            </nav>
        </header>
    );
}