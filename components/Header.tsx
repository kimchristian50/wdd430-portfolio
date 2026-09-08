// import Link from 'next/link';
import NavLinks from '@/components/NavLinks';

export default function Header() {
    return (
        <header className="bg-gray-800 text-white py-4 shadow-md">
            <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
                {/* Your Title */}
                <div id="header-title" className="text-2xl font-bold">
                    Pam Christison
                </div>

                {/* Your Active Link Component */}
                <NavLinks />
            </div>
        </header>
    );
}
