// components/ProjectList.tsx

import ProjectCard from './ProjectCard';
import { Project } from '@/lib/projects-db';

interface ProjectListProps {
    projects: Project[];
}

export default function ProjectList({ projects = [] }: ProjectListProps) {
    // safety check: ensure projects is actually an array before mapping
    if (!Array.isArray(projects) || projects.length === 0) {
        return <p className="text-center text-gray-500 italic py-6">No projects found.</p>
    }

    return (
        <section className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
            ))}
        </section>
    );
}