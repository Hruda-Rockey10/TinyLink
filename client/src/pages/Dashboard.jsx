import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import LinkForm from '../components/LinkForm';
import LinkList from '../components/LinkList';
import DeleteModal from '../components/DeleteModal';

const API_URL = '/api/links';

export default function Dashboard() {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ show: false, code: null });

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setLinks(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteModal.code) return;

        try {
            const res = await fetch(`${API_URL}/${deleteModal.code}`, { method: 'DELETE' });
            if (res.ok) {
                fetchLinks();
                setDeleteModal({ show: false, code: null });
            } else {
                alert('Failed to delete');
            }
        } catch (err) {
            console.error(err);
            alert('Error deleting link');
        }
    };

    const openDeleteModal = (code) => {
        setDeleteModal({ show: true, code });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ show: false, code: null });
    };

    return (
        <Layout>
            <LinkForm onLinkCreated={fetchLinks} />

            {loading ? (
                <div className="text-center py-8 text-slate-400">Loading links...</div>
            ) : (
                <LinkList links={links} onDelete={openDeleteModal} />
            )}

            <DeleteModal
                isOpen={deleteModal.show}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
            />
        </Layout>
    );
}
