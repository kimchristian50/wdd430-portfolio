import AboutList from '@/components/AboutList';
const abouts = [
    {
        title: 'Photography',
        description: 'I had a small photography business for many years, focusing on family portraiture.',
        image: '/image1.webp',
        link: 'https://photo.etherdox.com'
    },
    {
        title: 'Patent Analysis',
        description: 'I currently work as a patent analyst for chemical patent applications, for Global Patent Solutions, a contractor to the USPTO.',
        image: '/image2.webp',
        link: 'https://globalpatentsolutions.com'
    }
];

export default function About() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-gray-700">
                This about page shares more information about my background and work.
            </p>
            <AboutList abouts={abouts} />
        </main>
    );
}