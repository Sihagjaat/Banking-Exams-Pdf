// app.js
document.getElementById('year').textContent = new Date().getFullYear();
const grid = document.getElementById('grid');
const searchInput = document.getElementById('search');
const catSelect = document.getElementById('category');
const noresults = document.getElementById('noresults');

// build category list
(function populateCategories(){
  const cats = Array.from(new Set(posts.map(p => p.category).filter(Boolean))).sort();
  for(const c of cats){
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    catSelect.appendChild(opt);
  }
})();

function cardHtml(p){
  const postUrl = `post.html?id=${encodeURIComponent(p.id)}`;
  const date = new Date(p.date).toLocaleDateString();
  return `
    <article class="card">
      <a href="${postUrl}" aria-label="${p.title}">
        <img class="thumb" src="${p.image}" alt="${p.title}">
      </a>
      <div class="card-body">
        <div class="card-meta">${date} • ${p.category||'General'}</div>
        <h3 class="card-title"><a href="${postUrl}">${p.title}</a></h3>
        <p class="card-desc">${p.description}</p>
        <div class="card-actions">
          <a class="btn link" href="${postUrl}">Open</a>
          <a class="btn primary" href="${p.drive}" target="_blank" rel="noopener">Download</a>
        </div>
      </div>
    </article>
  `;
}

function render(){
  const q = (searchInput.value || '').trim().toLowerCase();
  const cat = (catSelect.value || '').trim().toLowerCase();
  const filtered = posts.filter(p => {
    const hay = (p.title + ' ' + (p.description||'') + ' ' + (p.tags||[]).join(' ')).toLowerCase();
    const matchesQ = !q || hay.includes(q);
    const matchesC = !cat || (p.category||'').toLowerCase() === cat;
    return matchesQ && matchesC;
  }).sort((a,b)=> new Date(b.date)-new Date(a.date));

  grid.innerHTML = filtered.map(cardHtml).join('') || '';
  noresults.classList.toggle('hidden', filtered.length > 0);
}

searchInput.addEventListener('input', render);
catSelect.addEventListener('change', render);

// initial render
render();
