import Link from 'next/link';
import { SignOutButton } from '@/components/sign-out-button';

export default function DashboardPage() {
    return (
        <main className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Portfolio Dashboard</h1>

            <div className="flex flex-col gap-4 max-w-sm">
                <Link
                    href="/dashboard/projects"
                    className="px-4 py-2 bg-indigo-600 text-white rounded text-center hover:bg-indigo-700"
                >
                    Create New Project
                </Link>
                <Link
                    href="/projects"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-center hover:bg-gray-200"
                >
                    View Public Projects
                </Link>
                <SignOutButton />
            </div>
        </main>
    );
}