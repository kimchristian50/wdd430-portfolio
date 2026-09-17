// app/projects/school/page.txs
import ProjectList from '@/components/ProjectList';
import { getProjects, Project } from '@/lib/projects-db';
import { Suspense } from 'react';
import { ProjectListSkeleton } from '../../ui/skeletons';

export const dynamic = 'force-dynamic';


async function getSchoolProjects(): Promise<Project[]> {
  // await new Promise(res => setTimeout(res, 2000)); // used to test the suspense loading
  try {
    // query the database directly on the server
    const projects = await getProjects('school');
    console.log('Fetched Data from DB:', projects);
    return projects;

  } catch (error) {
    // console.error('Fetch error:', error);
    console.error('FETCH ERROR IN SERVER COMPONENT:', error); // <-- LOG ERROR
    return [];
  }
}

export async function SchoolProjectList() {
  const projects = await getSchoolProjects();
  return <ProjectList projects={projects} />;
}

export default function SchoolProjects() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-6">
        <h1 className="text-4xl font-bold mb-4">School Projects</h1>
      </section>

      {/* Header renders instantly; fallback shows while SchoolProjectsList fetches */}
      <Suspense fallback={<ProjectListSkeleton />}>
        <SchoolProjectList />
      </Suspense>
    </main>
  );
}