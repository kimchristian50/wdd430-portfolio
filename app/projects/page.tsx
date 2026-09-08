// app/projects/page.tsx
import ProjectList from '@/components/ProjectList';

const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

async function getProjects() {
    try {
        const res = await fetch(`${baseURL}/api/projects`, {
            cache: 'no-store',
        });

        console.log('API Response Status:', res.status); // <-- LOG STATUS

        if (!res.ok) return [];

        const data = await res.json();

        console.log('Fetched Data:', data); // <-- LOG DATA

        // read the projectList key off the response object
        return Array.isArray(data.projectList) ? data.projectList : [];
    } catch (error) {
        // console.error('Fetch error:', error);
        console.error('FETCH ERROR IN SERVER COMPONENT:', error); // <-- LOG ERROR
        return [];
    }
}

export default async function Projects() {
    const projects = await getProjects();

    return (
        <main className="container mx-auto px-4 py-12">
            <section className="text-center py-6">
                <h1 className="text-4xl font-bold mb-4">All Projects</h1>
            </section>
            <ProjectList projects={projects} />
        </main>
    );
}