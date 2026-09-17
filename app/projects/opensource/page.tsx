// app/projects/opensource/page.txs
import ProjectList from '@/components/ProjectList';
import { getProjects, Project } from '@/lib/projects-db';

async function getOpensourceProjects(): Promise<Project[]> {
    // await new Promise(res => setTimeout(res, 2000));
    try {
        // query the database directly on the server
        const projects = await getProjects('opensource');
        console.log('Fetched Data from DB:', projects);
        return projects;

    } catch (error) {
        // console.error('Fetch error:', error);
        console.error('FETCH ERROR IN SERVER COMPONENT:', error); // <-- LOG ERROR
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