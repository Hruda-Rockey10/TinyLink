import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { useState } from 'react';

export default function Layout({ children }) {
    const { isDark, toggleDarkMode } = useDarkMode();
    const [isAnimating, setIsAnimating] = useState(false);

    const handleToggle = () => {
        setIsAnimating(true);
        toggleDarkMode();
        setTimeout(() => setIsAnimating(false), 600);
    };

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
            {/* Animated gradient background */}
            <div className="fixed inset-0 animated-bg -z-10"></div>

            {/* Header */}
            <header className="w-full py-6 px-4 sm:px-8 flex justify-between items-center sticky top-0 z-50 bg-white/20 dark:bg-slate-900/40 backdrop-blur-lg border-b border-white/30 dark:border-white/10">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        T
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">TinyLink</h1>
                </Link>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleToggle}
                        className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-slate-700/50 transition-colors"
                        aria-label="Toggle dark mode"
                    >
                        {isDark ? (
                            <svg className={`w-6 h-6 text-yellow-400 ${isAnimating ? 'rotate-animation' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            <svg className={`w-6 h-6 text-slate-700 ${isAnimating ? 'rotate-animation' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>

                    <a
                        href="https://github.com/Hruda-Rockey10/TinyLink"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {children}
            </main>

            <footer className="py-8 mt-auto bg-white/20 dark:bg-slate-900/40 backdrop-blur-lg border-t border-white/30 dark:border-white/10">
                <div className="container mx-auto px-6 text-center text-slate-800 dark:text-slate-300 text-sm font-medium">
                    &copy; 2025 TinyLink. Built with Node.js, Express, React + Vite & PostgreSQL.
                </div>
            </footer>
        </div>
    );
}
