import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function Stats() {
    const { code } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [linkData, setLinkData] = useState(null);

    useEffect(() => {
        fetchStats();
    }, [code]);

    const fetchStats = async () => {
        try {
            const res = await fetch(`/api/links/${code}`);
            if (!res.ok) throw new Error('Not found');
            const data = await res.json();
            setLinkData(data);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        const shortUrl = `${window.location.origin}/${linkData.code}`;
        navigator.clipboard.writeText(shortUrl).then(() => {
            alert('Copied!');
        });
    };

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this link?')) {
            try {
                const res = await fetch(`/api/links/${code}`, { method: 'DELETE' });
                if (res.ok) {
                    navigate('/');
                }
            } catch (err) {
                alert('Failed to delete');
            }
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="max-w-2xl mx-auto text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-slate-500">Loading stats...</p>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="max-w-2xl mx-auto text-center py-12">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Link Not Found</h3>
                    <p className="text-slate-500 mt-2">
                        The link you are looking for does not exist or has been deleted.
                    </p>
                    <Link
                        to="/"
                        className="inline-block mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Go Home
                    </Link>
                </div>
            </Layout>
        );
    }

    const shortUrl = `${window.location.origin}/${linkData.code}`;

    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <div className="space-y-6">
                    {/* Header Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-pink-500"></div>

                        <h2 className="text-sm uppercase tracking-widest text-slate-400 font-semibold mb-2">
                            Link Statistics
                        </h2>
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">{shortUrl}</h1>
                            <button
                                onClick={copyToClipboard}
                                className="p-2 text-slate-400 hover:text-indigo-600 transition-colors rounded-full hover:bg-indigo-50"
                                title="Copy to clipboard"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left break-all border border-slate-100">
                            <span className="text-xs text-slate-400 font-semibold uppercase block mb-1">
                                Target URL
                            </span>
                            <a
                                href={linkData.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:underline font-medium"
                            >
                                {linkData.url}
                            </a>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                                <span className="text-indigo-400 text-xs font-bold uppercase">Total Clicks</span>
                                <div className="text-3xl font-bold text-indigo-600 mt-1">{linkData.clicks}</div>
                            </div>
                            <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
                                <span className="text-pink-400 text-xs font-bold uppercase">Created</span>
                                <div className="text-lg font-semibold text-pink-600 mt-2">
                                    {new Date(linkData.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                            <span className="text-slate-400 text-xs font-bold uppercase">Last Clicked</span>
                            <div className="text-lg font-semibold text-slate-600 mt-1">
                                {linkData.last_clicked
                                    ? new Date(linkData.last_clicked).toLocaleString()
                                    : 'Never'}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 px-6 py-3 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                            Delete Link
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
