// app/page.tsx
import ProjectList from '@/components/ProjectList';
import { Project } from '@/lib/projects-db';

const projects : Project[] = [
  {
    id: 1,
    title: 'Park Planner',
    description: 'An interactive web application designed to help outdoor enthusiasts search for U.S. National Parks by activity and by state.',
    type: 'school',
    technologies: ['JavaScript', 'CSS'],
    link: 'https://kimchristian50.github.io/cp/search.html'
  },
  {
    id: 2,
    title: 'My Recipe Workbench',
    description: 'An interactive webb application that allows recipes to be searched, displayed, and a potential shopping list is generated.',
    type: 'school',
    technologies: ['JavaScript', 'CSS'],
    link: 'https://kimchristian50.github.io/wdd231/final/'
  }
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-lg text-gray-700">
          I am a full-stack developer learning Next.js and React. Here are some of my recent projects.
        </p>
      </section>
      <ProjectList projects={projects} />
    </main>
  );
}

