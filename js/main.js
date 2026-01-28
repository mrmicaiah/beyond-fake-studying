// Beyond Fake Studying - Main JS

const CONFIG = {
    blogId: 'beyond-fake-studying',
    courierListId: '4280233c-afd5-4f05-855d-a7e3afd2a333',
    apiBase: 'https://up-blogs-1.micaiah-tasks.workers.dev'
};

// Subscribe Form
const subscribeForm = document.getElementById('subscribe-form');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = subscribeForm.querySelector('input[type="email"]').value;
        const button = subscribeForm.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        try {
            const response = await fetch(`${CONFIG.apiBase}/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    blogId: CONFIG.blogId,
                    email: email
                })
            });
            
            if (response.ok) {
                button.textContent = 'Subscribed!';
                subscribeForm.querySelector('input').value = '';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 3000);
            } else {
                throw new Error('Subscribe failed');
            }
        } catch (err) {
            button.textContent = 'Error - Try Again';
            button.disabled = false;
            setTimeout(() => {
                button.textContent = originalText;
            }, 3000);
        }
    });
}

// Share Buttons
function shareOnTwitter(url, title) {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
}

function shareOnFacebook(url) {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(fbUrl, '_blank', 'width=550,height=420');
}

function shareOnLinkedIn(url, title) {
    const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(liUrl, '_blank', 'width=550,height=420');
}

function copyLink(url) {
    navigator.clipboard.writeText(url).then(() => {
        const copyBtn = document.querySelector('.share-btn.copy');
        if (copyBtn) {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = originalText;
            }, 2000);
        }
    });
}

// Like Button
async function toggleLike(postSlug) {
    const likeBtn = document.querySelector('.like-btn');
    const likeCount = document.querySelector('.like-count');
    
    try {
        const response = await fetch(`${CONFIG.apiBase}/like`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                blogId: CONFIG.blogId,
                postSlug: postSlug
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            likeBtn.classList.toggle('liked');
            likeCount.textContent = `${data.likes} ${data.likes === 1 ? 'like' : 'likes'}`;
        }
    } catch (err) {
        console.error('Like failed:', err);
    }
}

// Comments
async function loadComments(postSlug) {
    const commentsList = document.querySelector('.comments-list');
    if (!commentsList) return;
    
    try {
        const response = await fetch(`${CONFIG.apiBase}/comments/${CONFIG.blogId}/${postSlug}`);
        if (response.ok) {
            const comments = await response.json();
            commentsList.innerHTML = comments.map(comment => `
                <div class="comment">
                    <div class="comment-author">${escapeHtml(comment.author)}</div>
                    <div class="comment-date">${formatDate(comment.createdAt)}</div>
                    <div class="comment-text">${escapeHtml(comment.text)}</div>
                </div>
            `).join('') || '<p>No comments yet. Be the first!</p>';
        }
    } catch (err) {
        console.error('Load comments failed:', err);
    }
}

async function submitComment(postSlug, author, text) {
    try {
        const response = await fetch(`${CONFIG.apiBase}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                blogId: CONFIG.blogId,
                postSlug: postSlug,
                author: author,
                text: text
            })
        });
        
        if (response.ok) {
            loadComments(postSlug);
            return true;
        }
    } catch (err) {
        console.error('Submit comment failed:', err);
    }
    return false;
}

// Utilities
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}