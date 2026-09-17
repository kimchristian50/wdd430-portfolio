export default function Loading() {
    return (
        <main className="container mx-auto px-4 py-12">
            {/* Skeleton Title Header */}
            <section className="text-center py-6">
                <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-md mx-auto mb-4 animate-pulse" />
            </section>

            {/* Skeleton Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* {[1, 2, 3, 4, 5, 6].map((item) => ( */}
                {
                    [1, 2].map((item) => (
                        <div
                            key={item}
                            className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm space-y-4 animate-pulse"
                        >
                            {/* Project Title Placeholder */}
                            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />

                            {/* Project Description Placeholders */}
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
                            </div>

                            {/* Technologies Badges Placeholder */}
                            <div className="flex gap-2 pt-2">
                                <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                                <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
                            </div>
                        </div>
                    ))}
            </div>
        </main>
    );
}