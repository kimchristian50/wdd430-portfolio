// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/projects-db';

// GET /api/products/123
export async function GET(request: Request) {

    // extract URL query parameters (e.g. ?type=opensource)
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    // Fetch filtered or full list from database
    const projectList = getProjects(type);

    return NextResponse.json({ projectList });
}