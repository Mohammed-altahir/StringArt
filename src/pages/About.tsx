import React from "react";
import { Star, Users, Zap, Mail, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Stat {
    number: string;
    label: string;
}

interface Value {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface Contact {
    icon: React.ReactNode;
    title: string;
    content: string;
}

export const AboutPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        About <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">StringArt</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        StringArt is on a mission to make art accessible to everyone by transforming your favorite photos into beautiful string art patterns. Whether you're a hobbyist or a professional, our platform helps you create stunning, personalized string art from any image.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <button
                            onClick={() => navigate('/')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                        >
                            Back to Home
                        </button>
                        <button
                            onClick={() => navigate('/auth')}
                            className="bg-white/10 border border-white/20 text-white hover:bg-white/20 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                        >
                            Try StringArt
                        </button>
                    </div>
                </div>

                {/* Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                        <p className="text-slate-300 text-lg mb-4">
                            StringArt was born from a love of creativity and technology. Our founders wanted to bridge the gap between digital photography and hands-on crafting. Since launching, we've helped thousands of users turn their memories into unique string art masterpieces.
                        </p>
                        <p className="text-slate-300 text-lg">
                            Today, StringArt continues to innovate, offering easy-to-use tools, advanced pattern generation, and a supportive community for artists of all skill levels.
                        </p>
                    </div>
                    <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                        <div className="grid grid-cols-2 gap-6">
                            {([
                                { number: '20K+', label: 'Patterns Generated' },
                                { number: '8K+', label: 'Happy Creators' },
                                { number: '100+', label: 'Countries Served' },
                                { number: '24/7', label: 'Support' }
                            ] as Stat[]).map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl font-bold text-blue-400 mb-2">{stat.number}</div>
                                    <div className="text-slate-300 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {([
                            {
                                icon: <Star className="w-10 h-10 text-yellow-400" />,
                                title: 'Creativity',
                                description: 'We empower everyone to express themselves through unique string art designs.'
                            },
                            {
                                icon: <Users className="w-10 h-10 text-blue-400" />,
                                title: 'Community',
                                description: 'We foster a welcoming space for artists and makers to share, learn, and inspire each other.'
                            },
                            {
                                icon: <Zap className="w-10 h-10 text-purple-400" />,
                                title: 'Innovation',
                                description: 'We use technology to make art creation simple, fun, and accessible to all.'
                            }
                        ] as Value[]).map((value, index) => (
                            <div key={index} className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
                                <div className="flex justify-center mb-4">{value.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                                <p className="text-slate-300">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">Get In Touch</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {([
                            {
                                icon: <Mail className="w-6 h-6 text-blue-400" />,
                                title: 'Email',
                                content: 'support@stringart.app'
                            },
                            {
                                icon: <Phone className="w-6 h-6 text-green-400" />,
                                title: 'Phone',
                                content: '+1 (555) 987-6543'
                            },
                            {
                                icon: <MapPin className="w-6 h-6 text-red-400" />,
                                title: 'Address',
                                content: '456 Artistry Ave, Creativity City, 54321'
                            }
                        ] as Contact[]).map((contact, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                {contact.icon}
                                <div>
                                    <div className="font-medium text-white">{contact.title}</div>
                                    <div className="text-slate-300">{contact.content}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
