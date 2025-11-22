export default function DeleteModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 transform scale-100"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-xl font-bold text-slate-800 mb-2">Delete Link?</h3>
                <p className="text-slate-500 mb-6">
                    Are you sure you want to delete this link? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium shadow-lg shadow-red-200 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
