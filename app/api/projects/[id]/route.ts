// app/api/projects/[id]/route.ts
import { NextResponse } from 'next/server';
import { getProjectById } from '@/lib/projects-db';

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    // await params before reading id
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);

    // validate ID: return 404 bad request if ID is not a valid number
    if (Number.isNaN(id)) {
        return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
    }

    // query database
    const project = getProjectById(id);

    // return 404 not found if project doesn't exist
    if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // return matching project JSON
    return NextResponse.json(project);
}