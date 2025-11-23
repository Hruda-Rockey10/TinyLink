import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LinkList({ links, onDelete }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLinks = links.filter(
        (link) =>
            link.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            link.url.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        });
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Your Links</h3>
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search links..."
                        className="pl-10 pr-4 py-2 rounded-lg bg-white/80 dark:bg-slate-900/60 border border-purple-200/50 dark:border-purple-500/30 focus:border-purple-400 focus:ring-1 focus:ring-purple-300/50 dark:focus:ring-purple-600/50 outline-none text-sm text-slate-800 dark:text-white placeholder-purple-400/60 dark:placeholder-purple-400/40"
                    />
                    <svg
                        className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>

            <div className="rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-black">
                {filteredLinks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4 text-indigo-500 dark:text-indigo-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                />
                            </svg>
                        </div>
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white">No links yet</h4>
                        <p className="text-slate-600 dark:text-slate-300 max-w-xs mx-auto mt-1">
                            Create your first short link above to get started.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-black border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-xs uppercase tracking-wider font-semibold">
                                    <th className="px-6 py-4">Short Link</th>
                                    <th className="px-6 py-4">Original URL</th>
                                    <th className="px-6 py-4 text-center">Clicks</th>
                                    <th className="px-6 py-4">Created</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-sm text-slate-700 dark:text-white">
                                {filteredLinks.map((link) => {
                                    const shortUrl = `${window.location.origin}/${link.code}`;
                                    return (
                                        <tr key={link.code} className="hover:bg-slate-50 dark:hover:bg-white/10 transition-colors group">
                                            <td className="px-6 py-4 font-medium text-indigo-400 dark:text-indigo-300">
                                                <Link to={`/code/${link.code}`} className="hover:underline flex items-center gap-1">
                                                    {link.code}
                                                    <svg
                                                        className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                        />
                                                    </svg>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 max-w-xs truncate text-slate-900 dark:text-slate-100 font-medium" title={link.url}>
                                                {link.url}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white px-2 py-1 rounded-md text-xs font-bold">
                                                    {link.clicks}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 dark:text-white text-xs">
                                                {new Date(link.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => copyToClipboard(shortUrl)}
                                                        className="p-1 text-slate-400 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                                        title="Copy"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => onDelete(link.code)}
                                                        className="p-1 text-slate-400 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
