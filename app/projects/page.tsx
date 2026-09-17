// app/projects/page.tsx
import ProjectList from '@/components/ProjectList';
import { getProjects, fetchProjectsPages, Project } from '@/lib/projects-db';
import ProjectSearch from '@/components/ProjectSearch';
import Pagination from '@/components/Pagination';

// Force dynamic rendering at runtime (no static caching at build time)
export const dynamic = 'force-dynamic';

interface PageProps {
    searchParams?: Promise<{
        query?: string;             // optional text string from ?query=
        page?: string;              // optional page number string from ?page=
    }>;
}

export default async function Projects({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;           // unpacks { query: '...', page: '...'}
    const query = resolvedParams?.query || '';           // defaults to empty string if not present
    const page = Number(resolvedParams?.page) || 1;      // converts string "1" to number 1

    // fetch filtered & paginated projects directly from Neon Postgres
    // fetch projects AND total page count
    // parameters: type (null for all) query, page
    const [projects, totalPages] = await Promise.all([
        getProjects(null, query, page),
        fetchProjectsPages(query, null)
    ]);

    return (
        <main className="container mx-auto px-4 py-12">
            <section className="text-center py-6">
                <h1 className="text-4xl font-bold mb-4">All Projects</h1>
            </section>

            {/* Client Component rendered inside a Server Component - interactive search bar*/}
            <div className="max-w-md mx-auto mb-8">
                <ProjectSearch />
            </div>

            {/* Project grid */}
            <ProjectList projects={projects} />

            {/* render pagination */}
            <Pagination totalPages ={totalPages} />
        </main>
    );
}


