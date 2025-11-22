import { useState } from 'react';

export default function LinkForm({ onLinkCreated }) {
    const [url, setUrl] = useState('');
    const [code, setCode] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage({ text: '', type: '' });

        try {
            const res = await fetch('/api/links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, code: code || undefined }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ text: 'Link created successfully!', type: 'success' });
                setUrl('');
                setCode('');
                onLinkCreated();
            } else {
                throw new Error(data.error || 'Something went wrong');
            }
        } catch (err) {
            setMessage({ text: err.message, type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white">
                <span className="gradient-text">Shorten Your Links</span> with Style
            </h2>
            <p className="text-slate-800 dark:text-slate-200 text-lg mb-8">
                Create short, memorable links in seconds. Track clicks and manage your URLs easily.
            </p>

            <div className="bg-white/95 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border-2 border-purple-300/40 dark:border-purple-500/30">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-grow relative">
                            <input
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Paste your long URL here..."
                                required
                                className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-800/80 border-2 border-purple-300/60 dark:border-purple-500/40 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all text-slate-800 dark:text-white placeholder-purple-500/50 dark:placeholder-purple-400/60"
                            />
                        </div>
                        <div className="sm:w-48 relative">
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Custom Code (opt)"
                                pattern="[A-Za-z0-9]{6,8}"
                                className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-800/80 border-2 border-purple-300/60 dark:border-purple-500/40 focus:border-purple-500 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all text-slate-800 dark:text-white placeholder-purple-500/50 dark:placeholder-purple-400/60"
                                title="6-8 alphanumeric characters"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {submitting ? 'Creating...' : 'Shorten'}
                        </button>
                    </div>
                    {message.text && (
                        <div
                            className={`text-sm font-medium ${message.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                }`}
                        >
                            {message.text}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
