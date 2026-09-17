// lib/projects-db.ts
import { sql } from '@vercel/postgres';

export interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

export async function getProjects(
    type?: string | null,
    query?: string,
    page: number = 1,       // defaults to 1 if not passed
    limit: number = 6       // defaults to 6 projects per page if not passed
): Promise<Project[]> {

    // calculate the starting position (offset)
    const offset = (page - 1) * limit;

    // format the search string for SQL wildcards
    const searchPattern = query ? `%${query}%` : '%';

    if (type) {
        const { rows } = await sql<Project>`
      SELECT * FROM projects
      WHERE type = ${type} 
      AND (
        title ILIKE ${searchPattern} 
        OR description ILIKE ${searchPattern}
        OR array_to_string(technologies, ' ') ILIKE ${searchPattern}
      )
      ORDER BY id
      LIMIT ${limit} OFFSET ${offset}
    `;
        return rows;
    }
    // if there's no type
    // the technologies field is an array so it's cast to a string inside the ILIKE check
    const { rows } = await sql<Project>`
    SELECT * FROM projects
    WHERE (
        title ILIKE ${searchPattern} 
        OR description ILIKE ${searchPattern} 
        OR array_to_string(technologies, ' ') ILIKE ${searchPattern} 
)
    ORDER BY id
    LIMIT ${limit} OFFSET ${offset}
`;
    return rows;
}

export async function getProjectById(id: number): Promise<Project | null> {
    const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE id = ${id}
  `;
    return rows[0] ?? null;
}

export async function fetchProjectsPages(
    query: string,
    type?: string | null,
    limit: number = 6
): Promise<number> {
    const searchPattern = query ? `%${query}%` : `%`;

    if (type) {
        const { rows } = await sql<{ count: string }>`
            SELECT COUNT(*) FROM projects 
            WHERE type = ${type} 
              AND (
                  title ILIKE ${searchPattern} 
                  OR description ILIKE ${searchPattern}
                  OR array_to_string(technologies, ' ') ILIKE ${searchPattern}
              )
        `;
        return Math.ceil(Number(rows[0].count) / limit);
    }

    const { rows } = await sql < { count: string }>`
        SELECT COUNT(*) FROM projects
        WHERE title ILIKE ${searchPattern} 
           OR description ILIKE ${searchPattern}
           OR array_to_string(technologies, ' ') ILIKE ${searchPattern}
    `;

    const totalItems = Number(rows[0].count);
    return Math.ceil(totalItems / limit);
}