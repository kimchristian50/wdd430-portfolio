// app/projects/opensource/page.txs
import ProjectList from '@/components/ProjectList';

const baseURL = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

async function getOpensourceProjects() {
    try {
        const res = await fetch(`${baseURL}/api/projects?type=opensource`, { cache: 'no-store' });

        if (!res.ok) return [];

        // store the parsed JSON in a variable
        const data = await res.json();

        // extract projectList array safely
        return Array.isArray(data.projectList) ? data.projectList : [];
    } catch (error) {
        console.error('Fetch error in opensource projects:', error);
        return [];
    }
}

export default async function OpensourceProjects() {
    const projects = await getOpensourceProjects();

    return (
        <main className="container mx-auto px-4 py-12">
            <section className="text-center py-6">
                <h1 className="text-4xl font-bold mb-4">Opensource Projects</h1>
            </section>
            <ProjectList projects={projects} />
        </main>
    );
}