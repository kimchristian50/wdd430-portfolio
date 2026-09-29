// lib/actions.ts
'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { auth } from '@/auth';

const ProjectFormSchema = z.object({
    title: z.string().min(2, { message: 'Title must be at least 2 characters long.' }),
    description: z.string().min(10, { message: 'Description must be at least 10 characters long.' }),
    technologies: z.string().min(2, { message: 'Please provide at least one technology.' }),
});

export type State = {
    errors?: {
        title?: string[];
        description?: string[];
        technologies?: string[];
        yearCompleted?: string[];
    };
    message?: string | null;
};

export async function createProject(prevState: State, formData: FormData): Promise<State> {
    // extract values from the form using the input `name` attributes
    // validate form fields using Zod
    await requireOwnerSession();
    
    const validatedFields = ProjectFormSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        technologies: formData.get('technologies'),
    });

    // if validation fails, return errors early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to create project.',
        };
    }

    const { title, description, technologies } = validatedFields.data;

    // convert "React, Next.js, Tailwind" into ["React", "Next.js", "Tailwind"]
    const techArray = technologies.split(',').map((t) => t.trim()).filter(Boolean);

    // format array for Vercel Postgres / SQL array literal
    const formattedTech = `{${techArray.join(',')}}`;

    // insert the record into Postgres with try/catch
    try {
        await sql`
        INSERT INTO projects (title, description, technologies)
        VALUES (${title}, ${description}, ${formattedTech}::text[])
    `;
    } catch (error) {
        console.error('Database Error:', error);
        return {
            message: 'Database Error: Failed to create project.'
        }
    }

    // purge the Next.js client cache for the projects list page
    revalidatePath('/projects');

    // redirect the user back to the main projects listing
    redirect('/projects');
}

export async function updateProject(id: string, formData: FormData) {
    // extract values from the form using the input `name` attributes
    await requireOwnerSession();
    const raw = {
        title: formData.get('title'),
        description: formData.get('description'),
        technologies: formData.get('technologies'),
    };

    const parsed = ProjectFormSchema.safeParse(raw);
    if (!parsed.success) {
        throw new Error('Invalid project input.');
    }

    const { title, description, technologies } = parsed.data;

    // convert "React, Next.js, Tailwind" into ["React", "Next.js", "Tailwind"]
    const techArray = technologies.split(',').map((t) => t.trim()).filter(Boolean);

    // format array for Vercel Postgres / SQL array literal
    const formattedTech = `{${techArray.join(',')}}`;

    // insert the record into Postgres
    await sql`
        UPDATE projects
        SET title = ${title}, description = ${description}, technologies = ${formattedTech}::text[]
        WHERE id = ${id}
    `;

    // purge the Next.js client cache for the projects list page
    revalidatePath('/projects');

    // redirect the user back to the main projects listing
    redirect('/projects');
}

export async function deleteProject(id: string) {
    // temp test - force and unhandled error
    // throw new Error('Database connection failed unexpectedly!');
    await requireOwnerSession();

    try {
        await sql`DELETE FROM projects WHERE id = ${id}`;
        revalidatePath('/projects');
    } catch (error) {
        console.error('Error deleting project:', error);
        throw new Error('Failed to delete Project. Please try again later.');
    }
    revalidatePath('/projects');
    redirect('/projects');
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    console.log('authenticate called');
    console.log('email from form:', formData.get('email'));
    console.log('password from form:', formData.get('password'));
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid email or password.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error; // re-throw so Next.js handles redirects correctly
    }
}

async function requireOwnerSession() {
    const session = await auth();
    if (!session?.user) throw new Error('Not authenticated');
    return session;
}