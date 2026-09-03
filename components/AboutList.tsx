import AboutCard from './AboutCard';

interface About {
    title: string;
    description: string;
    image: string;
    link?: string;
}

interface AboutListProps {
    abouts: About[];
}

export default function AboutList({ abouts }: AboutListProps) {
    return (
        <section className="grid gap-4 md:grid-cols-2">
            {abouts.map((about) => (
                <AboutCard key={about.title} {...about} />
            ))}
        </section>
    );
}