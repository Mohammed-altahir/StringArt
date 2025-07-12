import StringArtGenerator from "./StringArt";

interface Stat {
    title: string;
    count: string;
    color: string;
}

interface DashboardProps {
    user?: {
        name?: string;
    };
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Welcome to Your StringArt Dashboard
                    </h1>
                    <p className="text-xl text-slate-300">
                        Here’s your creative workspace{user?.name ? `, ${user.name}` : ""}! Upload photos, generate patterns, and track your string art projects.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {([
                        { title: 'Patterns Created', count: '12', color: 'bg-blue-600' },
                        { title: 'Photos Uploaded', count: '30', color: 'bg-green-600' },
                        { title: 'Community Shares', count: '5', color: 'bg-yellow-600' },
                        { title: 'Storage Used', count: '2.3GB', color: 'bg-red-600' },

                    ] as Stat[]).map((stat: Stat, index: number) => (
                        <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center">
                            <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 text-white ${stat.color}`}>
                                <span className="text-xl font-bold">{stat.count}</span>
                            </div>
                            <div className="text-slate-300 text-lg">{stat.title}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-12">
                    <StringArtGenerator/>
                </div>
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
                    <div className="space-y-4">
                        <div className="text-slate-300">You generated a new pattern from "Sunset.jpg".</div>
                        <div className="text-slate-300">You completed the "Family Portrait" string art project.</div>
                        <div className="text-slate-300">You shared "Cat Pattern" with the community.</div>
                    </div>
                </div>
            </div>
        </div>
    );
};