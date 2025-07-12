import React from "react";
import { Zap, Shield, Users } from "react-feather";
import { useNavigate } from "react-router-dom";

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const features: Feature[] = [
        {
            icon: <Zap className="w-12 h-12 text-blue-400" />,
            title: "Instant Pattern Generation",
            description: "Upload your photo and get a beautiful string art pattern in seconds.",
        },
        {
            icon: <Shield className="w-12 h-12 text-green-400" />,
            title: "High Quality & Secure",
            description: "Your images are processed securely and your patterns are always high resolution.",
        },
        {
            icon: <Users className="w-12 h-12 text-purple-400" />,
            title: "Share & Inspire",
            description: "Join a creative community and share your string art masterpieces with the world.",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Turn Your Photos Into <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">String Art</span>
                        </h1>
                        <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
                            StringArt lets you transform your favorite memories into stunning string art patterns. Upload a photo, customize your design, and start creating!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/auth')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Get Started Free
                            </button>
                            <button
                                onClick={() => navigate('/about')}
                                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why StringArt?</h2>
                        <p className="text-xl text-blue-200 max-w-2xl mx-auto">
                            Discover the easiest way to create personalized string art from your photos.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-blue-200">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-20">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to Create Your Own String Art?
                    </h2>
                    <p className="text-xl text-blue-200 mb-8">
                        Join thousands of creators who trust StringArt to turn their photos into art.
                    </p>
                    <button
                        onClick={() => navigate('/auth')}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Start Your Free Trial
                    </button>
                </div>
            </div>
        </div>
    );
};