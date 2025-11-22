const pathParts = window.location.pathname.split('/');
const code = pathParts[pathParts.length - 1];
const API_URL = `/api/links/${code}`;

const loading = document.getElementById('loading');
const statsContent = document.getElementById('stats-content');
const errorState = document.getElementById('error-state');

const shortUrlDisplay = document.getElementById('short-url-display');
const longUrlLink = document.getElementById('long-url-link');
const totalClicks = document.getElementById('total-clicks');
const createdAt = document.getElementById('created-at');
const lastClicked = document.getElementById('last-clicked');
const copyBtn = document.getElementById('copy-btn');
const deleteBtn = document.getElementById('delete-btn');

async function fetchStats() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        renderStats(data);
    } catch (err) {
        loading.classList.add('hidden');
        errorState.classList.remove('hidden');
    }
}

function renderStats(data) {
    const shortUrl = `${window.location.origin}/${data.code}`;

    shortUrlDisplay.textContent = shortUrl;
    longUrlLink.textContent = data.url;
    longUrlLink.href = data.url;
    totalClicks.textContent = data.clicks;
    createdAt.textContent = new Date(data.created_at).toLocaleDateString();
    lastClicked.textContent = data.last_clicked ? new Date(data.last_clicked).toLocaleString() : 'Never';

    loading.classList.add('hidden');
    statsContent.classList.remove('hidden');

    // Copy handler
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(shortUrl).then(() => {
            alert('Copied!');
        });
    };

    // Delete handler
    deleteBtn.onclick = async () => {
        if (confirm('Are you sure you want to delete this link?')) {
            try {
                const res = await fetch(API_URL, { method: 'DELETE' });
                if (res.ok) {
                    window.location.href = '/';
                }
            } catch (err) {
                alert('Failed to delete');
            }
        }
    };
}

fetchStats();
