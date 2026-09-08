// app/projects/school/page.txs
import ProjectList from '@/components/ProjectList';

async function getSchoolProjects() {
  try {
    const res = await fetch('http://localhost:3000/api/projects?type=school', { cache: 'no-store' });
   
    // console.log('API Response Status:', res.status); // <-- LOG STATUS

    if (!res.ok) return [];

    // store the parsed JSON in a variable
    const data = await res.json();

    // extract projectList array safely
    return Array.isArray(data.projectList) ? data.projectList : [];
  } catch (error) {
    console.error('Fetch error in school projects:', error);
    return [];
  }
}

export default async function SchoolProjects() {
  const projects = await getSchoolProjects();

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-6">
        <h1 className="text-4xl font-bold mb-4">School Projects</h1>
      </section>
      <ProjectList projects={projects} />
    </main>
  );
}