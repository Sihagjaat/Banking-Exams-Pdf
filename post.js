// post.js
document.getElementById('year').textContent = new Date().getFullYear();
const postContainer = document.getElementById('post');

function getId(){ return new URLSearchParams(location.search).get('id'); }

function renderPost(p){
  if(!p) {
    postContainer.innerHTML = `<p>Post not found. <a href="index.html">Go back</a></p>`;
    return;
  }
  const date = new Date(p.date).toLocaleDateString();
  postContainer.innerHTML = `
    <img class="post-banner" src="${p.image}" alt="${p.title}">
    <h1>${p.title}</h1>
    <div class="meta">${date} • <strong>${p.category||'General'}</strong></div>
    <div class="content">${p.contentHtml || `<p>${p.description || ''}</p>`}</div>
    <div class="actions">
      <a class="btn primary" href="${p.drive}" target="_blank" rel="noopener">Download from Google Drive</a>
      <a class="btn" href="index.html">← Back to Home</a>
    </div>
  `;
}

(function init(){
  const id = getId();
  if(!id) { postContainer.innerHTML = `<p>Invalid link. <a href="index.html">Home</a></p>`; return; }
  const post = posts.find(x => x.id === id);
  renderPost(post);
})();
