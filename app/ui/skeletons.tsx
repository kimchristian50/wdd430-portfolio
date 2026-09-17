// Skeleton for a single Project Card
export function ProjectCardSkeleton() {
    return (
        <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm space-y-4 animate-pulse">
            {/* Title Placeholder */}
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />

            {/* Description Placeholders */}
            <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>

            {/* Technology Badges Placeholders */}
            <div className="flex gap-2 pt-2">
                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
        </div>
    );
}

// Skeleton for the entire Project Grid/List
export function ProjectListSkeleton() {
    return (
        // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
        </div>
    );
}