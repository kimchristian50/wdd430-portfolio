// app/projects/[id]/edit/page.tsx
import { sql } from '@vercel/postgres';
import { notFound } from 'next/navigation';
import { updateProject } from '@/lib/actions';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    // fetch the existing project from PostgreSQL using its ID
    const { rows } = await sql`SELECT * FROM projects WHERE id = ${id}`;
    const project = rows[0]

    // if no project was found for that ID, show a 404 page
    if (!project) {
        notFound();
    }

    // format the technologies array into a comma-separated string for the input
    // (e.g. ['React', 'Next.js'] -> "React, Next.js")

    const defaultTechnologies = Array.isArray(project.technologies)
        ? project.technologies.join(', ')
        : project.technologies;

    // bind the project `id` to the updateProject Server Action
    const updateProjectWithId = updateProject.bind(null, id);

    // Fetch project by id and render the edit form...
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Project</h2>

            <form action={updateProjectWithId} className="space-y-5">
                {/* Title Field */}
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        defaultValue={project.title}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900"
                        placeholder="e.g., Portfolio Website"
                    />
                </div>

                {/* Description Field */}
                <div>
                    <label
                        htmlFor="description"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        defaultValue={project.description}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900"
                        placeholder="Describe your project..."
                    />
                </div>

                {/* Technologies Field */}
                <div>
                    <label
                        htmlFor="technologies"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                        Technologies <span className="text-xs font-normal text-gray-500">(comma-separated)</span>
                    </label>
                    <input
                        id="technologies"
                        name="technologies"
                        type="text"
                        defaultValue={defaultTechnologies}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900"
                        placeholder="Next.js, TypeScript, PostgreSQL"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <a
                        href="/projects"
                        className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                    >
                        Cancel
                    </a>
                    <button
                        type="submit"
                        className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition shadow-sm"
                    >
                        Update Project
                    </button>
                </div>
            </form>
        </div>
    );
}