// components/ProjectCard.tsx
interface ProjectCardProps {
    id?: number;
    title: string;
    description: string;
    type?: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

export default function ProjectCard({ title, description, type, technologies, link }: ProjectCardProps) {
    return (
        <article className="p-4 border-l-4 border-indigo-600 bg-gray-50 rounded">
            <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                {type && (
                    <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 rounded font-semibold capitalize">
                        {type}
                    </span>
                )}
            </div>
            <p className="text-gray-700 mb-3">{description}</p>
            <p className="text-sm text-gray-600">
                <strong>Technologies:</strong> {technologies.join(', ')}
            </p>
            {link && (
                <p className="mt-2">
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Project</a>
                </p>
            )}
        </article>
    );
}