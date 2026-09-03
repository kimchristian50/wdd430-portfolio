interface AboutCardProps {
    title: string;
    description: string;
    image: string;
    link?: string;
}

export default function AboutCard({ title, description, image, link }: AboutCardProps) {
    return (
        <article className="p-4 border-l-4 border-indigo-600 bg-gray-50 rounded">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-700 mb-3">{description}</p>
            <img src={image} alt={title} className="w-full h-48 object-cover rounded mb-3" />
            {link && (
                <p className="mt-2">
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Website</a>
                </p>
            )}
        </article>
    );
}