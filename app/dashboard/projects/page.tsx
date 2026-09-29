// app/projects/create/page.tsx
'use client';

import { useActionState } from 'react';
import { createProject, State } from '@/lib/actions';

const initialState: State = { message: null, errors: {} };

export default function Page() {
    const [state, formAction, isPending] = useActionState(createProject, initialState);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Project</h2>

            <form action={formAction} className="space-y-5">
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
                        aria-describedby="title-error"
                        aria-invalid={!!state.errors?.title}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900"
                        placeholder="e.g., Portfolio Website"
                    />
                    <div id="title-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.title?.map((error: string) => (
                            <p key={error} className="mt-1 text-xs text-red-600 font-medium">
                                {error}
                            </p>
                        ))}
                    </div>
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
                        aria-describedby="description-error"
                        aria-invalid={!!state.errors?.description}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900"
                        placeholder="Describe your project..."
                    />
                    <div id="description-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.description?.map((error: string) => (
                            <p key={error} className="mt-1 text-xs text-red-600 font-medium">
                                {error}
                            </p>
                        ))}
                    </div>
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
                        aria-describedby="technologies-error"
                        aria-invalid={!!state.errors?.technologies}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900"
                        placeholder="Next.js, TypeScript, PostgreSQL"
                    />
                    <div id="technologies-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.technologies?.map((error: string) => (
                            <p key={error} className="mt-1 text-xs text-red-600 font-medium">
                                {error}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Year Completed Field */}
                <div>
                    <label
                        htmlFor="yearCompleted"
                        className="block text-sm font-semibold text-gray-700 mb-1"
                    >
                        Year Completed
                    </label>
                    <input
                        id="yearCompleted"
                        name="yearCompleted"
                        type="number"
                        aria-describedby="yearCompleted-error"
                        aria-invalid={!!state.errors?.yearCompleted}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-900"
                        placeholder="2026"
                    />
                    <div id="yearCompleted-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.yearCompleted?.map((error: string) => (
                            <p key={error} className="mt-1 text-xs text-red-600 font-medium">
                                {error}
                            </p>
                        ))}
                    </div>
                </div>

                {/* General Form Error Message (e.g., Database Failure) */}
                {/* General or Database Error Message */}
                {state.message ? <p className="text-sm font-medium text-red-600">{state.message}</p> : null}

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
                        disabled={isPending}
                        className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition shadow-sm"
                    >
                        {isPending ? 'Saving...' : 'Create Project'}
                    </button>
                </div>
            </form>
        </div>
    );
}