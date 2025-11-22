const API_URL = '/api/links';

// DOM Elements
const createForm = document.getElementById('create-form');
const urlInput = document.getElementById('url-input');
const codeInput = document.getElementById('code-input');
const submitBtn = document.getElementById('submit-btn');
const formMessage = document.getElementById('form-message');
const linksTableBody = document.getElementById('links-table-body');
const loadingRow = document.getElementById('loading-row');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search-input');
const deleteModal = document.getElementById('delete-modal');
const deleteModalContent = document.getElementById('delete-modal-content');
const confirmDeleteBtn = document.getElementById('confirm-delete');
const cancelDeleteBtn = document.getElementById('cancel-delete');

let linksData = [];
let linkToDelete = null;

// Fetch Links
async function fetchLinks() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch');
        linksData = await res.json();
        renderLinks(linksData);
    } catch (err) {
        console.error(err);
        loadingRow.innerHTML = '<td colspan="5" class="px-6 py-8 text-center text-red-500">Failed to load links.</td>';
    }
}

// Render Links
function renderLinks(links) {
    linksTableBody.innerHTML = '';

    if (links.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    } else {
        emptyState.classList.add('hidden');
    }

    links.forEach(link => {
        const shortUrl = `${window.location.origin}/${link.code}`;
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50 transition-colors group';
        tr.innerHTML = `
            <td class="px-6 py-4 font-medium text-indigo-600">
                <a href="/code/${link.code}" class="hover:underline flex items-center gap-1">
                    ${link.code}
                    <svg class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
            </td>
            <td class="px-6 py-4 max-w-xs truncate" title="${link.url}">
                ${link.url}
            </td>
            <td class="px-6 py-4 text-center">
                <span class="bg-slate-100 text-slate-600 px-2 py-1 rounded-md text-xs font-bold">${link.clicks}</span>
            </td>
            <td class="px-6 py-4 text-slate-500 text-xs">
                ${new Date(link.created_at).toLocaleDateString()}
            </td>
            <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                    <button onclick="copyToClipboard('${shortUrl}')" class="p-1 text-slate-400 hover:text-indigo-600 transition-colors" title="Copy">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012-2v-8a2 2 0 01-2-2h-8a2 2 0 01-2 2v8a2 2 0 012 2z"></path></svg>
                    </button>
                    <button onclick="openDeleteModal('${link.code}')" class="p-1 text-slate-400 hover:text-red-500 transition-colors" title="Delete">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                </div>
            </td>
        `;
        linksTableBody.appendChild(tr);
    });
}

// Create Link
createForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const url = urlInput.value;
    const code = codeInput.value;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating...';
    formMessage.classList.add('hidden');

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, code: code || undefined })
        });

        const data = await res.json();

        if (res.ok) {
            formMessage.textContent = 'Link created successfully!';
            formMessage.className = 'text-sm font-medium text-green-600 mt-2 block';
            createForm.reset();
            fetchLinks();
        } else {
            throw new Error(data.error || 'Something went wrong');
        }
    } catch (err) {
        formMessage.textContent = err.message;
        formMessage.className = 'text-sm font-medium text-red-600 mt-2 block';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Shorten';
    }
});

// Search
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = linksData.filter(link =>
        link.code.toLowerCase().includes(term) ||
        link.url.toLowerCase().includes(term)
    );
    renderLinks(filtered);
});

// Delete Modal
window.openDeleteModal = (code) => {
    linkToDelete = code;
    deleteModal.classList.remove('hidden');
    deleteModal.classList.add('flex');
    // Small delay for animation
    setTimeout(() => {
        deleteModal.classList.remove('opacity-0');
        deleteModalContent.classList.remove('scale-95');
        deleteModalContent.classList.add('scale-100');
    }, 10);
};

function closeDeleteModal() {
    deleteModal.classList.add('opacity-0');
    deleteModalContent.classList.remove('scale-100');
    deleteModalContent.classList.add('scale-95');
    setTimeout(() => {
        deleteModal.classList.add('hidden');
        deleteModal.classList.remove('flex');
        linkToDelete = null;
    }, 200);
}

cancelDeleteBtn.addEventListener('click', closeDeleteModal);

confirmDeleteBtn.addEventListener('click', async () => {
    if (!linkToDelete) return;

    try {
        const res = await fetch(`${API_URL}/${linkToDelete}`, { method: 'DELETE' });
        if (res.ok) {
            fetchLinks();
            closeDeleteModal();
        } else {
            alert('Failed to delete');
        }
    } catch (err) {
        console.error(err);
        alert('Error deleting link');
    }
});

// Copy to Clipboard
window.copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        // Could show a toast here
        alert('Copied to clipboard!');
    });
};

// Init
fetchLinks();
