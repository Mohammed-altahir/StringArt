import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface User {
    name?: string;
}

export const Navigation: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const handleLogout = (): void => {
        setIsAuthenticated(false);
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                StringArt
                            </div>
                        </div>
                    </div>
                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {!isAuthenticated ? (
                                <>
                                    <button
                                        onClick={() => navigate('/')}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            window.location.pathname === '/' 
                                                ? 'bg-white/20 text-white' 
                                                : 'text-blue-200 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        Home
                                    </button>
                                    <button
                                        onClick={() => navigate('/pricing')}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            window.location.pathname === '/pricing' 
                                                ? 'bg-white/20 text-white' 
                                                : 'text-blue-200 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        Pricing
                                    </button>
                                    <button
                                        onClick={() => navigate('/about')}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            window.location.pathname === '/about' 
                                                ? 'bg-white/20 text-white' 
                                                : 'text-blue-200 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        About
                                    </button>
                                    <button
                                        onClick={() => navigate('/auth')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Sign In
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate('/dashboard')}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                            window.location.pathname === '/dashboard' 
                                                ? 'bg-white/20 text-white' 
                                                : 'text-blue-200 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        Dashboard
                                    </button>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-blue-200 text-sm">Welcome, {user?.name || "Creator"}</span>
                                        <button
                                            onClick={handleLogout}
                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="bg-white/10 backdrop-blur-sm inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-white/20"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/10 backdrop-blur-sm border-t border-white/20">
                        {!isAuthenticated ? (
                            <>
                                <button
                                    onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-white/10 w-full text-left"
                                >
                                    Home
                                </button>
                                <button
                                    onClick={() => { navigate('/pricing'); setIsMobileMenuOpen(false); }}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-white/10 w-full text-left"
                                >
                                    Pricing
                                </button>
                                <button
                                    onClick={() => { navigate('/about'); setIsMobileMenuOpen(false); }}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-white/10 w-full text-left"
                                >
                                    About
                                </button>
                                <button
                                    onClick={() => { navigate('/auth'); setIsMobileMenuOpen(false); }}
                                    className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 w-full text-left"
                                >
                                    Sign In
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-white/10 w-full text-left"
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                                    className="block px-3 py-2 rounded-md text-base font-medium bg-red-600 text-white hover:bg-red-700 w-full text-left"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};
