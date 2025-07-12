import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthPage: React.FC = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-20">
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 w-full max-w-md">
                <h1 className="text-3xl font-bold text-white mb-6 text-center">
                    {isLogin ? "Sign In to StringArt" : "Create Your StringArt Account"}
                </h1>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        navigate("/dashboard");
                    }}
                    className="space-y-5"
                >
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-3 rounded-lg bg-slate-900 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded-lg bg-slate-900 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 rounded-lg bg-slate-900 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                        {isLogin ? "Sign In" : "Sign Up"}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-blue-400 hover:underline"
                    >
                        {isLogin
                            ? "Don't have an account? Sign up for StringArt"
                            : "Already have an account? Sign in"}
                    </button>
                </div>
                <div className="text-center mt-4">
                    <button
                        onClick={() => navigate("/")}
                        className="text-slate-400 hover:underline"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

